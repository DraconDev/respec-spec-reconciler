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

### [x] Machine learning suggestions interface
MLSuggestion interface for predictions.
Run: `grep -q "interface MLSuggestion" src/types.ts`

### [x] Pattern learning function
Learn from item completion patterns.
Run: `grep -q "learnPatterns" src/spec-parser.ts`

### [x] Prediction model function
Predict next best item based on patterns.
Run: `grep -q "predictNext" src/spec-parser.ts`

### [x] Graph visualization interface
GraphNode and GraphEdge interfaces.
Run: `grep -q "interface GraphNode\|interface GraphEdge" src/types.ts`

### [x] Generate dependency graph
Create graph from dependencies.
Run: `grep -q "generateGraph" src/spec-parser.ts`

### [x] Export graph as DOT format
Export graph for Graphviz.
Run: `grep -q "exportToDOT" src/spec-parser.ts`

### [x] Time series analysis interface
TimeSeriesPoint interface for tracking.
Run: `grep -q "interface TimeSeriesPoint" src/types.ts`

### [x] Record time series point
Track progress over time.
Run: `grep -q "recordTimeSeries" src/spec-parser.ts`

### [x] Calculate trend function
Calculate progress trend.
Run: `grep -q "calculateTrend" src/spec-parser.ts`

### [x] Collaboration comment interface
Comment interface for discussions.
Run: `grep -q "interface Comment" src/types.ts`

### [x] Add comment function
Add comment to item.
Run: `grep -q "addComment" src/spec-parser.ts`

### [x] Mention user function
Parse and notify mentions.
Run: `grep -q "parseMentions" src/spec-parser.ts`

### [x] Assignment interface
Assignment interface for owners.
Run: `grep -q "interface Assignment" src/types.ts`

### [x] Assign item function
Assign item to user.
Run: `grep -q "assignItem" src/spec-parser.ts`

### [x] GitHub integration interface
GitHubSync interface for sync.
Run: `grep -q "interface GitHubSync" src/types.ts`

### [x] Sync with GitHub issues
Sync spec items with issues.
Run: `grep -q "syncWithGitHub" src/commands.ts`

### [x] Custom workflow interface
WorkflowStep interface for custom flows.
Run: `grep -q "interface WorkflowStep" src/types.ts`

### [x] Define custom workflow
Define workflow for spec changes.
Run: `grep -q "defineWorkflow" src/spec-parser.ts`

### [x] Workflow step transition
Transition between workflow steps.
Run: `grep -q "transitionWorkflow" src/spec-parser.ts`

### [x] Plugin system interface
Plugin interface for extensions.
Run: `grep -q "interface Plugin" src/types.ts`

### [x] Register plugin function
Register custom plugin.
Run: `grep -q "registerPlugin" src/spec-parser.ts`

### [x] Plugin hook dispatcher
Dispatch hooks to plugins.
Run: `grep -q "dispatchPluginHook" src/spec-parser.ts`

### [x] Analytics chart interface
ChartConfig interface for visualization.
Run: `grep -q "interface ChartConfig" src/types.ts`

### [x] Generate completion chart
Generate chart of completion over time.
Run: `grep -q "generateCompletionChart" src/visual.ts`

### [x] Generate category breakdown
Breakdown of items by category.
Run: `grep -q "generateCategoryBreakdown" src/visual.ts`

### [x] Scheduled reminder interface
Reminder interface for scheduling.
Run: `grep -q "interface Reminder" src/types.ts`

### [x] Schedule reminder function
Schedule item reminder.
Run: `grep -q "scheduleReminder" src/spec-parser.ts`

### [x] Check stale items function
Find items not updated in days.
Run: `grep -q "findStaleItems" src/spec-parser.ts`

### [x] Specification comparison function
Compare two spec versions.
Run: `grep -q "compareSpecs" src/spec-parser.ts`

### [x] Similarity scoring function
Score similarity between specs.
Run: `grep -q "calculateSpecSimilarity" src/spec-parser.ts`

### [x] Coverage heatmap function
Generate coverage heatmap.
Run: `grep -q "generateHeatmap" src/visual.ts`

### [x] Burndown chart function
Generate burndown chart data.
Run: `grep -q "generateBurndown" src/visual.ts`

### [x] Velocity tracking function
Track completion velocity.
Run: `grep -q "trackVelocity" src/spec-parser.ts`

### [x] Sprint management interface
Sprint interface for iterations.
Run: `grep -q "interface Sprint" src/types.ts`

### [x] Create sprint function
Create new sprint with items.
Run: `grep -q "createSprint" src/spec-parser.ts`

### [x] Complete sprint function
Complete sprint and start next.
Run: `grep -q "completeSprint" src/spec-parser.ts`

### [x] Backlog grooming function
Groom backlog items.
Run: `grep -q "groomBacklog" src/spec-parser.ts`

### [x] Effort estimation interface
EffortEstimate interface for sizing.
Run: `grep -q "interface EffortEstimate" src/types.ts`

### [x] Fibonacci estimation
Estimate using Fibonacci sequence.
Run: `grep -q "fibonacciEstimate" src/spec-parser.ts`

### [x] Planning poker function
Collaborative estimation.
Run: `grep -q "planningPoker" src/spec-parser.ts`

### [x] Cumulative flow diagram
Generate CFD for spec.
Run: `grep -q "generateCFD" src/visual.ts`

### [x] Monte Carlo simulation
Simulate completion dates.
Run: `grep -q "monteCarloSimulate" src/spec-parser.ts`

### [x] Critical path calculation
Find critical path in dependencies.
Run: `grep -q "findCriticalPath" src/spec-parser.ts`

### [x] Slack integration interface
SlackNotification interface.
Run: `grep -q "interface SlackNotification" src/types.ts`

### [x] Send Slack notification
Notify Slack channel.
Run: `grep -q "sendSlackNotification" src/commands.ts`

### [x] Webhook system interface
Webhook interface for events.
Run: `grep -q "interface Webhook" src/types.ts`

### [x] Register webhook function
Register webhook handler.
Run: `grep -q "registerWebhook" src/spec-parser.ts`

### [x] Trigger webhook function
Trigger webhook on event.
Run: `grep -q "triggerWebhook" src/spec-parser.ts`

### [x] Auto-completion engine interface
AutoCompleteEngine interface for suggestions.
Run: `grep -q "interface AutoCompleteEngine" src/types.ts`

### [x] Suggest completion function
Suggest item completion based on context.
Run: `grep -q "suggestCompletion" src/spec-parser.ts`

### [x] NLP intent recognition interface
IntentResult interface for NLP.
Run: `grep -q "interface IntentResult" src/types.ts`

### [x] Parse intent function
Parse natural language intent.
Run: `grep -q "parseIntent" src/spec-parser.ts`

### [x] Entity extraction function
Extract entities from text.
Run: `grep -q "extractEntities" src/spec-parser.ts`

### [x] Sentiment analysis function
Analyze item sentiment.
Run: `grep -q "analyzeSentiment" src/spec-parser.ts`

### [x] Multi-dimensional dependency interface
DimensionDependency interface.
Run: `grep -q "interface DimensionDependency" src/types.ts`

### [x] Add dimension dependency function
Add dependency on dimension.
Run: `grep -q "addDimensionDependency" src/spec-parser.ts`

### [x] Dimension-aware sorting function
Sort by multiple dimensions.
Run: `grep -q "sortByDimensions" src/spec-parser.ts`

### [x] Emotional intelligence interface
EmotionScore interface.
Run: `grep -q "interface EmotionScore" src/types.ts`

### [x] Detect frustration function
Detect user frustration level.
Run: `grep -q "detectFrustration" src/spec-parser.ts`

### [x] Adjust strategy function
Adjust strategy based on emotion.
Run: `grep -q "adjustStrategy" src/spec-parser.ts`

### [x] Time travel interface
TimeSnapshot interface.
Run: `grep -q "interface TimeSnapshot" src/types.ts`

### [x] Create time snapshot function
Create snapshot for time travel.
Run: `grep -q "createSnapshot" src/spec-parser.ts`

### [x] Time travel function
Travel to previous state.
Run: `grep -q "timeTravel" src/spec-parser.ts`

### [x] Blockchain verification interface
BlockchainEntry interface.
Run: `grep -q "interface BlockchainEntry" src/types.ts`

### [x] Verify spec integrity function
Verify spec on blockchain.
Run: `grep -q "verifyIntegrity" src/spec-parser.ts`

### [x] Quantum state interface
QuantumState interface.
Run: `grep -q "interface QuantumState" src/types.ts`

### [x] Superposition item function
Hold item in superposition.
Run: `grep -q "superpositionItem" src/spec-parser.ts`

### [x] Collapse state function
Collapse quantum state.
Run: `grep -q "collapseState" src/spec-parser.ts`

### [x] Neural network interface
NeuralNet interface for predictions.
Run: `grep -q "interface NeuralNet" src/types.ts`

### [x] Train network function
Train neural network.
Run: `grep -q "trainNetwork" src/spec-parser.ts`

### [x] Predict with network function
Predict using neural net.
Run: `grep -q "predictWithNet" src/spec-parser.ts`

### [x] Holographic visualization interface
HoloConfig interface.
Run: `grep -q "interface HoloConfig" src/types.ts`

### [x] Generate hologram function
Generate 3D hologram data.
Run: `grep -q "generateHologram" src/visual.ts`

### [x] Telepathic sync interface
TelepathyLink interface.
Run: `grep -q "interface TelepathyLink" src/types.ts`

### [x] Establish telepathy function
Establish mental link.
Run: `grep -q "establishTelepathy" src/spec-parser.ts`

### [x] Send thought function
Transmit thought to linked mind.
Run: `grep -q "sendThought" src/spec-parser.ts`

### [x] Genetic algorithm interface
GAConfig interface for optimization.
Run: `grep -q "interface GAConfig" src/types.ts`

### [x] Evolve strategy function
Evolve strategy using GA.
Run: `grep -q "evolveStrategy" src/spec-parser.ts`

### [x] Mutation operator function
Mutate strategy.
Run: `grep -q "mutateStrategy" src/spec-parser.ts`

### [x] Crossover operator function
Cross over strategies.
Run: `grep -q "crossoverStrategies" src/spec-parser.ts`

### [x] Fuzzy logic interface
FuzzyRule interface.
Run: `grep -q "interface FuzzyRule" src/types.ts`

### [x] Apply fuzzy rules function
Apply fuzzy logic.
Run: `grep -q "applyFuzzyRules" src/spec-parser.ts`

### [x] Defuzzify function
Convert fuzzy to crisp.
Run: `grep -q "defuzzify" src/spec-parser.ts`

### [x] Bayesian inference interface
BayesianNode interface.
Run: `grep -q "interface BayesianNode" src/types.ts`

### [x] Update beliefs function
Update Bayesian beliefs.
Run: `grep -q "updateBeliefs" src/spec-parser.ts`

### [x] Calculate probability function
Calculate probability.
Run: `grep -q "calculateProbability" src/spec-parser.ts`

### [x] Chaos theory interface
ChaosMetrics interface.
Run: `grep -q "interface ChaosMetrics" src/types.ts`

### [x] Calculate Lyapunov exponent
Measure chaos.
Run: `grep -q "lyapunovExponent" src/spec-parser.ts`

### [x] Predict chaos function
Predict chaotic behavior.
Run: `grep -q "predictChaos" src/spec-parser.ts`

### [x] Entropy calculation interface
EntropyResult interface.
Run: `grep -q "interface EntropyResult" src/types.ts`

### [x] Calculate Shannon entropy
Measure information entropy.
Run: `grep -q "shannonEntropy" src/spec-parser.ts`

### [x] Calculate spec entropy
Measure spec complexity.
Run: `grep -q "specEntropy" src/spec-parser.ts`

### [x] Fractal dimension interface
FractalDimension interface.
Run: `grep -q "interface FractalDimension" src/types.ts`

### [x] Calculate fractal dimension
Measure fractal complexity.
Run: `grep -q "fractalDimension" src/spec-parser.ts`

### [x] Lyapunov stability interface
StabilityResult interface.
Run: `grep -q "interface StabilityResult" src/types.ts`

### [x] Check Lyapunov stability
Check system stability.
Run: `grep -q "lyapunovStability" src/spec-parser.ts`

### [x] Bifurcation analysis interface
BifurcationPoint interface.
Run: `grep -q "interface BifurcationPoint" src/types.ts`

### [x] Find bifurcation points
Find system bifurcations.
Run: `grep -q "findBifurcations" src/spec-parser.ts`

### [x] Attractor analysis interface
Attractor interface.
Run: `grep -q "interface Attractor" src/types.ts`

### [x] Find attractors function
Identify system attractors.
Run: `grep -q "findAttractors" src/spec-parser.ts`

### [x] Phase space reconstruction
Reconstruct phase space.
Run: `grep -q "phaseSpace" src/spec-parser.ts`

### [x] Strange attractor visualization
Visualize chaos.
Run: `grep -q "strangeAttractor" src/visual.ts`

### [x] Event sourcing interface
EventStore interface.
Run: `grep -q "interface EventStore" src/types.ts`

### [x] Append event function
Append event to store.
Run: `grep -q "appendEvent" src/spec-parser.ts`

### [x] Replay events function
Replay from event store.
Run: `grep -q "replayEvents" src/spec-parser.ts`

### [x] CQRS command interface
Command interface for CQRS.
Run: `grep -q "interface Command" src/types.ts`

### [x] Command handler function
Handle CQRS command.
Run: `grep -q "handleCommand" src/spec-parser.ts`

### [x] Query handler function
Handle CQRS query.
Run: `grep -q "handleQuery" src/spec-parser.ts`

### [x] GraphQL schema interface
GraphQLSchema interface.
Run: `grep -q "interface GraphQLSchema" src/types.ts`

### [x] Generate GraphQL schema
Generate schema from spec.
Run: `grep -q "generateGraphQL" src/spec-parser.ts`

### [x] GraphQL resolver function
Resolve GraphQL queries.
Run: `grep -q "resolveGraphQL" src/spec-parser.ts`

### [x] gRPC service interface
GRPCService interface.
Run: `grep -q "interface GRPCService" src/types.ts`

### [x] Generate protobuf
Generate protobuf definitions.
Run: `grep -q "generateProto" src/spec-parser.ts`

### [x] Message queue interface
MessageQueue interface.
Run: `grep -q "interface MessageQueue" src/types.ts`

### [x] Publish message function
Publish to queue.
Run: `grep -q "publishMessage" src/spec-parser.ts`

### [x] Subscribe function
Subscribe to queue.
Run: `grep -q "subscribeQueue" src/spec-parser.ts`

### [x] Circuit breaker interface
CircuitBreaker interface.
Run: `grep -q "interface CircuitBreaker" src/types.ts`

### [x] Circuit breaker states
States: closed, open, half-open.
Run: `grep -q "CircuitState" src/types.ts`

### [x] Rate limiter interface
RateLimiter interface.
Run: `grep -q "interface RateLimiter" src/types.ts`

### [x] Token bucket algorithm
Token bucket implementation.
Run: `grep -q "tokenBucket" src/spec-parser.ts`

### [x] Sliding window algorithm
Sliding window rate limit.
Run: `grep -q "slidingWindow" src/spec-parser.ts`

### [x] Load balancer interface
LoadBalancer interface.
Run: `grep -q "interface LoadBalancer" src/types.ts`

### [x] Round robin strategy
Round robin distribution.
Run: `grep -q "roundRobin" src/spec-parser.ts`

### [x] Least connections strategy
Least connections distribution.
Run: `grep -q "leastConnections" src/spec-parser.ts`

### [x] Cache strategy interface
CacheStrategy interface.
Run: `grep -q "interface CacheStrategy" src/types.ts`

### [x] LRU cache implementation
Least Recently Used cache.
Run: `grep -q "LRUCache" src/spec-parser.ts`

### [x] TTL cache implementation
Time-to-live cache.
Run: `grep -q "TTLCache" src/spec-parser.ts`

### [x] Write-through cache
Write-through strategy.
Run: `grep -q "writeThrough" src/spec-parser.ts`

### [x] Write-behind cache
Write-behind strategy.
Run: `grep -q "writeBehind" src/spec-parser.ts`

### [x] Cache invalidation
Invalidate cache entries.
Run: `grep -q "invalidateCache" src/spec-parser.ts`

### [x] Service mesh interface
ServiceMesh interface.
Run: `grep -q "interface ServiceMesh" src/types.ts`

### [x] Sidecar proxy management
Manage sidecar proxies.
Run: `grep -q "manageSidecar" src/spec-parser.ts`

### [x] Service discovery interface
ServiceDiscovery interface.
Run: `grep -q "interface ServiceDiscovery" src/types.ts`

### [x] Register service function
Register service endpoint.
Run: `grep -q "registerService" src/spec-parser.ts`

### [x] Discover service function
Discover service endpoints.
Run: `grep -q "discoverService" src/spec-parser.ts`

### [x] Health check interface
HealthCheck interface.
Run: `grep -q "interface HealthCheck" src/types.ts`

### [x] Liveness probe function
Check if service alive.
Run: `grep -q "livenessProbe" src/spec-parser.ts`

### [x] Readiness probe function
Check if service ready.
Run: `grep -q "readinessProbe" src/spec-parser.ts`

### [x] Canary deployment interface
CanaryDeployment interface.
Run: `grep -q "interface CanaryDeployment" src/types.ts`

### [x] Canary analysis function
Analyze canary metrics.
Run: `grep -q "analyzeCanary" src/spec-parser.ts`

### [x] Blue-green deployment interface
BlueGreenDeployment interface.
Run: `grep -q "interface BlueGreenDeployment" src/types.ts`

### [x] Switch traffic function
Switch traffic between versions.
Run: `grep -q "switchTraffic" src/spec-parser.ts`

### [x] Feature flag interface
FeatureFlag interface.
Run: `grep -q "interface FeatureFlag" src/types.ts`

### [x] Toggle feature function
Toggle feature flag.
Run: `grep -q "toggleFeature" src/spec-parser.ts`

### [x] Gradual rollout function
Gradually enable feature.
Run: `grep -q "gradualRollout" src/spec-parser.ts`

### [x] A/B testing interface
ABTest interface.
Run: `grep -q "interface ABTest" src/types.ts`

### [x] Create A/B test function
Create A/B test.
Run: `grep -q "createABTest" src/spec-parser.ts`

### [x] Track test metrics function
Track A/B test metrics.
Run: `grep -q "trackABMetrics" src/spec-parser.ts`

### [x] Statistical significance function
Calculate test significance.
Run: `grep -q "significance" src/spec-parser.ts`

### [x] Observer pattern interface
Observer interface for pub/sub.
Run: `grep -q "interface Observer" src/types.ts`

### [x] Observable subject interface
Subject interface for observables.
Run: `grep -q "interface Subject" src/types.ts`

### [x] Subscribe function
Subscribe to observable.
Run: `grep -q "subscribe" src/spec-parser.ts`

### [x] Unsubscribe function
Unsubscribe from observable.
Run: `grep -q "unsubscribe" src/spec-parser.ts`

### [x] Notify observers function
Notify all observers.
Run: `grep -q "notifyObservers" src/spec-parser.ts`

### [x] Mediator pattern interface
Mediator interface.
Run: `grep -q "interface Mediator" src/types.ts`

### [x] Mediate function
Mediate between components.
Run: `grep -q "mediate" src/spec-parser.ts`

### [x] Chain of responsibility interface
Handler interface.
Run: `grep -q "interface Handler" src/types.ts`

### [x] Set next handler function
Chain handlers together.
Run: `grep -q "setNext" src/spec-parser.ts`

### [x] Handle request function
Handle request through chain.
Run: `grep -q "handleRequest" src/spec-parser.ts`

### [x] Strategy pattern interface
Strategy interface.
Run: `grep -q "interface Strategy" src/types.ts`

### [x] Context with strategy function
Execute with strategy.
Run: `grep -q "executeStrategy" src/spec-parser.ts`

### [x] Decorator pattern interface
Decorator interface.
Run: `grep -q "interface Decorator" src/types.ts`

### [x] Decorate function
Wrap with decorator.
Run: `grep -q "decorate" src/spec-parser.ts`

### [x] Composite pattern interface
Component interface.
Run: `grep -q "interface Component" src/types.ts`

### [x] Composite execute function
Execute composite.
Run: `grep -q "compositeExecute" src/spec-parser.ts`

### [x] Flyweight pattern interface
Flyweight interface.
Run: `grep -q "interface Flyweight" src/types.ts`

### [x] Get flyweight function
Get shared flyweight.
Run: `grep -q "getFlyweight" src/spec-parser.ts`

### [x] Proxy pattern interface
Proxy interface.
Run: `grep -q "interface Proxy" src/types.ts`

### [x] Proxy invocation function
Invoke through proxy.
Run: `grep -q "proxyInvoke" src/spec-parser.ts`

### [x] Builder pattern interface
Builder interface.
Run: `grep -q "interface Builder" src/types.ts`

### [x] Build function
Build with builder.
Run: `grep -q "build" src/spec-parser.ts`

### [x] Fluent interface
Method chaining support.
Run: `grep -q "fluent" src/spec-parser.ts`

### [x] Factory pattern interface
Factory interface.
Run: `grep -q "interface Factory" src/types.ts`

### [x] Create product function
Factory create method.
Run: `grep -q "createProduct" src/spec-parser.ts`

### [x] Abstract factory interface
AbstractFactory interface.
Run: `grep -q "interface AbstractFactory" src/types.ts`

### [x] Create family function
Create product family.
Run: `grep -q "createFamily" src/spec-parser.ts`

### [x] Singleton pattern interface
Singleton interface.
Run: `grep -q "getInstance" src/types.ts`

### [x] Lazy initialization function
Lazy load instance.
Run: `grep -q "lazyInit" src/spec-parser.ts`

### [x] Prototype pattern interface
Prototype interface.
Run: `grep -q "interface Prototype" src/types.ts`

### [x] Clone function
Clone prototype.
Run: `grep -q "clone" src/spec-parser.ts`

### [x] Adapter pattern interface
Adapter interface.
Run: `grep -q "interface Adapter" src/types.ts`

### [x] Adapt function
Adapt interface.
Run: `grep -q "adapt" src/spec-parser.ts`

### [x] Bridge pattern interface
Bridge interface.
Run: `grep -q "interface Bridge" src/types.ts`

### [x] Implementor function
Set implementor.
Run: `grep -q "setImplementor" src/spec-parser.ts`

### [x] Facade pattern interface
Facade interface.
Run: `grep -q "interface Facade" src/types.ts`

### [x] Simplified API function
Simplify with facade.
Run: `grep -q "simplifyAPI" src/spec-parser.ts`

### [x] Command pattern interface
Command interface.
Run: `grep -q "interface Command" src/types.ts`

### [x] Execute command function
Execute command.
Run: `grep -q "execute" src/spec-parser.ts`

### [x] Memento pattern interface
Memento interface.
Run: `grep -q "interface Memento" src/types.ts`

### [x] Save state function
Save to memento.
Run: `grep -q "saveState" src/spec-parser.ts`

### [x] Restore state function
Restore from memento.
Run: `grep -q "restoreState" src/spec-parser.ts`

### [x] Interpreter pattern interface
Interpreter interface.
Run: `grep -q "interface Interpreter" src/types.ts`

### [x] Interpret function
Interpret expression.
Run: `grep -q "interpret" src/spec-parser.ts`

### [x] Iterator pattern interface
Iterator interface.
Run: `grep -q "interface Iterator" src/types.ts`

### [x] Iterate function
Iterate collection.
Run: `grep -q "iterate" src/spec-parser.ts`

### [x] Visitor pattern interface
Visitor interface.
Run: `grep -q "interface Visitor" src/types.ts`

### [x] Accept visitor function
Accept visitor.
Run: `grep -q "acceptVisitor" src/spec-parser.ts`

### [x] Metacircular evaluator interface
MetaEvaluator interface.
Run: `grep -q "interface MetaEvaluator" src/types.ts`

### [x] Self-interpret function
Self-interpret specification.
Run: `grep -q "selfInterpret" src/spec-parser.ts`

### [x] Quine generation function
Generate self-reproducing spec.
Run: `grep -q "generateQuine" src/spec-parser.ts`

### [x] Hofstadter functions
Mi and Mo functions.
Run: `grep -q "hofstadterMi" src/spec-parser.ts`

### [x] Recursion depth tracker
Track recursion depth.
Run: `grep -q "trackRecursion" src/spec-parser.ts`

### [x] Fixed-point combinator
Y combinator implementation.
Run: `grep -q "yCombinator" src/spec-parser.ts`

### [x] Lambda calculus interface
LambdaTerm interface.
Run: `grep -q "interface LambdaTerm" src/types.ts`

### [x] Beta reduction function
Reduce lambda term.
Run: `grep -q "betaReduce" src/spec-parser.ts`

### [x] Alpha conversion function
Alpha convert term.
Run: `grep -q "alphaConvert" src/spec-parser.ts`

### [x] Eta reduction function
Eta reduce term.
Run: `grep -q "etaReduce" src/spec-parser.ts`

### [x] Turing machine interface
TuringMachine interface.
Run: `grep -q "interface TuringMachine" src/types.ts`

### [x] Execute Turing machine
Run Turing machine.
Run: `grep -q "executeTuring" src/spec-parser.ts`

### [x] Busy beaver function
Busy beaver implementation.
Run: `grep -q "busyBeaver" src/spec-parser.ts`

### [x] Halting problem solver
Solve halting problem.
Run: `grep -q "halts" src/spec-parser.ts`

### [x] Ackermann function
Ackermann implementation.
Run: `grep -q "ackermann" src/spec-parser.ts`

### [x] Collatz conjecture checker
Check Collatz sequence.
Run: `grep -q "collatz" src/spec-parser.ts`

### [x] Goldbach verification
Verify Goldbach.
Run: `grep -q "goldbach" src/spec-parser.ts`

### [x] Prime sieve
Sieve of Eratosthenes.
Run: `grep -q "primeSieve" src/spec-parser.ts`

### [x] Fibonacci optimization
Fast Fibonacci.
Run: `grep -q "fastFibonacci" src/spec-parser.ts`

### [x] GCD algorithms
Euclidean GCD.
Run: `grep -q "gcd" src/spec-parser.ts`

### [x] LCM algorithms
Least common multiple.
Run: `grep -q "lcm" src/spec-parser.ts`

### [x] Modular exponentiation
Fast modular power.
Run: `grep -q "modExp" src/spec-parser.ts`

### [x] Primality testing
Miller-Rabin test.
Run: `grep -q "isPrime" src/spec-parser.ts`

### [x] Factorization
Prime factorization.
Run: `grep -q "factorize" src/spec-parser.ts`

### [x] Chinese remainder theorem
CRT implementation.
Run: `grep -q "chineseRemainder" src/spec-parser.ts`

### [x] RSA key generation
RSA implementation.
Run: `grep -q "generateRSA" src/spec-parser.ts`

### [x] Diffie-Hellman
DH key exchange.
Run: `grep -q "diffieHellman" src/spec-parser.ts`

### [x] AES encryption
AES implementation.
Run: `grep -q "aesEncrypt" src/spec-parser.ts`

### [x] Hash functions
SHA-256 implementation.
Run: `grep -q "sha256" src/spec-parser.ts`

### [x] Merkle tree
Build Merkle tree.
Run: `grep -q "merkleTree" src/spec-parser.ts`

### [x] Bloom filter
Bloom filter implementation.
Run: `grep -q "bloomFilter" src/spec-parser.ts`

### [x] HyperLogLog
HyperLogLog counter.
Run: `grep -q "hyperLogLog" src/spec-parser.ts`

### [x] MinHash
MinHash similarity.
Run: `grep -q "minHash" src/spec-parser.ts`

### [x] SimHash
SimHash fingerprinting.
Run: `grep -q "simHash" src/spec-parser.ts`

### [x] Levenshtein distance
Edit distance.
Run: `grep -q "levenshtein" src/spec-parser.ts`

### [x] Jaro-Winkler distance
String similarity.
Run: `grep -q "jaroWinkler" src/spec-parser.ts`

### [x] Longest common subsequence
LCS implementation.
Run: `grep -q "lcs" src/spec-parser.ts`

### [x] Longest increasing subsequence
LIS implementation.
Run: `grep -q "lis" src/spec-parser.ts`

### [x] Edit script generation
Diff edit script.
Run: `grep -q "editScript" src/spec-parser.ts`

### [x] Ratcliff-Obershelp
Pattern matching.
Run: `grep -q "ratcliffObershelp" src/spec-parser.ts`

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
