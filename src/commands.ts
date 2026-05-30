// Register /spec-init, /spec-status, /respec commands
// Simplified — no verify script, spec is the source of truth

import type {
	ExtensionAPI,
} from "@earendil-works/pi-coding-agent";
import { LoopController } from "./loop-controller.js";
import {
	initStore,
	getStore,
	setStore,
	restoreState,
	restoreRoundRecords,
} from "./store.js";
import { parseSpec, countChecked } from "./spec-parser.js";
import { writeFileSync, existsSync, readFileSync } from "fs";
import { buildFullStatus } from "./visual.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const SPEC_NAME = "SPEC.md";

let loopController: LoopController | null = null;

// Read template from templates directory
function getTemplatePath(name: string): string {
	const templatesDir = join(
		dirname(fileURLToPath(import.meta.url)),
		"..",
		"templates"
	);
	return join(templatesDir, name);
}

function readTemplate(name: string): string {
	try {
		return readFileSync(getTemplatePath(name), "utf-8");
	} catch {
		return "";
	}
}

export function registerCommands(pi: ExtensionAPI): void {
	initStore(pi);
	loopController = new LoopController(pi);

	// /spec-init — scaffold SPEC.md only (no verify script)
	pi.registerCommand("spec-init", {
		description: "Initialize SPEC.md in the current directory",
		handler: async (args, ctx) => {
			const cwd = ctx.cwd;
			const specPath = `${cwd}/${SPEC_NAME}`;

			if (existsSync(specPath)) {
				await ctx.ui.notify(
					"SPEC.md already exists. Edit it manually.",
					"warning"
				);
				return;
			}

			// Read template
			const specTemplate = readTemplate("SPEC-template.md");

			const specContent =
				specTemplate ||
				`# Project Spec

## Requirements

### [ ] Project compiles
Run: \`npm run build\` or \`tsc --noEmit\`

### [ ] Tests pass
Run: \`npm test\`

### [ ] Add more requirements below
Each item should be a verifiable requirement.
`;

			writeFileSync(specPath, specContent, "utf-8");

			await ctx.ui.notify(
				"📄 Created SPEC.md. Edit it with your requirements, then run /respec.",
				"info"
			);
		},
	});

	// /spec-status — show current reconciliation state
	pi.registerCommand("spec-status", {
		description: "Show respec reconciliation status",
		handler: async (args, ctx) => {
			const state = getStore();

			if (!state) {
				await ctx.ui.notify(
					"No active reconciliation. Run /respec first.",
					"info"
				);
				return;
			}

		
		// Show items
		const lines: string[] = ["Requirements:"];
		if (state.items.length === 0) {
			lines.push("  (none)");
		} else {
			for (const item of state.items) {
				const marker = item.checked
					? "[x]"
					: item.name === state.currentTarget?.name
						? "[>]"
						: "[ ]";
				lines.push(`  ${marker} ${item.name}`);
			}
		}

		// Round history
		lines.push("");
		lines.push("Round history:");
		if (state.roundHistory.length === 0) {
			lines.push("  (none yet)");
		} else {
			for (const record of state.roundHistory.slice(-5)) {
				const icon = record.pass ? "✅" : "❌";
				lines.push(
					`  #${record.round} ${record.target} → ${icon} (${record.turnsUsed} turns)`
				);
			}
		}

		ctx.ui.setWidget("respec-status", lines, {
			placement: "aboveEditor",
		});
		await ctx.ui.notify(lines.join("\n"), "info");
		},
	});
	// /respec — start or resume reconciliation
	pi.registerCommand("respec", {
		description: "Start or resume spec-driven reconciliation",
		handler: async (args, ctx) => {
			if (!loopController) {
				await ctx.ui.notify("respec not initialized", "error");
				return;
			}

			const tokens = (args ?? "").trim().split(/\s+/);
			const command = tokens[0] ?? "";
			const path = tokens[1] ?? `${ctx.cwd}/${SPEC_NAME}`;

			if (command === "resume") {
				await loopController.resume(ctx);
				return;
			}

			if (command === "focus" && path) {
				const state = getStore();
				if (state) {
					state.focusedSpecKey = path;
					setStore(state);
				}
				await ctx.ui.notify(`🔭 Focused spec: ${path}`, "info");
				return;
			}

			if (command === "cancel") {
				const state = getStore();
				if (state) {
					state.status = "idle";
					state.currentTarget = undefined;
					setStore(state);
				}
				ctx.ui.setStatus("respec", undefined);
				ctx.ui.setWidget("respec", undefined);
				await ctx.ui.notify("Cancelled reconciliation", "info");
				return;
			}

			if (command === "pause") {
				const state = getStore();
				if (state?.status === "active") {
					state.status = "paused";
					setStore(state);
					ctx.ui.setStatus("respec", "⏸ respec: paused");
					ctx.ui.setWidget("respec", [
						"respec paused",
						"Run /respec resume to continue",
					]);
				}
				await ctx.ui.notify("Paused reconciliation", "info");
				return;
			}

			if (command === "batch") {
				const state = getStore();
				if (state) {
					state.batchMode = !state.batchMode;
					const size = parseInt(tokens[1] ?? "3", 10);
					if (size > 0 && size <= 5) {
						state.batchSize = size;
					}
					setStore(state);
					await ctx.ui.notify(
						`Batch mode ${state.batchMode ? "enabled" : "disabled"} (size: ${state.batchSize})`,
						"info"
					);
				}
				return;
			}

			// Default: start new reconciliation
			if (!existsSync(path)) {
				await ctx.ui.notify(
					`No SPEC.md found at ${path}. Run /spec-init first.`,
					"warning"
				);
				return;
			}

			await loopController.start(path, ctx);
		},
	});
}

// Register hooks for lifecycle events
export function registerHooks(pi: ExtensionAPI): void {
	// session_start — restore state
	pi.on("session_start", async (event, ctx) => {
		ctx.ui.setStatus("respec", "respec ready");

		if (event.reason === "resume" || event.reason === "fork") {
			const branchEntries = ctx.sessionManager.getBranch();
			const state = restoreState(branchEntries);
			if (state) {
				const records = restoreRoundRecords(branchEntries);
				state.roundHistory = records;

				if (state.status === "active" && state.currentTarget) {
					ctx.ui.setStatus(
						"respec",
						`◉ respec: ${state.currentTarget.name}`
					);
				} else if (state.status === "paused") {
					ctx.ui.setStatus("respec", "⏸ respec: paused (run /respec resume)");
				} else if (state.status === "done") {
					ctx.ui.setStatus("respec", "✅ respec: done");
				} else if (state.status === "blocked") {
					ctx.ui.setStatus("respec", "❌ respec: blocked");
				}

				// Always pause on resume (explicit resume required)
				if (state.status === "active") {
					state.status = "paused";
					state.currentTarget = undefined;
				}

				setStore(state);
			}
		}
	});

	// before_agent_start — track turns
	pi.on("before_agent_start", async (event, ctx) => {
		const state = getStore();
		if (!state || state.status !== "active") return;
		state.turnsThisRound++;
	});

	// agent_end — continue loop
	pi.on("agent_end", async (event, ctx) => {
		if (!loopController) return;
		const state = getStore();
		if (!state || state.status !== "active") return;
		await loopController.onAgentEnd(ctx);
	});

	// input — detect user interruption
	pi.on("input", async (event, ctx) => {
		if (event.source === "extension") return;
		if (loopController) {
			loopController.onInput(ctx, event.source);
		}
	});
}
