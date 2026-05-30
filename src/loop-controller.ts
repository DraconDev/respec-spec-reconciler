// Loop controller — simplified spec-as-source-of-truth reconciliation
// No custom verifier. Agent works through spec items using standard tools.

import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import type { RespecState, SpecItem } from "./types.js";
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

		// Find next unchecked item
		const target = findFirstUnchecked(state.items);
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

		return `## Reconcile: ${target.name}

**${target.name}** is not yet satisfied. ${done}/${total} items complete.

${target.verification ? `Verify by running: \`${target.verification}\`` : ""}
${body}

**Instructions:**
1. Work on satisfying this requirement
2. Run the verification if specified
3. When done, check it off in SPEC.md by changing [ ] to [x]

Do NOT:
- Add unrelated features
- Change items you haven't been asked to work on
- Remove or reorder spec items unless instructed

Spec: ${state.specKey}
Status: ${done}/${total} done, round ${state.currentRound}
`;
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

	// Trigger escape valve — write BLOCKER.md
	private async triggerEscapeValve(
		ctx: ExtensionContext,
		state: RespecState
	): Promise<void> {
		const ev = state.escapeValve!;
		const blockerLines = [
			"# Blocked",
			"",
			`**Item:** ${ev.item}`,
			`**Type:** ${ev.type}`,
			`**Detail:** ${ev.detail}`,
			`**At:** ${new Date(ev.blockedAt).toISOString()}`,
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
}
