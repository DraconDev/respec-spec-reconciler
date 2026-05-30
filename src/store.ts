// State store for respec — in-memory + pi.appendEntry persistence

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import type { RespecState, RoundRecord, SpecItem } from "./types.js";

const STATE_CUSTOM_TYPE = "respec-state";
const ROUND_CUSTOM_TYPE = "respec-round";

// In-memory store (per-extension-instance)
let store: RespecState | null = null;
let pi: ExtensionAPI | null = null;

export function initStore(api: ExtensionAPI): void {
	pi = api;
}

export function getStore(): RespecState | null {
	return store;
}

export function setStore(state: RespecState): void {
	store = state;
	persistState(state);
}

export function clearStore(): void {
	store = null;
}

// Default state factory
export function createDefaultState(specPath: string, items?: SpecItem[]): RespecState {
	return {
		specKey: specPath,
		status: "idle",
		currentRound: 0,
		maxRounds: 50,
		turnsThisRound: 0,
		maxTurnsPerRound: 15,
		currentTarget: undefined,
		items: items ?? [],
		failureCounts: {},
		roundHistory: [],
		userInterrupted: false,
	};
}

// Persist state to session via appendEntry
function persistState(state: RespecState): void {
	if (!pi) return;
	pi.appendEntry(STATE_CUSTOM_TYPE, state);
}

// Restore state from session entries
export function restoreState(
	entries: Array<{ type: string; data?: unknown }>
): RespecState | null {
	for (const entry of entries) {
		if (entry.type === STATE_CUSTOM_TYPE && entry.data && typeof entry.data === "object") {
			return entry.data as RespecState;
		}
	}
	return null;
}

// Append a round record to session
export function appendRoundRecord(record: RoundRecord): void {
	if (!pi) return;
	pi.appendEntry(ROUND_CUSTOM_TYPE, record);
}

// Restore round records from session entries
export function restoreRoundRecords(