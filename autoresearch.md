# Autoresearch: Evolutionary Reconciler

## Objective
Transform respec from a simple spec-driven task queue into an **evolutionary reconciler** that:
1. Learns from past rounds (turn efficiency, failure patterns)
2. Adapts strategy based on item complexity
3. Provides smarter prompts that guide the agent better
4. Detects dependencies between spec items
5. Offers parallel execution for independent items

## Metrics
- **Primary**: `spec_coverage` (% of spec items verified per session) — higher is better
- **Secondary**: `turn_efficiency` (turns per completed item), `stall_rate` (% of items needing 3+ retries), `prompt_quality` (subjective score 1-10)

## How to Run
```bash
./autoresearch.sh
```
Outputs structured metrics:
- `METRIC spec_coverage=X` — percentage of spec items checked off
- `METRIC turn_efficiency=X` — average turns per completed item
- `METRIC stall_rate=X` — percentage of items that stalled
- `METRIC prompt_quality=X` — heuristic score for prompt effectiveness

## Files in Scope
- `src/loop-controller.ts` — core reconciliation loop, prompt building
- `src/spec-parser.ts` — spec parsing, item analysis
- `src/types.ts` — state and item types
- `src/visual.ts` — UI feedback
- `src/commands.ts` — command handlers
- `src/store.ts` — state persistence

## Off Limits
- No changes to the Pi extension API surface
- No new external dependencies
- Cannot modify the spec format (must stay `[x]`/`[ ]` compatible)

## Constraints
- TypeScript must compile cleanly
- Extension must still load in Pi
- All existing commands must continue to work

## What's Been Tried

### Baseline (v0.1.1)
- Simple sequential loop: pick first unchecked, work, mark done
- Basic escape valve (3 failures → blocked)
- No learning between rounds

### Ideas to Try
1. **Smart item ordering** — complexity scoring, dependencies
2. **Adaptive prompts** — include round history, failure context
3. **Parallel item batching** — independent items together
4. **Learned turn budgets** — per-item-type turn limits
5. **Dependency detection** — infer which items must come first
6. **Better escape valve** — distinguish "impossible" from "needs clarification"
7. **Hints from failures** — analyze what failed and provide targeted hints
