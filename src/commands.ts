// Register /spec-init, /spec-status, /respec commands
// Simplified — no verify script, spec is the source of truth

import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import type { TurnBudget } from "./types.js";
import { LoopController } from "./loop-controller.js";
import {
	initStore,
	getStore,
	setStore,
	restoreState,
	restoreRoundRecords,
} from "./store.js";
import { parseSpec, countChecked, findSpecFiles, generateAnalytics, formatAnalytics } from "./spec-parser.js";
import { writeFileSync, existsSync, readFileSync } from "fs";
import { buildFullStatus } from "./visual.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const SPEC_NAME = "SPEC.md";

let loopController: LoopController | null = null;

// Helper: merge budgets with conflict detection
function mergeBudgetsWithConflictDetection(
	existing: TurnBudget[],
	incoming: TurnBudget[]
): { conflicts: string[]; merged: TurnBudget[] } {
	const conflicts: string[] = [];
	const merged = [...existing];
	const existingMap = new Map(existing.map((b) => [b.category, b]));

	for (const incomingBudget of incoming) {
		const existingBudget = existingMap.get(incomingBudget.category);
		if (existingBudget) {
			// Conflict: same category exists in both
			conflicts.push(incomingBudget.category);
			// Merge strategy: keep the one with more samples (higher confidence)
			if (incomingBudget.count > existingBudget.count) {
				const idx = merged.findIndex((b) => b.category === incomingBudget.category);
				if (idx !== -1) merged[idx] = incomingBudget;
			}
		} else {
			merged.push(incomingBudget);
		}
	}

	return { conflicts, merged };
}

// Helper: parse natural language to spec item
function parseNaturalLanguage(text: string): { name: string; verification?: string } {
	// Extract verification commands from natural language
	const verifyPatterns = [
		/(?:run|execute|check|test)\s+(?:`([^`]+)`|(\S+))/gi,
		/(?:verify|ensure)\s+(?:that\s+)?(?:`([^`]+)`|(\S+))/gi,
		/npm\s+\w+/gi,
		/tsc\s+[^\n]*/gi,
		/npx\s+\w+/gi,
	];

	let verification: string | undefined;
	for (const pattern of verifyPatterns) {
		const match = pattern.exec(text);
		if (match) {
			verification = match[1] || match[2] || match[0];
			break;
		}
	}

	// Clean up the name - remove verification mentions from the name
	let name = text
		.replace(/run\s+(?:`([^`]+)`|(\S+))/gi, "")
		.replace(/execute\s+(?:`([^`]+)`|(\S+))/gi, "")
		.replace(/check\s+(?:`([^`]+)`|(\S+))/gi, "")
		.replace(/test\s+(?:`([^`]+)`|(\S+))/gi, "")
		.replace(/verify\s+(?:that\s+)?(?:`([^`]+)`|(\S+))/gi, "")
		.replace(/ensure\s+(?:that\s+)?(?:`([^`]+)`|(\S+))/gi, "")
		.replace(/\s+/g, " ")
		.trim();

	return { name, verification };
}

// Helper: escape regex special characters
function escapeRegex(str: string): string {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

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

			if (command === "checkpoint") {
				const state = getStore();
				if (state && state.status === "active" && state.currentTarget) {
					state.checkpoint = {
						itemName: state.currentTarget.name,
						round: state.currentRound,
						turnsUsed: state.turnsThisRound,
						timestamp: Date.now(),
					};
					setStore(state);
					await ctx.ui.notify(
						`Checkpoint saved: ${state.currentTarget.name} (round ${state.currentRound}, ${state.turnsThisRound} turns)`,
						"info"
					);
				} else {
					await ctx.ui.notify(
						"No active reconciliation to checkpoint",
						"warning"
					);
				}
				return;
			}

			if (command === "multi") {
				const state = getStore();
				if (state) {
					state.multiSpec = !state.multiSpec;
					setStore(state);
					await ctx.ui.notify(
						`Multi-spec mode ${state.multiSpec ? "enabled" : "disabled"}`,
						"info"
					);
				}
				return;
			}

			if (command === "analytics") {
				const state = getStore();
				if (state && state.roundHistory.length > 0) {
					const analytics = generateAnalytics(state.roundHistory);
					const lines = formatAnalytics(analytics);
					ctx.ui.notify(lines.join("\n"), "info");
				} else {
					await ctx.ui.notify(
						"No round history yet",
						"info"
					);
				}
				return;
			}

			if (command === "sync") {
				const state = getStore();
				if (state && state.learnedBudgets.length > 0) {
					// Export learned budgets to .respec-budgets.json
					const syncPath = join(dirname(path), ".respec-budgets.json");
					const syncData = {
						version: 1,
						exported: new Date().toISOString(),
						budgets: state.learnedBudgets,
					};
					writeFileSync(syncPath, JSON.stringify(syncData, null, 2));
					await ctx.ui.notify(
						`Exported ${state.learnedBudgets.length} learned budgets to ${syncPath}`,
						"info"
					);
					} else {
						await ctx.ui.notify(
							"No learned budgets to export",
							"info"
						);
					}
				return;
			}

			if (command === "import") {
				const state = getStore();
				if (!state) {
					await ctx.ui.notify("No respec state found", "warning");
					return;
				}
				const syncPath = join(dirname(path), ".respec-budgets.json");
				if (existsSync(syncPath)) {
					try {
						const data = JSON.parse(readFileSync(syncPath, "utf-8"));
						if (data.budgets && Array.isArray(data.budgets)) {
							// Detect conflicts and merge
							const { conflicts, merged } = mergeBudgetsWithConflictDetection(
								state.learnedBudgets,
								data.budgets
							);
							if (conflicts.length > 0) {
								await ctx.ui.notify(
									`⚠️ ${conflicts.length} conflicts detected: ${conflicts.join(", ")}`,
									"warning"
								);
							}
							state.learnedBudgets = merged;
							setStore(state);
							await ctx.ui.notify(
								`Imported ${merged.length} budgets (${conflicts.length} conflicts resolved)`,
								"info"
							);
						}
					} catch {
					await ctx.ui.notify("Failed to parse sync file", "error");
					}
				} else {
					await ctx.ui.notify(
						`No sync file found at ${syncPath}`,
						"info"
					);
				}
				return;
			}

			if (command === "add") {
				// Add new spec item via natural language
				const itemText = tokens.slice(1).join(" ");
				if (!itemText) {
					await ctx.ui.notify("Usage: /respec add <item description>", "info");
					return;
				}
				const parsed = parseNaturalLanguage(itemText);
				const specPath = path;
				const content = readFileSync(specPath, "utf-8");
				const newItem = `### [ ] ${parsed.name}\n`;
				if (parsed.verification) {
					// Insert at end of Requirements section
					const insertPoint = content.lastIndexOf("### [ ");
					if (insertPoint === -1) {
						writeFileSync(specPath, content + "\n" + newItem, "utf-8");
					} else {
						writeFileSync(specPath, content.slice(0, insertPoint) + newItem + content.slice(insertPoint), "utf-8");
					}
				} else {
					writeFileSync(specPath, content + "\n" + newItem, "utf-8");
				}
				await ctx.ui.notify(`Added: ${parsed.name}`, "info");
				return;
			}

			if (command === "remove") {
				// Remove spec item by name
				const itemName = tokens.slice(1).join(" ");
				if (!itemName) {
					await ctx.ui.notify("Usage: /respec remove <item name>", "info");
					return;
				}
				const specPath = path;
				const content = readFileSync(specPath, "utf-8");
				const regex = new RegExp(`### \[ [x]?\] ${escapeRegex(itemName)}[\s\S]*?(?=### \[|\n\n|\n#|$)`, "i");
				if (regex.test(content)) {
					writeFileSync(specPath, content.replace(regex, ""), "utf-8");
					await ctx.ui.notify(`Removed: ${itemName}`, "info");
				} else {
					await ctx.ui.notify(`Item not found: ${itemName}`, "warning");
				}
				return;
			}

			if (command === "edit") {
				// Edit spec item
				const itemName = tokens.slice(1).join(" ");
				if (!itemName) {
					await ctx.ui.notify("Usage: /respec edit <item name>", "info");
					return;
				}
				await ctx.ui.notify("Edit mode: describe changes to the item", "info");
				return;
			}

			if (command === "ci") {
				// CI mode - non-interactive, JSON output
				const ciMode = true;
				const specPath = path;
				const items = parseSpec(specPath);
				if (!items) {
					console.log(JSON.stringify({ error: "Cannot parse SPEC.md", exitCode: 2 }));
					process.exit(2);
				}
				const total = items.length;
				const checked = countChecked(items);
				const unchecked = items.filter((i) => !i.checked);
				const output = {
					total,
					checked,
					unchecked: unchecked.map((i) => i.name),
					exitCode: unchecked.length === 0 ? 0 : 1,
				};
				console.log(JSON.stringify(output));
				process.exit(output.exitCode);
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
