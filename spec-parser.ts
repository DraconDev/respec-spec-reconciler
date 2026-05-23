// Parse SPEC.md to extract invariant headings

import { readFileSync } from "fs";
import type { InvariantResult } from "./types.js";

export interface ParsedSpec {
	path: string;
	invariants: InvariantInfo[];
}

export interface InvariantInfo {
	name: string;
	index: number;
	lineNumber: number;
}

// Parse the SPEC.md file and extract invariant headings
export function parseSpec(specPath: string): ParsedSpec | null {
	try {
		const content = readFileSync(specPath, "utf-8");
		const lines = content.split("\n");
		const invariants: InvariantInfo[] = [];

		let currentSection = "";
		let inInvariantsSection = false;

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];

			// Track ## Invariants sections
			if (line.startsWith("## ")) {
				currentSection = line.slice(3).toLowerCase();
				inInvariantsSection = currentSection === "invariants";
				continue;
			}

			// Look for ### N. Invariant name patterns
			const invariantMatch = line.match(/^### (\d+)\.\s+(.+)/);
			if (invariantMatch && inInvariantsSection) {
				invariants.push({
					index: parseInt(invariantMatch[1]!, 10),
					name: invariantMatch[2]!.trim(),
					lineNumber: i + 1,
				});
			}
		}

		return {
			path: specPath,
			invariants,
		};
	} catch {
		return null;
	}
}

// Parse verifier output to extract per-invariant results
export function parseVerifierOutput(output: string, invariants: InvariantInfo[]): InvariantResult[] {
	const results: InvariantResult[] = [];

	for (const invariant of invariants) {
		// Look for PASS/FAIL markers for this invariant
		const escapedName = invariant.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const passMatch = new RegExp(`--- Invariant ${invariant.index}:.*?---\\nPASS:?\\s*(.*)`, "i").exec(output);
		const failMatch = new RegExp(`--- Invariant ${invariant.index}:.*?---\\nFAIL:?\\s*(.*)`, "i").exec(output);

		let passed = false;
		let outputText = "";

		if (passMatch) {
			passed = true;
			outputText = passMatch[1] || "passed";
		} else if (failMatch) {
			passed = false;
			outputText = failMatch[1] || "failed";
		} else {
			// Check if any output exists for this invariant
			const idxPattern = `--- Invariant ${invariant.index}:`;
			const idx = output.indexOf(idxPattern);
			if (idx !== -1) {
				// Get text after the invariant header up to the next --- or end
				const endIdx = output.indexOf("\n---", idx + 1);
				outputText = output.slice(idx, endIdx === -1 ? undefined : endIdx);
				passed = outputText.includes("PASS");
			} else {
				outputText = "unknown";
			}
		}

		results.push({
			name: invariant.name,
			index: invariant.index,
			passed,
			output: outputText,
		});
	}

	return results;
}