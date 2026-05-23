// Loop controller - orchestrates the reconcile loop

import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import type { RespecState, InvariantResult } from "./types.js";
import { getStore, setStore, createDefaultState, appendRoundRecord } from "./store.js";
import { parseSpec } from "./spec-parser.js";
import { runVerifier, verifyScriptExists, scaffoldVerifyScript } from "./verifier.js";
import {
	buildQueue,
	checkEscapeValve,
	formatRepairPrompt,
	needsRegeneration,
	getNextTarget,
} from "./delta-engine.js";
import { writeFileSync, mkdirSync } from "fs";

const SPEC_NAME = "SPEC.md";
const SCRIPTS_DIR = "scripts";
const VERIFY_SCRIPT = "verify-spec.sh";

export class LoopController {
	private pi: ExtensionAPI;

	constructor(api: ExtensionAPI) {
		this.pi = api;
	}

	// Start or resume reconciliation
	async start(specPath: string, ctx: ExtensionContext): Promise<void> {
		let state = getStore();

		// Initialize if needed
		if (!state || state.specKey !== specPath) {
			state = createDefaultState(specPath);
			setStore(state);
		}

		// Check if already done
		if (state.status === "done") {
			await this.notifySuccess(ctx, state);
			return;
		}

		// Check if blocked
		if (state.status === "blocked") {
			this.showEscapeValveMessage(ctx, state);
			return;
		}

		// Check for contract file changes
		const verifyPath = this.deriveVerifyPath(specPath);
		const regen = needsRegeneration(state, specPath, verifyPath);
		if (regen.needed) {
			state.status = "paused";
			setStore(state);
			await ctx.ui.notify(`📄 Contract changed: ${regen.reason}. Run /respec resume to continue.`, "warning");
			return;
		}

		// Check if verify script exists
		if (!verifyScriptExists(specPath)) {
			await this.scaffoldAndPause(ctx, specPath);
			return;
		}

		// Run verifier
		const spec = parseSpec(specPath);
		if (!spec || spec.invariants.length === 0) {
			state.status = "paused";
			setStore(state);
			await ctx.ui.notify("📄 No invariants found in SPEC.md. Add a ## Invariants section.", "warning");
			return;
		}

		const verifierResult = await runVerifier(specPath, spec.invariants);
		state.lastVerifierOutput = verifierResult.stdout;
		state.lastVerifierExitCode = verifierResult.exitCode;

		// Check if all passed
		if (verifierResult.exitCode === 0) {
			state.status = "done";
			setStore(state);
			await this.notifySuccess(ctx, state);
			return;
		}

		// Build queue and get next target
		const queue = buildQueue(verifierResult.results, state.currentTarget);
		const nextTarget = getNextTarget(queue, state);

		if (!nextTarget) {
			// All remaining invariants are blocked
			state.status = "blocked";
			setStore(state);
			await ctx.ui.notify("⚠️ All remaining invariants are blocked (3+ consecutive failures).", "warning");
			return;
		}

		// Mark active and queue the next repair
		state.status = "active";
		state.currentTarget = nextTarget;
		state.turnsThisRound = 0;
		setStore(state);

		// Update UI - show prominently that respec is active
		ctx.ui.setStatus("respec", `◉ respec: r${state.currentRound} → ${nextTarget}`);
		ctx.ui.setWorkingMessage(`[respec] Fixing: ${nextTarget} (r${state.currentRound})`);

		// Show widget with current state
		ctx.ui.setWidget("respec", [
			`respec active: ${nextTarget}`,
			`Round: ${state.currentRound} | Budget: ${state.budgetPerRound} turns`,
			`Target: ${nextTarget}`,
			``,
			`Last verifier output:`,
			verifierResult.stdout.split('\n').slice(0, 10).join('\n'),
		]);

		// Queue the repair prompt
		const repairPrompt = formatRepairPrompt(
			nextTarget,
			spec.invariants.find((i) => i.name === nextTarget)?.index ?? 0,
			verifierResult.stdout,
			specPath
		);

		this.pi.sendMessage(
			{
				customType: "respec-prompt",
				content: repairPrompt,
				display: false,
			},
			{ triggerTurn: true, deliverAs: "followUp" }
		);
	}

	// Handle agent turn end - continue loop or stop
	async onAgentEnd(
		ctx: ExtensionContext,
		toolResults: Array<{ toolCallId: string; toolName: string }>
	): Promise<void> {
		const state = getStore();
		if (!state || state.status !== "active") return;

		// Increment turn counter
		state.turnsThisRound++;
		setStore(state);

		// Check escape valve
		if (state.currentTarget) {
			const escape = checkEscapeValve(state.currentTarget, state);
			if (escape.triggered) {
				state.status = "blocked";
				state.escapeValve = {
					type: escape.type!,
					invariant: state.currentTarget,
					detail: escape.detail!,
					blockedAt: Date.now(),
				};
				setStore(state);
				this.triggerEscapeValve(ctx, state);
				return;
			}
		}

		// Track tool usage for spin guard
		const toolsUsed = new Set(toolResults.map((t) => t.toolName));

		// Run verifier again to check progress
		const spec = parseSpec(state.specKey);
		if (!spec) return;

		const verifierResult = await runVerifier(state.specKey, spec.invariants);
		state.lastVerifierOutput = verifierResult.stdout;
		state.lastVerifierExitCode = verifierResult.exitCode;

		// Check if target was fixed
		const targetResult = verifierResult.results.find(
			(r) => r.name === state.currentTarget
		);

		if (targetResult?.passed) {
			// Record successful round
			const record = {
				round: state.currentRound,
				target: state.currentTarget!,
				pass: true,
				turnsUsed: state.turnsThisRound,
				timestamp: Date.now(),
				verifierOutput: verifierResult.stdout,
			};
			appendRoundRecord(record);
			state.roundHistory.push(record);

			// Reset failure count for this invariant
			state.invariantFailures.delete(state.currentTarget!);

			// Move to next round
			state.currentRound++;
			state.currentTarget = undefined;
			state.turnsThisRound = 0;
			setStore(state);

			// Check if all done
			if (verifierResult.exitCode === 0) {
				state.status = "done";
				setStore(state);
				await this.notifySuccess(ctx, state);
				return;
			}

			// Continue to next invariant
			await this.start(state.specKey, ctx);
			return;
		}

		// Target still failing - increment failure count
		const failures = (state.invariantFailures.get(state.currentTarget!) ?? 0) + 1;
		state.invariantFailures.set(state.currentTarget!, failures);

		// Track target before clearing
		const previousTarget = state.currentTarget;

		// Record failed round
		const record = {
			round: state.currentRound,
			target: previousTarget ?? "unknown",
			pass: false,
			turnsUsed: state.turnsThisRound,
			timestamp: Date.now(),
			verifierOutput: verifierResult.stdout,
		};
		appendRoundRecord(record);
		state.roundHistory.push(record);
		state.currentRound++;
		state.currentTarget = undefined;
		state.turnsThisRound = 0;
		setStore(state);

		// Check escape valve for the previous target
		const escape = checkEscapeValve(previousTarget ?? "", state);
		if (escape.triggered) {
			state.status = "blocked";
			state.escapeValve = {
				type: escape.type!,
				invariant: previousTarget ?? "unknown",
				detail: escape.detail!,
				blockedAt: Date.now(),
			};
			setStore(state);
			this.triggerEscapeValve(ctx, state);
			return;
		}

		// Pause - user can resume manually
		state.status = "paused";
		setStore(state);
		ctx.ui.setStatus("respec", `⏸ respec: paused at r${state.currentRound} (run /respec resume)`);
		ctx.ui.setWorkingMessage();
		ctx.ui.setWidget("respec", [
			`respec paused at round ${state.currentRound}`,
			`Run /respec resume to continue`,
		]);
	}

	// Handle user input - pause if interrupting
	onInput(ctx: ExtensionContext, source: string): boolean {
		if (source === "extension") return false; // Don't pause on our own messages

		const state = getStore();
		if (state?.status === "active") {
			state.userInterrupted = true;
			setStore(state);
			return false; // Don't block, just mark for later
		}
		return false;
	}

	// Resume paused reconciliation
	async resume(ctx: ExtensionContext): Promise<void> {
		const state = getStore();
		if (!state) {
			await ctx.ui.notify("No active reconciliation. Run /respec first.", "warning");
			return;
		}

		if (state.status !== "paused") {
			await ctx.ui.notify(`Cannot resume: status is "${state.status}"`, "warning");
			return;
		}

		state.status = "idle";
		state.userInterrupted = false;
		setStore(state);

		await this.start(state.specKey, ctx);
	}

	// Get current status for display
	getStatus(): RespecState | null {
		return getStore();
	}

	private deriveVerifyPath(specPath: string): string {
		const baseDir = specPath.replace(/\/[^/]*$/, "");
		return `${baseDir}/${SCRIPTS_DIR}/${VERIFY_SCRIPT}`;
	}

	private async scaffoldAndPause(ctx: ExtensionContext, specPath: string): Promise<void> {
		const verifyPath = this.deriveVerifyPath(specPath);
		const baseDir = verifyPath.replace(/\/[^/]*$/, "");

		// Create scripts directory
		try {
			mkdirSync(baseDir, { recursive: true });
		} catch {
			// Ignore
		}

		// Write scaffolded verify script
		const content = scaffoldVerifyScript(specPath);
		writeFileSync(verifyPath, content, "utf-8");
		try {
			require("fs").chmodSync(verifyPath, 0o755);
		} catch {
			// Ignore
		}

		const state = getStore()!;
		state.status = "paused";
		setStore(state);

		await ctx.ui.notify(
			`📄 Scaffolded ${verifyPath}. Edit it before running /respec.`,
			"warning"
		);
	}

	private showEscapeValveMessage(ctx: ExtensionContext, state: RespecState): void {
		if (!state.escapeValve) return;

		let message = `⚠️ respec blocked: ${state.escapeValve.invariant}`;
		if (state.escapeValve.type === "stall") {
			message += " (3+ consecutive failures)";
		} else if (state.escapeValve.type === "spin-guard") {
			message += " (no progress detected)";
		} else if (state.escapeValve.type === "max-rounds") {
			message += ` (${state.maxRounds} rounds)`;
		}
		message += `. See BLOCKER.md for details.`;

		ctx.ui.notify(message, "error");
		ctx.ui.setStatus("respec", `❌ respec: blocked`);
	}

	private async triggerEscapeValve(ctx: ExtensionContext, state: RespecState): Promise<void> {
		// Write BLOCKER.md
		const blockerPath = `${state.specKey.replace(/\/[^/]*$/, "")}/BLOCKER.md`;
		const content = `# Blocked

**Invariant:** ${state.escapeValve?.invariant}
**Type:** ${state.escapeValve?.type}
**Detail:** ${state.escapeValve?.detail}
**At:** ${new Date(state.escapeValve?.blockedAt ?? Date.now()).toISOString()}

## Round History

${state.roundHistory
	.slice(-5)
	.map((r) => `- Round ${r.round}: ${r.target} → ${r.pass ? "✅" : "❌"} (${r.turnsUsed} turns)`)
	.join("\n")}

## How to Unblock

1. Edit SPEC.md to clarify the invariant, OR
2. Edit scripts/verify-spec.sh to match the new expectation, OR
3. Fix the underlying code issue
4. Run \`/respec resume\` to continue
`;

		writeFileSync(blockerPath, content, "utf-8");

		ctx.ui.notify(
			`⚠️ Blocked: ${state.escapeValve?.invariant}. See BLOCKER.md`,
			"error"
		);
		ctx.ui.setStatus("respec", `❌ respec: blocked on ${state.escapeValve?.invariant}`);
		ctx.ui.setWidget("respec", [
			`❌ respec blocked`,
			`Invariant: ${state.escapeValve?.invariant}`,
			`Type: ${state.escapeValve?.type}`,
			`Detail: ${state.escapeValve?.detail}`,
			``,
			`Run /respec resume after fixing the issue`,
		]);
		ctx.ui.setWorkingMessage();
	}

	private async notifySuccess(ctx: ExtensionContext, state: RespecState): Promise<void> {
		const total = state.roundHistory.length;
		await ctx.ui.notify(
			`✅ All invariants satisfied in ${total} round${total === 1 ? "" : "s"}`,
			"info"
		);
		ctx.ui.setStatus("respec", `✅ respec: done (${total} rounds)`);
		ctx.ui.setWidget("respec", [
			`✅ respec complete`,
			`All invariants satisfied`,
			`Total rounds: ${total}`,
		]);
		ctx.ui.setWorkingMessage();
	}
}