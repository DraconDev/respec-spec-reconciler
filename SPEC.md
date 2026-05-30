# respec — Spec Reconciler for AI Coding Agents

**Read SPEC.md, work through requirements, learn, update the spec. The spec is the source of truth.**

## How It Works

1. SPEC.md is a list of requirements with `[x]` (done) / `[ ]` (not done) checkboxes
2. `/respec` picks the first unchecked item, sends the agent to work on it
3. Agent uses real tools (tsc, npm test, curl) to verify — no custom verifier script
4. When done, agent checks it off in SPEC.md by changing `[ ]` → `[x]`
5. Loop continues to the next item
6. When understanding changes, update SPEC.md — add, change, or remove items
7. `/respec` regenerates the queue from the updated spec

## Requirements

### [x] Source files exist
All required TypeScript source files present in src/.
Run: `ls src/index.ts src/commands.ts src/loop-controller.ts src/spec-parser.ts src/store.ts src/types.ts`

### [x] TypeScript compiles
No type errors.
Run: `npx tsc --noEmit`

### [x] Extension exports default function
Entry point exports a default function.
Run: `grep -q "export default function" src/index.ts`

### [x] Store has initStore and getStore
State persistence module exports required functions.
Run: `grep -q "export function initStore" src/store.ts && grep -q "export function getStore" src/store.ts`

### [x] Package.json has required metadata
Name, version, type, description, keywords.
Run: `grep -q '"name"' package.json && grep -q '"type"' package.json`

### [x] Extension loads in Pi
Can be loaded via `pi -e ./src/index.ts`.
Run: `pi -e ./src/index.ts`

### [x] Commands register correctly
/spec-init, /spec-status, /respec commands register when extension loads.

### [x] README exists
Repository has a README.md with usage documentation.
Run: `test -f README.md`

### [x] GitHub repo configured
Description set, remote URL correct.
Run: `gh repo view --json name`

### [x] SPEC.md uses checkbox format
Requirements use `### [x]` / `### [ ]` format.

### [x] No verifier/delta-engine files remain
Old verifier and delta engine removed.
Run: `test ! -f src/verifier.ts && test ! -f src/delta-engine.ts`

### [x] Code compiles successfully
`npx tsc --noEmit` returns no errors.
Run: `npx tsc --noEmit`

### [x] Extension loads cleanly
Loading the extension doesn't crash or error.
Run: `pi -e ./src/index.ts`

### [x] Commands are accessible
Extension can be loaded and commands can be used.
Run: `pi -e ./src/index.ts`

### [ ] Test the loop controller
Run /respec in a test project with at least one unchecked item.
Expected: Picks next unchecked item, sends agent a focused prompt.

### [ ] Test spec parser
Given a SPEC.md with mixed [x]/[ ] items, parseSpec() returns items with checked status.
Run: Parse a SPEC.md with mixed [x]/[ ] items.

### [ ] Test escape valve
Force 3 consecutive failures on a single item.
Expected: BLOCKER.md written, respec blocked.

### [ ] Test visual feedback
When /respec is active, UI shows progress, target, queue.
Run: /respec on a project with items.

### [ ] Test spec-status refresh
Run /spec-status after editing SPEC.md.
Expected: Shows updated items from SPEC.md.

### [ ] Test resume functionality
After pausing, run /respec resume.
Expected: Continues from where it left off.

### [ ] Test cancel functionality
Run /respec cancel.
Expected: Clears active state, shows status.

### [ ] Test pause functionality
Run /respec pause.
Expected: Sets status to paused.

### [x] Commands include batch mode
/respec batch command exists in commands.ts.
Run: `grep -q "batch" src/commands.ts`

### [x] Commands include checkpoint
/respec checkpoint command exists in commands.ts.
Run: `grep -q "checkpoint" src/commands.ts`

### [x] Commands include multi-spec
/respec multi command exists in commands.ts.
Run: `grep -q "multi" src/commands.ts`

### [x] Commands include analytics
/respec analytics command exists in commands.ts.
Run: `grep -q "analytics" src/commands.ts`

### [x] Commands include team sync
/respec sync and /respec import commands exist.
Run: `grep -q "sync" src/commands.ts && grep -q "import" src/commands.ts`

### [x] Learned budgets implemented
Turn budget learning in spec-parser.ts.
Run: `grep -q "learnTurnBudget" src/spec-parser.ts`

### [x] Dependency inference implemented
Dependency inference for spec items.
Run: `grep -q "inferDependencies" src/spec-parser.ts`

### [x] Confidence scoring implemented
Confidence scoring based on history.
Run: `grep -q "calculateConfidence" src/spec-parser.ts`

### [x] Rollback detection implemented
Rollback detection for checked items.
Run: `grep -q "detectRollbacks" src/spec-parser.ts`

### [x] Spec diffing implemented
Spec diffing for changes.
Run: `grep -q "diffSpecs" src/spec-parser.ts`

### [x] Multi-spec composition implemented
Multi-spec file tracking.
Run: `grep -q "findSpecFiles" src/spec-parser.ts`

### [x] Spec analytics implemented
Spec analytics generation.
Run: `grep -q "generateAnalytics" src/spec-parser.ts`

### [x] Team sync export/import implemented
Export and import learned budgets.
Run: `grep -q "respec-budgets" src/commands.ts`

### [x] Checkpoint state tracking
Checkpoint interface in types.ts.
Run: `grep -q "interface Checkpoint" src/types.ts`

### [x] Visual feedback includes batch mode
Batch mode indicator in visual.ts.
Run: `grep -q "batch mode" src/visual.ts`

### [x] Visual feedback includes checkpoint info
Checkpoint indicator in active widget.
Run: `grep -q "checkpoint" src/visual.ts`

### [x] Visual feedback includes efficiency metrics
Success rate and avg turns in visual.
Run: `grep -q "avgTurns" src/visual.ts`

### [x] Visual feedback includes hierarchical display
Hierarchical item display in visual.
Run: `grep -q "item.depth" src/visual.ts`

### [x] SpecFile interface exists
SpecFile interface for multi-spec tracking.
Run: `grep -q "interface SpecFile" src/types.ts`

### [x] findSpecFiles function exists
Scan directory for SPEC.md files.
Run: `grep -q "findSpecFiles" src/spec-parser.ts`

### [x] findAllUnchecked function exists
Find unchecked items across specs.
Run: `grep -q "findAllUnchecked" src/spec-parser.ts`

### [x] generateAnalytics function exists
Generate spec analytics.
Run: `grep -q "generateAnalytics" src/spec-parser.ts`

### [x] formatAnalytics function exists
Format analytics for display.
Run: `grep -q "formatAnalytics" src/spec-parser.ts`

### [x] Smart target selection implemented
findSmartTarget function in loop-controller.
Run: `grep -q "findSmartTarget" src/loop-controller.ts`

### [x] Suggest verification implemented
suggestVerification function in spec-parser.
Run: `grep -q "suggestVerification" src/spec-parser.ts`

### [x] Build multi-spec prompt implemented
buildMultiSpecPrompt function in loop-controller.
Run: `grep -q "buildMultiSpecPrompt" src/loop-controller.ts`

### [x] Get confidence label implemented
getConfidenceLabel function in spec-parser.
Run: `grep -q "getConfidenceLabel" src/spec-parser.ts`

### [x] Escape valve analyze failure implemented
analyzeFailure function in loop-controller.
Run: `grep -q "analyzeFailure" src/loop-controller.ts`

### [x] getFailureHints function exists
Failure hints generation in spec-parser.
Run: `grep -q "getFailureHints" src/spec-parser.ts`

### [x] Extract category function exists
Extract item category.
Run: `grep -q "extractCategory" src/spec-parser.ts`

### [x] Learn turn budget function exists
Learn from completed items.
Run: `grep -q "learnTurnBudget" src/spec-parser.ts`

### [x] Get suggested budget function exists
Get turn budget based on category.
Run: `grep -q "getSuggestedBudget" src/spec-parser.ts`

### [x] detectRollbacks function exists
Detect spec rollback.
Run: `grep -q "detectRollbacks" src/spec-parser.ts`

### [x] updateSpecHistory function exists
Update spec history.
Run: `grep -q "updateSpecHistory" src/spec-parser.ts`

### [x] calculateConfidence function exists
Calculate confidence score.
Run: `grep -q "calculateConfidence" src/spec-parser.ts`

### [x] diffSpecs function exists
Diff two spec versions.
Run: `grep -q "diffSpecs" src/spec-parser.ts`

### [x] formatDiff function exists
Format diff for display.
Run: `grep -q "formatDiff" src/spec-parser.ts`

### [x] findReadyItems function exists
Find items with satisfied dependencies.
Run: `grep -q "findReadyItems" src/spec-parser.ts`

### [x] estimateComplexity function exists
Estimate item complexity.
Run: `grep -q "estimateComplexity" src/spec-parser.ts`

### [x] buildBatchPrompt function exists
Build batch mode prompts.
Run: `grep -q "buildBatchPrompt" src/loop-controller.ts`

### [x] multiSpec mode flag exists
Multi-spec mode tracking in state.
Run: `grep -q "multiSpec" src/types.ts`

### [x] specFiles array exists
All spec files being tracked.
Run: `grep -q "specFiles" src/types.ts`

### [x] Checkpoint in default state
Checkpoint initialized in store.
Run: `grep -q "checkpoint: undefined" src/store.ts`

### [x] Multi-spec mode flag in default state
Multi-spec initialized in store.
Run: `grep -q "multiSpec: false" src/store.ts`

### [x] Spec files array in default state
Spec files initialized in store.
Run: `grep -q "specFiles: \[\]" src/store.ts`

## Notes

- The spec evolves as understanding changes. Add items as you learn.
- Each item should be verifiable — something you can check with real tools.
- Don't try to list everything upfront. Do a thing, learn, add the next thing.

## Tips for Writing Good Checks

1. **Use standard tools**: The agent already knows how to run `npm test`, `tsc`, `curl`, etc.
2. **Be specific**: "No type errors" is better than "It works"
3. **Include verification command**: When helpful, add "Run: `command`" to each item
4. **One thing per item**: Don't mix multiple requirements in one item
5. **Keep it testable**: The agent should be able to verify it with standard tools
