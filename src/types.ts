// Core type definitions for respec

export interface RespecState {
	specKey: string; // Absolute path to SPEC.md
	status: "idle" | "active" | "paused" | "done" | "blocked";
	focusedSpecKey?: string; // Branch-local focused spec for continuation
	currentRound: number;
	maxRounds: number;
	budgetPerRound: number;
	turnsThisRound: number;
	currentTarget?: string; // Name of current invariant being fixed
	invariantFailures: Map<string, number>; // invariant name → consecutive failure count
	escapeValve?: {
		type: "stall" | "max-rounds" | "spin-guard";
		invariant: string;
		detail: string;
		blockedAt: number;
	};
	roundHistory: RoundRecord[];
	lastVerifierOutput?: string;
	lastVerifierExitCode?: number;
	contractFingerprints: {
		specMtime: number;
		verifyMtime: number;
	};
	queueConfig: QueueConfig;
	userInterrupted: boolean;
}

export interface RoundRecord {
	round: number;
	target: string;
	pass: boolean;
	turnsUsed: number;
	timestamp: number;
	verifierOutput?: string;
}

export interface QueueConfig {
	displayMode: "compact" | "full" | "off";
	promptMaxItems: number;
	widgetMaxItems: number;
}

export interface InvariantResult {
	name: string;
	index: number;
	passed: boolean;
	output?: string;
}

export interface QueueItem {
	name: string;
	index: number;
	status: "passed" | "failing" | "unknown" | "current" | "blocked";
}

export interface VerifierOutput {
	exitCode: number;
	stdout: string;
	stderr: string;
	results: InvariantResult[];
}