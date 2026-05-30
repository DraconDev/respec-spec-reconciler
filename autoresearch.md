# Autoresearch: Evolutionary Reconciler

## Objective
Transform respec from a simple spec-driven task queue into an **evolutionary reconciler** that:
1. ✅ Learns from past rounds (turn efficiency, failure patterns)
2. ✅ Adapts strategy based on item complexity
3. ✅ Provides smarter prompts that guide the agent better
4. ✅ Detects dependencies between spec items
5. ✅ Offers parallel execution for independent items
6. ✅ Detects rollbacks and regressions
7. ✅ Shows spec diffs when items change
8. ✅ Calculates confidence scores based on history
9. ✅ Supports checkpoints for crash recovery

## Metrics
- **Primary**: `spec_coverage` (% of spec items verified per session) — higher is better
- **Secondary**: `turn_efficiency` (turns per completed item), `stall_rate` (% of items needing 3+ retries), `prompt_quality` (heuristic score 1-10)

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
- `src/loop-controller.ts` — core reconciliation loop, prompt building, smart target selection
- `src/spec-parser.ts` — spec parsing, complexity scoring, dependency inference, learning
- `src/types.ts` — state and item types including learned budgets and batch mode
- `src/visual.ts` — UI feedback with efficiency metrics and hierarchical display
- `src/commands.ts` — command handlers including batch mode
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

### v0.2.0 — Evolutionary Features (20 iterations)

1. **Adaptive prompts with complexity scoring** ✅
   - `estimateComplexity()` — analyzes item name/body for complexity
   - Provides complexity-based turn budget suggestions

2. **Failure pattern analysis** ✅
   - `getFailureHints()` — generates contextual hints from history
   - High-turn, quick-fail, diminishing-returns detection

3. **Dependency inference** ✅
   - `inferDependencies()` — auto-detects compile→test→api ordering
   - `findReadyItems()` — returns items with satisfied dependencies

4. **Smart target selection** ✅
   - `findSmartTarget()` — picks easiest ready item first
   - Falls back to sequential for items with unmet dependencies

5. **Learned turn budgets** ✅
   - `learnTurnBudget()` — tracks turns per category
   - `getSuggestedBudget()` — uses learned data when available
   - 10 categories: compile, test, api, config, docs, refactor, security, perf, setup, repo

6. **Batch mode for parallel items** ✅
   - `/respec batch` — toggle batch mode
   - `/respec batch <N>` — set batch size 2-5
   - `buildBatchPrompt()` — creates prompts for multiple items

7. **Hierarchical spec support** ✅
   - `parent` and `depth` fields on SpecItem
   - Section hierarchy tracking in parser
   - Hierarchical display in visual module

8. **Enhanced escape valve** ✅
   - `analyzeFailure()` — generates actionable suggestions
   - Pattern-specific recovery guidance

9. **Rich visual feedback** ✅
   - Success rate, average turns per item
   - Batch mode indicator
   - Hierarchical item display

10. **Verification command suggestions** ✅
    - `suggestVerification()` — auto-suggests commands based on 14 patterns
    - Compilation, testing, API, docs, security, performance patterns

11. **Rollback detection** ✅
    - `detectRollbacks()` — alerts when previously checked items regress
    - `updateSpecHistory()` — tracks checked state across sessions
    - Warning notification when regression detected

12. **Spec diffing** ✅
    - `diffSpecs()` — compares old and new spec items
    - `formatDiff()` — formats diff for display
    - Change notifications on spec modification

13. **Confidence scoring** ✅
    - `calculateConfidence()` — rates confidence based on history
    - `getConfidenceLabel()` — converts to high/medium/low
    - Displayed in prompts

14. **Checkpointing** ✅
    - `/respec checkpoint` — saves progress mid-item
    - Checkpoint indicator in status display
    - Resume support for crash recovery

15. **Checkpoint status display** ✅
    - Shows checkpoint info in active widget
    - Tracks round and turns used

### Baseline (v0.1.1)
- Simple sequential loop: pick first unchecked, work, mark done
- Basic escape valve (3 failures → blocked)
- No learning between rounds

## Ideas to Try
1. Multi-spec composition — support for multiple SPEC.md files
2. Team sync — share learned budgets via git
3. Interactive spec editing — edit SPEC.md via natural language commands
4. Spec analytics — track which item types take longest, common failure patterns
5. IDE integration — VS Code extension for spec editing and status
6. CI/CD integration — run /respec in CI to enforce spec compliance
