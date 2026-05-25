// Visual formatting for respec — progress bars, widgets, status displays

import type { RespecState, SpecItem, RoundRecord } from "./types.js";
import { countChecked } from "./spec-parser.js";

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

// ─── Active widget ──────────────────────────────────────────────

export function buildActiveWidget(state: RespecState): string[] {
	const done = countChecked(state.items);
	const total = state.items.length;
	const target = state.currentTarget;
	const bar = progressBar(done, total);
	const lines: string[] = [];

	lines.push(`◉ respec — round ${state.currentRound}/${state.maxRounds}`);
	lines.push(`  ${bar}  ${done}/${total} done  •  ${state.turnsThisRound}/${state.maxTurnsPerRound} turns`);

	if (target) {
		lines.push(`  → ${target.name}`);
		if (target.verification) {
			lines.push(`    verify: ${target.verification}`);
		}
	}

	// Queue: show items with markers
	lines.push("");
	lines.push("  Queue:");
	for (const item of state.items.slice(0, 10)) {
		const marker = itemMarker(item, item.name === target?.name);
		lines.push(`  ${marker} ${item.name}`);
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
