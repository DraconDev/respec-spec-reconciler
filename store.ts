// State store for respec - in-memory + pi.appendEntry persistence

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import type { RespecState, RoundRecord, QueueConfig } from "./types.js";

const STORAGE_KEY = "respec-state";
const STORAGE_PREFIX = "respec-";

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
export function createDefaultState(specPath: string): RespecState {
	return {
		specKey: specPath,
		status: "idle",
		currentRound: 0,
		maxRounds: 50,
		budgetPerRound: 15,
		turnsThisRound: 0,
		invariantFailures: new Map(),
		roundHistory: [],
		contractFingerprints: {
			specMtime: 0,
			verifyMtime: 0,
		},
		queueConfig: {
			displayMode: "compact",
			promptMaxItems: 3,
			widgetMaxItems: 5,
		},
		userInterrupted: false,
	};
}

// Persist state to session via appendEntry
function persistState(state: RespecState): void {
	if (!pi) return;

	// Serialize Map to array for JSON
	const serialized = {
		...state,
		invariantFailures: Array.from(state.invariantFailures.entries()),
	};

	pi.appendEntry(STORAGE_KEY, serialized);
}

// Restore state from session entries
export function restoreState(entries: Array<{ type: string; data?: unknown }>): RespecState | null {
	for (const entry of entries) {
		if (entry.type === STORAGE_KEY && entry.data && typeof entry.data === "object") {
			const data = entry.data as Record<string, unknown>;
			// Deserialize array back to Map
			const invFailures = new Map<string, number>();
			if (Array.isArray(data.invariantFailures)) {
				for (const [key, value] of data.invariantFailures as [string, number][]) {
					invFailures.set(key, value);
				}
			}

			return {
				...data,
				invariantFailures: invFailures,
			} as RespecState;
		}
	}
	return null;
}

// Append a round record to session
export function appendRoundRecord(record: RoundRecord): void {
	if (!pi) return;
	pi.appendEntry(`${STORAGE_PREFIX}round`, record);
}

// Restore round records from session entries
export function restoreRoundRecords(entries: Array<{ type: string; data?: unknown }>): RoundRecord[] {
	const records: RoundRecord[] = [];
	for (const entry of entries) {
		if (entry.type === `${STORAGE_PREFIX}round` && entry.data) {
			records.push(entry.data as RoundRecord);
		}
	}
	return records.sort((a, b) => a.round - b.round);
}