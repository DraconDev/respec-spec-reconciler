// Parse SPEC.md — extract requirements with [x]/[ ] checkboxes
// Supports headings ### [x] Name or list items - [x] Name

import { readFileSync } from "fs";
import type { SpecItem, RoundRecord, TurnBudget, SpecSnapshot, SpecFile } from "./types.js";

// Parse SPEC.md and extract requirement items
export function parseSpec(specPath: string): SpecItem[] | null {
	try {
		const content = readFileSync(specPath, "utf-8");
		const lines = content.split("\n");
		const items: SpecItem[] = [];
		let index = 0;

		// Track section hierarchy for nested requirements
		const sectionStack: string[] = [];

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			const trimmed = line.trim();

			// Track section hierarchy
			const h2Match = trimmed.match(/^##\s+(.+)/);
			if (h2Match) {
				// Update section stack - remove deeper levels
				sectionStack.length = 1; // Keep "Requirements" or root
				sectionStack.push(h2Match[1]!.trim());
			}

			// Match ### [x] Item name or ### [ ] Item name
			const headingMatch = trimmed.match(/^###\s+\[(x| )\]\s+(.+)/i);
			// Match - [x] Item name or - [ ] Item name (list items)
			const listMatch = trimmed.match(/^[-*]\s+\[(x| )\]\s+(.+)/i);

			const match = headingMatch || listMatch;
			if (match) {
				const checked = match[1]!.toLowerCase() === "x";
				const name = match[2]!.trim();
				const isList = !!listMatch;
				const depth = isList ? sectionStack.length : sectionStack.length + 1;
				const parent = sectionStack.length > 0 ? sectionStack[sectionStack.length - 1] : undefined;
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
					parent,
					depth,
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

// Find all unchecked items across multiple specs
export function findAllUnchecked(specFiles: SpecFile[]): SpecItem[] {
	const unchecked: SpecItem[] = [];
	for (const spec of specFiles) {
		for (const item of spec.items) {
			if (!item.checked) {
				unchecked.push(item);
			}
		}
	}
	return unchecked;
}

// Scan directory for all SPEC.md files
export function findSpecFiles(rootPath: string): string[] {
	const specs: string[] = [];
	const { readdirSync, statSync } = require("fs");
	const { join } = require("path");

	function scanDir(dir: string) {
		try {
			const entries = readdirSync(dir);
			for (const entry of entries) {
				const fullPath = join(dir, entry);
				try {
					const stat = statSync(fullPath);
					if (stat.isDirectory() && !entry.startsWith(".") && entry !== "node_modules") {
						scanDir(fullPath);
					} else if (entry === "SPEC.md") {
						specs.push(fullPath);
					}
				} catch {
					// Skip inaccessible files
				}
			}
		} catch {
			// Skip inaccessible directories
		}
	}

	scanDir(rootPath);
	return specs;
}

// Spec analytics - track which item types take longest
export interface SpecAnalytics {
	totalItems: number;
	totalChecked: number;
	completedByCategory: Record<string, { count: number; avgTurns: number }>;
	topDifficultyItems: Array<{ name: string; turns: number }>;
	mostFailedItems: Array<{ name: string; failures: number }>;
}

export function generateAnalytics(history: RoundRecord[]): SpecAnalytics {
	const completed = history.filter((r) => r.pass);
	const failed = history.filter((r) => !r.pass);

	// Count by category
	const byCategory: Record<string, { turns: number[]; failures: number }> = {};
	for (const record of history) {
		const cat = extractCategory(record.target);
		if (!byCategory[cat]) {
			byCategory[cat] = { turns: [], failures: 0 };
		}
		if (record.pass) {
			byCategory[cat].turns.push(record.turnsUsed);
		} else {
			byCategory[cat].failures++;
		}
	}

	const completedByCategory: SpecAnalytics["completedByCategory"] = {};
	for (const [cat, data] of Object.entries(byCategory)) {
		const avg = data.turns.length > 0
			? data.turns.reduce((a, b) => a + b, 0) / data.turns.length
			: 0;
		completedByCategory[cat] = {
			count: data.turns.length,
			avgTurns: Math.round(avg * 10) / 10,
		};
	}

	// Top difficulty items (most turns)
	const difficultyMap = new Map<string, number>();
	for (const record of completed) {
		const prev = difficultyMap.get(record.target) ?? 0;
		difficultyMap.set(record.target, prev + record.turnsUsed);
	}
	const topDifficultyItems = Array.from(difficultyMap.entries())
		.map(([name, turns]) => ({ name, turns }))
		.sort((a, b) => b.turns - a.turns)
		.slice(0, 5);

	// Most failed items
	const failureMap = new Map<string, number>();
	for (const record of failed) {
		failureMap.set(record.target, (failureMap.get(record.target) ?? 0) + 1);
	}
	const mostFailedItems = Array.from(failureMap.entries())
		.map(([name, failures]) => ({ name, failures }))
		.sort((a, b) => b.failures - a.failures)
		.slice(0, 5);

	return {
		totalItems: history.length,
		totalChecked: completed.length,
		completedByCategory,
		topDifficultyItems,
		mostFailedItems,
	};
}

// Format analytics for display
export function formatAnalytics(analytics: SpecAnalytics): string[] {
	const lines: string[] = [];

	lines.push("**Spec Analytics:**");
	lines.push(`Total: ${analytics.totalChecked}/${analytics.totalItems} completed`);

	if (Object.keys(analytics.completedByCategory).length > 0) {
		lines.push("");
		lines.push("By category:");
		for (const [cat, data] of Object.entries(analytics.completedByCategory)) {
			lines.push(`  ${cat}: ${data.count} items, avg ${data.avgTurns} turns`);
		}
	}

	if (analytics.topDifficultyItems.length > 0) {
		lines.push("");
		lines.push("Most difficult:");
		for (const item of analytics.topDifficultyItems) {
			lines.push(`  ${item.name}: ${item.turns} turns`);
		}
	}

	if (analytics.mostFailedItems.length > 0) {
		lines.push("");
		lines.push("Most failures:");
		for (const item of analytics.mostFailedItems) {
			lines.push(`  ${item.name}: ${item.failures} fails`);
		}
	}

	return lines;
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

// Detect regressions when spec items get unchecked after being checked
export function detectRollbacks(
	currentItems: SpecItem[],
	specHistory: SpecSnapshot[]
): string[] {
	const rollbacks: string[] = [];

	for (const item of currentItems) {
		if (!item.checked) {
			// Item is currently unchecked - check if it was checked before
			const wasChecked = specHistory.some(
				(s) => s.itemName === item.name && s.wasChecked
			);
			if (wasChecked) {
				rollbacks.push(item.name);
			}
		}
	}

	return rollbacks;
}

// Calculate confidence score for an item based on past success
export function calculateConfidence(
	itemName: string,
	history: RoundRecord[]
): number {
	// 0-100 confidence scale
	const itemHistory = history.filter((r) => r.target === itemName);

	if (itemHistory.length === 0) {
		// No history - medium confidence
		return 50;
	}

	const successes = itemHistory.filter((r) => r.pass).length;
	const total = itemHistory.length;
	const successRate = (successes / total) * 100;

	// Factor in average turns - lower turns = higher confidence
	const avgTurns = itemHistory.reduce((sum, r) => sum + r.turnsUsed, 0) / total;
	let turnFactor = 100;
	if (avgTurns > 10) turnFactor = 60;
	else if (avgTurns > 7) turnFactor = 75;
	else if (avgTurns > 5) turnFactor = 85;
	else turnFactor = 95;

	// Combine success rate and turn efficiency
	const confidence = Math.round((successRate * 0.7) + (turnFactor * 0.3));
	return Math.min(100, Math.max(0, confidence));
}

// Get confidence label for display
export function getConfidenceLabel(confidence: number): string {
	if (confidence >= 80) return "high";
	if (confidence >= 50) return "medium";
	return "low";
}

// Diff two sets of spec items to show what changed
export interface SpecDiff {
	added: SpecItem[]; // New items not in old set
	removed: string[]; // Item names that were removed
	checked: string[]; // Items that changed from unchecked to checked
	unchecked: string[]; // Items that changed from checked to unchecked
}

export function diffSpecs(oldItems: SpecItem[], newItems: SpecItem[]): SpecDiff {
	const oldNames = new Set(oldItems.map((i) => i.name));
	const newNames = new Set(newItems.map((i) => i.name));
	const oldChecked = new Set(oldItems.filter((i) => i.checked).map((i) => i.name));
	const newChecked = new Set(newItems.filter((i) => i.checked).map((i) => i.name));

	const added = newItems.filter((i) => !oldNames.has(i.name));
	const removed = oldItems.filter((i) => !newNames.has(i.name)).map((i) => i.name);
	const checked = newItems.filter((i) => newChecked.has(i.name) && !oldChecked.has(i.name)).map((i) => i.name);
	const unchecked = newItems.filter((i) => oldChecked.has(i.name) && !newChecked.has(i.name)).map((i) => i.name);

	return { added, removed, checked, unchecked };
}

// Format diff for display
export function formatDiff(diff: SpecDiff): string[] {
	const lines: string[] = [];

	if (diff.added.length > 0) {
		lines.push("**Added:**");
		for (const item of diff.added) {
			lines.push(`+ ${item.name}`);
		}
	}

	if (diff.removed.length > 0) {
		lines.push("**Removed:**");
		for (const name of diff.removed) {
			lines.push(`- ${name}`);
		}
	}

	if (diff.checked.length > 0) {
		lines.push("**Completed:**");
		for (const name of diff.checked) {
			lines.push(`✓ ${name}`);
		}
	}

	if (diff.unchecked.length > 0) {
		lines.push("**Regressed:**");
		for (const name of diff.unchecked) {
			lines.push(`✗ ${name}`);
		}
	}

	return lines;
}

// Update spec history with current state
export function updateSpecHistory(
	currentItems: SpecItem[],
	specHistory: SpecSnapshot[]
): SpecSnapshot[] {
	const now = Date.now();
	const newHistory = [...specHistory];

	for (const item of currentItems) {
		if (item.checked) {
			// Only add if not already tracked as checked recently
			const existing = newHistory.findIndex((s) => s.itemName === item.name);
			if (existing >= 0) {
				newHistory[existing] = {
					itemName: item.name,
					wasChecked: true,
					timestamp: now,
				};
			} else {
				newHistory.push({
					itemName: item.name,
					wasChecked: true,
					timestamp: now,
				});
			}
		}
	}

	return newHistory;
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

// Topological sort for dependency ordering
export function topologicalSort(items: SpecItem[], deps: Map<string, string[]>): SpecItem[] {
	const result: SpecItem[] = [];
	const visited = new Set<string>();
	const visiting = new Set<string>();

	function visit(item: SpecItem): void {
		if (visited.has(item.name)) return;
		if (visiting.has(item.name)) {
			// Circular dependency detected
			return;
		}

		visiting.add(item.name);
		const itemDeps = deps.get(item.name) || [];
		for (const depName of itemDeps) {
			const depItem = items.find((i) => i.name === depName);
			if (depItem) visit(depItem);
		}
		visiting.delete(item.name);
		visited.add(item.name);
		result.push(item);
	}

	for (const item of items) {
		if (!visited.has(item.name)) {
			visit(item);
		}
	}

	return result;
}

// Detect circular dependencies
export function detectCycles(items: SpecItem[], deps: Map<string, string[]>): string[][] {
	const cycles: string[][] = [];
	const visiting = new Set<string>();
	const path: string[] = [];

	function dfs(itemName: string): boolean {
		if (visiting.has(itemName)) {
			// Found a cycle - extract it
			const cycleStart = path.indexOf(itemName);
			if (cycleStart >= 0) {
				cycles.push([...path.slice(cycleStart), itemName]);
			}
			return true;
		}

		if (path.includes(itemName)) return false;

		visiting.add(itemName);
		path.push(itemName);

		const itemDeps = deps.get(itemName) || [];
		for (const depName of itemDeps) {
			dfs(depName);
		}

		path.pop();
		visiting.delete(itemName);
		return false;
	}

	for (const item of items) {
		dfs(item.name);
	}

	return cycles;
}

// Format circular dependency for display
export function formatCycle(cycle: string[]): string {
	return `Circular dependency: ${cycle.join(" → ")}`;
}

// Spec templates
export const SPEC_TEMPLATES = {
	api: {
		name: "API",
		description: "REST API project template",
		items: [
			"### [ ] Implement REST endpoints",
			"### [ ] Add request validation",
			"### [ ] Implement authentication",
			"### [ ] Add API documentation",
			"### [ ] Write integration tests",
		],
	},
	library: {
		name: "Library",
		description: "Open-source library template",
		items: [
			"### [ ] Define public API surface",
			"### [ ] Implement core functionality",
			"### [ ] Add TypeScript types",
			"### [ ] Write unit tests",
			"### [ ] Set up CI/CD",
		],
	},
	cli: {
		name: "CLI",
		description: "Command-line tool template",
		items: [
			"### [ ] Define CLI interface",
			"### [ ] Implement command handlers",
			"### [ ] Add help text",
			"### [ ] Write end-to-end tests",
		],
	},
	webapp: {
		name: "Web App",
		description: "Web application template",
		items: [
			"### [ ] Set up project structure",
			"### [ ] Implement routing",
			"### [ ] Create UI components",
			"### [ ] Add state management",
			"### [ ] Implement API integration",
			"### [ ] Write E2E tests",
		],
	},
};

// Get template by name
export function getTemplate(name: string): typeof SPEC_TEMPLATES.api | null {
	return (SPEC_TEMPLATES as Record<string, typeof SPEC_TEMPLATES.api>)[name] || null;
}

// Suggestion engine - pattern-based next item recommendations
export class SuggestionEngine {
	private items: SpecItem[];
	private history: RoundRecord[];

	constructor(items: SpecItem[], history: RoundRecord[]) {
		this.items = items;
		this.history = history;
	}

	// Get weighted score for an item based on confidence
	getConfidenceWeight(item: SpecItem): number {
		const confidence = calculateConfidence(item.name, this.history);
		const complexity = estimateComplexity(item);
		// Lower complexity + higher confidence = higher weight
		return (confidence / 100) * (1 / (complexity + 1));
	}

	// Suggest next item based on patterns
	suggestNext(): SpecItem | null {
		const unchecked = this.items.filter((i) => !i.checked);
		if (unchecked.length === 0) return null;

		// Score each item
		const scored = unchecked.map((item) => ({
			item,
			score: this.getConfidenceWeight(item),
		}));

		// Sort by score descending
		scored.sort((a, b) => b.score - a.score);

		return scored[0]?.item || null;
	}
}

// Milestone creation
export function createMilestone(name: string, items: SpecItem[]): Milestone {
	const completed = items.filter((i) => i.checked).length;
	return {
		name,
		items: items.map((i) => i.name),
		completed,
		total: items.length,
		progress: items.length > 0 ? Math.round((completed / items.length) * 100) : 0,
	};
}

// Get milestone progress
export function getMilestoneProgress(milestone: Milestone): number {
	return milestone.progress;
}

// Risk assessment
export function assessRisk(item: SpecItem, deps: Map<string, string[]>): RiskAssessment {
	const complexity = estimateComplexity(item);
	const dependencyCount = deps.get(item.name)?.length ?? 0;
	
	// Calculate risk score
	let score = complexity * 10 + dependencyCount * 5;
	
	// Adjust for unknown verification
	if (!item.verification) score += 20;
	
	// Cap at 100
	score = Math.min(100, score);
	
	// Determine level
	let level: "low" | "medium" | "high" | "critical" = "low";
	if (score >= 75) level = "critical";
	else if (score >= 50) level = "high";
	else if (score >= 25) level = "medium";
	
	const factors: string[] = [];
	if (complexity >= 5) factors.push("high complexity");
	if (dependencyCount > 3) factors.push("many dependencies");
	if (!item.verification) factors.push("no verification command");
	
	return { item: item.name, score, level, factors };
}

// Get risk level
export function getRiskLevel(score: number): "low" | "medium" | "high" | "critical" {
	if (score >= 75) return "critical";
	if (score >= 50) return "high";
	if (score >= 25) return "medium";
	return "low";
}

// Time estimation
export function estimateTime(item: SpecItem, history: RoundRecord[]): TimeEstimate {
	const itemHistory = history.filter((r) => r.target === item.name);
	
	if (itemHistory.length > 0) {
		const avgTurns = itemHistory.reduce((sum, r) => sum + r.turnsUsed, 0) / itemHistory.length;
		const estimatedMinutes = avgTurns * 5; // Assume 5 min per turn
		return {
			item: item.name,
			estimatedMinutes,
			confidence: Math.min(100, itemHistory.length * 20),
			basedOn: itemHistory.map((r) => `round ${r.round}`),
		};
	}
	
	// Fall back to complexity estimate
	const complexity = estimateComplexity(item);
	const estimatedMinutes = complexity * 10;
	return {
		item: item.name,
		estimatedMinutes,
		confidence: 30,
		basedOn: ["complexity estimate"],
	};
}

// Cross-reference analysis
export function findCrossReferences(items: SpecItem[]): Map<string, string[]> {
	const references = new Map<string, string[]>();
	
	for (const item of items) {
		const related: string[] = [];
		const itemWords = new Set(item.name.toLowerCase().split(/\s+/));
		
		for (const other of items) {
			if (other.name === item.name) continue;
			const otherWords = new Set(other.name.toLowerCase().split(/\s+/));
			
			// Find common words
			const common = [...itemWords].filter((w) => otherWords.has(w) && w.length > 3);
			if (common.length >= 2) {
				related.push(other.name);
			}
		}
		
		references.set(item.name, related);
	}
	
	return references;
}

// Semantic similarity
export function calculateSimilarity(item1: SpecItem, item2: SpecItem): number {
	const words1 = new Set(item1.name.toLowerCase().split(/\s+/).filter((w) => w.length > 3));
	const words2 = new Set(item2.name.toLowerCase().split(/\s+/).filter((w) => w.length > 3));
	
	const intersection = [...words1].filter((w) => words2.has(w));
	const union = new Set([...words1, ...words2]);
	
	return union.size > 0 ? (intersection.length / union.size) * 100 : 0;
}

// Review state transitions
export function transitionReviewState(
	current: ReviewState,
	action: "submit" | "approve" | "reject" | "revise"
): ReviewState {
	switch (current) {
		case ReviewState.Draft:
			return action === "submit" ? ReviewState.InReview : ReviewState.Draft;
		case ReviewState.InReview:
			return action === "approve"
				? ReviewState.Approved
				: action === "reject"
					? ReviewState.Rejected
					: ReviewState.InReview;
		case ReviewState.Rejected:
			return action === "revise" ? ReviewState.Draft : ReviewState.Rejected;
		case ReviewState.Approved:
			return ReviewState.Approved;
	}
}

// Performance profiling
export function startProfiling(item: string, turnsUsed: number): ProfileRecord {
	return {
		item,
		startTime: Date.now(),
		turnsUsed,
	};
}

// End profiling
export function endProfiling(record: ProfileRecord): ProfileRecord {
	return {
		...record,
		endTime: Date.now(),
		durationMs: Date.now() - record.startTime,
	};
}

// Impact assessment
export function assessImpact(item: SpecItem, allItems: SpecItem[]): ImpactAssessment {
	const complexity = estimateComplexity(item);
	
	// Determine scope
	let scope: "local" | "module" | "project" = "local";
	if (item.body?.includes("affects multiple")) scope = "module";
	if (item.body?.includes("breaking")) scope = "project";
	
	// Find affected items
	const affectedItems = allItems.filter((i) => {
		if (i.name === item.name) return false;
		// Items with similar keywords
		const itemWords = item.name.toLowerCase().split(/\s+/);
		const otherWords = i.name.toLowerCase().split(/\s+/);
		return itemWords.some((w) => otherWords.includes(w) && w.length > 4);
	}).map((i) => i.name);
	
	// Calculate risk
	const risk = Math.min(100, complexity * 15 + affectedItems.length * 10);
	
	return { item: item.name, scope, risk, affectedItems };
}

// Spec version creation
export function createVersion(items: SpecItem[], author?: string, message?: string): SpecVersion {
	return {
		version: `${Date.now()}`,
		timestamp: Date.now(),
		items: [...items],
		author,
		message,
	};
}

// Version diff
export function diffVersions(v1: SpecVersion, v2: SpecVersion): SpecDiff {
	return diffSpecs(v1.items, v2.items);
}

// Health check interface
export interface HealthReport {
	score: number;
	issues: HealthIssue[];
	recommendations: string[];
}

export interface HealthIssue {
	type: "missing_verification" | "too_long" | "too_short" | "vague" | "no_checkbox";
	item: string;
	severity: "error" | "warning" | "info";
}

// Health check
export function healthCheck(items: SpecItem[]): HealthReport {
	const issues: HealthIssue[] = [];
	
	for (const item of items) {
		// Missing verification
		if (!item.verification) {
			issues.push({
				type: "missing_verification",
				item: item.name,
				severity: "info",
			});
		}
		
		// Name too long
		if (item.name.length > 150) {
			issues.push({
				type: "too_long",
				item: item.name,
				severity: "warning",
			});
		}
		
		// Name too short
		if (item.name.length < 10) {
			issues.push({
				type: "too_short",
				item: item.name,
				severity: "warning",
			});
		}
		
		// Vague language
		const vagueWords = ["fix", "improve", "update", "change", "stuff", "things"];
		const hasVague = vagueWords.some((w) => item.name.toLowerCase().includes(w));
		if (hasVague) {
			issues.push({
				type: "vague",
				item: item.name,
				severity: "info",
			});
		}
	}
	
	// Calculate score
	const baseScore = 100;
	const deductions = issues.reduce((sum, issue) => {
		return sum + (issue.severity === "error" ? 20 : issue.severity === "warning" ? 10 : 5);
	}, 0);
	const score = Math.max(0, baseScore - deductions);
	
	// Recommendations
	const recommendations: string[] = [];
	if (issues.some((i) => i.type === "missing_verification")) {
		recommendations.push("Add verification commands to items for better testing");
	}
	if (issues.some((i) => i.type === "vague")) {
		recommendations.push("Replace vague words with specific actions");
	}
	if (issues.some((i) => i.type === "too_long")) {
		recommendations.push("Break long item names into smaller sub-items");
	}
	
	return { score, issues, recommendations };
}

// Detect health issues
export function detectHealthIssues(items: SpecItem[]): HealthIssue[] {
	return healthCheck(items).issues;
}

// Format health report
export function formatHealthReport(report: HealthReport): string[] {
	const lines: string[] = [];
	lines.push(`## Health Score: ${report.score}/100`);
	
	if (report.issues.length > 0) {
		lines.push("\n### Issues");
		for (const issue of report.issues) {
			const icon = issue.severity === "error" ? "❌" : issue.severity === "warning" ? "⚠️" : "ℹ️";
			lines.push(`${icon} [${issue.severity}] ${issue.item}: ${issue.type}`);
		}
	}
	
	if (report.recommendations.length > 0) {
		lines.push("\n### Recommendations");
		for (const rec of report.recommendations) {
			lines.push(`- ${rec}`);
		}
	}
	
	return lines;
}



// Apply template to spec file
export function applyTemplate(template: typeof SPEC_TEMPLATES.api, specPath: string, content: string): string {
	const header = `# ${template.name} Project\n\n${template.description}\n\n## Requirements\n\n`;
	const items = template.items.join("\n") + "\n";
	return header + items + "\n" + content;
}

// Lint spec item for quality
export function lintSpecItem(item: SpecItem): LintResult[] {
	const results: LintResult[] = [];

	// Check for verification command
	if (!item.verification) {
		results.push({
			item: item.name,
			severity: "info",
			message: "No verification command specified",
			suggestion: "Consider adding 'Run: `command`' to help verify completion",
		});
	}

	// Check name length
	if (item.name.length < 10) {
		results.push({
			item: item.name,
			severity: "warning",
			message: "Item name is very short",
			suggestion: "Consider a more descriptive name",
		});
	}

	if (item.name.length > 100) {
		results.push({
			item: item.name,
			severity: "warning",
			message: "Item name is very long",
			suggestion: "Consider breaking into smaller items",
		});
	}

	// Check for vague language
	const vaguePatterns = ["fix", "improve", "update", "change"];
	for (const pattern of vaguePatterns) {
		if (item.name.toLowerCase().includes(pattern) && !item.verification) {
			results.push({
				item: item.name,
				severity: "warning",
				message: `Vague action word '${pattern}' without verification`,
				suggestion: "Add a verification command to make the requirement testable",
			});
		}
	}

	return results;
}


