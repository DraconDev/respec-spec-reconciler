// Core type definitions for respec — spec-as-source-of-truth model

// A single requirement in SPEC.md
export interface SpecItem {
	name: string; // The requirement description
	checked: boolean; // [x] = done, [ ] = not done
	index: number; // Position in the spec
	verification?: string; // How to verify (e.g., "npm test", "curl localhost:3000")
	body?: string; // Supporting text under the item
}

// Round of reconciliation
export interface RoundRecord {
	round: number;
	target: string; // Which item was worked on
	pass: boolean; // Was the item checked off?
	checkedCount: number; // How many items done after this round
	turnsUsed: number;
	timestamp: number;
}

// Escape valve when stuck
export interface EscapeValve {
	type: "stall" | "max-rounds" | "spin-guard";
	item: string;
	detail: string;
	blockedAt: number;
}

// Full reconciliation state
export interface RespecState {
	specKey: string; // Absolute path to SPEC.md
	status: "idle" | "active" | "paused" | "done" | "blocked";
	items: SpecItem[]; // Current spec items
	currentTarget?: SpecItem; // Item currently being worked on
	currentBatch?: SpecItem[]; // Items being worked on in parallel (batch mode)
	currentRound: number;
	maxRounds: number;
	turnsThisRound: number;
	maxTurnsPerRound: number;
	failureCounts: Record<string, number>; // item name → consecutive failures
	roundHistory: RoundRecord[];
	escapeValve?: EscapeValve;
	userInterrupted: boolean;
	lastSpecMtime?: number;
	focusedSpecKey?: string;
	batchMode: boolean; // Enable parallel item processing
	batchSize: number; // Max items to batch together
}
