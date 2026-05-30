// Loop controller — simplified spec-as-source-of-truth reconciliation
// No custom verifier. Agent works through spec items using standard tools.

import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import type { RespecState, SpecItem, RoundRecord } from "./types.js";
import {
	getStore,
	setStore,
	createDefaultState,
	appendRoundRecord,
} from "./store.js";
import {
	parseSpec,
	findFirstUnchecked,
	allChecked,
	countChecked,
	estimateComplexity,
	inferDependencies,
	findReadyItems,
	getFailureHints,
} from "./spec-parser.js";
import {
	buildWidget,
	buildStatusText,
	buildWorkingMessage,
	formatRoundHistory,
} from "./visual.js";
import { existsSync, statSync, writeFileSync } from "fs";

export class LoopController {
	private pi: ExtensionAPI;

	constructor(api: ExtensionAPI) {
		this.pi = api;
	}

	// Start or resume reconciliation
	async start(specPath: string, ctx: ExtensionContext): Promise<void> {
		let state = getStore();

		// Parse the spec
		const items = parseSpec(specPath);
		if (!items) {
			await ctx.ui.notify(`Cannot read SPEC.md at ${specPath}`, "error");
			return;
		}

		if (items.length === 0) {
			await ctx.ui.notify(
				"No requirements found in SPEC.md. Add items with [x] or [ ] checkboxes.",
				"warning"
			);
			return;
		}

		// Check if contract changed (SPEC.md modified since last run)
		let specMtime = 0;
		try {
			specMtime = statSync(specPath).mtimeMs;
		} catch {
			// ignore
		}

		const contractChanged =
			state && state.lastSpecMtime && specMtime > state.lastSpecMtime &&
			state.status !== "active";

		// Initialize or update state
		if (!state || state.specKey !== specPath || contractChanged) {
			state = createDefaultState(specPath, items);
			state.lastSpecMtime = specMtime;
			setStore(state);
		} else {
			// Update items from freshly parsed spec
			state.items = items;
			state.lastSpecMtime = specMtime;
			setStore(state);
		}

		// Check if already done
		if (allChecked(items)) {
			state.status = "done";
			setStore(state);
			await this.notifySuccess(ctx, state);
			return;
		}

		// Check if blocked
		if (state.status === "blocked") {
			await this.showEscapeValveMessage(ctx, state);
			return;
		}

		// Find next unchecked item using smart ordering
		const target = this.findSmartTarget(state.items, state.roundHistory);
		if (!target) {
			// All checked? Shouldn't reach here but handle
			state.status = "done";
			setStore(state);
			await this.notifySuccess(ctx, state);
			return;
		}

		// Mark active
		state.status = "active";
		state.currentTarget = target;
		state.turnsThisRound = 0;
		setStore(state);

		// Update UI with nice widget
		ctx.ui.setStatus("respec", buildStatusText(state));
		ctx.ui.setWorkingMessage(buildWorkingMessage(state));
		ctx.ui.setWidget("respec", buildWidget(state));

		// Send the focused prompt
		const prompt = this.buildPrompt(target, state);
		this.pi.sendMessage(
			{
				customType: "respec-prompt",
				content: prompt,
				display: false,
			},
			{ triggerTurn: true, deliverAs: "followUp" }
		);
	}

	// Resume paused/blocked reconciliation
	async resume(ctx: ExtensionContext): Promise<void> {
		const state = getStore();
		if (!state) {
			await ctx.ui.notify("No active reconciliation. Run /respec first.", "warning");
			return;
		}

		if (state.status !== "paused" && state.status !== "blocked") {
			await ctx.ui.notify(
				`Cannot resume: status is "${state.status}"`,
				"warning"
			);
			return;
		}

		// Clear escape valve if resuming from blocked
		if (state.status === "blocked") {
			state.escapeValve = undefined;
		}

		state.status = "idle";
		state.userInterrupted = false;
		setStore(state);

		await this.start(state.specKey, ctx);
	}

	// Handle agent turn end — check spec, advance or pause
	async onAgentEnd(ctx: ExtensionContext): Promise<void> {
		const state = getStore();
		if (!state || state.status !== "active") return;

		const target = state.currentTarget;
		if (!target) return;

		// Re-parse spec to see if agent checked anything off (don't double-count turns — before_agent_start hook already does this)
		const freshItems = parseSpec(state.specKey) ?? [];

		// Check if the target was checked off
		const freshTarget = freshItems.find(
			(i) => i.name === target.name
		);

		const targetPassed = freshTarget?.checked ?? false;

		if (targetPassed) {
			// Target is done! Record success
			const doneCount = countChecked(freshItems);
			const record = {
				round: state.currentRound,
				target: target.name,
				pass: true,
				checkedCount: doneCount,
				turnsUsed: state.turnsThisRound,
				timestamp: Date.now(),
			};
			appendRoundRecord(record);
			state.roundHistory.push(record);

			// Reset failure count
			delete state.failureCounts[target.name];

			// Advance
			state.currentRound++;
			state.currentTarget = undefined;
			state.turnsThisRound = 0;
			setStore(state);

			// Check if all done
			if (allChecked(freshItems)) {
				state.status = "done";
				setStore(state);
				await this.notifySuccess(ctx, state);
				return;
			}

			// Continue to next item
			await this.start(state.specKey, ctx);
			return;
		}

		// Target still unchecked — count as failure
		state.failureCounts[target.name] = (state.failureCounts[target.name] ?? 0) + 1;
		const consecutiveFailures = state.failureCounts[target.name] ?? 0;

		// Record failed round
		const doneCount = countChecked(freshItems);
		const record = {
			round: state.currentRound,
			target: target.name,
			pass: false,
			checkedCount: doneCount,
			turnsUsed: state.turnsThisRound,
			timestamp: Date.now(),
		};
		appendRoundRecord(record);
		state.roundHistory.push(record);

		// Track target before clearing
		const previousTarget = target;
		state.currentRound++;
		state.currentTarget = undefined;
		state.turnsThisRound = 0;
		setStore(state);

		// Check escape valve — 3 consecutive failures
		if (consecutiveFailures >= 3) {
			state.status = "blocked";
			state.escapeValve = {
				type: "stall",
				item: previousTarget.name,
				detail: `"${previousTarget.name}" failed ${consecutiveFailures} consecutive rounds`,
				blockedAt: Date.now(),
			};
			setStore(state);
			await this.triggerEscapeValve(ctx, state);
			return;
		}

		// Check max rounds
		if (state.currentRound >= state.maxRounds) {
			state.status = "blocked";
			state.escapeValve = {
				type: "max-rounds",
				item: previousTarget.name,
				detail: `Hit max rounds (${state.maxRounds})`,
				blockedAt: Date.now(),
			};
			setStore(state);
			await this.triggerEscapeValve(ctx, state);
			return;
		}

		// Pause — let user decide how to proceed
		state.status = "paused";
		setStore(state);
		ctx.ui.setStatus("respec", buildStatusText(state));
		ctx.ui.setWorkingMessage();
		ctx.ui.setWidget("respec", buildWidget(state));
	}

	// Handle user input
	onInput(ctx: ExtensionContext, source: string): boolean {
		if (source === "extension") return false;

		const state = getStore();
		if (state?.status === "active") {
			state.userInterrupted = true;
			setStore(state);
		}
		return false;
	}

	// Build focused prompt for an item
	private buildPrompt(target: SpecItem, state: RespecState): string {
		const done = countChecked(state.items);
		const total = state.items.length;
		const body = target.body ? `\nContext:\n${target.body}` : "";


		// Get failure hints if this item has been attempted before
		const failureHint = getFailureHints(target.name, state.roundHistory);

		// Estimate complexity and suggest turn budget
		const complexity = estimateComplexity(target);
		const suggestedBudget = Math.max(5, complexity * 3 + 3);

		// Build context-aware prompt
		let prompt = `## Reconcile: ${target.name}\n\n`;
		prompt += `**${target.name}** is not yet satisfied. ${done}/${total} items complete.\n\n`;

		if (target.verification) {
			prompt += `Verify by running: \`${target.verification}\`\n\n`;
		}

		if (body) {
			prompt += `Context:\n${body}\n\n`;
		}

		if (failureHint) {
			prompt += `⚠️ **Previous attempt hint:** ${failureHint}\n\n`;
		}

		prompt += `**Suggested approach:**\n`;
		if (complexity >= 5) {
			prompt += `- This looks complex. Work incrementally.\n`;
			prompt += `- Consider: ${suggestedBudget} turns max, then pause for review.\n`;
		} else if (complexity >= 3) {
			prompt += `- Moderate complexity. Standard approach should work.\n`;
		} else {
			prompt += `- Should be straightforward.\n`;
		}

		prompt += `\n**Instructions:**\n`;
		prompt += `1. Work on satisfying this requirement\n`;
		prompt += `2. Run the verification if specified\n`;
		prompt += `3. When done, check it off in SPEC.md by changing [ ] to [x]\n\n`;

		prompt += `Do NOT:\n`;
		prompt += `- Add unrelated features\n`;
		prompt += `- Change items you haven't been asked to work on\n`;
		prompt += `- Remove or reorder spec items unless instructed\n\n`;

		prompt += `Spec: ${state.specKey}\n`;
		prompt += `Status: ${done}/${total} done, round ${state.currentRound}\n`;

		return prompt;
	}

	// Smart target selection — prefer ready items based on dependencies
	private findSmartTarget(items: SpecItem[], history: RoundRecord[]): SpecItem | null {
		// First, try to find items with satisfied dependencies
		const deps = inferDependencies(items);
		const readyItems = findReadyItems(items, deps);

		if (readyItems.length > 0) {
			// Sort by complexity (easiest first to build momentum)
			readyItems.sort((a, b) => {
				const aComplexity = estimateComplexity(a);
				const bComplexity = estimateComplexity(b);
				return aComplexity - bComplexity;
			});
			return readyItems[0];
		}

		// Fallback: first unchecked (legacy behavior)
		return findFirstUnchecked(items);
	}

	// Show success notification
	private async notifySuccess(
		ctx: ExtensionContext,
		state: RespecState
	): Promise<void> {
		const total = state.roundHistory.length;
		const done = countChecked(state.items);
		await ctx.ui.notify(
			`✅ All ${done} requirements satisfied in ${total} round${total === 1 ? "" : "s"}`,
			"info"
		);
		ctx.ui.setStatus("respec", "✅ respec: done");
		ctx.ui.setWidget("respec", [
			"✅ respec complete",
			`All ${done} requirements satisfied`,
			`Total rounds: ${total}`,
		]);
		ctx.ui.setWorkingMessage();
	}

	// Check budget exhaustion
	private checkBudgetExceeded(state: RespecState): boolean {
		return state.turnsThisRound >= state.maxTurnsPerRound;
	}

	// Show escape valve/blocked message
	private async showEscapeValveMessage(
		ctx: ExtensionContext,
		state: RespecState
	): Promise<void> {
		await ctx.ui.notify(
			`respec is blocked on "${state.escapeValve?.item ?? "unknown"}". Run /respec resume after fixing.`,
			"warning"
		);
		ctx.ui.setStatus("respec", "❌ respec: blocked");
	}

	// Trigger escape valve — write BLOCKER.md with smart analysis
	private async triggerEscapeValve(
		ctx: ExtensionContext,
		state: RespecState
	): Promise<void> {
		const ev = state.escapeValve!;

		// Analyze failure pattern for better suggestions
		const failureAnalysis = this.analyzeFailure(state);


		const blockerLines = [
			"# Blocked",
			"",
			`**Item:** ${ev.item}`,
			`**Type:** ${ev.type}`,
			`**Detail:** ${ev.detail}`,
			`**At:** ${new Date(ev.blockedAt).toISOString()}`,
			"",
			"## Failure Analysis",
			"",
			failureAnalysis,
			"",
			"## Recent Rounds",
			"",
			...state.roundHistory.slice(-5).map(
				(r) => `- Round ${r.round}: ${r.target} → ${r.pass ? "✅" : "❌"} (${r.turnsUsed} turns)`
			),
			"",
			"## How to Unblock",
			"",
			"1. Clarify or change the requirement in SPEC.md",
			"2. Check it off manually if it's actually done",
			"3. Delete this BLOCKER.md and run /respec resume",
		];


		const blockerPath = state.specKey.replace(/\/[^/]*$/, "") + "/BLOCKER.md";
		writeFileSync(blockerPath, blockerLines.join("\n"), "utf-8");


		ctx.ui.notify(
			`⚠️ Blocked: ${ev.item}. See BLOCKER.md`,
			"error"
		);
		ctx.ui.setStatus("respec", buildStatusText(state));
		ctx.ui.setWidget("respec", buildWidget(state));
		ctx.ui.setWorkingMessage();
	}

	// Analyze failure pattern and suggest root cause
	private analyzeFailure(state: RespecState): string {
		const targetName = state.escapeValve?.item ?? "";
		const targetHistory = state.roundHistory.filter(
			(r) => r.target === targetName
		);

		if (targetHistory.length === 0) {
			return "No prior attempts recorded.";
		}

		const avgTurns = targetHistory.reduce((sum, r) => sum + r.turnsUsed, 0) / targetHistory.length;
		const maxTurns = Math.max(...targetHistory.map((r) => r.turnsUsed));
		const latestRecord = targetHistory[targetHistory.length - 1];

		// Generate analysis based on patterns
		if (maxTurns > 15) {
			return "**Pattern:** High turn count suggests the requirement may be too broad or there are hidden blockers.\n\n**Suggestion:** Consider breaking this into smaller, testable sub-items in SPEC.md.";
		}

		if (avgTurns < 3 && targetHistory.length >= 3) {
			return "**Pattern:** Quick failures suggest the requirement may be impossible as written or depends on upstream work.\n\n**Suggestion:** Check if earlier items (compilation, tests) are fully satisfied. The requirement may need clarification.";
		}

		if (latestRecord && latestRecord.turnsUsed > avgTurns * 1.5) {
			return "**Pattern:** Last attempt used significantly more turns than average, suggesting diminishing returns.\n\n**Suggestion:** There may be a specific blocker in the current approach. Try a different strategy or break down the requirement.";
		}

		return "**Pattern:** Consistent failures after multiple attempts.\n\n**Suggestion:** The requirement may need to be reworded, the verification command may be incorrect, or there may be an external dependency not captured in SPEC.md.";
	}
}
