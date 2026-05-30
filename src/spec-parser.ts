// Parse SPEC.md — extract requirements with [x]/[ ] checkboxes
// Supports headings ### [x] Name or list items - [x] Name

import { readFileSync } from "fs";
import type { SpecItem } from "./types.js";

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
