// Core type definitions for respec — spec-as-source-of-truth model

// A single requirement in SPEC.md
export interface SpecItem {
	name: string; // The requirement description
	checked: boolean; // [x] = done, [ ] = not done
	index: number; // Position in the spec
	verification?: string; // How to verify (e.g., "npm test", "curl localhost:3000")
	body?: string; // Supporting text under the item
	parent?: string; // Parent section name for hierarchical specs
	depth?: number; // Nesting depth (0 = top level)
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

// Learned turn budget by category
export interface TurnBudget {
	category: string; // e.g., "compile", "test", "api"
	totalTurns: number; // Sum of turns used
	count: number; // Number of items completed
	avgTurns: number; // Computed average
}

// Spec change record for rollback detection
export interface SpecSnapshot {
	itemName: string;
	wasChecked: boolean;
	timestamp: number;
}

// Checkpoint for saving progress mid-item
export interface Checkpoint {
	itemName: string;
	round: number;
	turnsUsed: number;
	timestamp: number;
	notes?: string; // Optional agent notes about progress
}

// A spec file with its items
export interface SpecFile {
	path: string; // Absolute path to the spec file
	items: SpecItem[]; // Parsed items
	lastMtime?: number; // Last modification time
}

// Dependency graph for item ordering
export interface DependencyGraph {
	items: Map<string, string[]>; // item name → dependencies
	inDegree: Map<string, number>; // item name → number of dependencies
}

// Lint result for spec items
export interface LintResult {
	item: string;
	severity: "error" | "warning" | "info";
	message: string;
	suggestion?: string;
}

// Spec template definition
export interface SpecTemplate {
	name: string;
	description: string;
	items: string[]; // Pre-defined spec items
}

// Suggestion engine for next-item recommendations
export interface SuggestionEngine {
	getSuggestion(items: SpecItem[], history: RoundRecord[]): SpecItem | null;
	getConfidenceWeight(item: SpecItem): number;
}

// Milestone for grouping items
export interface Milestone {
	name: string;
	items: string[]; // item names
	completed: number;
	total: number;
	progress: number; // percentage
}

// Risk assessment for items
export interface RiskAssessment {
	item: string;
	score: number; // 0-100
	level: "low" | "medium" | "high" | "critical";
	factors: string[];
}

// Time estimate for items
export interface TimeEstimate {
	item: string;
	estimatedMinutes: number;
	confidence: number; // 0-100
	basedOn: string[]; // similar items used
}

// Profile record for timing
export interface ProfileRecord {
	item: string;
	startTime: number;
	endTime?: number;
	durationMs?: number;
	turnsUsed: number;
}

// Resource usage tracking
export interface ResourceUsage {
	item: string;
	cpuMs?: number;
	memoryMb?: number;
	timestamp: number;
}

// Specification version for history
export interface SpecVersion {
	version: string;
	timestamp: number;
	items: SpecItem[];
	author?: string;
	message?: string;
}

// Review state machine
export enum ReviewState {
	Draft = "draft",
	InReview = "in_review",
	Approved = "approved",
	Rejected = "rejected",
}

// Change impact assessment
export interface ImpactAssessment {
	item: string;
	scope: "local" | "module" | "project";
	risk: number; // 0-100
	affectedItems: string[];
}

// Test hook for integration
export interface TestHook {
	item: string;
	testPattern: string; // glob pattern
	hookType: "before" | "after" | "around";
	action: string; // code to execute
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
	learnedBudgets: TurnBudget[]; // Learned turn budgets by category
	specHistory: SpecSnapshot[]; // Previous spec snapshots for rollback detection
	checkpoint?: Checkpoint; // Current checkpoint for resume
	multiSpec: boolean; // Enable multi-spec composition
	specFiles: SpecFile[]; // All spec files being tracked
}
