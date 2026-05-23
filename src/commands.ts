// Register /spec-init, /spec-status, /respec commands

import type { ExtensionAPI, ExtensionCommandContext } from "@earendil-works/pi-coding-agent";
import { LoopController } from "./loop-controller.js";
import { initStore, getStore, restoreState, restoreRoundRecords, createDefaultState } from "./store.js";
import { parseSpec } from "./spec-parser.js";
import { scaffoldVerifyScript } from "./verifier.js";
import { writeFileSync, existsSync, mkdirSync, readFileSync, chmodSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const SPEC_NAME = "SPEC.md";
const SCRIPTS_DIR = "scripts";
const VERIFY_SCRIPT = "verify-spec.sh";

let loopController: LoopController | null = null;

// Read template from package templates directory
function getTemplatePath(name: string): string {
	// Templates are relative to the package root (parent of src/)
	const templatesDir = join(dirname(fileURLToPath(import.meta.url)), "..", "templates");
	return join(templatesDir, name);
}

function readTemplate(name: string): string {
	try {
		return readFileSync(getTemplatePath(name), "utf-8");
	} catch {
		return ""; // Fallback to inline content
	}
}

export function registerCommands(pi: ExtensionAPI): void {
	initStore(pi);
	loopController = new LoopController(pi);

	// /spec-init - scaffold SPEC.md and verify script
	pi.registerCommand("spec-init", {
		description: "Initialize SPEC.md and verify-spec.sh in the current directory",
		handler: async (args, ctx) => {
			const cwd = ctx.cwd;
			const specPath = `${cwd}/${SPEC_NAME}`;
			const verifyPath = `${cwd}/${SCRIPTS_DIR}/${VERIFY_SCRIPT}`;

			// Check if already exists
			if (existsSync(specPath)) {
				await ctx.ui.notify("SPEC.md already exists. Edit it manually.", "warning");
				return;
			}

			// Create scripts directory
			try {
				mkdirSync(`${cwd}/${SCRIPTS_DIR}`, { recursive: true });
			} catch {
				// Ignore
			}

			// Read templates from package
			const specTemplate = readTemplate("SPEC-template.md");
			const verifyTemplate = readTemplate("verify-template.sh");

			// Write SPEC.md
			const specContent = specTemplate || `# Project Spec

## Invariants

### 1. Example Invariant
Description of what must be true.
\`\`\`
[check] Add your verification check here
\`\`\`

### 2. Add more invariants below
Add more invariants following the same pattern.
`;

			writeFileSync(specPath, specContent, "utf-8");

			// Write verify script
			const verifyContent = verifyTemplate || scaffoldVerifyScript(specPath);
			writeFileSync(verifyPath, verifyContent, "utf-8");

			// Make executable
			try {
				chmodSync(verifyPath, 0o755);
			} catch {
				// Ignore
			}

			await ctx.ui.notify(
				`📄 Created SPEC.md and scripts/verify-spec.sh. Edit them before running /respec.`,
				"info"
			);
		},
	});

	// /spec-status - show current reconciliation status
	pi.registerCommand("spec-status", {
		description: "Show respec reconciliation status",
		handler: async (args, ctx) => {
			const state = getStore();

			if (!state) {
				await ctx.ui.notify("No active reconciliation. Run /respec first.", "info");
				return;
			}

			const statusIcon = {
				idle: "⬜",
				active: "◉",
				paused: "⏸",
				done: "✅",
				blocked: "❌",
			}[state.status];

			const lines: string[] = [
				`${statusIcon} respec - ${state.status.toUpperCase()}`,
				`  Spec: ${state.specKey}`,
				`  Round: ${state.currentRound}/${state.maxRounds}`,
				`  Budget: ${state.turnsThisRound}/${state.budgetPerRound} turns`,
			];

			if (state.currentTarget) {
				lines.push(`  Target: ${state.currentTarget}`);
			}

			if (state.escapeValve) {
				lines.push(`  Blocked: ${state.escapeValve.type} - ${state.escapeValve.detail}`);
			}

			lines.push("");
			lines.push("  Round history:");

			if (state.roundHistory.length === 0) {
				lines.push("    (none yet)");
			} else {
				for (const record of state.roundHistory.slice(-5)) {
					const icon = record.pass ? "✅" : "❌";
					lines.push(`    #${record.round} ${record.target} → ${icon} (${record.turnsUsed} turns)`);
				}
			}

			// Show in widget
			ctx.ui.setWidget("respec-status", lines, { placement: "aboveEditor" });

			// Also notify for non-TTY
			await ctx.ui.notify(lines.join("\n"), "info");
		},
	});

	// /respec - start or resume reconciliation
	pi.registerCommand("respec", {
		description: "Start or resume spec-driven reconciliation",
		handler: async (args, ctx) => {
			if (!loopController) {
				await ctx.ui.notify("respec not initialized", "error");
				return;
			}

			// Parse args
			const tokens = (args ?? "").trim().split(/\s+/);
			const command = tokens[0] ?? "";
			const path = tokens[1] ?? `${ctx.cwd}/${SPEC_NAME}`;

			if (command === "resume") {
				await loopController.resume(ctx);
				return;
			}

			if (command === "focus" && path) {
				// Set focused spec
				const state = getStore();
				if (state) {
					state.focusedSpecKey = path;
				}
				await ctx.ui.notify(`🔭 Focused spec: ${path}`, "info");
				return;
			}

			if (command === "cancel") {
				const state = getStore();
				if (state) {
					state.status = "idle";
					state.currentTarget = undefined;
				}
				await ctx.ui.notify("Cancelled reconciliation", "info");
				return;
			}

			// Default: start new reconciliation
			if (!existsSync(path)) {
				await ctx.ui.notify(`No SPEC.md found at ${path}. Run /spec-init first.`, "warning");
				return;
			}

			await loopController.start(path, ctx);
		},
	});
}

// Register hooks for lifecycle events
export function registerHooks(pi: ExtensionAPI): void {
	// session_start - restore state and show initial status
	pi.on("session_start", async (event, ctx) => {
		// Show respec is loaded and ready
		ctx.ui.setStatus("respec", "respec ready");

		if (event.reason === "resume" || event.reason === "fork") {
			// Restore state from session entries
			const branchEntries = ctx.sessionManager.getBranch();
			const state = restoreState(branchEntries);
			if (state) {
				// Reconstruct round history
				const records = restoreRoundRecords(branchEntries);
				state.roundHistory = records;
				// Show current state in status
				if (state.status === "active" && state.currentTarget) {
					ctx.ui.setStatus("respec", `◉ respec: ${state.currentTarget}`);
				} else if (state.status === "paused") {
					ctx.ui.setStatus("respec", `⏸ respec: paused (run /respec resume)`);
				} else if (state.status === "done") {
					ctx.ui.setStatus("respec", `✅ respec: done`);
				} else if (state.status === "blocked") {
					ctx.ui.setStatus("respec", `❌ respec: blocked`);
				}
				// Mark as paused (need explicit resume)
				state.status = "paused";
				// Clear active target
				state.currentTarget = undefined;

				const { setStore } = await import("./store.js");
				setStore(state);
			}
		}
	});

	// before_agent_start - add context
	pi.on("before_agent_start", async (event, ctx) => {
		const state = getStore();
		if (!state || state.status !== "active") return;

		// Update turns counter
		state.turnsThisRound++;
	});

	// before_agent_start - show active state in status bar
	pi.on("before_agent_start", async (event, ctx) => {
		const state = getStore();
		if (!state) return;

		if (state.status === "active" && state.currentTarget) {
			const round = state.currentRound;
			ctx.ui.setStatus("respec", `◉ respec: r${round} ${state.currentTarget}`);
		}
	});

	// agent_end - continue loop or stop
	pi.on("agent_end", async (event, ctx) => {
		if (!loopController) return;

		const state = getStore();
		if (!state || state.status !== "active") return;

		// Extract tool results from messages
		const toolResults: Array<{ toolCallId: string; toolName: string }> = [];
		for (const msg of event.messages) {
			// AgentMessage can have tool role with tool_call_id and name
			if ("tool_call_id" in msg && msg.tool_call_id && "name" in msg) {
				toolResults.push({ toolCallId: msg.tool_call_id as string, toolName: msg.name as string });
			}
		}

		await loopController.onAgentEnd(ctx, toolResults);
	});

	// input - handle user interruption
	pi.on("input", async (event, ctx) => {
		if (event.source === "extension") return; // Don't pause on our own messages

		if (loopController) {
			loopController.onInput(ctx, event.source);
		}
	});

	// session_shutdown - preserve state (appendEntry already handles this)
	pi.on("session_shutdown", async () => {
		// State is already persisted via pi.appendEntry in setStore
	});
}