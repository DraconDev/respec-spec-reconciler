// Delta engine - build queue from verifier output + detect changes

import type { RespecState, QueueItem, InvariantResult } from "./types.js";
import { accessSync } from "fs";

export function buildQueue(results: InvariantResult[], currentTarget?: string): QueueItem[] {
	return results.map((result) => {
		let status: QueueItem["status"];

		if (result.passed) {
			status = "passed";
		} else if (currentTarget && result.name === currentTarget) {
			status = "current";
		} else {
			status = "failing";
		}

		return {
			name: result.name,
			index: result.index,
			status,
		};
	});
}

export function detectContractChanges(
	specPath: string,
	verifyPath: string
): { specChanged: boolean; verifyChanged: boolean; reason?: string } {
	try {
		const specMtime = getMtime(specPath);
		const verifyMtime = getMtime(verifyPath);

		return {
			specChanged: false, // Will be checked against stored fingerprints
			verifyChanged: false,
		};
	} catch {
		return {
			specChanged: false,
			verifyChanged: false,
			reason: "Could not stat contract files",
		};
	}
}

function getMtime(path: string): number {
	try {
		const stats = accessSync(path, 0o644);
		// accessSync doesn't return stats, use a workaround
		const { mtimeMs } = require("fs").statSync(path);
		return mtimeMs;
	} catch {
		return 0;
	}
}

// Check if state needs queue regeneration (contract files changed)
export function needsRegeneration(
	state: RespecState,
	specPath: string,
	verifyPath: string
): { needed: boolean; reason?: string } {
	try {
		const specMtime = getMtime(specPath);
		const verifyMtime = getMtime(verifyPath);

		if (specMtime !== state.contractFingerprints.specMtime) {
			return {
				needed: true,
				reason: "SPEC.md was modified",
			};
		}

		if (verifyMtime !== state.contractFingerprints.verifyMtime) {
			return {
				needed: true,
				reason: "verify-spec.sh was modified",
			};
		}

		return { needed: false };
	} catch {
		return {
			needed: false,
			reason: "Could not stat contract files",
		};
	}
}

// Get next failing invariant from queue
export function getNextTarget(queue: QueueItem[], state: RespecState): string | null {
	for (const item of queue) {
		if (item.status === "failing" || item.status === "current") {
			// Check if this invariant has been blocked by escape valve
			const failures = state.invariantFailures.get(item.name) ?? 0;
			if (failures >= 3) {
				continue; // Skip blocked invariants
			}
			return item.name;
		}
	}
	return null;
}

// Detect no-progress (spin guard)
export function detectNoProgress(
	currentRound: number,
	roundHistory: RespecState["roundHistory"]
): boolean {
	if (currentRound < 2) return false;

	// Look at last two rounds
	const lastTwo = roundHistory.slice(-2);
	if (lastTwo.length < 2) return false;

	// Both rounds failed and used minimal turns (no real work happened)
	return lastTwo.every(
		(r) =>
			!r.pass &&
			r.turnsUsed <= 2 &&
			(!r.verifierOutput || r.verifierOutput.includes("FAIL"))
	);
}

// Check escape valve conditions
export function checkEscapeValve(
	invariantName: string,
	state: RespecState
): { triggered: boolean; type?: "stall" | "max-rounds" | "spin-guard"; detail?: string } {
	// Check 3-strike stall
	const failures = state.invariantFailures.get(invariantName) ?? 0;
	if (failures >= 3) {
		return {
			triggered: true,
			type: "stall",
			detail: `Invariant "${invariantName}" failed ${failures} consecutive rounds`,
		};
	}

	// Check max rounds
	if (state.currentRound >= state.maxRounds) {
		return {
			triggered: true,
			type: "max-rounds",
			detail: `Reached max rounds (${state.maxRounds})`,
		};
	}

	// Check spin guard
	if (detectNoProgress(state.currentRound, state.roundHistory)) {
		return {
			triggered: true,
			type: "spin-guard",
			detail: "No progress detected in last 2 rounds",
		};
	}

	return { triggered: false };
}

// Format the repair prompt for an invariant
export function formatRepairPrompt(
	invariantName: string,
	index: number,
	verifierOutput: string,
	specPath: string
): string {
	return `## Reconcile Invariant #${index}: ${invariantName}

The verifier reports this invariant is NOT satisfied:

\`\`\`
${verifierOutput}
\`\`\`

Run the verification script to reproduce the failure.
Make the minimal code change that satisfies this invariant.

Do NOT modify SPEC.md or the verify script unless you are fixing a typo or bug in them.
Do NOT add unrelated features.
Run the verify script before finishing.

Spec: ${specPath}
`;
}