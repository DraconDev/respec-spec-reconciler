// Parse SPEC.md — extract requirements with [x]/[ ] checkboxes
// Supports headings ### [x] Name or list items - [x] Name

import { readFileSync } from "fs";
import type { SpecItem, RoundRecord, TurnBudget } from "./types.js";

// Parse SPEC.md and extract requirement items
export function parseSpec(specPath: string): SpecItem[] | null {
	try {
		const content = readFileSync(specPath, "utf-8");
		const lines = content.split("\n");
		const items: SpecItem[] = [];
		let index = 0;

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			const trimmed = line.trim();

			// Match ### [x] Item name or ### [ ] Item name
			const headingMatch = trimmed.match(/^###\s+\[(x| )\]\s+(.+)/i);
			// Match - [x] Item name or - [ ] Item name
			const listMatch = trimmed.match(/^[-*]\s+\[(x| )\]\s+(.+)/i);

			const match = headingMatch || listMatch;
			if (match) {
				const checked = match[1]!.toLowerCase() === "x";
				const name = match[2]!.trim();
				index++;

				// Collect body text until next checkbox or heading
				const bodyLines: string[] = [];
				let verification: string | undefined;

				for (let j = i + 1; j < lines.length; j++) {
					const nextLine = lines[j]!.trim();
					// Stop at next checkbox or heading
					if (/^(###|[-*])\s+\[[x ]\]/.test(nextLine)) break;
					if (/^##/.test(nextLine)) break;
					if (nextLine) {
						bodyLines.push(nextLine);
						// Extract verification hint if present
						const verifyMatch = nextLine.match(/^(?:verify|check|test|run):\s*(.+)/i);
						if (verifyMatch) {
							verification = verifyMatch[1]!.trim();
						}
					}
				}

				items.push({
					name,
					checked,
					index,
					verification,
					body: bodyLines.join("\n") || undefined,
				});
			}
		}

		return items;
	} catch {
		return null;
	}
}

// Find the first unchecked item (the next target)
export function findFirstUnchecked(items: SpecItem[]): SpecItem | null {
	for (const item of items) {
		if (!item.checked) return item;
	}
	return null;
}

// Check if all items are checked
export function allChecked(items: SpecItem[]): boolean {
	return items.length > 0 && items.every((i) => i.checked);
}

// Count checked items
export function countChecked(items: SpecItem[]): number {
	return items.filter((i) => i.checked).length;
}

// Suggest a verification command based on item name and patterns
export function suggestVerification(item: SpecItem): string | null {
	const name = item.name.toLowerCase();
	const body = item.body?.toLowerCase() ?? "";

	// Known patterns for verification commands
	const patterns: Array<[RegExp, string]> = [
		// Build/compile patterns
		[/compil|build|typecheck/i, "tsc --noEmit"],
		[/lint|eslint|prettier/i, "eslint . || npx prettier --check ."],
		[/test/i, "npm test"],
		[/integration.test|e2e/i, "npm run test:e2e"],
		[/api|endpoint|route/i, "curl -s localhost:3000/health || npm test"],
		[/security|vuln/i, "npm audit"],
		[/performance|benchmark/i, "npm run benchmark"],
		[/coverage/i, "npm run test -- --coverage"],
		[/types|exports/i, "tsc --noEmit && node -e \"require('./')\""],
		[/readme|docs/i, "test -f README.md && echo 'README exists'"],
		[/package|metadata/i, "npm pkg get name version"],
		[/github|repo|remote/i, "gh repo view --json name"],
		[/config|settings/i, "test -f config.json"],
		[/install|setup|init/i, "npm ci"],
	];

	for (const [pattern, cmd] of patterns) {
		if (pattern.test(name) || pattern.test(body)) {
			return cmd;
		}
	}

	// Generic fallback
	return null;
}

// Estimate item complexity based on name keywords and body length
export function estimateComplexity(item: SpecItem): number {
	let score = 0;
	const name = item.name.toLowerCase();
	const body = item.body?.toLowerCase() ?? "";

	// Complex keywords
	if (/concurrent|parallel|async|thread|mutex|lock/.test(name + body)) score += 3;
	if (/refactor|restructure|rewrite|migrate/.test(name + body)) score += 3;
	if (/test|integration|e2e|benchmark/.test(name + body)) score += 2;
	if (/api|endpoint|route|handler/.test(name + body)) score += 2;
	if (/config|setup|init|install/.test(name + body)) score += 1;
	if (/compile|build|typecheck|lint/.test(name + body)) score += 1;

	// Body length as complexity proxy
	score += Math.min(3, Math.floor((body.length + item.name.length) / 100));

	return score;
}

// Infer dependencies from item relationships
export function inferDependencies(items: SpecItem[]): Map<number, number[]> {
	const deps = new Map<number, number[]>();

	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		const name = item.name.toLowerCase();
		const body = (item.body ?? "").toLowerCase();
		const dependencies: number[] = [];

		// Items that likely depend on "compiles" or "builds"
		if (/test|api|endpoint|feature|component/.test(name)) {
			for (let j = 0; j < i; j++) {
				const prev = items[j].name.toLowerCase();
				if (/compil|build|setup|config/.test(prev)) {
					dependencies.push(j);
				}
			}
		}

		// Items that depend on "tests pass"
		if (/api|endpoint|feature/.test(name)) {
			for (let j = 0; j < i; j++) {
				const prev = items[j].name.toLowerCase();
				if (/test|compile/.test(prev)) {
					if (!dependencies.includes(j)) dependencies.push(j);
				}
			}
		}

		if (dependencies.length > 0) {
			deps.set(i, dependencies);
		}
	}

	return deps;
}

// Find items whose dependencies are all satisfied
export function findReadyItems(items: SpecItem[], deps: Map<number, number[]>): SpecItem[] {
	return items.filter((item, idx) => {
		if (item.checked) return false;
		const itemDeps = deps.get(idx) ?? [];
		return itemDeps.every((depIdx) => items[depIdx]?.checked);
	});
}

// Get failure hints from round history
export function getFailureHints(targetName: string, history: RoundRecord[]): string | null {
	const targetHistory = history.filter((r) => r.target === targetName);
	if (targetHistory.length === 0) return null;

	const recent = targetHistory[targetHistory.length - 1];
	const avgTurns = targetHistory.reduce((sum, r) => sum + r.turnsUsed, 0) / targetHistory.length;

	if (avgTurns > 5) {
		return `Previous attempts took ${Math.round(avgTurns)} turns on average. Consider breaking this into smaller steps.`;
	}

	if (recent.turnsUsed >= 10) {
		return `Last attempt used ${recent.turnsUsed} turns without success. Check if there are blocking issues.`;
	}

	return null;
}

// Extract category from item name for budget learning
function extractCategory(itemName: string): string {
	const name = itemName.toLowerCase();
	if (/compil|build|typecheck|lint/i.test(name)) return "compile";
	if (/test/i.test(name)) return "test";
	if (/api|endpoint|route|handler/i.test(name)) return "api";
	if (/config|settings|setup/i.test(name)) return "config";
	if (/docs?|readme|documentation/i.test(name)) return "docs";
	if (/refactor|restructure/i.test(name)) return "refactor";
	if (/security|vuln|audit/i.test(name)) return "security";
	if (/performance|benchmark/i.test(name)) return "perf";
	if (/install|setup|init/i.test(name)) return "setup";
	if (/github|repo|remote/i.test(name)) return "repo";
	return "other";
}

// Learn turn budget from a completed round
export function learnTurnBudget(
	existingBudgets: TurnBudget[],
	itemName: string,
	turnsUsed: number
): TurnBudget[] {
	const category = extractCategory(itemName);
	const budgets = [...existingBudgets];
	const existingIndex = budgets.findIndex((b) => b.category === category);

	if (existingIndex >= 0) {
		const existing = budgets[existingIndex];
		budgets[existingIndex] = {
			category,
			totalTurns: existing.totalTurns + turnsUsed,
			count: existing.count + 1,
			avgTurns: (existing.totalTurns + turnsUsed) / (existing.count + 1),
		};
	} else {
		budgets.push({
			category,
			totalTurns: turnsUsed,
			count: 1,
			avgTurns: turnsUsed,
		});
	}

	return budgets;
}

// Get suggested turn budget for an item based on learned data
export function getSuggestedBudget(
	itemName: string,
	budgets: TurnBudget[],
	baseComplexity: number
): number {
	const category = extractCategory(itemName);
	const learnedBudget = budgets.find((b) => b.category === category);

	if (learnedBudget && learnedBudget.count >= 2) {
		// Use learned data if we have at least 2 samples
		return Math.max(5, Math.ceil(learnedBudget.avgTurns * 1.2));
	}

	// Fallback to complexity-based estimate
	return Math.max(5, baseComplexity * 3 + 3);
}

// Format item status for display
export function formatItemStatus(item: SpecItem, isTarget?: boolean): string {
	const marker = item.checked ? "[x]" : isTarget ? "[>]" : "[ ]";
	return `${marker} ${item.name}`;
}

// Format compact queue for display
export function formatCompactQueue(items: SpecItem[], targetIndex?: number, maxItems?: number): string[] {
	const lines: string[] = [];
	const limit = maxItems ?? 10;
	const checked = countChecked(items);

	lines.push(`${checked}/${items.length} done`);
	for (const item of items.slice(0, limit)) {
		const isTarget = item.index === targetIndex && !item.checked;
		lines.push(formatItemStatus(item, isTarget));
	}
	if (items.length > limit) {
		lines.push(`... +${items.length - limit} more`);
	}

	return lines;
}
