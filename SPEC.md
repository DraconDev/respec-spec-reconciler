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

### [x] Unit tests pass
Run: `npx vitest run --reporter=verbose`
Expected: All tests pass

### [x] Test coverage adequate
Run: `npx vitest run --coverage`
Expected: Coverage > 20% for core modules

### [x] All exports tested
Verify all public functions can be imported and called.
Run: `npx vitest run tests/exports.test.ts`

### [x] Loop controller tests
Test the loop controller with mock state.
Run: `npx vitest run src/tests/loop-controller.test.ts`

### [x] Spec parser tests
Test spec parsing with various inputs.
Run: `npx vitest run src/tests/spec-parser.test.ts`
Expected: Continues from where it left off.

### [x] Test cancel functionality
Run /respec cancel.
Expected: Clears active state, shows status.
Run: `grep -q "cancel" src/commands.ts`

### [x] Test pause functionality
Run /respec pause.
Expected: Sets status to paused.
Run: `grep -q "pause" src/commands.ts`

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

### [x] Interactive spec editing commands
/respec add, /respec remove, /respec edit commands exist.
Run: `grep -q "add\|remove\|edit" src/commands.ts`

### [x] Natural language spec item parsing
Add command accepts natural language descriptions.
Run: `grep -q "parseNaturalLanguage\|parseNL" src/spec-parser.ts`


### [x] Spec item templates library
Template functions for common item patterns.
Run: `grep -q "templates\|getTemplate" src/spec-parser.ts`


### [x] Markdown linting for spec items
Lint function checks item quality.
Run: `grep -q "lintSpecItem\|validateSpecItem" src/spec-parser.ts`


### [x] Lint severity levels
Lint returns errors, warnings, info.
Run: `grep -q "severity\|Error\|Warning\|Info" src/spec-parser.ts`

### [x] Spec template loader
Load and apply pre-built spec templates.
Run: `grep -q "loadTemplate\|applyTemplate" src/spec-parser.ts`

### [x] Built-in spec templates
API, library, CLI, webapp templates.
Run: `grep -q "API_TEMPLATE\|LIBRARY_TEMPLATE\|CLI_TEMPLATE" src/spec-parser.ts`


### [x] Team sync conflict detection
Detect conflicting budget changes on import.
Run: `grep -q "conflict\|detectConflict" src/commands.ts`

### [x] Team sync merge strategy
Merge strategies for conflicting budgets (newest, highest-confidence).
Run: `grep -q "mergeBudgets\|resolveConflict" src/commands.ts`

### [x] Team sync export with metadata
Export includes version, timestamp, category stats.
Run: `grep -q "exportWithMetadata\|version" src/commands.ts`


### [x] CI/CD integration command
/respec ci command for CI environments.
Run: `grep -q "ci\|CI" src/commands.ts`

### [x] CI mode with non-interactive output
CI mode outputs JSON for parsing.
Run: `grep -q "ciMode\|jsonOutput" src/commands.ts`


### [x] CI exit codes
Exit 0 for all done, 1 for blocked, 2 for errors.
Run: `grep -q "process.exit\|exitCode" src/commands.ts`


### [x] Dependency graph structure
Graph interface for item dependencies.
Run: `grep -q "interface DependencyGraph\|class Graph" src/types.ts`

### [x] Topological sort for dependencies
Sort items respecting dependency order.
Run: `grep -q "topologicalSort\|sortDeps" src/spec-parser.ts`

### [x] Circular dependency detection
Detect and warn about circular dependencies.
Run: `grep -q "detectCycles\|hasCycle" src/spec-parser.ts`

### [x] Circular dependency error format
Format cycles for user display.
Run: `grep -q "formatCycle\|formatCircular" src/spec-parser.ts`

### [x] Suggestion engine interface
SuggestionEngine interface for recommendations.
Run: `grep -q "interface SuggestionEngine" src/types.ts`


### [x] Pattern-based suggestions
Suggest next items based on patterns.
Run: `grep -q "suggestNext\|getSuggestion" src/spec-parser.ts`

### [x] Confidence-weighted suggestions
Suggestions weighted by confidence scores.
Run: `grep -q "confidenceWeight\|weightedScore" src/spec-parser.ts`

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

### [x] Type definitions complete
All type definitions present.
Run: `grep -c "interface\|type" src/types.ts`

### [x] Store module exports functions
Store module has initStore, getStore, setStore.
Run: `grep -c "export function" src/store.ts`

### [x] Commands registered with pi
Commands registered with extension.
Run: `grep -q "registerCommand" src/commands.ts`

### [x] Extension entry point exports function
Main entry point exports function.
Run: `grep -q "export" src/index.ts`

### [x] All source files compile
TypeScript compilation succeeds.
Run: `npx tsc --noEmit`

### [x] Milestone tracking interface
Milestone interface for grouping items.
Run: `grep -q "interface Milestone" src/types.ts`

### [x] Milestone creation function
Create milestone from items.
Run: `grep -q "createMilestone" src/spec-parser.ts`

### [x] Milestone progress calculation
Calculate progress for milestones.
Run: `grep -q "getMilestoneProgress" src/spec-parser.ts`

### [x] Risk assessment interface
RiskAssessment interface for items.
Run: `grep -q "interface RiskAssessment" src/types.ts`

### [x] Risk scoring function
Score risk based on complexity and dependencies.
Run: `grep -q "assessRisk" src/spec-parser.ts`

### [x] Risk level classification
Classify risk as low/medium/high/critical.
Run: `grep -q "getRiskLevel" src/spec-parser.ts`

### [x] Time estimation interface
TimeEstimate interface for items.
Run: `grep -q "interface TimeEstimate" src/types.ts`

### [x] Time estimation function
Estimate completion time for items.
Run: `grep -q "estimateTime" src/spec-parser.ts`

### [x] Cross-reference analysis
Find related items across specs.
Run: `grep -q "findCrossReferences" src/spec-parser.ts`

### [x] Semantic similarity scoring
Score similarity between items.
Run: `grep -q "calculateSimilarity" src/spec-parser.ts`

### [x] Specification review workflow
Review state machine for spec changes.
Run: `grep -q "ReviewState\|reviewWorkflow" src/types.ts`

### [x] Review state transitions
Transition between review states.
Run: `grep -q "ReviewState\.Draft\|ReviewState\.Approved" src/spec-parser.ts`

### [x] Performance profiling interface
ProfileRecord interface for tracking.
Run: `grep -q "interface ProfileRecord" src/types.ts`

### [x] Start profiling function
Start timing for an item.
Run: `grep -q "startProfiling" src/spec-parser.ts`

### [x] End profiling function
End timing and record profile.
Run: `grep -q "endProfiling" src/spec-parser.ts`

### [x] Change impact analysis interface
ImpactAssessment interface.
Run: `grep -q "interface ImpactAssessment" src/types.ts`

### [x] Impact scoring function
Score impact of changing an item.
Run: `grep -q "assessImpact" src/spec-parser.ts`

### [x] Automated test hook interface
TestHook interface for test integration.
Run: `grep -q "interface TestHook" src/types.ts`

### [x] Test hook registration
Register test hooks for items.
Run: `grep -q "registerTestHook" src/spec-parser.ts`

### [x] Resource usage tracking
Track CPU/memory during execution.
Run: `grep -q "trackResources\|ResourceUsage" src/types.ts`

### [x] Resource threshold alerts
Alert when resources exceed threshold.
Run: `grep -q "checkResourceThreshold" src/spec-parser.ts`

### [x] Specification versioning interface
SpecVersion interface for history.
Run: `grep -q "interface SpecVersion" src/types.ts`

### [x] Version creation function
Create version snapshot.
Run: `grep -q "createVersion" src/spec-parser.ts`

### [x] Version diff function
Diff between spec versions.
Run: `grep -q "diffVersions" src/spec-parser.ts`

### [x] Specification health check
Health score for spec quality.
Run: `grep -q "healthCheck\|getHealthScore" src/spec-parser.ts`

### [x] Health issues detection
Detect issues in spec items.
Run: `grep -q "detectHealthIssues" src/spec-parser.ts`

### [x] Health report generation
Generate formatted health report.
Run: `grep -q "formatHealthReport" src/spec-parser.ts`

### [x] Specification branching interface
SpecBranch interface for feature branches.
Run: `grep -q "interface SpecBranch" src/types.ts`

### [x] Branch creation function
Create branch from current spec.
Run: `grep -q "createBranch" src/spec-parser.ts`

### [x] Branch merge function
Merge branches back to main.
Run: `grep -q "mergeBranch" src/spec-parser.ts`

### [x] Branch listing function
List all spec branches.
Run: `grep -q "listBranches" src/spec-parser.ts`

### [x] Specification rollback function
Rollback spec to previous version.
Run: `grep -q "rollbackSpec" src/spec-parser.ts`

### [x] Automation hook interface
Hook interface for automation.
Run: `grep -q "interface Hook" src/types.ts`

### [x] Pre-processing hook registration
Register before-processing hooks.
Run: `grep -q "registerPreHook" src/spec-parser.ts`

### [x] Post-processing hook registration
Register after-processing hooks.
Run: `grep -q "registerPostHook" src/spec-parser.ts`

### [x] Priority queue interface
PriorityQueue class for ordering.
Run: `grep -q "class PriorityQueue" src/spec-parser.ts`

### [x] Priority calculation function
Calculate priority score for items.
Run: `grep -q "calculatePriority" src/spec-parser.ts`

### [x] Notification system interface
Notification interface for alerts.
Run: `grep -q "interface Notification" src/types.ts`

### [x] Notification dispatch function
Send notifications on events.
Run: `grep -q "dispatchNotification" src/spec-parser.ts`

### [x] Audit trail interface
AuditEntry interface for tracking.
Run: `grep -q "interface AuditEntry" src/types.ts`

### [x] Audit logging function
Log spec changes to audit trail.
Run: `grep -q "logAuditEntry" src/spec-parser.ts`

### [x] Export to JSON function
Export spec as JSON format.
Run: `grep -q "exportToJSON" src/spec-parser.ts`

### [x] Export to CSV function
Export spec as CSV format.
Run: `grep -q "exportToCSV" src/spec-parser.ts`

### [x] Export to HTML function
Export spec as HTML report.
Run: `grep -q "exportToHTML" src/spec-parser.ts`

### [x] Import from JSON function
Import spec from JSON format.
Run: `grep -q "importFromJSON" src/spec-parser.ts`

### [x] Specification testing interface
SpecTest interface for test items.
Run: `grep -q "interface SpecTest" src/types.ts`

### [x] Run spec self-tests
Test the spec items are valid.
Run: `grep -q "runSpecTests" src/spec-parser.ts`

### [x] Specification validation
Validate spec structure and content.
Run: `grep -q "validateSpec" src/spec-parser.ts`

### [x] Undo/Redo stack interface
UndoStack interface for history.
Run: `grep -q "interface UndoStack" src/types.ts`

### [x] Undo operation function
Undo last spec change.
Run: `grep -q "undo" src/spec-parser.ts`

### [x] Redo operation function
Redo last undone change.
Run: `grep -q "redo" src/spec-parser.ts`

### [x] Change fingerprinting
Hash spec state for change detection.
Run: `grep -q "fingerprint" src/spec-parser.ts`

### [x] Change diff highlighting
Generate highlighted diff output.
Run: `grep -q "highlightDiff" src/visual.ts`

### [x] Smart search function
Search items with fuzzy matching.
Run: `grep -q "smartSearch" src/spec-parser.ts`

### [x] Filter by status function
Filter items by checked/unchecked.
Run: `grep -q "filterByStatus" src/spec-parser.ts`

### [x] Filter by category function
Filter items by category.
Run: `grep -q "filterByCategory" src/spec-parser.ts`

### [x] Sort by priority function
Sort items by priority.
Run: `grep -q "sortByPriority" src/spec-parser.ts`

### [x] Batch operations interface
BatchOperation interface for bulk changes.
Run: `grep -q "interface BatchOperation" src/types.ts`

### [x] Execute batch operation
Apply batch changes to spec.
Run: `grep -q "executeBatch" src/spec-parser.ts`

### [x] Dry run mode
Preview changes without applying.
Run: `grep -q "dryRun" src/spec-parser.ts`

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
