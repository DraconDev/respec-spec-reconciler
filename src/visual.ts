// Visual formatting for respec — progress bars, widgets, status displays

import type { RespecState, SpecItem, RoundRecord, SpecDiff } from "./types.js";
import { countChecked } from "./spec-parser.js";

// Highlighted diff for changes
export function highlightDiff(diff: SpecDiff): string[] {
	const lines: string[] = [];
	
	if (diff.added.length > 0) {
		lines.push("\x1b[32m+ Added:\x1b[0m"); // Green
		for (const item of diff.added) {
			lines.push(`\x1b[32m  + ${item.name}\x1b[0m`);
		}
	}
	
	if (diff.removed.length > 0) {
		lines.push("\x1b[31m- Removed:\x1b[0m"); // Red
		for (const name of diff.removed) {
			lines.push(`\x1b[31m  - ${name}\x1b[0m`);
		}
	}
	
	if (diff.checked.length > 0) {
		lines.push("\x1b[33m✓ Completed:\x1b[0m"); // Yellow
		for (const name of diff.checked) {
			lines.push(`\x1b[33m  ✓ ${name}\x1b[0m`);
		}
	}
	
	if (diff.unchecked.length > 0) {
		lines.push("\x1b[35m✗ Regressed:\x1b[0m"); // Magenta
		for (const name of diff.unchecked) {
			lines.push(`\x1b[35m  ✗ ${name}\x1b[0m`);
		}
	}
	
	return lines;
}

// Generate completion chart (ASCII)
export function generateCompletionChart(data: Array<{ label: string; value: number }>): string[] {
	const lines: string[] = [];
	const maxValue = Math.max(...data.map((d) => d.value));
	
	lines.push("Completion Chart:");
	lines.push("");
	
	for (const { label, value } of data) {
		const barLength = maxValue > 0 ? Math.round((value / maxValue) * 40) : 0;
		const bar = "█".repeat(barLength);
		lines.push(`${label.padEnd(20)} |${bar} ${value}`);
	}
	
	return lines;
}

// Generate category breakdown
export function generateCategoryBreakdown(categories: Map<string, number>): string[] {
	const lines: string[] = [];
	const total = [...categories.values()].reduce((a, b) => a + b, 0);
	
	lines.push("Category Breakdown:");
	lines.push("");
	
	const sortedCategories = [...categories.entries()].sort((a, b) => b[1] - a[1]);
	
	for (const [category, count] of sortedCategories) {
		const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
		const barLength = Math.round(percentage / 2.5);
		const bar = "▓".repeat(barLength);
		lines.push(`${category.padEnd(15)} ${bar.padEnd(40)} ${percentage}% (${count})`);
	}
	
	return lines;
}

// Generate coverage heatmap
export function generateHeatmap(items: Array<{ name: string; coverage: number }>): string[] {
	const lines: string[] = [];
	lines.push("Coverage Heatmap:");
	lines.push("");
	
	for (const { name, coverage } of items) {
		const filledLength = Math.round(coverage / 2.5);
		const emptyLength = 40 - filledLength;
		const color = coverage >= 80 ? "\x1b[32m" : coverage >= 50 ? "\x1b[33m" : "\x1b[31m";
		const reset = "\x1b[0m";
		lines.push(`${name.substring(0, 20).padEnd(20)} ${color}${"█".repeat(filledLength)}${"░".repeat(emptyLength)}${reset} ${coverage}%`);
	}
	
	return lines;
}

// Generate burndown chart data
export function generateBurndown(totalItems: number, completedItems: number[], idealLine: boolean = true): string[] {
	const lines: string[] = [];
	lines.push("Burndown Chart:");
	lines.push("");
	
	const maxY = totalItems;
	
	for (let i = 0; i < completedItems.length; i++) {
		const remaining = totalItems - completedItems[i]!;
		const barLength = Math.round((remaining / maxY) * 40);
		const bar = "▓".repeat(barLength);
		lines.push(`Day ${String(i + 1).padStart(3)} |${bar.padEnd(40)}| ${remaining}`);
		
		if (idealLine && i > 0) {
			const idealRemaining = totalItems - (totalItems / completedItems.length) * (i + 1);
			const idealPos = Math.round((idealRemaining / maxY) * 40);
			// Could show ideal line marker
		}
	}
	
	return lines;
}

// Generate cumulative flow diagram (simplified)
export function generateCFD(data: Array<{ day: string; done: number; inProgress: number; todo: number }>): string[] {
	const lines: string[] = [];
	lines.push("Cumulative Flow Diagram:");
	lines.push("");
	
	for (const { day, done, inProgress, todo } of data) {
		const doneBar = "\x1b[32m█\x1b[0m".repeat(Math.min(done, 20));
		const progressBar = "\x1b[33m▓\x1b[0m".repeat(Math.min(inProgress, 10));
		const todoBar = "\x1b[37m░\x1b[0m".repeat(Math.min(todo, 10));
		lines.push(`${day} |${doneBar}${progressBar}${todoBar}| D:${done} P:${inProgress} T:${todo}`);
	}
	
	return lines;
}

// Generate holographic visualization (ASCII 3D)
export function generateHologram(items: SpecItem[], config: HoloConfig): string[] {
	const lines: string[] = [];
	lines.push("╔══════════════════════════════════════════╗");
	lines.push("║     HOLOGRAPHIC SPEC VISUALIZATION       ║");
	lines.push("╠══════════════════════════════════════════╣");
	
	const checked = items.filter((i) => i.checked).length;
	const total = items.length;
	const percentage = total > 0 ? Math.round((checked / total) * 100) : 0;
	
	lines.push(`║  Progress: ${percentage}%                        ║`);
	lines.push(`║  Completed: ${checked}/${total}                      ║`);
	lines.push("║                                          ║");
	
	// 3D-ish bar chart
	const bar = "█".repeat(Math.round(percentage / 5));
	lines.push(`║  [${bar.padEnd(20)}]  ║`);
	lines.push("╚══════════════════════════════════════════╝");
	
	return lines;
}

// Strange attractor visualization (Lorenz-like)
export function strangeAttractor(iterations = 100): string[] {
	const lines: string[] = [];
	lines.push("Strange Attractor Visualization:");
	lines.push("");
	
	let x = 0.1, y = 0, z = 0;
	const sigma = 10, rho = 28, beta = 8 / 3;
	const dt = 0.01;
	
	for (let i = 0; i < iterations; i++) {
		x += sigma * (y - x) * dt;
		y += (x * (rho - z) - y) * dt;
		z += (x * y - beta * z) * dt;
		
		// Project to 2D
		const px = Math.round((x + 20) / 40 * 60);
		const py = Math.round((z + 10) / 40 * 20);
		
		if (px >= 0 && px < 60 && py >= 0 && py < 20) {
			const row = " ".repeat(py) + "*" + " ".repeat(60 - py - 1);
			lines.push(row);
		}
	}
	
	return lines.slice(0, 20);
}





// ─── Progress bar ──────────────────────────────────────────────

export function progressBar(current: number, total: number, width = 10): string {
	if (total === 0) return "░".repeat(width);
	const filled = Math.round((current / total) * width);
	const empty = width - filled;
	return "▓".repeat(filled) + "░".repeat(empty);
}

// ─── Status icon ────────────────────────────────────────────────

export function statusIcon(status: string): string {
	switch (status) {
		case "idle": return "⬜";
		case "active": return "◉";
		case "paused": return "⏸";
		case "done": return "✅";
		case "blocked": return "❌";
		default: return "❓";
	}
}

// ─── Item marker ────────────────────────────────────────────────

export function itemMarker(item: SpecItem, isCurrent?: boolean): string {
	if (item.checked) return "[x]";
	if (isCurrent) return "[>]";
	return "[ ]";
}

// Format item for hierarchical display
export function formatItemHierarchical(item: SpecItem, isCurrent?: boolean): string {
	const marker = itemMarker(item, isCurrent);
	const indent = item.depth ? "  ".repeat(item.depth - 1) : "";
	return `${indent}${marker} ${item.name}`;
}

// ─── Active widget ──────────────────────────────────────────────

export function buildActiveWidget(state: RespecState): string[] {
	const done = countChecked(state.items);
	const total = state.items.length;
	const target = state.currentTarget;
	const bar = progressBar(done, total);
	const lines: string[] = [];

	// Calculate efficiency metrics
	const history = state.roundHistory;
	const completedRounds = history.filter((r) => r.pass);
	const avgTurns = completedRounds.length > 0
		? completedRounds.reduce((sum, r) => sum + r.turnsUsed, 0) / completedRounds.length
		: 0;
	const successRate = history.length > 0
		? Math.round((completedRounds.length / history.length) * 100)
		: 100;

	lines.push(`◉ respec — round ${state.currentRound}/${state.maxRounds}`);
	lines.push(`  ${bar}  ${done}/${total} done`);
	lines.push(`  • turns: ${state.turnsThisRound}/${state.maxTurnsPerRound}`);
	lines.push(`  • success: ${successRate}% (avg ${avgTurns.toFixed(1)} turns/item)`);

	if (state.batchMode) {
		lines.push(`  • batch mode: ${state.batchSize} items`);
	}

	if (state.checkpoint) {
		lines.push(`  • checkpoint: round ${state.checkpoint.round} (${state.checkpoint.turnsUsed} turns)`);
	}

	if (target) {
		lines.push("");
		lines.push(`  → ${target.name}`);
		if (target.verification) {
			lines.push(`    verify: ${target.verification}`);
		}
	}

	// Queue: show items with markers (hierarchical if depth is available)
	lines.push("");
	lines.push("  Queue:");
	for (const item of state.items.slice(0, 10)) {
		const marker = itemMarker(item, item.name === target?.name);
		if (item.depth && item.depth > 1) {
			// Hierarchical display
			const indent = "  ".repeat(item.depth - 1);
			lines.push(`  ${indent}${marker} ${item.name}`);
		} else {
			lines.push(`  ${marker} ${item.name}`);
		}
	}
	if (state.items.length > 10) {
		lines.push(`  ... +${state.items.length - 10} more`);
	}

	return lines;
}

// ─── Paused widget ──────────────────────────────────────────────

export function buildPausedWidget(state: RespecState): string[] {
	const done = countChecked(state.items);
	const total = state.items.length;
	const lines: string[] = [];

	lines.push(`⏸ respec — paused at round ${state.currentRound}`);
	lines.push(`  ${done}/${total} done`);

	// Show last round info
	const lastRound = state.roundHistory[state.roundHistory.length - 1];
	if (lastRound) {
		const icon = lastRound.pass ? "done" : "not yet done";
		lines.push(`  Last: "${lastRound.target}" → ${icon} (${lastRound.turnsUsed} turns)`);
	}

	lines.push("");
	lines.push("  ℹ️  Run /respec resume to continue");
	lines.push("  ℹ️  Or check off items manually in SPEC.md");

	return lines;
}

// ─── Done widget ────────────────────────────────────────────────

export function buildDoneWidget(state: RespecState): string[] {
	const done = countChecked(state.items);
	const total = state.roundHistory.length;
	const timeInfo = state.roundHistory.length > 0
		? `  ${total} round${total === 1 ? "" : "s"}`
		: "";

	return [
		"✅ respec — complete",
		`  All ${done} requirements satisfied`,
		timeInfo,
	];
}

// ─── Blocked widget ─────────────────────────────────────────────

export function buildBlockedWidget(state: RespecState): string[] {
	const ev = state.escapeValve;
	const lines: string[] = [];

	lines.push(`❌ respec — blocked at round ${state.currentRound}`);

	if (ev) {
		lines.push(`  "${ev.item}"`);
		if (ev.type === "stall") {
			lines.push(`  stalled: 3 consecutive failures`);
		} else if (ev.type === "max-rounds") {
			lines.push(`  max rounds (${state.maxRounds}) reached`);
		} else {
			lines.push(`  ${ev.detail}`);
		}
	}

	lines.push("");
	lines.push("  ℹ️  See BLOCKER.md");
	lines.push("  ℹ️  Run /respec resume after fixing");

	return lines;
}

// ─── Idle widget ────────────────────────────────────────────────

export function buildIdleWidget(state: RespecState): string[] {
	const done = countChecked(state.items);
	const total = state.items.length;
	return [
		"⬜ respec — idle",
		`  ${done}/${total} done`,
		"",
		"  ℹ️  Run /respec to start reconciliation",
	];
}

// ─── Build the right widget for the current state ──────────────

export function buildWidget(state: RespecState): string[] {
	switch (state.status) {
		case "active":
			return buildActiveWidget(state);
		case "paused":
			return buildPausedWidget(state);
		case "done":
			return buildDoneWidget(state);
		case "blocked":
			return buildBlockedWidget(state);
		case "idle":
		default:
			return buildIdleWidget(state);
	}
}

// ─── Status text ────────────────────────────────────────────────

export function buildStatusText(state: RespecState): string | undefined {
	switch (state.status) {
		case "active":
			return `◉ respec: ${state.currentTarget?.name ?? "working..."} (${state.currentRound}/${state.maxRounds})`;
		case "paused":
			return "⏸ respec: paused";
		case "done":
			return "✅ respec: done";
		case "blocked":
			return `❌ respec: blocked — ${state.escapeValve?.item ?? "unknown"}`;
		case "idle":
		default:
			return undefined;
	}
}

// ─── Working message ────────────────────────────────────────────

export function buildWorkingMessage(state: RespecState): string | undefined {
	if (state.status !== "active") return undefined;
	return `[respec] Working on: ${state.currentTarget?.name}`;
}

// ─── Round history table ────────────────────────────────────────

export function formatRoundHistory(records: RoundRecord[], limit = 5): string[] {
	if (records.length === 0) return ["  (none yet)"];

	const recent = records.slice(-limit);
	return recent.map((r) => {
		const icon = r.pass ? "✅" : "❌";
		const turns = `${r.turnsUsed} turn${r.turnsUsed === 1 ? "" : "s"}`;
		return `  #${r.round} ${r.target} → ${icon}  ${turns}`;
	});
}

// ─── Full status for /spec-status ──────────────────────────────

export function buildFullStatus(state: RespecState): string[] {
	const done = countChecked(state.items);
	const total = state.items.length;
	const lines: string[] = [];

	lines.push(`respec — ${state.status.toUpperCase()}`);
	lines.push(`  Spec: ${state.specKey}`);
	lines.push(`  Done: ${done}/${total}  ${progressBar(done, total)}`);
	lines.push(`  Round: ${state.currentRound}/${state.maxRounds}`);
	lines.push(`  Budget: ${state.turnsThisRound}/${state.maxTurnsPerRound} turns`);

	if (state.currentTarget) {
		lines.push(`  Target: ${state.currentTarget.name}`);
	}

	if (state.escapeValve) {
		lines.push(`  Blocked: ${state.escapeValve.type} — ${state.escapeValve.detail}`);
	}

	// Items
	lines.push("");
	lines.push("  Requirements:");
	for (const item of state.items) {
		const marker = itemMarker(item, item.name === state.currentTarget?.name);
		lines.push(`  ${marker} ${item.name}`);
	}

	// Round history
	lines.push("");
	lines.push("  Round history:");
	lines.push(...formatRoundHistory(state.roundHistory));

	return lines;
}
