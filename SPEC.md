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

### [x] Graph algorithms interface
Graph interface.
Run: `grep -q "interface Graph" src/types.ts`

### [x] BFS traversal
Breadth-first search.
Run: `grep -q "bfs" src/spec-parser.ts`

### [x] DFS traversal
Depth-first search.
Run: `grep -q "dfs" src/spec-parser.ts`

### [x] Dijkstra algorithm
Shortest path.
Run: `grep -q "dijkstra" src/spec-parser.ts`

### [x] Bellman-Ford algorithm
Shortest path with negatives.
Run: `grep -q "bellmanFord" src/spec-parser.ts`

### [x] Floyd-Warshall algorithm
All-pairs shortest path.
Run: `grep -q "floydWarshall" src/spec-parser.ts`

### [x] Kruskal algorithm
Minimum spanning tree.
Run: `grep -q "kruskal" src/spec-parser.ts`

### [x] Prim algorithm
Minimum spanning tree.
Run: `grep -q "prim" src/spec-parser.ts`

### [x] Tarjan's algorithm
Find strongly connected components.
Run: `grep -q "tarjan" src/spec-parser.ts`

### [x] Kosaraju algorithm
Find SCCs.
Run: `grep -q "kosaraju" src/spec-parser.ts`

### [x] Johnson algorithm
All-pairs shortest path.
Run: `grep -q "johnson" src/spec-parser.ts`

### [x] A* algorithm
A-star pathfinding.
Run: `grep -q "aStar" src/spec-parser.ts`

### [x] IDA* algorithm
Iterative deepening A*.
Run: `grep -q "idaStar" src/spec-parser.ts`

### [x] Biconnected components
Find biconnected components.
Run: `grep -q "biconnected" src/spec-parser.ts`

### [x] Articulation points
Find cut vertices.
Run: `grep -q "articulationPoints" src/spec-parser.ts`

### [x] Bridges in graph
Find bridges.
Run: `grep -q "findBridges" src/spec-parser.ts`

### [x] Eulerian path
Find Eulerian path.
Run: `grep -q "eulerianPath" src/spec-parser.ts`

### [x] Hamiltonian path
Find Hamiltonian path.
Run: `grep -q "hamiltonianPath" src/spec-parser.ts`

### [x] Graph coloring
Color graph.
Run: `grep -q "graphColoring" src/spec-parser.ts`

### [x] Maximum flow
Ford-Fulkerson.
Run: `grep -q "maxFlow" src/spec-parser.ts`

### [x] Minimum cut
Find minimum cut.
Run: `grep -q "minCut" src/spec-parser.ts`

### [x] Matching in graph
Find maximum matching.
Run: `grep -q "maximumMatching" src/spec-parser.ts`

### [x] Vertex cover
Find minimum vertex cover.
Run: `grep -q "vertexCover" src/spec-parser.ts`

### [x] Independent set
Find maximum independent set.
Run: `grep -q "independentSet" src/spec-parser.ts`

### [x] Clique detection
Find cliques.
Run: `grep -q "findCliques" src/spec-parser.ts`

### [x] SAT solver
Boolean satisfiability.
Run: `grep -q "satSolve" src/spec-parser.ts`

### [x] Knapsack solver
Dynamic programming knapsack.
Run: `grep -q "knapsack" src/spec-parser.ts`

### [x] Traveling salesman
TSP approximation.
Run: `grep -q "travelingSalesman" src/spec-parser.ts`

### [x] Subset sum
Subset sum solver.
Run: `grep -q "subsetSum" src/spec-parser.ts`

### [x] Longest path in DAG
Find longest path.
Run: `grep -q "longestPathDAG" src/spec-parser.ts`

### [x] Job sequencing
Sequence jobs.
Run: `grep -q "jobSequencing" src/spec-parser.ts`

### [x] Huffman coding
Compression.
Run: `grep -q "huffmanCode" src/spec-parser.ts`

### [x] LZW compression
LZW compression.
Run: `grep -q "lzwCompress" src/spec-parser.ts`

### [x] Run-length encoding
RLE compression.
Run: `grep -q "runLengthEncode" src/spec-parser.ts`

### [x] Z-function
Z-algorithm.
Run: `grep -q "zFunction" src/spec-parser.ts`

### [x] KMP algorithm
Knuth-Morris-Pratt.
Run: `grep -q "kmp" src/spec-parser.ts`

### [x] Boyer-Moore algorithm
String search.
Run: `grep -q "boyerMoore" src/spec-parser.ts`

### [x] Rabin-Karp algorithm
Hash-based search.
Run: `grep -q "rabinKarp" src/spec-parser.ts`

### [x] Aho-Corasick
Multi-pattern matching.
Run: `grep -q "ahoCorasick" src/spec-parser.ts`

### [x] Suffix array
Build suffix array.
Run: `grep -q "suffixArray" src/spec-parser.ts`

### [x] Suffix tree
Build suffix tree.
Run: `grep -q "suffixTree" src/spec-parser.ts`

### [x] Trie structure
Implement trie.
Run: `grep -q "Trie" src/spec-parser.ts`

### [x] Radix tree
Implement radix tree.
Run: `grep -q "RadixTree" src/spec-parser.ts`

### [x] Segment tree
Implement segment tree.
Run: `grep -q "SegmentTree" src/spec-parser.ts`

### [x] Binary indexed tree
Implement BIT/Fenwick.
Run: `grep -q "FenwickTree" src/spec-parser.ts`

### [x] R-tree
Spatial indexing.
Run: `grep -q "RTree" src/spec-parser.ts`

### [x] Quadtree
2D spatial tree.
Run: `grep -q "Quadtree" src/spec-parser.ts`

### [x] KD-tree
K-dimensional tree.
Run: `grep -q "KDTree" src/spec-parser.ts`

### [x] Skip list
Implement skip list.
Run: `grep -q "SkipList" src/spec-parser.ts`

### [x] Treap
Balanced BST.
Run: `grep -q "Treap" src/spec-parser.ts`

### [x] Red-black tree
RB-tree implementation.
Run: `grep -q "RedBlackTree" src/spec-parser.ts`

### [x] AVL tree
AVL tree implementation.
Run: `grep -q "AVLTree" src/spec-parser.ts`

### [x] B-tree
B-tree implementation.
Run: `grep -q "BTree" src/spec-parser.ts`

### [x] B+ tree
B+ tree implementation.
Run: `grep -q "BPlusTree" src/spec-parser.ts`

### [x] Splay tree
Splay tree implementation.
Run: `grep -q "SplayTree" src/spec-parser.ts`

### [x] WebAssembly module interface
WASMModule interface.
Run: `grep -q "WASMModule" src/types.ts`

### [x] WASM compilation
Compile to WebAssembly.
Run: `grep -q "compileWASM" src/spec-parser.ts`

### [x] WASM instantiation
Instantiate WASM module.
Run: `grep -q "instantiateWASM" src/spec-parser.ts`

### [x] WebGPU device interface
GPUDevice interface.
Run: `grep -q "GPUDevice" src/types.ts`

### [x] GPU shader compilation
Compile compute shaders.
Run: `grep -q "compileShader" src/spec-parser.ts`

### [x] GPU buffer management
Manage GPU buffers.
Run: `grep -q "createGPUBuffer" src/spec-parser.ts`

### [x] gRPC streaming
Bidirectional streaming.
Run: `grep -q "grpcStreaming" src/spec-parser.ts`

### [x] Protocol buffer parsing
Parse protobuf messages.
Run: `grep -q "parseProtobuf" src/spec-parser.ts`

### [x] OpenTelemetry interface
OTLPSpan interface.
Run: `grep -q "OTLPSpan" src/types.ts`

### [x] Trace propagation
Propagate traces.
Run: `grep -q "propagateTrace" src/spec-parser.ts`

### [x] Metrics exporter
Export Prometheus metrics.
Run: `grep -q "exportMetrics" src/spec-parser.ts`

### [x] Log aggregation
Aggregate logs.
Run: `grep -q "aggregateLogs" src/spec-parser.ts`

### [x] Distributed tracing
Distributed trace context.
Run: `grep -q "distributedTrace" src/spec-parser.ts`

### [x] Health endpoint
Health check endpoint.
Run: `grep -q "healthEndpoint" src/spec-parser.ts`

### [x] Readiness endpoint
Readiness probe endpoint.
Run: `grep -q "readinessEndpoint" src/spec-parser.ts`

### [x] Liveness endpoint
Liveness probe endpoint.
Run: `grep -q "livenessEndpoint" src/spec-parser.ts`

### [x] Horizontal pod autoscaler
HPA configuration.
Run: `grep -q "hpaConfig" src/types.ts`

### [x] Vertical pod autoscaler
VPA configuration.
Run: `grep -q "vpaConfig" src/types.ts`

### [x] ConfigMap management
Manage ConfigMaps.
Run: `grep -q "manageConfigMap" src/spec-parser.ts`

### [x] Secret management
Manage secrets.
Run: `grep -q "manageSecret" src/spec-parser.ts`

### [x] PodDisruptionBudget
PDB configuration.
Run: `grep -q "pdbConfig" src/types.ts`

### [x] NetworkPolicy
Network policy rules.
Run: `grep -q "networkPolicy" src/types.ts`

### [x] ServiceMonitor
Prometheus ServiceMonitor.
Run: `grep -q "serviceMonitor" src/types.ts`

### [x] Ingress configuration
Ingress rules.
Run: `grep -q "ingressConfig" src/types.ts`

### [x] Certificate management
TLS certificate handling.
Run: `grep -q "certManager" src/spec-parser.ts`

### [x] Istio virtual service
Virtual service config.
Run: `grep -q "virtualService" src/types.ts`

### [x] Istio destination rule
Destination rule config.
Run: `grep -q "destinationRule" src/types.ts`

### [x] Envoy configuration
Envoy proxy config.
Run: `grep -q "envoyConfig" src/types.ts`

### [x] Linkerd service profile
Service profile config.
Run: `grep -q "serviceProfile" src/types.ts`

### [x] Kafka producer interface
KafkaProducer interface.
Run: `grep -q "KafkaProducer" src/types.ts`

### [x] Kafka consumer interface
KafkaConsumer interface.
Run: `grep -q "KafkaConsumer" src/types.ts`

### [x] Kafka topic management
Create/manage topics.
Run: `grep -q "manageTopic" src/spec-parser.ts`

### [x] Consumer group coordination
Consumer group offset.
Run: `grep -q "consumerGroup" src/spec-parser.ts`

### [x] RabbitMQ connection
AMQP connection.
Run: `grep -q "amqpConnection" src/spec-parser.ts`

### [x] Queue declaration
Declare queues.
Run: `grep -q "declareQueue" src/spec-parser.ts`

### [x] Exchange binding
Bind exchanges.
Run: `grep -q "bindExchange" src/spec-parser.ts`

### [x] Redis pub/sub
Redis publish/subscribe.
Run: `grep -q "redisPubSub" src/spec-parser.ts`

### [x] Redis transaction
MULTI/EXEC transaction.
Run: `grep -q "redisTransaction" src/spec-parser.ts`

### [x] Redis clustering
Redis cluster mode.
Run: `grep -q "redisCluster" src/spec-parser.ts`

### [x] PostgreSQL connection pool
PgBouncer-like pooling.
Run: `grep -q "pgPool" src/spec-parser.ts`

### [x] MySQL replication
Replication setup.
Run: `grep -q "mysqlReplication" src/spec-parser.ts`

### [x] MongoDB sharding
Shard configuration.
Run: `grep -q "mongoShard" src/spec-parser.ts`

### [x] Cassandra query planner
CQL query optimization.
Run: `grep -q "cqlPlanner" src/spec-parser.ts`

### [x] Neo4j graph queries
Cypher query execution.
Run: `grep -q "cypherQuery" src/spec-parser.ts`

### [x] Elasticsearch indexing
Index documents.
Run: `grep -q "esIndex" src/spec-parser.ts`

### [x] Elasticsearch aggregation
Aggregation queries.
Run: `grep -q "esAggregate" src/spec-parser.ts`

### [x] Elasticsearch mapping
Mapping management.
Run: `grep -q "esMapping" src/spec-parser.ts`

### [x] InfluxDB series
Time series data.
Run: `grep -q "influxSeries" src/spec-parser.ts`

### [x] TimescaleDB hypertable
Hypertables.
Run: `grep -q "hypertable" src/spec-parser.ts`

### [x] CockroachDB range
Range management.
Run: `grep -q "crdbRange" src/spec-parser.ts`

### [x] TiDB optimistic locking
Optimistic transactions.
Run: `grep -q "optimisticLock" src/spec-parser.ts`

### [x] ScyllaDB materialized view
Materialized views.
Run: `grep -q "materializedView" src/spec-parser.ts`

### [x] DynamoDB global table
Global tables.
Run: `grep -q "globalTable" src/types.ts`

### [x] DynamoDB stream processing
Stream handling.
Run: `grep -q "dynamoStream" src/spec-parser.ts`

### [x] SQS queue management
SQS operations.
Run: `grep -q "sqsQueue" src/spec-parser.ts`

### [x] SNS topic subscription
SNS publish/subscribe.
Run: `grep -q "snsTopic" src/spec-parser.ts`

### [x] Lambda function
Serverless function.
Run: `grep -q "lambdaFunction" src/types.ts`

### [x] Step functions workflow
State machine execution.
Run: `grep -q "stepFunction" src/spec-parser.ts`

### [x] EventBridge rule
Event routing rules.
Run: `grep -q "eventRule" src/spec-parser.ts`

### [x] Kinesis stream processing
Kinesis data stream.
Run: `grep -q "kinesisStream" src/spec-parser.ts`

### [x] Glue job orchestration
ETL job scheduling.
Run: `grep -q "glueJob" src/spec-parser.ts`

### [x] EMR cluster management
Spark cluster config.
Run: `grep -q "emrCluster" src/spec-parser.ts`

### [x] S3 multipart upload
Multipart upload.
Run: `grep -q "s3Multipart" src/spec-parser.ts`

### [x] CloudFront invalidation
Cache invalidation.
Run: `grep -q "cfInvalidation" src/spec-parser.ts`

### [x] Route53 DNS management
DNS record sets.
Run: `grep -q "route53Record" src/spec-parser.ts`

### [x] ACM certificate
AWS certificate management.
Run: `grep -q "acmCertificate" src/spec-parser.ts`

### [x] WAF web ACL
Web ACL rules.
Run: `grep -q "webACL" src/types.ts`

### [x] Shield DDoS protection
DDoS mitigation.
Run: `grep -q "ddosProtection" src/spec-parser.ts`

### [x] Secrets Manager rotation
Secret rotation.
Run: `grep -q "rotateSecret" src/spec-parser.ts`

### [x] Parameter Store
SSM parameters.
Run: `grep -q "ssmParameter" src/spec-parser.ts`

### [x] Virtual DOM interface
VirtualNode interface.
Run: `grep -q "VirtualNode" src/types.ts`

### [x] Component renderer
Render component.
Run: `grep -q "renderComponent" src/spec-parser.ts`

### [x] Reconciliation algorithm
Diff virtual DOM.
Run: `grep -q "reconcile" src/spec-parser.ts`

### [x] Fiber node structure
FiberNode interface.
Run: `grep -q "FiberNode" src/types.ts`

### [x] Schedule work
Scheduler integration.
Run: `grep -q "scheduleWork" src/spec-parser.ts`

### [x] Concurrent mode
Concurrent rendering.
Run: `grep -q "concurrentMode" src/spec-parser.ts`

### [x] Suspense boundary
Suspense handling.
Run: `grep -q "suspenseBoundary" src/spec-parser.ts`

### [x] Server components
RSC rendering.
Run: `grep -q "serverComponent" src/spec-parser.ts`

### [x] Streaming SSR
Streaming HTML.
Run: `grep -q "streamSSR" src/spec-parser.ts`

### [x] Hydration
Client hydration.
Run: `grep -q "hydrate" src/spec-parser.ts`

### [x] Error boundary
Error boundary handling.
Run: `grep -q "errorBoundary" src/spec-parser.ts`

### [x] Ref forwarding
Forward ref.
Run: `grep -q "forwardRef" src/spec-parser.ts`

### [x] Context provider
React context.
Run: `grep -q "createContext" src/spec-parser.ts`

### [x] Memoization
React.memo.
Run: `grep -q "memo" src/spec-parser.ts`

### [x] useCallback
Callback memoization.
Run: `grep -q "useCallback" src/spec-parser.ts`

### [x] useMemo
Value memoization.
Run: `grep -q "useMemo" src/spec-parser.ts`

### [x] useReducer
State reducer.
Run: `grep -q "useReducer" src/spec-parser.ts`

### [x] useLayoutEffect
Layout effects.
Run: `grep -q "useLayoutEffect" src/spec-parser.ts`

### [x] useTransition
Transition hook.
Run: `grep -q "useTransition" src/spec-parser.ts`

### [x] useDeferredValue
Deferred values.
Run: `grep -q "useDeferredValue" src/spec-parser.ts`

### [x] useSyncExternalStore
External store.
Run: `grep -q "useSyncExternalStore" src/spec-parser.ts`

### [x] CSS-in-JS
Style generation.
Run: `grep -q "cssInJs" src/spec-parser.ts`

### [x] CSS modules
Module resolution.
Run: `grep -q "cssModules" src/spec-parser.ts`

### [x] Tailwind processing
Tailwind utilities.
Run: `grep -q "tailwindProcess" src/spec-parser.ts`

### [x] GraphQL schema
Schema definition.
Run: `grep -q "buildSchema" src/spec-parser.ts`

### [x] GraphQL resolver
Resolver function.
Run: `grep -q "resolver" src/spec-parser.ts`

### [x] GraphQL subscription
Subscription setup.
Run: `grep -q "graphqlSubscription" src/spec-parser.ts`

### [x] Relay connection
Relay pagination.
Run: `grep -q "relayConnection" src/spec-parser.ts`

### [x] Apollo cache
Normalized cache.
Run: `grep -q "apolloCache" src/spec-parser.ts`

### [x] REST route handler
Express route.
Run: `grep -q "expressRoute" src/spec-parser.ts`

### [x] Middleware chain
Middleware stack.
Run: `grep -q "middlewareChain" src/spec-parser.ts`

### [x] Request validation
Validate request.
Run: `grep -q "validateRequest" src/spec-parser.ts`

### [x] Response serialization
Serialize response.
Run: `grep -q "serializeResponse" src/spec-parser.ts`

### [x] CORS handling
CORS headers.
Run: `grep -q "corsHeaders" src/spec-parser.ts`

### [x] Rate limiting
Rate limit middleware.
Run: `grep -q "rateLimit" src/spec-parser.ts`

### [x] JWT verification
Verify JWT.
Run: `grep -q "verifyJWT" src/spec-parser.ts`

### [x] OAuth2 flow
OAuth2 provider.
Run: `grep -q "oauth2Flow" src/spec-parser.ts`

### [x] SAML assertion
SAML handling.
Run: `grep -q "samlAssertion" src/spec-parser.ts`

### [x] LDAP authentication
LDAP bind.
Run: `grep -q "ldapAuth" src/spec-parser.ts`

### [x] Session store
Session management.
Run: `grep -q "sessionStore" src/spec-parser.ts`

### [x] Cookie handling
Cookie parsing.
Run: `grep -q "parseCookie" src/spec-parser.ts`

### [x] CSRF protection
CSRF token.
Run: `grep -q "csrfToken" src/spec-parser.ts`

### [x] CSP headers
Content Security Policy.
Run: `grep -q "cspHeaders" src/spec-parser.ts`

### [x] i18n translator
Translate message.
Run: `grep -q "translate" src/spec-parser.ts`

### [x] Pluralization
Plural forms.
Run: `grep -q "pluralize" src/spec-parser.ts`

### [x] Number formatting
Format number.
Run: `grep -q "formatNumber" src/spec-parser.ts`

### [x] Date formatting
Format date.
Run: `grep -q "formatDate" src/spec-parser.ts`

### [x] Relative time
Relative timestamp.
Run: `grep -q "relativeTime" src/spec-parser.ts`

### [x] URL routing
Route matcher.
Run: `grep -q "matchRoute" src/spec-parser.ts`

### [x] Query parsing
Parse query string.
Run: `grep -q "parseQuery" src/spec-parser.ts`

### [x] Form encoding
URL encode form.
Run: `grep -q "urlEncodeForm" src/spec-parser.ts`

### [x] File upload
Multipart handler.
Run: `grep -q "handleUpload" src/spec-parser.ts`

### [x] Image optimization
Optimize image.
Run: `grep -q "optimizeImage" src/spec-parser.ts`

### [x] Video transcoding
Transcode video.
Run: `grep -q "transcodeVideo" src/spec-parser.ts`

### [x] Audio processing
Process audio.
Run: `grep -q "processAudio" src/spec-parser.ts`

### [x] PDF generation
Generate PDF.
Run: `grep -q "generatePDF" src/spec-parser.ts`

### [x] WebSocket handler
WS connection.
Run: `grep -q "websocketHandler" src/spec-parser.ts`

### [x] SSE endpoint
Server-sent events.
Run: `grep -q "sseEndpoint" src/spec-parser.ts`

### [x] HTTP/2 push
H2 push headers.
Run: `grep -q "h2Push" src/spec-parser.ts`

### [x] gRPC reflection
Service reflection.
Run: `grep -q "grpcReflect" src/spec-parser.ts`

### [x] GraphQL federation
Federation subgraph.
Run: `grep -q "federationSubgraph" src/spec-parser.ts`

### [x] Apollo Router
Router config.
Run: `grep -q "apolloRouter" src/spec-parser.ts`

### [x] tRPC procedure
tRPC handler.
Run: `grep -q "trpcProcedure" src/spec-parser.ts`

### [x] Prisma client
Prisma query.
Run: `grep -q "prismaQuery" src/spec-parser.ts`

### [x] Drizzle ORM
Drizzle schema.
Run: `grep -q "drizzleSchema" src/spec-parser.ts`

### [x] SQLCipher
Encrypted SQL.
Run: `grep -q "sqlCipher" src/spec-parser.ts`

### [x] SQLite FTS
Full-text search.
Run: `grep -q "sqliteFTS" src/spec-parser.ts`

### [x] Blockchain interface
Blockchain interface.
Run: `grep -q "interface Blockchain" src/types.ts`

### [x] Merkle proof
Verify Merkle proof.
Run: `grep -q "verifyMerkleProof" src/spec-parser.ts`

### [x] Transaction signing
Sign transaction.
Run: `grep -q "signTransaction" src/spec-parser.ts`

### [x] Smart contract
Deploy contract.
Run: `grep -q "deployContract" src/spec-parser.ts`

### [x] Token transfer
Transfer tokens.
Run: `grep -q "transferToken" src/spec-parser.ts`

### [x] NFT minting
Mint NFT.
Run: `grep -q "mintNFT" src/spec-parser.ts`

### [x] DAO governance
Propose governance.
Run: `grep -q "daoProposal" src/spec-parser.ts`

### [x] Layer 2 rollup
Rollup transaction.
Run: `grep -q "layer2Rollup" src/spec-parser.ts`

### [x] Cross-chain bridge
Bridge assets.
Run: `grep -q "crossChainBridge" src/spec-parser.ts`

### [x] Quantum gate
Apply quantum gate.
Run: `grep -q "applyGate" src/spec-parser.ts`

### [x] Qubit measurement
Measure qubit.
Run: `grep -q "measureQubit" src/spec-parser.ts`

### [x] Quantum entanglement
Entangle qubits.
Run: `grep -q "entangleQubits" src/spec-parser.ts`

### [x] Quantum circuit
Build circuit.
Run: `grep -q "buildCircuit" src/spec-parser.ts`

### [x] Grover search
Grover's algorithm.
Run: `grep -q "groverSearch" src/spec-parser.ts`

### [x] Shor's algorithm
Integer factorization.
Run: `grep -q "shorsAlgorithm" src/spec-parser.ts`

### [x] VQE algorithm
Variational quantum.
Run: `grep -q "vqeAlgorithm" src/spec-parser.ts`

### [x] Neural network
Train network.
Run: `grep -q "trainNetwork" src/spec-parser.ts`

### [x] Backpropagation
Backprop gradients.
Run: `grep -q "backprop" src/spec-parser.ts`

### [x] Gradient descent
Optimize weights.
Run: `grep -q "gradientDescent" src/spec-parser.ts`

### [x] Convolutional layer
Conv operation.
Run: `grep -q "convLayer" src/spec-parser.ts`

### [x] Pooling layer
Max pool.
Run: `grep -q "poolLayer" src/spec-parser.ts`

### [x] LSTM cell
Long short-term memory.
Run: `grep -q "lstmCell" src/spec-parser.ts`

### [x] Attention mechanism
Self-attention.
Run: `grep -q "attention" src/spec-parser.ts`

### [x] Transformer model
Build transformer.
Run: `grep -q "transformer" src/spec-parser.ts`

### [x] Embedding layer
Word embeddings.
Run: `grep -q "embeddingLayer" src/spec-parser.ts`

### [x] Batch normalization
Normalize batch.
Run: `grep -q "batchNorm" src/spec-parser.ts`

### [x] Dropout layer
Dropout regularize.
Run: `grep -q "dropout" src/spec-parser.ts`

### [x] GAN training
Train GAN.
Run: `grep -q "trainGAN" src/spec-parser.ts`

### [x] VAE model
Variational autoencoder.
Run: `grep -q "vaeModel" src/spec-parser.ts`

### [x] Diffusion model
Sample diffusion.
Run: `grep -q "diffusionSample" src/spec-parser.ts`

### [x] Reinforcement learning
RL agent.
Run: `grep -q "rlAgent" src/spec-parser.ts`

### [x] Q-learning
Update Q-values.
Run: `grep -q "qLearning" src/spec-parser.ts`

### [x] Policy gradient
Policy optimization.
Run: `grep -q "policyGradient" src/spec-parser.ts`

### [x] Genetic algorithm
Evolve population.
Run: `grep -q "geneticAlgo" src/spec-parser.ts`

### [x] Particle swarm
Particle optimization.
Run: `grep -q "particleSwarm" src/spec-parser.ts`

### [x] Ant colony
ACO optimization.
Run: `grep -q "antColony" src/spec-parser.ts`

### [x] Simulated annealing
Anneal solution.
Run: `grep -q "anneal" src/spec-parser.ts`

### [x] Tabu search
Tabu optimization.
Run: `grep -q "tabuSearch" src/spec-parser.ts`

### [x] Bayesian network
Build Bayes net.
Run: `grep -q "bayesNet" src/spec-parser.ts`

### [x] Hidden Markov model
HMM inference.
Run: `grep -q "hmmInference" src/spec-parser.ts`

### [x] CRF layer
Conditional random field.
Run: `grep -q "crfLayer" src/spec-parser.ts`

### [x] Kalman filter
Filter state.
Run: `grep -q "kalmanFilter" src/spec-parser.ts`

### [x] Particle filter
Particle filter.
Run: `grep -q "particleFilter" src/spec-parser.ts`

### [x] PID controller
PID control.
Run: `grep -q "pidControl" src/spec-parser.ts`

### [x] Fuzzy logic
Fuzzy inference.
Run: `grep -q "fuzzyInference" src/spec-parser.ts`

### [x] Chaos detection
Lyapunov exponent.
Run: `grep -q "lyapunovExponent" src/spec-parser.ts`

### [x] Fractal analysis
Mandelbrot set.
Run: `grep -q "mandelbrot" src/spec-parser.ts`

### [x] Wavelet transform
Wavelet decomposition.
Run: `grep -q "waveletTransform" src/spec-parser.ts`

### [x] Fourier transform
FFT computation.
Run: `grep -q "fft" src/spec-parser.ts`

### [x] DCT compression
DCT encoding.
Run: `grep -q "dctEncode" src/spec-parser.ts`

### [x] JPEG encoding
JPEG compression.
Run: `grep -q "jpegEncode" src/spec-parser.ts`

### [x] PNG encoding
PNG compression.
Run: `grep -q "pngEncode" src/spec-parser.ts`

### [x] MP3 encoding
MP3 compression.
Run: `grep -q "mp3Encode" src/spec-parser.ts`

### [x] H264 encoding
H264 video encode.
Run: `grep -q "h264Encode" src/spec-parser.ts`

### [x] WebM encoding
WebM encode.
Run: `grep -q "webmEncode" src/spec-parser.ts`

### [x] Ray tracing
Ray trace scene.
Run: `grep -q "rayTrace" src/spec-parser.ts`

### [x] Path tracing
Path trace.
Run: `grep -q "pathTrace" src/spec-parser.ts`

### [x] Rasterization
Rasterize geometry.
Run: `grep -q "rasterize" src/spec-parser.ts`

### [x] SDF rendering
SDF ray march.
Run: `grep -q "sdfMarch" src/spec-parser.ts`

### [x] Voxel rendering
Voxel render.
Run: `grep -q "voxelRender" src/spec-parser.ts`

### [x] Physically-based shading
PBR shading.
Run: `grep -q "pbrShade" src/spec-parser.ts`

### [x] Normal mapping
Normal map.
Run: `grep -q "normalMap" src/spec-parser.ts`

### [x] Ambient occlusion
AO calculation.
Run: `grep -q "ambientOcclusion" src/spec-parser.ts`

### [x] Ray casting
Cast rays.
Run: `grep -q "rayCast" src/spec-parser.ts`

### [x] IoT device interface
IoTDevice interface.
Run: `grep -q "IoTDevice" src/types.ts`

### [x] MQTT publish
Publish message.
Run: `grep -q "mqttPublish" src/spec-parser.ts`

### [x] CoAP request
CoAP protocol.
Run: `grep -q "coapRequest" src/spec-parser.ts`

### [x] Modbus protocol
Modbus RTU.
Run: `grep -q "modbusRead" src/spec-parser.ts`

### [x] OPC-UA connection
OPC-UA client.
Run: `grep -q "opcuaConnect" src/spec-parser.ts`

### [x] CAN bus frame
CAN frame.
Run: `grep -q "canFrame" src/spec-parser.ts`

### [x] BLE scanning
Scan BLE devices.
Run: `grep -q "bleScan" src/spec-parser.ts`

### [x] Zigbee frame
Zigbee packet.
Run: `grep -q "zigbeeFrame" src/spec-parser.ts`

### [x] Thread protocol
Thread network.
Run: `grep -q "threadNetwork" src/spec-parser.ts`

### [x] Matter device
Matter protocol.
Run: `grep -q "matterDevice" src/spec-parser.ts`

### [x] Z-Wave command
Z-Wave control.
Run: `grep -q "zwaveCommand" src/spec-parser.ts`

### [x] HomeKit pairing
HAP pairing.
Run: `grep -q "homekitPair" src/spec-parser.ts`

### [x] BACnet device
BACnet/IP.
Run: `grep -q "bacnetDevice" src/spec-parser.ts`

### [x] LonWorks network
LonTalk protocol.
Run: `grep -q "lonworks" src/spec-parser.ts`

### [x] DALI lighting
DALI command.
Run: `grep -q "daliCommand" src/spec-parser.ts`

### [x] KNX telegram
KNX protocol.
Run: `grep -q "knxTelegram" src/spec-parser.ts`

### [x] EnOcean packet
EnOcean radio.
Run: `grep -q "enoceanPacket" src/spec-parser.ts`

### [x] FHEM integration
FHEM automation.
Run: `grep -q "fhemIntegrate" src/spec-parser.ts`

### [x] OpenHAB binding
OH binding.
Run: `grep -q "openhabBinding" src/spec-parser.ts`

### [x] Home Assistant entity
HA entity.
Run: `grep -q "haEntity" src/spec-parser.ts`

### [x] Node-RED flow
NR flow node.
Run: `grep -q "noderedFlow" src/spec-parser.ts`

### [x] Grafana dashboard
Dashboard JSON.
Run: `grep -q "grafanaDashboard" src/spec-parser.ts`

### [x] Prometheus alerting
Alert rule.
Run: `grep -q "prometheusAlert" src/spec-parser.ts`

### [x] Datadog monitor
DD monitor.
Run: `grep -q "datadogMonitor" src/spec-parser.ts`

### [x] Splunk query
SPL query.
Run: `grep -q "splunkQuery" src/spec-parser.ts`

### [x] ELK stack
Elastic stack.
Run: `grep -q "elkStack" src/spec-parser.ts`

### [x] Jaeger tracing
Distributed trace.
Run: `grep -q "jaegerTrace" src/spec-parser.ts`

### [x] Zipkin trace
Zipkin span.
Run: `grep -q "zipkinSpan" src/spec-parser.ts`

### [x] Honeycomb event
HC event.
Run: `grep -q "honeycombEvent" src/spec-parser.ts`

### [x] Sentry error
Error tracking.
Run: `grep -q "sentryError" src/spec-parser.ts`

### [x] PagerDuty alert
PD incident.
Run: `grep -q "pagerdutyAlert" src/spec-parser.ts`

### [x] OpsGenie alert
OG alert.
Run: `grep -q "opsgenieAlert" src/spec-parser.ts`

### [x] Slack notification
Slack webhook.
Run: `grep -q "slackNotify" src/spec-parser.ts`

### [x] Teams notification
Teams webhook.
Run: `grep -q "teamsNotify" src/spec-parser.ts`

### [x] Discord webhook
Discord embed.
Run: `grep -q "discordWebhook" src/spec-parser.ts`

### [x] Email alert
SMTP send.
Run: `grep -q "smtpSend" src/spec-parser.ts`

### [x] SMS notification
SMS gateway.
Run: `grep -q "smsNotify" src/spec-parser.ts`

### [x] Push notification
FCM/APNs.
Run: `grep -q "pushNotify" src/spec-parser.ts`

### [x] Webhook delivery
HTTP webhook.
Run: `grep -q "webhookDeliver" src/spec-parser.ts`

### [x] IRC notification
IRC message.
Run: `grep -q "ircMessage" src/spec-parser.ts`

### [x] Matrix message
Matrix room.
Run: `grep -q "matrixMessage" src/spec-parser.ts`

### [x] XMPP message
XMPP stanza.
Run: `grep -q "xmppMessage" src/spec-parser.ts`

### [x] Matrix-synapse admin
Synapse API.
Run: `grep -q "synapseAdmin" src/spec-parser.ts`

### [x] Mattermost post
MM channel.
Run: `grep -q "mattermostPost" src/spec-parser.ts`

### [x] Rocket chat
RC message.
Run: `grep -q "rocketChat" src/spec-parser.ts`

### [x] Zulip message
Zulip stream.
Run: `grep -q "zulipMessage" src/spec-parser.ts`

### [x] Telegram bot
TG bot.
Run: `grep -q "telegramBot" src/spec-parser.ts`

### [x] WhatsApp Business
WA message.
Run: `grep -q "whatsappMessage" src/spec-parser.ts`

### [x] Signal messaging
Signal protocol.
Run: `grep -q "signalMessage" src/spec-parser.ts`

### [x] Matrix E2EE
E2E encryption.
Run: `grep -q "matrixE2EE" src/spec-parser.ts`

### [x] OMEMO encryption
OMEMO protocol.
Run: `grep -q "omemoProtocol" src/spec-parser.ts`

### [x] Signal protocol
Double Ratchet.
Run: `grep -q "doubleRatchet" src/spec-parser.ts`

### [x] MLS messaging
MLS protocol.
Run: `grep -q "mlsProtocol" src/spec-parser.ts`

### [x] Tox protocol
Tox DHT.
Run: `grep -q "toxProtocol" src/spec-parser.ts`

### [x] Briar messaging
Briar protocol.
Run: `grep -q "briarProtocol" src/spec-parser.ts`

### [x] Session messenger
Session protocol.
Run: `grep -q "sessionProtocol" src/spec-parser.ts`

### [x] Wire messenger
Wire protocol.
Run: `grep -q "wireProtocol" src/spec-parser.ts`

### [x] Threema gateway
Threema API.
Run: `grep -q "threemaGateway" src/spec-parser.ts`

### [x] Keybase proof
Keybase proof.
Run: `grep -q "keybaseProof" src/spec-parser.ts`

### [x] Keyoxide proof
Keyoxide claim.
Run: `grep -q "keyoxideClaim" src/spec-parser.ts`

### [x] ActivityPub actor
Fediverse actor.
Run: `grep -q "activityPubActor" src/spec-parser.ts`

### [x] Mastodon toot
Mastodon post.
Run: `grep -q "mastodonPost" src/spec-parser.ts`

### [x] Pixelfed image
Image federation.
Run: `grep -q "pixelfedUpload" src/spec-parser.ts`

### [x] PeerTube video
Video federation.
Run: `grep -q "peertubeUpload" src/spec-parser.ts`

### [x] Lemmy post
Lemmy post.
Run: `grep -q "lemmyPost" src/spec-parser.ts`

### [x] Pleroma post
Pleroma post.
Run: `grep -q "pleromaPost" src/spec-parser.ts`

### [x] WriteFreely blog
Blog post.
Run: `grep -q "writeFreelyPost" src/spec-parser.ts`

### [x] Funkwhale music
Music upload.
Run: `grep -q "funkwhaleUpload" src/spec-parser.ts`

### [x] Castopod episode
Podcast episode.
Run: `grep -q "castopodEpisode" src/spec-parser.ts`

### [x] BookWyrm book
Book activity.
Run: `grep -q "bookwyrmActivity" src/spec-parser.ts`

### [x] CAD geometry
DXF import.
Run: `grep -q "dxfImport" src/spec-parser.ts`

### [x] STL mesh
STL parser.
Run: `grep -q "stlParse" src/spec-parser.ts`

### [x] OBJ model
OBJ loader.
Run: `grep -q "objLoad" src/spec-parser.ts`

### [x] GLTF scene
GLTF loader.
Run: `grep -q "gltfLoad" src/spec-parser.ts`

### [x] USD scene
USD parser.
Run: `grep -q "usdParse" src/spec-parser.ts`

### [x] IFC building
IFC parser.
Run: `grep -q "ifcParse" src/spec-parser.ts`

### [x] STEP file
STEP/AP242.
Run: `grep -q "stepParse" src/spec-parser.ts`

### [x] OpenSCAD script
SCAD generator.
Run: `grep -q "openscadScript" src/spec-parser.ts`

### [x] FreeCAD part
FC part.
Run: `grep -q "freecadPart" src/spec-parser.ts`

### [x] Blender Python
BPy script.
Run: `grep -q "blenderScript" src/spec-parser.ts`

### [x] KiCad schematic
KiCad netlist.
Run: `grep -q "kicadNetlist" src/spec-parser.ts`

### [x] Eagle PCB
Eagle BRD.
Run: `grep -q "eagleBoard" src/spec-parser.ts`

### [x] Gerber file
Gerber parser.
Run: `grep -q "gerberParse" src/spec-parser.ts`

### [x] Altium PCB
Altium design.
Run: `grep -q "altiumDesign" src/spec-parser.ts`

### [x] LTSpice netlist
SPICE sim.
Run: `grep -q "spiceSim" src/spec-parser.ts`

### [x] Ngspice model
NGspice.
Run: `grep -q "ngspiceModel" src/spec-parser.ts`

### [x] Modelica model
Modelica sim.
Run: `grep -q "modelicaSim" src/spec-parser.ts`

### [x] Simulink model
MATLAB/Simulink.
Run: `grep -q "simulinkModel" src/spec-parser.ts`

### [x] LabVIEW VI
LabVIEW code.
Run: `grep -q "labviewVI" src/spec-parser.ts`

### [x] ROS node
ROS2 node.
Run: `grep -q "rosNode" src/spec-parser.ts`

### [x] ROS topic
Topic publish.
Run: `grep -q "rosTopic" src/spec-parser.ts`

### [x] MoveIt plan
Motion planning.
Run: `grep -q "moveitPlan" src/spec-parser.ts`

### [x] Gazebo sim
Gazebo world.
Run: `grep -q "gazeboWorld" src/spec-parser.ts`

### [x] URDF model
Robot model.
Run: `grep -q "urdfModel" src/spec-parser.ts`

### [x] MoveBase action
Navigation.
Run: `grep -q "movebaseAction" src/spec-parser.ts`

### [x] PCL point cloud
Point cloud.
Run: `grep -q "pclPointCloud" src/spec-parser.ts`

### [x] OpenCV detection
CV detection.
Run: `grep -q "opencvDetect" src/spec-parser.ts`

### [x] YOLO detection
Object detection.
Run: `grep -q "yoloDetect" src/spec-parser.ts`

### [x] MediaPipe tracking
MediaPipe model.
Run: `grep -q "mediapipeTrack" src/spec-parser.ts`

### [x] ARKit session
ARKit tracking.
Run: `grep -q "arkitSession" src/spec-parser.ts`

### [x] ARCore session
ARCore tracking.
Run: `grep -q "arcoreSession" src/spec-parser.ts`

### [x] HoloLens app
HoloLens.
Run: `grep -q "hololensApp" src/spec-parser.ts`

### [x] WebXR experience
WebXR.
Run: `grep -q "webxrExperience" src/spec-parser.ts`

### [x] Three.js scene
Three.js.
Run: `grep -q "threejsScene" src/spec-parser.ts`

### [x] Babylon.js scene
Babylon.js.
Run: `grep -q "babylonScene" src/spec-parser.ts`

### [x] Unreal project
UE project.
Run: `grep -q "unrealProject" src/spec-parser.ts`

### [x] Godot scene
Godot project.
Run: `grep -q "godotScene" src/spec-parser.ts`

### [x] Unity prefab
Unity project.
Run: `grep -q "unityPrefab" src/spec-parser.ts`

### [x] Godot GDScript
GDScript.
Run: `grep -q "gdScript" src/spec-parser.ts`

### [x] Unreal Blueprint
Blueprint.
Run: `grep -q "ueBlueprint" src/spec-parser.ts`

### [x] Godot shader
Shader script.
Run: `grep -q "godotShader" src/spec-parser.ts`

### [x] Vulkan pipeline
Vulkan pipeline.
Run: `grep -q "vulkanPipeline" src/spec-parser.ts`

### [x] Metal pipeline
Metal pipeline.
Run: `grep -q "metalPipeline" src/spec-parser.ts`

### [x] DirectX 12
DX12 pipeline.
Run: `grep -q "dx12Pipeline" src/spec-parser.ts`

### [x] OpenGL ES
GLES context.
Run: `grep -q "glesContext" src/spec-parser.ts`

### [x] WebGL shader
WebGL shader.
Run: `grep -q "webglShader" src/spec-parser.ts`

### [x] Vulkan ray tracing
VK ray tracing.
Run: `grep -q "vkRayTrace" src/spec-parser.ts`

### [x] DXR pipeline
DirectX Raytracing.
Run: `grep -q "dxrPipeline" src/spec-parser.ts`

### [x] SPIR-V bytecode
SPIR-V compile.
Run: `grep -q "spirvCompile" src/spec-parser.ts`

### [x] WGSL shader
WebGPU shader.
Run: `grep -q "wgslShader" src/spec-parser.ts`

### [x] HLSL shader
HLSL compile.
Run: `grep -q "hlslCompile" src/spec-parser.ts`

### [x] GLSL shader
GLSL compile.
Run: `grep -q "glslCompile" src/spec-parser.ts`

### [x] MSL shader
Metal shader.
Run: `grep -q "mslCompile" src/spec-parser.ts`

### [x] LLVM IR
LLVM module.
Run: `grep -q "llvmModule" src/spec-parser.ts`

### [x] WASM text format
WAT.
Run: `grep -q "watModule" src/spec-parser.ts`

### [x] Cranelift IR
Cranelift IR.
Run: `grep -q "craneliftIR" src/spec-parser.ts`

### [x] GCC plugin
GCC pass.
Run: `grep -q "gccPlugin" src/spec-parser.ts`

### [x] Clang plugin
Clang AST.
Run: `grep -q "clangPlugin" src/spec-parser.ts`

### [x] GDB Python
GDB script.
Run: `grep -q "gdbScript" src/spec-parser.ts`

### [x] LLDB script
LLDB Python.
Run: `grep -q "lldbScript" src/spec-parser.ts`

### [x] Valgrind tool
Valgrind tool.
Run: `grep -q "valgrindTool" src/spec-parser.ts`

### [x] Sanitizer tool
ASan/MSan/TSan.
Run: `grep -q "sanitizerTool" src/spec-parser.ts`

### [x] IDA Pro plugin
IDA plugin.
Run: `grep -q "idaPlugin" src/spec-parser.ts`

### [x] Ghidra script
Ghidra script.
Run: `grep -q "ghidraScript" src/spec-parser.ts`

### [x] Radare2 script
R2 script.
Run: `grep -q "radare2Script" src/spec-parser.ts`

### [x] Binary Ninja plugin
BN plugin.
Run: `grep -q "binjaPlugin" src/spec-parser.ts`

### [x] Capstone disasm
Capstone.
Run: `grep -q "capstoneDisasm" src/spec-parser.ts`

### [x] Unicorn engine
Unicorn.
Run: `grep -q "unicornEmu" src/spec-parser.ts`

### [x] QEMU plugin
QEMU plugin.
Run: `grep -q "qemuPlugin" src/spec-parser.ts`

### [x] Frida script
Frida script.
Run: `grep -q "fridaScript" src/spec-parser.ts`

### [x] AFL fuzzing
AFL++ harness.
Run: `grep -q "aflHarness" src/spec-parser.ts`

### [x] LibFuzzer target
LibFuzzer.
Run: `grep -q "libfuzzerTarget" src/spec-parser.ts`

### [x] SAT solver interface
SAT interface.
Run: `grep -q "SatSolver" src/types.ts`

### [x] SMT solver
Z3 query.
Run: `grep -q "smtQuery" src/spec-parser.ts`

### [x] Constraint solving
Solve CSP.
Run: `grep -q "solveCSP" src/spec-parser.ts`

### [x] Linear programming
LP solve.
Run: `grep -q "solveLP" src/spec-parser.ts`

### [x] Integer programming
IP solve.
Run: `grep -q "solveIP" src/spec-parser.ts`

### [x] MILP solver
MILP solve.
Run: `grep -q "solveMILP" src/spec-parser.ts`

### [x] Dynamic programming
DP solve.
Run: `grep -q "dpSolve" src/spec-parser.ts`

### [x] Divide and conquer
DnC algorithm.
Run: `grep -q "divideConquer" src/spec-parser.ts`

### [x] Backtracking search
Backtrack search.
Run: `grep -q "backtrackSearch" src/spec-parser.ts`

### [x] Branch and bound
Branch and bound.
Run: `grep -q "branchBound" src/spec-parser.ts`

### [x] A* search
A-star.
Run: `grep -q "aStarSearch" src/spec-parser.ts`

### [x] IDA* search
IDA-star.
Run: `grep -q "idaStarSearch" src/spec-parser.ts`

### [x] SMA* search
SMA-star.
Run: `grep -q "smaStarSearch" src/spec-parser.ts`

### [x] Beam search
Beam search.
Run: `grep -q "beamSearch" src/spec-parser.ts`

### [x] Hill climbing
Hill climb.
Run: `grep -q "hillClimb" src/spec-parser.ts`

### [x] Random restart
Random restart.
Run: `grep -q "randomRestart" src/spec-parser.ts`

### [x] Local beam
Local beam.
Run: `grep -q "localBeam" src/spec-parser.ts`

### [x] Stochastic search
Stochastic.
Run: `grep -q "stochasticSearch" src/spec-parser.ts`

### [x] Greedy search
Greedy search.
Run: `grep -q "greedySearch" src/spec-parser.ts`

### [x] Uniform cost
Uniform cost.
Run: `grep -q "uniformCost" src/spec-parser.ts`

### [x] Depth-first search
DFS search.
Run: `grep -q "dfsSearch" src/spec-parser.ts`

### [x] Breadth-first search
BFS search.
Run: `grep -q "bfsSearch" src/spec-parser.ts`

### [x] Iterative deepening
IDDFS.
Run: `grep -q "iterativeDeepening" src/spec-parser.ts`

### [x] Bidirectional search
Bidirectional.
Run: `grep -q "bidirectionalSearch" src/spec-parser.ts`

### [x] Jump point search
JPS algorithm.
Run: `grep -q "jumpPointSearch" src/spec-parser.ts`

### [x] Theta* search
Theta-star.
Run: `grep -q "thetaStar" src/spec-parser.ts`

### [x] D* Lite
D*-Lite.
Run: `grep -q "dStarLite" src/spec-parser.ts`

### [x] Field D* search
Field D*.
Run: `grep -q "fieldDStar" src/spec-parser.ts`

### [x] LPA* algorithm
LPA*.
Run: `grep -q "lpaStar" src/spec-parser.ts`

### [x] Anytime A*
Anytime A*.
Run: `grep -q "anytimeAStar" src/spec-parser.ts`

### [x] Weighted A*
Weighted A*.
Run: `grep -q "weightedAStar" src/spec-parser.ts`

### [x] Learning search
Learning real-time A*.
Run: `grep -q "lrtastar" src/spec-parser.ts`

### [x] Hierarchical A*
Hierarchical A*.
Run: `grep -q "hierarchicalAStar" src/spec-parser.ts`

### [x] Subgoaling
Subgoal graph.
Run: `grep -q "subgoalGraph" src/spec-parser.ts`

### [x] Contraction hierarchy
CH search.
Run: `grep -q "contractionHierarchy" src/spec-parser.ts`

### [x] ALT a priori
ALT heuristic.
Run: `grep -q "altHeuristic" src/spec-parser.ts`

### [x] Reach pruning
Reach heuristics.
Run: `grep -q "reachPruning" src/spec-parser.ts`

### [x] Portal heuristic
Portal heuristics.
Run: `grep -q "portalHeuristic" src/spec-parser.ts`

### [x] Grid robotics
Grid path planning.
Run: `grep -q "gridPlanning" src/spec-parser.ts`

### [x] Visibility graph
Visibility graph.
Run: `grep -q "visibilityGraph" src/spec-parser.ts`

### [x] Voronoi path
Voronoi path.
Run: `grep -q "voronoiPath" src/spec-parser.ts`

### [x] Probabilistic roadmap
PRM.
Run: `grep -q "prmPlanner" src/spec-parser.ts`

### [x] Rapidly-exploring RRT
RRT.
Run: `grep -q "rrtPlanner" src/spec-parser.ts`

### [x] RRT* optimal
RRT*.
Run: `grep -q "rrtStar" src/spec-parser.ts`

### [x] RRT-Connect
RRT-Connect.
Run: `grep -q "rrtConnect" src/spec-parser.ts`

### [x] Informed RRT*
Informed RRT*.
Run: `grep -q "informedRrtStar" src/spec-parser.ts`

### [x] Bi-RRT*
Bi-RRT*.
Run: `grep -q "biRrtStar" src/spec-parser.ts`

### [x] SPARS algorithm
SPARS.
Run: `grep -q "sparsAlgorithm" src/spec-parser.ts`

### [x] FMT* algorithm
FMT*.
Run: `grep -q "fmtStar" src/spec-parser.ts`

### [x] BIT* algorithm
BIT*.
Run: `grep -q "bitStar" src/spec-parser.ts`

### [x] AD* algorithm
Anytime D*.
Run: `grep -q "anytimeDStar" src/spec-parser.ts`

### [x] D* Lite variant
D* Lite variant.
Run: `grep -q "dStarLiteVariant" src/spec-parser.ts`

### [x] Focus search
Focus search.
Run: `grep -q "focusSearch" src/spec-parser.ts`

### [x] Multi-heuristic A*
MHA*.
Run: `grep -q "mhaStar" src/spec-parser.ts`

### [x] Search with advice
Advice heuristic.
Run: `grep -q "adviceHeuristic" src/spec-parser.ts`

### [x] Partial expansion
Partial expansion A*.
Run: `grep -q "partialExpansion" src/spec-parser.ts`

### [x] Bounded suboptimal
BSA search.
Run: `grep -q "bsaSearch" src/spec-parser.ts`

### [x] Scalable CSPA
Scalable CSPA.
Run: `grep -q "cspaPlanner" src/spec-parser.ts`

### [x] LSS-LRTA*
LSS-LRTA*.
Run: `grep -q "lssLrtaStar" src/spec-parser.ts`

### [x] D Niemeyer
DN-astar.
Run: `grep -q "dnAstar" src/spec-parser.ts`

### [x] HCP A*
HCP-astar.
Run: `grep -q "hcpAstar" src/spec-parser.ts`

### [x] HPA* algorithm
HPA*.
Run: `grep -q "hpaStar" src/spec-parser.ts`

### [x] Delta A*
Delta A*.
Run: `grep -q "deltaAstar" src/spec-parser.ts`

### [x] Adaptive A*
Adaptive A*.
Run: `grep -q "adaptiveAStar" src/spec-parser.ts`

### [x] Forward search
Forward planning.
Run: `grep -q "forwardPlanning" src/spec-parser.ts`

### [x] Backward search
Backward planning.
Run: `grep -q "backwardPlanning" src/spec-parser.ts`

### [x] Bidirectional planning
Bidirectional planning.
Run: `grep -q "bidirPlanning" src/spec-parser.ts`

### [x] HTN planning
Hierarchical task network.
Run: `grep -q "htnPlanning" src/spec-parser.ts`

### [x] PDDL planning
PDDL domain.
Run: `grep -q "pddlDomain" src/spec-parser.ts`

### [x] POPF planning
POPF planner.
Run: `grep -q "popfPlanner" src/spec-parser.ts`

### [x] Metric-FF planner
FF planner.
Run: `grep -q "ffPlanner" src/spec-parser.ts`

### [x] LPG planner
LPG-TDDP.
Run: `grep -q "lpgPlanner" src/spec-parser.ts`

### [x] Music XML parser
MusicXML reader.
Run: `grep -q "musicXmlParse" src/spec-parser.ts`

### [x] MIDI sequencer
MIDI track.
Run: `grep -q "midiSequencer" src/spec-parser.ts`

### [x] SoundFont loader
SoundFont2.
Run: `grep -q "soundfontLoad" src/spec-parser.ts`

### [x] WAV file parser
WAV reader.
Run: `grep -q "wavParse" src/spec-parser.ts`

### [x] FLAC encoding
FLAC compress.
Run: `grep -q "flacEncode" src/spec-parser.ts`

### [x] OGG Vorbis
OGG decode.
Run: `grep -q "oggDecode" src/spec-parser.ts`

### [x] Opus codec
Opus encode.
Run: `grep -q "opusEncode" src/spec-parser.ts`

### [x] AAC encoder
AAC encode.
Run: `grep -q "aacEncode" src/spec-parser.ts`

### [x] WebM muxing
WebM container.
Run: `grep -q "webmMux" src/spec-parser.ts`

### [x] MP4 muxing
MP4 container.
Run: `grep -q "mp4Mux" src/spec-parser.ts`

### [x] MKV handling
MKV container.
Run: `grep -q "mkvMux" src/spec-parser.ts`

### [x] AVI container
AVI mux.
Run: `grep -q "aviMux" src/spec-parser.ts`

### [x] Matroska EBML
EBML parser.
Run: `grep -q "ebmlParse" src/spec-parser.ts`

### [x] FFmpeg filter
FFmpeg graph.
Run: `grep -q "ffmpegFilter" src/spec-parser.ts`

### [x] GStreamer pipeline
GST pipeline.
Run: `grep -q "gstPipeline" src/spec-parser.ts`

### [x] V4L2 capture
Video capture.
Run: `grep -q "v4l2Capture" src/spec-parser.ts`

### [x] ALSA audio
ALSA device.
Run: `grep -q "alsaDevice" src/spec-parser.ts`

### [x] PulseAudio stream
PA stream.
Run: `grep -q "pulseStream" src/spec-parser.ts`

### [x] Jack audio
Jack client.
Run: `grep -q "jackClient" src/spec-parser.ts`

### [x] OSC music
OSC messages.
Run: `grep -q "oscMessage" src/spec-parser.ts`

### [x] MIDI IO
MIDI input/output.
Run: `grep -q "midiIO" src/spec-parser.ts`

### [x] DMX lighting
DMX512 control.
Run: `grep -q "dmxControl" src/spec-parser.ts`

### [x] ArtNet DMX
ArtNet protocol.
Run: `grep -q "artnetProtocol" src/spec-parser.ts`

### [x] sACN E1.31
E1.31 streaming.
Run: `grep -q "sacnStream" src/spec-parser.ts`

### [x] OpenPixelControl
OPC client.
Run: `grep -q "opcClient" src/spec-parser.ts`

### [x] WS2812 neopixel
NeoPixel strip.
Run: `grep -q "neopixelStrip" src/spec-parser.ts`

### [x] FadeCandy
FadeCandy device.
Run: `grep -q "fadeCandy" src/spec-parser.ts`

### [x] QLC+ fixture
QLC+ fixture.
Run: `grep -q "qlcFixture" src/spec-parser.ts`

### [x] Lightact timeline
LightAct timeline.
Run: `grep -q "lightactTimeline" src/spec-parser.ts`

### [x] MadMapper output
MadMapper.
Run: `grep -q "madmapperOutput" src/spec-parser.ts`

### [x] Resolume layer
Resolume layer.
Run: `grep -q "resolumeLayer" src/spec-parser.ts`

### [x] Millumin state
Millumin.
Run: `grep -q "milluminState" src/spec-parser.ts`

### [x] Modul8 control
Modul8.
Run: `grep -q "modul8Control" src/spec-parser.ts`

### [x] VVVV patching
VVVV patch.
Run: `grep -q "vvvvPatch" src/spec-parser.ts`

### [x] TouchDesigner CHOP
TD CHOP.
Run: `grep -q "touchdesignerCHOP" src/spec-parser.ts`

### [x] Notch engine
Notch block.
Run: `grep -q "notchBlock" src/spec-parser.ts`

### [x] OBS scene
OBS scene.
Run: `grep -q "obsScene" src/spec-parser.ts`

### [x] Streamlabs OBS
SLOBS.
Run: `grep -q "slobsScene" src/spec-parser.ts`

### [x] XSplit scene
XSplit.
Run: `grep -q "xsplitScene" src/spec-parser.ts`

### [x] vMix input
vMix input.
Run: `grep -q "vmixInput" src/spec-parser.ts`

### [x] Wirecast layer
Wirecast.
Run: `grep -q "wirecastLayer" src/spec-parser.ts`

### [x] CasparCG template
CasparCG.
Run: `grep -q "casparcgTemplate" src/spec-parser.ts`

### [x] Tricaster scene
Tricaster.
Run: `grep -q "tricasterScene" src/spec-parser.ts`

### [x] Blackmagic ATEM
ATEM switcher.
Run: `grep -q "atemSwitcher" src/spec-parser.ts`

### [x] Roland V-60HD
V-60HD.
Run: `grep -q "v60hdControl" src/spec-parser.ts`

### [x] Ross Carbonite
Carbonite.
Run: `grep -q "carboniteControl" src/spec-parser.ts`

### [x] Sony E-HTR
E-HTR.
Run: `grep -q "ehvtrControl" src/spec-parser.ts`

### [x] Panasonic AV-HS
AV-HS.
Run: `grep -q "avhsControl" src/spec-parser.ts`

### [x] Barco E2
E2 presentation.
Run: `grep -q "barcoE2" src/spec-parser.ts`

### [x] Analog Way
Analog Way.
Run: `grep -q "analogWay" src/spec-parser.ts`

### [x] Green Hippo
Hippo.
Run: `grep -q "greenHippo" src/spec-parser.ts`

### [x] Lumens Mediaprocessor
Lumens.
Run: `grep -q "lumensProcessor" src/spec-parser.ts`

### [x] Magewell capture
Capture card.
Run: `grep -q "magewellCapture" src/spec-parser.ts`

### [x] Blackmagic DeckLink
DeckLink.
Run: `grep -q "decklinkCapture" src/spec-parser.ts`

### [x] AJA io
AJA capture.
Run: `grep -q "ajaCapture" src/spec-parser.ts`

### [x] Teradek Sphere
Sphere panoramic.
Run: `grep -q "teradekSphere" src/spec-parser.ts`

### [x] LiveStream Studio
LiveStream.
Run: `grep -q "livestreamStudio" src/spec-parser.ts`

### [x] Restream
Restream.
Run: `grep -q "restreamService" src/spec-parser.ts`

### [x] StreamYard
StreamYard.
Run: `grep -q "streamyardScene" src/spec-parser.ts`

### [x] Be.Live
BeLive.
Run: `grep -q "beliveScene" src/spec-parser.ts`

### [x] Streamlabs API
Streamlabs.
Run: `grep -q "streamlabsAPI" src/spec-parser.ts`

### [x] Twitch API
Twitch.
Run: `grep -q "twitchAPI" src/spec-parser.ts`

### [x] YouTube Live
YT Live.
Run: `grep -q "youtubeLive" src/spec-parser.ts`

### [x] Facebook Live
FB Live.
Run: `grep -q "facebookLive" src/spec-parser.ts`

### [x] Periscope
Periscope.
Run: `grep -q "periscopeAPI" src/spec-parser.ts`

### [x] NDI stream
NDI source.
Run: `grep -q "ndiSource" src/spec-parser.ts`

### [x] SRT streaming
SRT protocol.
Run: `grep -q "srtStream" src/spec-parser.ts`

### [x] RTMP stream
RTMP publish.
Run: `grep -q "rtmpPublish" src/spec-parser.ts`

### [x] HLS segment
HLS packaging.
Run: `grep -q "hlsSegment" src/spec-parser.ts`

### [x] DASH manifest
DASH MPD.
Run: `grep -q "dashManifest" src/spec-parser.ts`

### [x] CMAF chunk
CMAF packaging.
Run: `grep -q "cmafChunk" src/spec-parser.ts`

### [x] OPC-UA server
OPC-UA server.
Run: `grep -q "opcuaServer" src/spec-parser.ts`

### [x] MQTT broker
MQTT broker.
Run: `grep -q "mqttBroker" src/spec-parser.ts`

### [x] AMQP broker
RabbitMQ.
Run: `grep -q "amqpBroker" src/spec-parser.ts`

### [x] NATS server
NATS server.
Run: `grep -q "natsServer" src/spec-parser.ts`

### [x] Redis cluster
Redis cluster.
Run: `grep -q "redisClusterSetup" src/spec-parser.ts`

### [x] Memcached pool
Memcached.
Run: `grep -q "memcachedPool" src/spec-parser.ts`

### [x] Cassandra cluster
Cassandra setup.
Run: `grep -q "cassandraCluster" src/spec-parser.ts`

### [x] ScyllaDB cluster
ScyllaDB.
Run: `grep -q "scylladbCluster" src/spec-parser.ts`

### [x] CockroachDB cluster
CockroachDB.
Run: `grep -q "crdbCluster" src/spec-parser.ts`

### [x] TiDB cluster
TiDB.
Run: `grep -q "tidbCluster" src/spec-parser.ts`

### [x] SingleStore cluster
SingleStore.
Run: `grep -q "singlestoreCluster" src/spec-parser.ts`

### [x] TimescaleDB
TimescaleDB.
Run: `grep -q "timescaleDBSetup" src/spec-parser.ts`

### [x] QuestDB
QuestDB.
Run: `grep -q "questdbSetup" src/spec-parser.ts`

### [x] InfluxDB cluster
InfluxDB.
Run: `grep -q "influxdbCluster" src/spec-parser.ts`

### [x] ClickHouse cluster
ClickHouse.
Run: `grep -q "clickhouseCluster" src/spec-parser.ts`

### [x] Druid cluster
Druid.
Run: `grep -q "druidCluster" src/spec-parser.ts`

### [x] Pinot cluster
Pinot.
Run: `grep -q "pinotCluster" src/spec-parser.ts`

### [x] Presto cluster
Presto.
Run: `grep -q "prestoCluster" src/spec-parser.ts`

### [x] Trino cluster
Trino.
Run: `grep -q "trinoCluster" src/spec-parser.ts`

### [x] Spark cluster
Spark.
Run: `grep -q "sparkCluster" src/spec-parser.ts`

### [x] Flink cluster
Flink.
Run: `grep -q "flinkCluster" src/spec-parser.ts`

### [x] Storm cluster
Storm.
Run: `grep -q "stormCluster" src/spec-parser.ts`

### [x] Kafka cluster
Kafka.
Run: `grep -q "kafkaClusterSetup" src/spec-parser.ts`

### [x] Pulsar cluster
Pulsar.
Run: `grep -q "pulsarCluster" src/spec-parser.ts`

### [x] RocketMQ cluster
RocketMQ.
Run: `grep -q "rocketmqCluster" src/spec-parser.ts`

### [x] ActiveMQ Artemis
Artemis.
Run: `grep -q "artemisServer" src/spec-parser.ts`

### [x] NSQ cluster
NSQ.
Run: `grep -q "nsqCluster" src/spec-parser.ts`

### [x] ZeroMQ socket
ZeroMQ.
Run: `grep -q "zeromqSocket" src/spec-parser.ts`

### [x] nanomsg socket
nanomsg.
Run: `grep -q "nanomsgSocket" src/spec-parser.ts`

### [x] gRPC reflection
gRPC reflection.
Run: `grep -q "grpcReflection" src/spec-parser.ts`

### [x] Thrift IDL
Thrift.
Run: `grep -q "thriftIDL" src/spec-parser.ts`

### [x] Avro schema
Avro.
Run: `grep -q "avroSchema" src/spec-parser.ts`

### [x] Parquet file
Parquet.
Run: `grep -q "parquetFile" src/spec-parser.ts`

### [x] ORC file
ORC.
Run: `grep -q "orcFile" src/spec-parser.ts`

### [x] Delta Lake table
Delta Lake.
Run: `grep -q "deltaLakeTable" src/spec-parser.ts`

### [x] Iceberg table
Iceberg.
Run: `grep -q "icebergTable" src/spec-parser.ts`

### [x] Hudi dataset
Hudi.
Run: `grep -q "hudiDataset" src/spec-parser.ts`

### [x] Apache Beam pipeline
Beam.
Run: `grep -q "beamPipeline" src/spec-parser.ts`

### [x] Airflow DAG
Airflow.
Run: `grep -q "airflowDAG" src/spec-parser.ts`

### [x] Prefect flow
Prefect.
Run: `grep -q "prefectFlow" src/spec-parser.ts`

### [x] Dagster pipeline
Dagster.
Run: `grep -q "dagsterPipeline" src/spec-parser.ts`

### [x] dbt model
dbt.
Run: `grep -q "dbtModel" src/spec-parser.ts`

### [x] Singer tap
Singer.
Run: `grep -q "singerTap" src/spec-parser.ts`

### [x] Meltano ELT
Meltano.
Run: `grep -q "meltanoELT" src/spec-parser.ts`

### [x] Airbyte connection
Airbyte.
Run: `grep -q "airbyteConnection" src/spec-parser.ts`

### [x] Fivetran sync
Fivetran.
Run: `grep -q "fivetranSync" src/spec-parser.ts`

### [x] Snowflake warehouse
Snowflake.
Run: `grep -q "snowflakeWarehouse" src/spec-parser.ts`

### [x] BigQuery dataset
BigQuery.
Run: `grep -q "bigqueryDataset" src/spec-parser.ts`

### [x] Redshift cluster
Redshift.
Run: `grep -q "redshiftCluster" src/spec-parser.ts`

### [x] Synapse pool
Synapse.
Run: `grep -q "synapsePool" src/spec-parser.ts`

### [x] Databricks workspace
Databricks.
Run: `grep -q "databricksWorkspace" src/spec-parser.ts`

### [x] Firebolt database
Firebolt.
Run: `grep -q "fireboltDB" src/spec-parser.ts`

### [x] Motherduck database
Motherduck.
Run: `grep -q "motherduckDB" src/spec-parser.ts`

### [x] DuckDB database
DuckDB.
Run: `grep -q "duckdbDB" src/spec-parser.ts`

### [x] Polars dataframe
Polars.
Run: `grep -q "polarsDF" src/spec-parser.ts`

### [x] Modin dataframe
Modin.
Run: `grep -q "modinDF" src/spec-parser.ts`

### [x] Dask dataframe
Dask.
Run: `grep -q "daskDF" src/spec-parser.ts`

### [x] Vaex dataframe
Vaex.
Run: `grep -q "vaexDF" src/spec-parser.ts`

### [x] Ibis backend
Ibis.
Run: `grep -q "ibisBackend" src/spec-parser.ts`

### [x] Apache Arrow
Arrow.
Run: `grep -q "apacheArrow" src/spec-parser.ts`

### [x] R dataframe
R DataFrame.
Run: `grep -q "rDataframe" src/spec-parser.ts`

### [x] Pandas dataframe
Pandas.
Run: `grep -q "pandasDF" src/spec-parser.ts`

### [x] Julia DataFrames
Julia.
Run: `grep -q "juliaDF" src/spec-parser.ts`

### [x] Rust DataFrames
Polars.rs.
Run: `grep -q "rustDF" src/spec-parser.ts`

### [x] Go dataframe
Gota.
Run: `grep -q "goDF" src/spec-parser.ts`

### [x] C++ Arrow
Arrow C++.
Run: `grep -q "cppArrow" src/spec-parser.ts`

### [x] CUDA kernel
CUDA.
Run: `grep -q "cudaKernel" src/spec-parser.ts`

### [x] OpenCL kernel
OpenCL.
Run: `grep -q "openclKernel" src/spec-parser.ts`

### [x] HIP kernel
HIP/ROCm.
Run: `grep -q "hipKernel" src/spec-parser.ts`

### [x] SYCL kernel
SYCL.
Run: `grep -q "syclKernel" src/spec-parser.ts`

### [x] OpenMP parallel
OpenMP.
Run: `grep -q "openmpParallel" src/spec-parser.ts`

### [x] MPI communication
MPI.
Run: `grep -q "mpiComm" src/spec-parser.ts`

### [x] Threading Building Blocks
TBB.
Run: `grep -q "tbbParallel" src/spec-parser.ts`

### [x] Ray framework
Ray.
Run: `grep -q "rayFramework" src/spec-parser.ts`

### [x] PDF render
PDF render.
Run: `grep -q "pdfRender" src/spec-parser.ts`

### [x] PostScript render
PS render.
Run: `grep -q "postscriptRender" src/spec-parser.ts`

### [x] SVG generator
SVG generate.
Run: `grep -q "svgGenerate" src/spec-parser.ts`

### [x] HTML canvas
Canvas draw.
Run: `grep -q "canvasDraw" src/spec-parser.ts`

### [x] CSS animation
CSS animate.
Run: `grep -q "cssAnimate" src/spec-parser.ts`

### [x] GSAP timeline
GSAP anim.
Run: `grep -q "gsapTimeline" src/spec-parser.ts`

### [x] Framer Motion
Framer Motion.
Run: `grep -q "framerMotion" src/spec-parser.ts`

### [x] Lottie animation
Lottie JSON.
Run: `grep -q "lottieAnimation" src/spec-parser.ts`

### [x] After Effects export
AE export.
Run: `grep -q "afterEffectsExport" src/spec-parser.ts`

### [x] Figma plugin
Figma plugin.
Run: `grep -q "figmaPlugin" src/spec-parser.ts`

### [x] Sketch plugin
Sketch plugin.
Run: `grep -q "sketchPlugin" src/spec-parser.ts`

### [x] Adobe XD
XD plugin.
Run: `grep -q "adobeXDPlugin" src/spec-parser.ts`

### [x] Inkscape extension
Inkscape.
Run: `grep -q "inkscapeExtension" src/spec-parser.ts`

### [x] GIMP plugin
GIMP.
Run: `grep -q "gimpPlugin" src/spec-parser.ts`

### [x] Krita plugin
Krita.
Run: `grep -q "kritaPlugin" src/spec-parser.ts`

### [x] Blender plugin
Blender addon.
Run: `grep -q "blenderAddon" src/spec-parser.ts`

### [x] Substance Designer
SDP preset.
Run: `grep -q "substanceDesigner" src/spec-parser.ts`

### [x] Quixel Megascans
Megascans.
Run: `grep -q "megascans" src/spec-parser.ts`

### [x] Sketchfab API
Sketchfab.
Run: `grep -q "sketchfabAPI" src/spec-parser.ts`

### [x] Poly Haven
PolyHaven.
Run: `grep -q "polyhaven" src/spec-parser.ts`

### [x] Kenney assets
Kenney.
Run: `grep -q "kenneyAssets" src/spec-parser.ts`

### [x] Font Awesome
FA icon.
Run: `grep -q "fontAwesomeIcon" src/spec-parser.ts`

### [x] Google Fonts
GF font.
Run: `grep -q "googleFont" src/spec-parser.ts`

### [x] Variable font
Variable font.
Run: `grep -q "variableFont" src/spec-parser.ts`

### [x] OpenType features
OT feature.
Run: `grep -q "opentypeFeature" src/spec-parser.ts`

### [x] Font subsetting
Font subset.
Run: `grep -q "fontSubset" src/spec-parser.ts`

### [x] Color font
Color font.
Run: `grep -q "colorFont" src/spec-parser.ts`

### [x] HB pickup
HarfBuzz.
Run: `grep -q "harfbuzzText" src/spec-parser.ts`

### [x] ICU shaping
ICU shaping.
Run: `grep -q "icuShape" src/spec-parser.ts`

### [x] RTL layout
RTL layout.
Run: `grep -q "rtlLayout" src/spec-parser.ts`

### [x] CJK layout
CJK layout.
Run: `grep -q "cjkLayout" src/spec-parser.ts`

### [x] Indic layout
Indic shaping.
Run: `grep -q "indicShape" src/spec-parser.ts`

### [x] Hebrew shaping
Hebrew shaping.
Run: `grep -q "hebrewShape" src/spec-parser.ts`

### [x] Arabic shaping
Arabic shaping.
Run: `grep -q "arabicShape" src/spec-parser.ts`

### [x] Pango layout
Pango.
Run: `grep -q "pangoLayout" src/spec-parser.ts`

### [x] CoreText
CoreText.
Run: `grep -q "coretextLayout" src/spec-parser.ts`

### [x] DirectWrite
DirectWrite.
Run: `grep -q "directwriteText" src/spec-parser.ts`

### [x] Skia drawing
Skia canvas.
Run: `grep -q "skiaCanvas" src/spec-parser.ts`

### [x] Cairo drawing
Cairo draw.
Run: `grep -q "cairoDraw" src/spec-parser.ts`

### [x] Anti-Grain Geometry
AGG render.
Run: `grep -q "aggRender" src/spec-parser.ts`

### [x] Qt painter
Qt paint.
Run: `grep -q "qtPainter" src/spec-parser.ts`

### [x] Flutter widget
Flutter.
Run: `grep -q "flutterWidget" src/spec-parser.ts`

### [x] SwiftUI view
SwiftUI.
Run: `grep -q "swiftuiView" src/spec-parser.ts`

### [x] Jetpack Compose
Compose.
Run: `grep -q "composeUI" src/spec-parser.ts`

### [x] MAUI page
MAUI.
Run: `grep -q "mauiPage" src/spec-parser.ts`

### [x] Avalonia view
Avalonia.
Run: `grep -q "avaloniaView" src/spec-parser.ts`

### [x] Tauri window
Tauri.
Run: `grep -q "tauriWindow" src/spec-parser.ts`

### [x] GTK widget
GTK.
Run: `grep -q "gtkWidget" src/spec-parser.ts`

### [x] WxWidgets
Wx.
Run: `grep -q "wxWidget" src/spec-parser.ts`

### [x] WinUI3 page
WinUI3.
Run: `grep -q "winui3Page" src/spec-parser.ts`

### [x] Uno Platform
Uno.
Run: `grep -q "unoPlatform" src/spec-parser.ts`

### [x] React Native
ReactNative.
Run: `grep -q "reactNative" src/spec-parser.ts`

### [x] Flutter desktop
Flutter desktop.
Run: `grep -q "flutterDesktop" src/spec-parser.ts`

### [x] Electron app
Electron.
Run: `grep -q "electronApp" src/spec-parser.ts`

### [x] NW.js app
NW.js.
Run: `grep -q "nwjsApp" src/spec-parser.ts`

### [x] Tauri app
Tauri app.
Run: `grep -q "tauriApp" src/spec-parser.ts`

### [x] WRY browser
WRY.
Run: `grep -q "wryBrowser" src/spec-parser.ts`

### [x] webview
webview2.
Run: `grep -q "webview2Control" src/spec-parser.ts`

### [x] WKWebView
WKWebView.
Run: `grep -q "wkwebview" src/spec-parser.ts`

### [x] Android WebView
Android WV.
Run: `grep -q "androidWebview" src/spec-parser.ts`

### [x] CEF embed
ChromiumEF.
Run: `grep -q "cefEmbed" src/spec-parser.ts`

### [x] Servo browser
Servo.
Run: `grep -q "servoBrowser" src/spec-parser.ts`

### [x] Playwright
Playwright.
Run: `grep -q "playwrightTest" src/spec-parser.ts`

### [x] Puppeteer
Puppeteer.
Run: `grep -q "puppeteerScript" src/spec-parser.ts`

### [x] Selenium
Selenium.
Run: `grep -q "seleniumTest" src/spec-parser.ts`

### [x] Cypress
Cypress.
Run: `grep -q "cypressTest" src/spec-parser.ts`

### [x] TestCafe
TestCafe.
Run: `grep -q "testcafeTest" src/spec-parser.ts`

### [x] Nightwatch
Nightwatch.
Run: `grep -q "nightwatchTest" src/spec-parser.ts`

### [x] WebdriverIO
WebdriverIO.
Run: `grep -q "webdriverioTest" src/spec-parser.ts`

### [x] Taiko
Taiko.
Run: `grep -q "taikoScript" src/spec-parser.ts`

### [x] Nightmare
Nightmare.
Run: `grep -q "nightmareScript" src/spec-parser.ts`

### [x] PhantomJS
PhantomJS.
Run: `grep -q "phantomjsPage" src/spec-parser.ts`

### [x] PuppeteerSharp
PuppeteerSharp.
Run: `grep -q "puppeteersharp" src/spec-parser.ts`

### [x] PlaywrightSharp
PlaywrightSharp.
Run: `grep -q "playwrightsharp" src/spec-parser.ts`

### [x] Git repo
Git init.
Run: `grep -q "gitInit" src/spec-parser.ts`

### [x] Git clone
Clone repo.
Run: `grep -q "gitClone" src/spec-parser.ts`

### [x] Git commit
Commit.
Run: `grep -q "gitCommit" src/spec-parser.ts`

### [x] Git branch
Branch.
Run: `grep -q "gitBranch" src/spec-parser.ts`

### [x] Git merge
Merge.
Run: `grep -q "gitMerge" src/spec-parser.ts`

### [x] Git rebase
Rebase.
Run: `grep -q "gitRebase" src/spec-parser.ts`

### [x] Git cherry-pick
Cherry-pick.
Run: `grep -q "gitCherryPick" src/spec-parser.ts`

### [x] Git stash
Stash.
Run: `grep -q "gitStash" src/spec-parser.ts`

### [x] Git tag
Tag.
Run: `grep -q "gitTag" src/spec-parser.ts`

### [x] Git blame
Blame.
Run: `grep -q "gitBlame" src/spec-parser.ts`

### [x] Git bisect
Bisect.
Run: `grep -q "gitBisect" src/spec-parser.ts`

### [x] Git worktree
Worktree.
Run: `grep -q "gitWorktree" src/spec-parser.ts`

### [x] Git submodule
Submodule.
Run: `grep -q "gitSubmodule" src/spec-parser.ts`

### [x] Git filter-repo
Filter-repo.
Run: `grep -q "gitFilterRepo" src/spec-parser.ts`

### [x] Hg repo
Hg init.
Run: `grep -q "hgInit" src/spec-parser.ts`

### [x] Hg bookmark
Bookmark.
Run: `grep -q "hgBookmark" src/spec-parser.ts`

### [x] Hg phase
Phase.
Run: `grep -q "hgPhase" src/spec-parser.ts`

### [x] Fossil repo
Fossil.
Run: `grep -q "fossilInit" src/spec-parser.ts`

### [x] SVN repo
SVN.
Run: `grep -q "svnCheckout" src/spec-parser.ts`

### [x] Darcs repo
Darcs.
Run: `grep -q "darcsInit" src/spec-parser.ts`

### [x] Bazel build
Bazel.
Run: `grep -q "bazelBuild" src/spec-parser.ts`

### [x] Bazel query
Bazel query.
Run: `grep -q "bazelQuery" src/spec-parser.ts`

### [x] Buck build
Buck.
Run: `grep -q "buckBuild" src/spec-parser.ts`

### [x] Pants build
Pants.
Run: `grep -q "pantsBuild" src/spec-parser.ts`

### [x] Please build
Please.
Run: `grep -q "pleaseBuild" src/spec-parser.ts`

### [x] Nix derivation
Nix.
Run: `grep -q "nixDerivation" src/spec-parser.ts`

### [x] Nix flake
Flake.
Run: `grep -q "nixFlake" src/spec-parser.ts`

### [x] NixOS module
NixOS.
Run: `grep -q "nixosModule" src/spec-parser.ts`

### [x] Home manager
Home manager.
Run: `grep -q "homeManager" src/spec-parser.ts`

### [x] DevShell
Dev shell.
Run: `grep -q "devShell" src/spec-parser.ts`

### [x] flakes registry
Flake registry.
Run: `grep -q "flakeRegistry" src/spec-parser.ts`

### [x] Nix channel
Channel.
Run: `grep -q "nixChannel" src/spec-parser.ts`

### [x] Cachix
Cachix.
Run: `grep -q "cachixPush" src/spec-parser.ts`

### [x] lorri
Lorri.
Run: `grep -q "lorriWatch" src/spec-parser.ts`

### [x] direnv
Direnv.
Run: `grep -q "direnvAllow" src/spec-parser.ts`

### [x] Makefile
Makefile.
Run: `grep -q "makeTarget" src/spec-parser.ts`

### [x] CMake
CMake.
Run: `grep -q "cmakeBuild" src/spec-parser.ts`

### [x] Meson
Meson.
Run: `grep -q "mesonBuild" src/spec-parser.ts`

### [x] Ninja
Ninja.
Run: `grep -q "ninjaBuild" src/spec-parser.ts`

### [x] SCons
SCons.
Run: `grep -q "sconsBuild" src/spec-parser.ts`

### [x] Waf
Waf.
Run: `grep -q "wafBuild" src/spec-parser.ts`

### [x] Premake
Premake.
Run: `grep -q "premake5" src/spec-parser.ts`

### [x] gyp
GYP.
Run: `grep -q "gypBuild" src/spec-parser.ts`

### [x] GN
GN.
Run: `grep -q "gnBuild" src/spec-parser.ts`

### [x]Buck2
Buck2.
Run: `grep -q "buck2Build" src/spec-parser.ts`

### [x] Re Sharif
Rush.
Run: `grep -q "rushBuild" src/spec-parser.ts`

### [x] Pnpm workspace
Pnpm.
Run: `grep -q "pnpmWorkspace" src/spec-parser.ts`

### [x] npm workspace
npm.
Run: `grep -q "npmWorkspace" src/spec-parser.ts`

### [x] Yarn Berry
Yarn.
Run: `grep -q "yarnBerry" src/spec-parser.ts`

### [x] Cargo workspace
Cargo.
Run: `grep -q "cargoWorkspace" src/spec-parser.ts`

### [x] Go modules
Go.
Run: `grep -q "goMod" src/spec-parser.ts`

### [x] Poetry project
Poetry.
Run: `grep -q "poetryProject" src/spec-parser.ts`

### [x] PDM project
PDM.
Run: `grep -q "pdmProject" src/spec-parser.ts`

### [x] Pipenv project
Pipenv.
Run: `grep -q "pipenvProject" src/spec-parser.ts`

### [x] Conda env
Conda.
Run: `grep -q "condaEnv" src/spec-parser.ts`

### [x] mamba env
Mamba.
Run: `grep -q "mambaEnv" src/spec-parser.ts`

### [x] Spack spec
Spack.
Run: `grep -q "spackSpec" src/spec-parser.ts`

### [x] Gradle project
Gradle.
Run: `grep -q "gradleProject" src/spec-parser.ts`

### [x] Maven project
Maven.
Run: `grep -q "mavenProject" src/spec-parser.ts`

### [x] SBT project
SBT.
Run: `grep -q "sbtProject" src/spec-parser.ts`

### [x] Leiningen project
Lein.
Run: `grep -q "leinProject" src/spec-parser.ts`

### [x] Cargo project
Cargo.
Run: `grep -q "cargoProject" src/spec-parser.ts`

### [x] NuGet package
NuGet.
Run: `grep -q "nugetPackage" src/spec-parser.ts`

### [x] Conan package
Conan.
Run: `grep -q "conanPackage" src/spec-parser.ts`

### [x] vcpkg
vcpkg.
Run: `grep -q "vcpkgPackage" src/spec-parser.ts`

### [x] Spack package
Spack.
Run: `grep -q "spackPackage" src/spec-parser.ts`

### [x] Homebrew formula
Homebrew.
Run: `grep -q "homebrewFormula" src/spec-parser.ts`

### [x] Debian package
Debian.
Run: `grep -q "debianPackage" src/spec-parser.ts`

### [x] RPM spec
RPM.
Run: `grep -q "rpmSpec" src/spec-parser.ts`

### [x] Alpine package
Alpine.
Run: `grep -q "alpinePackage" src/spec-parser.ts`

### [x] Flatpak
Flatpak.
Run: `grep -q "flatpakBuild" src/spec-parser.ts`

### [x] Snapcraft
Snap.
Run: `grep -q "snapcraftBuild" src/spec-parser.ts`

### [x] AppImage
AppImage.
Run: `grep -q "appimageBuild" src/spec-parser.ts`

### [x] Docker container
Docker.
Run: `grep -q "dockerContainer" src/spec-parser.ts`

### [x] Podman pod
Podman.
Run: `grep -q "podmanPod" src/spec-parser.ts`

### [x] Buildah image
Buildah.
Run: `grep -q "buildahImage" src/spec-parser.ts`

### [x] Kaniko build
Kaniko.
Run: `grep -q "kanikoBuild" src/spec-parser.ts`

### [x] BuildKit cache
BuildKit.
Run: `grep -q "buildkitCache" src/spec-parser.ts`

### [x] nerdctl build
nerdctl.
Run: `grep -q "nerdctlBuild" src/spec-parser.ts`

### [x] containerd image
containerd.
Run: `grep -q "containerdImage" src/spec-parser.ts`

### [x] CRI-O
CRI-O.
Run: `grep -q "crioPod" src/spec-parser.ts`

### [x] gVisor
Gvisor.
Run: `grep -q "gvisorRuntime" src/spec-parser.ts`

### [x] Kata containers
Kata.
Run: `grep -q "kataContainer" src/spec-parser.ts`

### [x] Firecracker
Firecracker.
Run: `grep -q "firecrackerVM" src/spec-parser.ts`

### [x] Cloud Hypervisor
CloudHypervisor.
Run: `grep -q "cloudHypervisor" src/spec-parser.ts`

### [x] QEMU
QEMU.
Run: `grep -q "qemuVM" src/spec-parser.ts`

### [x] VirtualBox
VBox.
Run: `grep -q "virtualboxVM" src/spec-parser.ts`

### [x] VMware
VMware.
Run: `grep -q "vmwareVM" src/spec-parser.ts`

### [x] Hyper-V
HyperV.
Run: `grep -q "hypervVM" src/spec-parser.ts`

### [x] libvirt
libvirt.
Run: `grep -q "libvirtDomain" src/spec-parser.ts`

### [x] Vagrant
Vagrant.
Run: `grep -q "vagrantVM" src/spec-parser.ts`

### [x] Ansible playbook
Ansible.
Run: `grep -q "ansiblePlaybook" src/spec-parser.ts`

### [x] Terraform
Terraform.
Run: `grep -q "terraformApply" src/spec-parser.ts`

### [x] Pulumi
Pulumi.
Run: `grep -q "pulumiUp" src/spec-parser.ts`

### [x] CloudFormation
CloudFormation.
Run: `grep -q "cfnStack" src/spec-parser.ts`

### [x] CDK
CDK.
Run: `grep -q "cdkDeploy" src/spec-parser.ts`

### [x] Pulumi Crosswalk
Crosswalk.
Run: `grep -q "pulumiCrosswalk" src/spec-parser.ts`

### [x] Helm chart
Helm.
Run: `grep -q "helmInstall" src/spec-parser.ts`

### [x] Kustomize
overlay.
Run: `grep -q "kustomizeBuild" src/spec-parser.ts`

### [x] kpt
Kpt.
Run: `grep -q "kptPkg" src/spec-parser.ts`

### [x] Argo CD
ArgoCD.
Run: `grep -q "argocdApp" src/spec-parser.ts`

### [x] Flux CD
Flux.
Run: `grep -q "fluxBootstrap" src/spec-parser.ts`

### [x] Jenkins
Jenkins.
Run: `grep -q "jenkinsJob" src/spec-parser.ts`

### [x] Jenkinsfile
Jenkinsfile.
Run: `grep -q "jenkinsfile" src/spec-parser.ts`

### [x] GitHub Actions
GHA.
Run: `grep -q "githubActions" src/spec-parser.ts`

### [x] GitLab CI
GitLab CI.
Run: `grep -q "gitlabCI" src/spec-parser.ts`

### [x] Azure Pipelines
Azure.
Run: `grep -q "azurePipeline" src/spec-parser.ts`

### [x] Bitbucket Pipelines
Bitbucket.
Run: `grep -q "bitbucketPipeline" src/spec-parser.ts`

### [x] CircleCI
CircleCI.
Run: `grep -q "circleCI" src/spec-parser.ts`

### [x] Travis CI
Travis.
Run: `grep -q "travisCI" src/spec-parser.ts`

### [x] Drone CI
Drone.
Run: `grep -q "droneCI" src/spec-parser.ts`

### [x] Tekton
Tekton.
Run: `grep -q "tektonPipeline" src/spec-parser.ts`

### [x] Spinnaker
Spinnaker.
Run: `grep -q "spinnakerApp" src/spec-parser.ts`

### [x] Argo Workflows
Argo.
Run: `grep -q "argoWorkflow" src/spec-parser.ts`

### [x] Prefect flow
Prefect.
Run: `grep -q "prefectFlowRun" src/spec-parser.ts`

### [x] Metaflow
Metaflow.
Run: `grep -q "metaflowRun" src/spec-parser.ts`

### [x] Flyte
Flyte.
Run: `grep -q "flyteLaunchPlan" src/spec-parser.ts`

### [x] ZenML
ZenML.
Run: `grep -q "zenmlPipeline" src/spec-parser.ts`

### [x] Kedro
Kedro.
Run: `grep -q "kedroPipeline" src/spec-parser.ts`

### [x] Weights & Biases
W&B.
Run: `grep -q "wandbRun" src/spec-parser.ts`

### [x] MLflow
MLflow.
Run: `grep -q "mlflowRun" src/spec-parser.ts`

### [x] Neptune AI
Neptune.
Run: `grep -q "neptuneRun" src/spec-parser.ts`

### [x] Comet ML
Comet.
Run: `grep -q "cometRun" src/spec-parser.ts`

### [x] Aim Stack
Aim.
Run: `grep -q "aimRun" src/spec-parser.ts`

### [x] TensorBoard
TensorBoard.
Run: `grep -q "tensorboardRun" src/spec-parser.ts`

### [x] Guild AI
Guild.
Run: `grep -q "guildRun" src/spec-parser.ts`

### [x] Sacros
eurAI.
Run: `grep -q "sacredRun" src/spec-parser.ts`

### [x] Kubeflow
Kubeflow.
Run: `grep -q "kubeflowPipeline" src/spec-parser.ts`

### [x] Vertex AI
Vertex.
Run: `grep -q "vertexTraining" src/spec-parser.ts`

### [x] SageMaker
Sagemaker.
Run: `grep -q "sagemakerTrain" src/spec-parser.ts`

### [x] Azure ML
AzureML.
Run: `grep -q "azureMLRun" src/spec-parser.ts`

### [x] Domino Data Lab
Domino.
Run: `grep -q "dominoRun" src/spec-parser.ts`

### [x] Valohai
Valohai.
Run: `grep -q "valohaiRun" src/spec-parser.ts`

### [x] HPE Ezmeral
Ezmeral.
Run: `grep -q "ezmeralRun" src/spec-parser.ts`

### [x] ClearML
ClearML.
Run: `grep -q "clearmlTask" src/spec-parser.ts`

### [x] DVC
DVC.
Run: `grep -q "dvcPipeline" src/spec-parser.ts`

### [x] Pachyderm
Pachyderm.
Run: `grep -q "pachydermPipeline" src/spec-parser.ts`

### [x] CML
CML.
Run: `grep -q "cmlRun" src/spec-parser.ts`

### [x] Metaflow
Metaflow.
Run: `grep -q "metaflowExperiment" src/spec-parser.ts`

### [x] LakeFS
LakeFS.
Run: `grep -q "lakefsRepo" src/spec-parser.ts`

### [x] Dremio
Dremio.
Run: `grep -q "dremioQuery" src/spec-parser.ts`

### [x] Kubernetes
K8s.
Run: `grep -q "kubernetesCluster" src/spec-parser.ts`

### [x] Kubeconfig
Kubeconfig.
Run: `grep -q "kubeconfig" src/spec-parser.ts`

### [x] kubectl
Kubectl.
Run: `grep -q "kubectlCommand" src/spec-parser.ts`

### [x] Helm
Helm.
Run: `grep -q "helmClient" src/spec-parser.ts`

### [x] kind
Kind.
Run: `grep -q "kindCluster" src/spec-parser.ts`

### [x] minikube
Minikube.
Run: `grep -q "minikubeCluster" src/spec-parser.ts`

### [x] k3s
K3s.
Run: `grep -q "k3sCluster" src/spec-parser.ts`

### [x] MicroK8s
MicroK8s.
Run: `grep -q "microk8sCluster" src/spec-parser.ts`

### [x] EKS
EKS.
Run: `grep -q "eksCluster" src/spec-parser.ts`

### [x] GKE
GKE.
Run: `grep -q "gkeCluster" src/spec-parser.ts`

### [x] AKS
AKS.
Run: `grep -q "aksCluster" src/spec-parser.ts`

### [x] OpenShift
OpenShift.
Run: `grep -q "openshiftCluster" src/spec-parser.ts`

### [x] Rancher
Rancher.
Run: `grep -q "rancherCluster" src/spec-parser.ts`

### [x] Lens
Lens.
Run: `grep -q "lensKubeconfig" src/spec-parser.ts`

### [x] k9s
K9s.
Run: `grep -q "k9sDashboard" src/spec-parser.ts`

### [x] kube-state-metrics
KSM.
Run: `grep -q "kubeStateMetrics" src/spec-parser.ts`

### [x] node-exporter
NodeExp.
Run: `grep -q "nodeExporter" src/spec-parser.ts`

### [x] Prometheus
Prom.
Run: `grep -q "prometheusServer" src/spec-parser.ts`

### [x] Grafana
Grafana.
Run: `grep -q "grafanaDashboard" src/spec-parser.ts`

### [x] Alertmanager
Alert.
Run: `grep -q "alertmanagerConfig" src/spec-parser.ts`

### [x] Loki
Loki.
Run: `grep -q "lokiServer" src/spec-parser.ts`

### [x] Tempo
Tempo.
Run: `grep -q "tempoServer" src/spec-parser.ts`

### [x] Jaeger
Jaeger.
Run: `grep -q "jaegerTracing" src/spec-parser.ts`

### [x] Zipkin
Zipkin.
Run: `grep -q "zipkinTracing" src/spec-parser.ts`

### [x] OpenTelemetry
OTEL.
Run: `grep -q "otelCollector" src/spec-parser.ts`

### [x] Fluentd
Fluentd.
Run: `grep -q "fluentdDaemon" src/spec-parser.ts`

### [x] Fluent Bit
FluentBit.
Run: `grep -q "fluentbitDaemon" src/spec-parser.ts`

### [x] Logstash
Logstash.
Run: `grep -q "logstashPipeline" src/spec-parser.ts`

### [x] Elasticsearch
ES.
Run: `grep -q "elasticsearchCluster" src/spec-parser.ts`

### [x] Kibana
Kibana.
Run: `grep -q "kibanaDash" src/spec-parser.ts`

### [x] Beats
Beats.
Run: `grep -q "beatsShipper" src/spec-parser.ts`

### [x] Sentry
Sentry.
Run: `grep -q "sentryDSN" src/spec-parser.ts`

### [x] PagerDuty
PD.
Run: `grep -q "pagerdutyAlert" src/spec-parser.ts`

### [x] OpsGenie
OpsGenie.
Run: `grep -q "opsgenieAlert" src/spec-parser.ts`

### [x] VictorOps
VictorOps.
Run: `grep -q "victoropsAlert" src/spec-parser.ts`

### [x] OpsGenie
Genie.
Run: `grep -q "opsgenieTeam" src/spec-parser.ts`

### [x] Slack webhook
Slack.
Run: `grep -q "slackWebhook" src/spec-parser.ts`

### [x] MS Teams webhook
Teams.
Run: `grep -q "teamsWebhook" src/spec-parser.ts`

### [x] Discord webhook
Discord.
Run: `grep -q "discordWebhook" src/spec-parser.ts`

### [x] Email alert
Email.
Run: `grep -q "emailAlert" src/spec-parser.ts`

### [x] SMS alert
SMS.
Run: `grep -q "smsAlert" src/spec-parser.ts`

### [x] Push notification
Push.
Run: `grep -q "pushNotification" src/spec-parser.ts`

### [x] Webhook
Webhook.
Run: `grep -q "genericWebhook" src/spec-parser.ts`

### [x] PagerDuty routing
PDR.
Run: `grep -q "pagerdutyRouting" src/spec-parser.ts`

### [x] Runbook
Runbook.
Run: `grep -q "runbookLink" src/spec-parser.ts`

### [x] Incident doc
Incident.
Run: `grep -q "incidentDoc" src/spec-parser.ts`

### [x] On-call schedule
Oncall.
Run: `grep -q "oncallSchedule" src/spec-parser.ts`

### [x] Escalation policy
Escalation.
Run: `grep -q "escalationPolicy" src/spec-parser.ts`

### [x] ServiceNow ticket
ServiceNow.
Run: `grep -q "servicenowTicket" src/spec-parser.ts`

### [x] Jira ticket
Jira.
Run: `grep -q "jiraTicket" src/spec-parser.ts`

### [x] Linear issue
Linear.
Run: `grep -q "linearIssue" src/spec-parser.ts`

### [x] GitHub issue
GHIssue.
Run: `grep -q "githubIssue" src/spec-parser.ts`

### [x] GitLab issue
GLIssue.
Run: `grep -q "gitlabIssue" src/spec-parser.ts`

### [x] Shortcut story
Shortcut.
Run: `grep -q "shortcutStory" src/spec-parser.ts`

### [x] Asana task
Asana.
Run: `grep -q "asanaTask" src/spec-parser.ts`

### [x] Monday.com task
Monday.
Run: `grep -q "mondayTask" src/spec-parser.ts`

### [x] ClickUp task
ClickUp.
Run: `grep -q "clickupTask" src/spec-parser.ts`

### [x] Notion page
Notion.
Run: `grep -q "notionPage" src/spec-parser.ts`

### [x] Confluence page
Confluence.
Run: `grep -q "confluencePage" src/spec-parser.ts`

### [x] Coda doc
Coda.
Run: `grep -q "codaDoc" src/spec-parser.ts`

### [x] Roam page
Roam.
Run: `grep -q "roamPage" src/spec-parser.ts`

### [x] Obsidian vault
Obsidian.
Run: `grep -q "obsidianVault" src/spec-parser.ts`

### [x] Logseq page
Logseq.
Run: `grep -q "logseqPage" src/spec-parser.ts`

### [x] Remotion video
Remotion.
Run: `grep -q "remotionVideo" src/spec-parser.ts`

### [x] Video editing
Video.
Run: `grep -q "videoEditor" src/spec-parser.ts`

### [x] Animation
Anim.
Run: `grep -q "videoAnimation" src/spec-parser.ts`

### [x] Screen recording
Screen.
Run: `grep -q "screenRecord" src/spec-parser.ts`

### [x] Signal message
Signal.
Run: `grep -q "signalMessage" src/spec-parser.ts`

### [x] Matrix message
Matrix.
Run: `grep -q "matrixMessage" src/spec-parser.ts`

### [x] Element message
Element.
Run: `grep -q "elementMessage" src/spec-parser.ts`

### [x] Session message
Session.
Run: `grep -q "sessionMessage" src/spec-parser.ts`

### [x] Wire message
Wire.
Run: `grep -q "wireMessage" src/spec-parser.ts`

### [x] Threema message
Threema.
Run: `grep -q "threemaMessage" src/spec-parser.ts`

### [x] SimpleX message
Simplex.
Run: `grep -q "simplexMessage" src/spec-parser.ts`

### [x] Briar message
Briar.
Run: `grep -q "briarMessage" src/spec-parser.ts`

### [x] Mastodon post
Mastodon.
Run: `grep -q "mastodonPost" src/spec-parser.ts`

### [x] Pixelfed post
Pixelfed.
Run: `grep -q "pixelfedPost" src/spec-parser.ts`

### [x] PeerTube video
PeerTube.
Run: `grep -q "peertubeVideo" src/spec-parser.ts`

### [x] Lemmy post
Lemmy.
Run: `grep -q "lemmyPost" src/spec-parser.ts`

### [x] Pleroma post
Pleroma.
Run: `grep -q "pleromaPost" src/spec-parser.ts`

### [x] BookWyrm post
BookWyrm.
Run: `grep -q "bookwyrmPost" src/spec-parser.ts`

### [x] Misskey post
Misskey.
Run: `grep -q "misskeyPost" src/spec-parser.ts`

### [x] WriteFreely post
WriteFreely.
Run: `grep -q "writefreelyPost" src/spec-parser.ts`

### [x] Funkwhale audio
Funkwhale.
Run: `grep -q "funkwhaleUpload" src/spec-parser.ts`

### [x] Castopod episode
Castopod.
Run: `grep -q "castopodEpisode" src/spec-parser.ts`

### [x] Friendica post
Friendica.
Run: `grep -q "friendicaPost" src/spec-parser.ts`

### [x] Hubzilla post
Hubzilla.
Run: `grep -q "hubzillaPost" src/spec-parser.ts`

### [x] GNU Social post
GNUSocial.
Run: `grep -q "gnusocialPost" src/spec-parser.ts`

### [x] Mobilizon event
Mobilizon.
Run: `grep -q "mobilizonEvent" src/spec-parser.ts`

### [x] Aardwolf post
Aardwolf.
Run: `grep -q "aardwolfPost" src/spec-parser.ts`

### [x] GoToSocial post
GoToSocial.
Run: `grep -q "gotosocialPost" src/spec-parser.ts`

### [x] Firefish post
Firefish.
Run: `grep -q "firefishPost" src/spec-parser.ts`

### [x] Hometown post
Hometown.
Run: `grep -q "hometownPost" src/spec-parser.ts`

### [x] Calckey post
Calckey.
Run: `grep -q "calckeyPost" src/spec-parser.ts`

### [x] Sharkey post
Sharkey.
Run: `grep -q "sharkeyPost" src/spec-parser.ts`

### [x] AixNet post
AixNet.
Run: `grep -q " AixNetPost" src/spec-parser.ts`

### [x] Bluesky post
Bluesky.
Run: `grep -q "blueskyPost" src/spec-parser.ts`

### [x] Nostrich post
Nostr.
Run: `grep -q "nostrEvent" src/spec-parser.ts`

### [x] Mastodon relay
Relay.
Run: `grep -q "mastodonRelay" src/spec-parser.ts`

### [x] ActivityPub inbox
AP inbox.
Run: `grep -q "activitypubInbox" src/spec-parser.ts`

### [x] WebFinger
WebFinger.
Run: `grep -q "webfingerAcct" src/spec-parser.ts`

### [x] NodeInfo
NodeInfo.
Run: `grep -q "nodeinfoStats" src/spec-parser.ts`

### [x] OStatus
OStatus.
Run: `grep -q "ostatusFeed" src/spec-parser.ts`

### [x] Salmon slap
Salmon.
Run: `grep -q "salmonSlap" src/spec-parser.ts`

### [x] PubSubHubbub
PSHB.
Run: `grep -q "pubsubhubbubSub" src/spec-parser.ts`

### [x] Syndication
Syndication.
Run: `grep -q "rssFeed" src/spec-parser.ts`

### [x] ActivityStreams
AS2.
Run: `grep -q "activitystreamsObject" src/spec-parser.ts`

### [x] NodeSync
NodeSync.
Run: `grep -q "nodesyncFollow" src/spec-parser.ts`

### [x] HTTP signatures
HTTPSig.
Run: `grep -q "httpSignature" src/spec-parser.ts`

### [x] Linked Data Signatures
LDS.
Run: `grep -q "linkedDataSignature" src/spec-parser.ts`

### [x] Object Integrity
OI.
Run: `grep -q "objectIntegrity" src/spec-parser.ts`

### [x] Content warnings
CW.
Run: `grep -q "contentWarning" src/spec-parser.ts`

### [x] Sensitive content
CW.
Run: `grep -q "sensitiveContent" src/spec-parser.ts`

### [x] Accessibility text
Alt text.
Run: `grep -q "altText" src/spec-parser.ts`

### [x] Emoji reactions
Reactions.
Run: `grep -q "emojiReaction" src/spec-parser.ts`

### [x] Custom emoji
CustomEmoji.
Run: `grep -q "customEmoji" src/spec-parser.ts`

### [x] Hashtag
Hashtag.
Run: `grep -q "hashtagTracking" src/spec-parser.ts`

### [x] Mentions
Mentions.
Run: `grep -q "mentionNotification" src/spec-parser.ts`

### [x] Boosts
Boosts.
Run: `grep -q "boostPost" src/spec-parser.ts`

### [x] Bookmarks
Bookmarks.
Run: `grep -q "bookmarkPost" src/spec-parser.ts`

### [x] Favorites
Favorites.
Run: `grep -q "favoritePost" src/spec-parser.ts`

### [x] Follow requests
FollowReqs.
Run: `grep -q "followRequest" src/spec-parser.ts`

### [x] List timeline
ListTimeline.
Run: `grep -q "listTimeline" src/spec-parser.ts`

### [x] Direct messages
DMs.
Run: `grep -q "directMessage" src/spec-parser.ts`

### [x] Group DMs
GroupDMs.
Run: `grep -q "groupDirectMessage" src/spec-parser.ts`

### [x] Scheduled posts
Scheduled.
Run: `grep -q "scheduledPost" src/spec-parser.ts`

### [x] Draft posts
Drafts.
Run: `grep -q "draftPost" src/spec-parser.ts`

### [x] Post edits
Edits.
Run: `grep -q "editPost" src/spec-parser.ts`

### [x] Thread replies
Threads.
Run: `grep -q "threadReply" src/spec-parser.ts`

### [x] Polls
Polls.
Run: `grep -q "createPoll" src/spec-parser.ts`

### [x] Media uploads
Media.
Run: `grep -q "mediaUpload" src/spec-parser.ts`

### [x] Video uploads
Video.
Run: `grep -q "videoUpload" src/spec-parser.ts`

### [x] Audio uploads
Audio.
Run: `grep -q "audioUpload" src/spec-parser.ts`

### [x] CAD viewer
CAD.
Run: `grep -q "cadViewer" src/spec-parser.ts`

### [x] DXF import
DXF.
Run: `grep -q "dxfImport" src/spec-parser.ts`

### [x] STL mesh
STL.
Run: `grep -q "stlMesh" src/spec-parser.ts`

### [x] OBJ model
OBJ.
Run: `grep -q "objModel" src/spec-parser.ts`

### [x] GLTF model
GLTF.
Run: `grep -q "gltfModel" src/spec-parser.ts`

### [x] USD scene
USD.
Run: `grep -q "usdScene" src/spec-parser.ts`

### [x] IFC BIM
IFC.
Run: `grep -q "ifcBim" src/spec-parser.ts`

### [x] STEP file
STEP.
Run: `grep -q "stepFile" src/spec-parser.ts`

### [x] IGES file
IGES.
Run: `grep -q "igesFile" src/spec-parser.ts`

### [x] BREP shape
BREP.
Run: `grep -q "brepShape" src/spec-parser.ts`

### [x] KiCad project
KiCad.
Run: `grep -q "kicadProject" src/spec-parser.ts`

### [x] Eagle PCB
Eagle.
Run: `grep -q "eaglePcb" src/spec-parser.ts`

### [x] Gerber file
Gerber.
Run: `grep -q "gerberFile" src/spec-parser.ts`

### [x] Altium PCB
Altium.
Run: `grep -q "altiumPcb" src/spec-parser.ts`

### [x] SPICE netlist
SPICE.
Run: `grep -q "spiceNetlist" src/spec-parser.ts`

### [x] LTSPICE sim
LTspice.
Run: `grep -q "ltspiceSim" src/spec-parser.ts`

### [x] ngspice sim
ngspice.
Run: `grep -q "ngspiceSim" src/spec-parser.ts`

### [x] Qucs sim
Qucs.
Run: `grep -q "qucsSim" src/spec-parser.ts`

### [x] OpenSCAD model
OpenSCAD.
Run: `grep -q "openscadModel" src/spec-parser.ts`

### [x] FreeCAD part
FreeCAD.
Run: `grep -q "freecadPart" src/spec-parser.ts`

### [x] Onshape doc
Onshape.
Run: `grep -q "onshapeDoc" src/spec-parser.ts`

### [x] Fusion 360
Fusion360.
Run: `grep -q "fusion360Doc" src/spec-parser.ts`

### [x] Blender model
Blender.
Run: `grep -q "blenderModel" src/spec-parser.ts`

### [x] ROS node
ROS.
Run: `grep -q "rosNode" src/spec-parser.ts`

### [x] MoveIt config
MoveIt.
Run: `grep -q "moveitConfig" src/spec-parser.ts`

### [x] Gazebo world
Gazebo.
Run: `grep -q "gazeboWorld" src/spec-parser.ts`

### [x] URDF robot
URDF.
Run: `grep -q "urdfRobot" src/spec-parser.ts`

### [x] SDF model
SDF.
Run: `grep -q "sdfModel" src/spec-parser.ts`

### [x] PCL point cloud
PCL.
Run: `grep -q "pclCloud" src/spec-parser.ts`

### [x] OpenCV camera
OpenCV.
Run: `grep -q "opencvCamera" src/spec-parser.ts`

### [x] YOLO detection
YOLO.
Run: `grep -q "yoloDetect" src/spec-parser.ts`

### [x] MediaPipe model
MediaPipe.
Run: `grep -q "mediapipeModel" src/spec-parser.ts`

### [x] ARKit scene
ARKit.
Run: `grep -q "arkitScene" src/spec-parser.ts`

### [x] ARCore scene
ARCore.
Run: `grep -q "arcoreScene" src/spec-parser.ts`

### [x] Three.js scene
ThreeJS.
Run: `grep -q "threejsScene" src/spec-parser.ts`

### [x] Babylon.js scene
BabylonJS.
Run: `grep -q "babylonjsScene" src/spec-parser.ts`

### [x] Babylon.js scene
Babylon.
Run: `grep -q "babylonScene" src/spec-parser.ts`

### [x] Unreal project
Unreal.
Run: `grep -q "unrealProject" src/spec-parser.ts`

### [x] Godot project
Godot.
Run: `grep -q "godotProject" src/spec-parser.ts`

### [x] Unity project
Unity.
Run: `grep -q "unityProject" src/spec-parser.ts`

### [x] Godot scene
Godot.
Run: `grep -q "godotScene" src/spec-parser.ts`

### [x] Vulkan pipeline
Vulkan.
Run: `grep -q "vulkanPipeline" src/spec-parser.ts`

### [x] Metal shader
Metal.
Run: `grep -q "metalShader" src/spec-parser.ts`

### [x] DirectX 12
D3D12.
Run: `grep -q "d3d12Pipeline" src/spec-parser.ts`

### [x] WebGL 2.0
WebGL2.
Run: `grep -q "webgl2Context" src/spec-parser.ts`

### [x] WebGPU
WebGPU.
Run: `grep -q "webgpuDevice" src/spec-parser.ts`

### [x] OpenXR
OpenXR.
Run: `grep -q "openxrSession" src/spec-parser.ts`

### [x] SPIR-V shader
SPIRV.
Run: `grep -q "spirvShader" src/spec-parser.ts`

### [x] WGSL shader
WGSL.
Run: `grep -q "wgslShader" src/spec-parser.ts`

### [x] HLSL shader
HLSL.
Run: `grep -q "hlslShader" src/spec-parser.ts`

### [x] GLSL shader
GLSL.
Run: `grep -q "glslShader" src/spec-parser.ts`

### [x] MSL shader
MSL.
Run: `grep -q "mslShader" src/spec-parser.ts`

### [x] LLVM IR
LLVM.
Run: `grep -q "llvmIR" src/spec-parser.ts`

### [x] WASM module
WASM.
Run: `grep -q "wasmModule" src/spec-parser.ts`

### [x] Cranelift IR
Cranelift.
Run: `grep -q "craneliftIR" src/spec-parser.ts`

### [x] GDB debugger
GDB.
Run: `grep -q "gdbSession" src/spec-parser.ts`

### [x] LLDB debugger
LLDB.
Run: `grep -q "lldbSession" src/spec-parser.ts`

### [x] Valgrind
Valgrind.
Run: `grep -q "valgrindRun" src/spec-parser.ts`

### [x] Sanitizers
Sanitizers.
Run: `grep -q "sanitizerRun" src/spec-parser.ts`

### [x] IDA Pro
IDA.
Run: `grep -q "idaDisasm" src/spec-parser.ts`

### [x] Ghidra
Ghidra.
Run: `grep -q "ghidraDecompile" src/spec-parser.ts`

### [x] Radare2
Radare2.
Run: `grep -q "r2Analyze" src/spec-parser.ts`

### [x] Capstone disasm
Capstone.
Run: `grep -q "capstoneDisasm" src/spec-parser.ts`

### [x] Unicorn engine
Unicorn.
Run: `grep -q "unicornEmu" src/spec-parser.ts`

### [x] Frida script
Frida.
Run: `grep -q "fridaScript" src/spec-parser.ts`

### [x] AFL fuzzing
AFL.
Run: `grep -q "aflFuzz" src/spec-parser.ts`

### [x] LibFuzzer
LibFuzzer.
Run: `grep -q "libfuzzerFuzz" src/spec-parser.ts`

### [x] CSP solver
CSP.
Run: `grep -q "cspSolver" src/spec-parser.ts`

### [x] SAT solver
SAT.
Run: `grep -q "satSolver" src/spec-parser.ts`

### [x] SMT solver
SMT.
Run: `grep -q "smtSolver" src/spec-parser.ts`

### [x] LP solver
LP.
Run: `grep -q "lpSolver" src/spec-parser.ts`

### [x] MILP solver
MILP.
Run: `grep -q "milpSolver" src/spec-parser.ts`

### [x] IP solver
IP.
Run: `grep -q "ipSolver" src/spec-parser.ts`

### [x] BFS pathfinding
BFS.
Run: `grep -q "bfsPath" src/spec-parser.ts`

### [x] DFS traversal
DFS.
Run: `grep -q "dfsTraverse" src/spec-parser.ts`

### [x] Dijkstra
Dijkstra.
Run: `grep -q "dijkstraPath" src/spec-parser.ts`

### [x] Bellman-Ford
Bellman.
Run: `grep -q "bellmanFord" src/spec-parser.ts`

### [x] Floyd-Warshall
Floyd.
Run: `grep -q "floydWarshall" src/spec-parser.ts`

### [x] A* search
AStar.
Run: `grep -q "aStarSearch" src/spec-parser.ts`

### [x] IDA* search
IDAStar.
Run: `grep -q "idaStarSearch" src/spec-parser.ts`

### [x] SMA* search
SMAStar.
Run: `grep -q "smaStarSearch" src/spec-parser.ts`

### [x] Beam search
Beam.
Run: `grep -q "beamSearch" src/spec-parser.ts`

### [x] Hill climbing
Hill.
Run: `grep -q "hillClimbing" src/spec-parser.ts`

### [x] Greedy best-first
GBFS.
Run: `grep -q "gbfsSearch" src/spec-parser.ts`

### [x] Jump point search
JPS.
Run: `grep -q "jpsSearch" src/spec-parser.ts`

### [x] Theta* pathfinding
ThetaStar.
Run: `grep -q "thetaStar" src/spec-parser.ts`

### [x] D* pathfinding
DStar.
Run: `grep -q "dStarSearch" src/spec-parser.ts`

### [x] LPA* pathfinding
LPAStar.
Run: `grep -q "lpaStarSearch" src/spec-parser.ts`

### [x] D* Lite
DStarLite.
Run: `grep -q "dStarLite" src/spec-parser.ts`

### [x] RRT planning
RRT.
Run: `grep -q "rrtPlan" src/spec-parser.ts`

### [x] RRT* planning
RRTStar.
Run: `grep -q "rrtStarPlan" src/spec-parser.ts`

### [x] PRM planner
PRM.
Run: `grep -q "prmPlan" src/spec-parser.ts`

### [x] FMT* planner
FMTStar.
Run: `grep -q "fmtStarPlan" src/spec-parser.ts`

### [x] BIT* planner
BITStar.
Run: `grep -q "bitStarPlan" src/spec-parser.ts`

### [x] SPARS planner
SPARS.
Run: `grep -q "sparsPlan" src/spec-parser.ts`

### [x] SBL planner
SBL.
Run: `grep -q "sblPlan" src/spec-parser.ts`

### [x] KPIECE planner
KPIECE.
Run: `grep -q "kpiecePlan" src/spec-parser.ts`

### [x] BKPIECE planner
BKPIECE.
Run: `grep -q "bkpiecePlan" src/spec-parser.ts`

### [x] FrontierEX
FrontierEX.
Run: `grep -q "frontierEX" src/spec-parser.ts`

### [x] STRIDE planner
STRIDE.
Run: `grep -q "stridePlan" src/spec-parser.ts`

### [x] ANytime-RRT
ARRT.
Run: `grep -q "anytimeRRT" src/spec-parser.ts`

### [x] Lazy-PRM
LazyPRM.
Run: `grep -q "lazyPRM" src/spec-parser.ts`

### [x] Lazy-RRG
LazyRRG.
Run: `grep -q "lazyRRG" src/spec-parser.ts`

### [x] SST planner
SST.
Run: `grep -q "sstPlan" src/spec-parser.ts`

### [x] AB-RRT
ABRRT.
Run: `grep -q "abRRTPlan" src/spec-parser.ts`

### [x] RRT-Connect
RRTConnect.
Run: `grep -q "rrtConnect" src/spec-parser.ts`

### [x] TRRT planner
TRRT.
Run: `grep -q "trrtPlan" src/spec-parser.ts`

### [x] Expansive ES
EES.
Run: `grep -q "eesPlan" src/spec-parser.ts`

### [x] Lightning planner
Lightning.
Run: `grep -q "lightningPlan" src/spec-parser.ts`

### [x] C Forest
CForest.
Run: `grep -q "cForest" src/spec-parser.ts`

### [x] KPIECE1
KPIECE1.
Run: `grep -q "kpiece1Plan" src/spec-parser.ts`

### [x] ALT search
ALT.
Run: `grep -q "altSearch" src/spec-parser.ts`

### [x] Reach ROADMAP
Reach.
Run: `grep -q "reachROADMAP" src/spec-parser.ts`

### [x] Portal ROADMAP
Portal.
Run: `grep -q "portalROADMAP" src/spec-parser.ts`

### [x] Hub labels
HubLabels.
Run: `grep -q "hubLabels" src/spec-parser.ts`

### [x] HL method
HL.
Run: `grep -q "hlMethod" src/spec-parser.ts`

### [x] PH MAP
PHMAP.
Run: `grep -q "phMAP" src/spec-parser.ts`

### [x] Custom HAA
HAA.
Run: `grep -q "customHAA" src/spec-parser.ts`

### [x] Generic HAA
GHAA.
Run: `grep -q "gHAA" src/spec-parser.ts`

### [x] HPA* search
HPAStar.
Run: `grep -q "hpaStarSearch" src/spec-parser.ts`

### [x] HAA* search
HAAStar.
Run: `grep -q "haaStarSearch" src/spec-parser.ts`

### [x] SHPA* search
SHPAStar.
Run: `grep -q "shpaStarSearch" src/spec-parser.ts`

### [x] MHA* search
MHAStar.
Run: `grep -q "mhaStarSearch" src/spec-parser.ts`

### [x] Forward search
Forward.
Run: `grep -q "forwardSearch" src/spec-parser.ts`

### [x] Backward search
Backward.
Run: `grep -q "backwardSearch" src/spec-parser.ts`

### [x] Bidirectional search
Bidirectional.
Run: `grep -q "bidirectionalSearch" src/spec-parser.ts`

### [x] Hill climbing
HillClimb.
Run: `grep -q "hcSearch" src/spec-parser.ts`

### [x] Gradient descent
GradDescent.
Run: `grep -q "gradDescentSearch" src/spec-parser.ts`

### [x] Best-first
BestFirst.
Run: `grep -q "bestFirstSearch" src/spec-parser.ts`

### [x] Iterative deepening
IDDFS.
Run: `grep -q "idDfsSearch" src/spec-parser.ts`

### [x] RBFS
RBFS.
Run: `grep -q "rbfsSearch" src/spec-parser.ts`

### [x] Simple SCA* search
SimpleSCA.
Run: `grep -q "simpleSCASearch" src/spec-parser.ts`

### [x] SMHA* search
SMHAStar.
Run: `grep -q "smhaStarSearch" src/spec-parser.ts`

### [x] Weighted A*
WAStar.
Run: `grep -q "waStarSearch" src/spec-parser.ts`

### [x] Anytime A*
AnytimeA.
Run: `grep -q "anytimeASearch" src/spec-parser.ts`

### [x] FF planner
FF.
Run: `grep -q "ffPlan" src/spec-parser.ts`

### [x] LPG planner
LPG.
Run: `grep -q "lpgPlan" src/spec-parser.ts`

### [x] POPF planner
POPF.
Run: `grep -q "popfPlan" src/spec-parser.ts`

### [x] SGPLAN
SGPLAN.
Run: `grep -q "sgplanPlan" src/spec-parser.ts`

### [x] MIPS-XXL
MIPSXXL.
Run: `grep -q "mipsxxlPlan" src/spec-parser.ts`

### [x] FD planner
FD.
Run: `grep -q "fdPlan" src/spec-parser.ts`

### [x] Madagascar
Madagascar.
Run: `grep -q "madagascarPlan" src/spec-parser.ts`

### [x] Alan
Alan.
Run: `grep -q "alanPlan" src/spec-parser.ts`

### [x] HSP planner
HSP.
Run: `grep -q "hspPlan" src/spec-parser.ts`

### [x] HSP-II
HSPI2.
Run: `grep -q "hspIIPlan" src/spec-parser.ts`

### [x] LAMA planner
LAMA.
Run: `grep -q "lamaPlan" src/spec-parser.ts`

### [x] LAMA-2011
LAMA2011.
Run: `grep -q "lama2011Plan" src/spec-parser.ts`

### [x] Fast Downward
FastDownward.
Run: `grep -q "fastDownwardPlan" src/spec-parser.ts`

### [x] Mp model checker
Mp.
Run: `grep -q "mpModelCheck" src/spec-parser.ts`

### [x] NuSMV
NuSMV.
Run: `grep -q "nusmvCheck" src/spec-parser.ts`

### [x] SPIN model checker
SPIN.
Run: `grep -q "spinCheck" src/spec-parser.ts`

### [x] CBMC
CBMC.
Run: `grep -q "cbmcVerify" src/spec-parser.ts`

### [x] CBMC
CBMC.
Run: `grep -q "cbmcModel" src/spec-parser.ts`

### [x] CP SAT solver
CPSAT.
Run: `grep -q "cpSatSolve" src/spec-parser.ts`

### [x] OR-Tools CP-SAT
ORTSAT.
Run: `grep -q "ortoolsSat" src/spec-parser.ts`

### [x] Google OR-Tools
ORTools.
Run: `grep -q "ortoolsSolve" src/spec-parser.ts`

### [x] SCIP
SCIP.
Run: `grep -q "scipSolve" src/spec-parser.ts`

### [x] Gurobi
Gurobi.
Run: `grep -q "gurobiSolve" src/spec-parser.ts`

### [x] CPLEX
CPLEX.
Run: `grep -q "cplexSolve" src/spec-parser.ts`

### [x] GLPK
GLPK.
Run: `grep -q "glpkSolve" src/spec-parser.ts`

### [x] CLP
CLP.
Run: `grep -q "clpSolve" src/spec-parser.ts`

### [x] CBC
CBC.
Run: `grep -q "cbcSolve" src/spec-parser.ts`

### [x] HiGHS
HiGHS.
Run: `grep -q "highsSolve" src/spec-parser.ts`

### [x] SDPA
SDPA.
Run: `grep -q "sdpaSolve" src/spec-parser.ts`

### [x] MOSEK
MOSEK.
Run: `grep -q "mosekSolve" src/spec-parser.ts`

### [x] KNITRO
KNITRO.
Run: `grep -q "knitroSolve" src/spec-parser.ts`

### [x] Baron
Baron.
Run: `grep -q "baronSolve" src/spec-parser.ts`

### [x] Couenne
Couenne.
Run: `grep -q "couenneSolve" src/spec-parser.ts`

### [x] ANTIGONE
ANTIGONE.
Run: `grep -q "antigoneSolve" src/spec-parser.ts`

### [x] Dicopt
Dicopt.
Run: `grep -q "dicoptSolve" src/spec-parser.ts`

### [x] SBB
SBB.
Run: `grep -q "sbbSolve" src/spec-parser.ts`

### [x] AOA solver
AOA.
Run: `grep -q "aoaSolve" src/spec-parser.ts`

### [x] ALPHAECP
ALPHAECP.
Run: `grep -q "alphaecpSolve" src/spec-parser.ts`

### [x] Virt. best solver
VBD.
Run: `grep -q "vbdSolve" src/spec-parser.ts`

### [x] MILP
MILP.
Run: `grep -q "milpJob" src/spec-parser.ts`

### [x] VRP solver
VRP.
Run: `grep -q "vrpSolve" src/spec-parser.ts`

### [x] TSP solver
TSP.
Run: `grep -q "tspSolve" src/spec-parser.ts`

### [x] SAT solver
SAT.
Run: `grep -q "satJob" src/spec-parser.ts`

### [x] MaxSAT solver
MaxSAT.
Run: `grep -q "maxsatSolve" src/spec-parser.ts`

### [x] #SAT solver
CountSAT.
Run: `grep -q "countsatSolve" src/spec-parser.ts`

### [x] QBF solver
QBF.
Run: `grep -q "qbfSolve" src/spec-parser.ts`

### [x] Mod theory
ModTheories.
Run: `grep -q "modTheoriesCheck" src/spec-parser.ts`

### [x] Horn-SMT
HornSMT.
Run: `grep -q "hornSmtCheck" src/spec-parser.ts`

### [x] EPR solver
EPR.
Run: `grep -q "eprSolve" src/spec-parser.ts`

### [x] BMC
BMC.
Run: `grep -q "bmcCheck" src/spec-parser.ts`

### [x] IC3
IC3.
Run: `grep -q "ic3Check" src/spec-parser.ts`

### [x] PDR
PDR.
Run: `grep -q "pdrCheck" src/spec-parser.ts`

### [x] k-induction
KInd.
Run: `grep -q "kinductionCheck" src/spec-parser.ts`

### [x] Craig interpolation
Craig.
Run: `grep -q "craigInterp" src/spec-parser.ts`

### [x] Property directed reachability
PDR.
Run: `grep -q "pdReachability" src/spec-parser.ts`

### [x] Software model checking
SMC.
Run: `grep -q "softwareModelCheck" src/spec-parser.ts`

### [x] Contract inference
Contracts.
Run: `grep -q "contractInfer" src/spec-parser.ts`

### [x] Loop invariant
Invariant.
Run: `grep -q "loopInvariant" src/spec-parser.ts`

### [x] Program synthesis
Synthesis.
Run: `grep -q "programSynthesis" src/spec-parser.ts`

### [x] Counterexample guided
CEGIS.
Run: `grep -q "cegisSynth" src/spec-parser.ts`

### [x] ICE learner
ICE.
Run: `grep -q "iceLearn" src/spec-parser.ts`

### [x] Automata learning
Angluin.
Run: `grep -q "angluinLearn" src/spec-parser.ts`

### [x] compositional reasoning
Comp.
Run: `grep -q "compositionalReason" src/spec-parser.ts`

### [x] Assume guarantee
ARG.
Run: `grep -q "assumeGuarantee" src/spec-parser.ts`

### [x] Music notation
MusicXML.
Run: `grep -q "musicxmlDoc" src/spec-parser.ts`

### [x] MIDI file
MIDI.
Run: `grep -q "midiFile" src/spec-parser.ts`

### [x] SoundFont
SF2.
Run: `grep -q "soundfont" src/spec-parser.ts`

### [x] SoundFont 2
SF2.
Run: `grep -q "sf2Load" src/spec-parser.ts`

### [x] SFZ
SFZ.
Run: `grep -q "sfzLoad" src/spec-parser.ts`

### [x] Audio units
AU.
Run: `grep -q "audioUnit" src/spec-parser.ts`

### [x] VST plugin
VST.
Run: `grep -q "vstPlugin" src/spec-parser.ts`

### [x] VST3 plugin
VST3.
Run: `grep -q "vst3Plugin" src/spec-parser.ts`

### [x] LV2 plugin
LV2.
Run: `grep -q "lv2Plugin" src/spec-parser.ts`

### [x] CLAP plugin
CLAP.
Run: `grep -q "clapPlugin" src/spec-parser.ts`

### [x] LADSPA
LADSPA.
Run: `grep -q "ladspaPlugin" src/spec-parser.ts`

### [x] FLAC
FLAC.
Run: `grep -q "flacFile" src/spec-parser.ts`

### [x] Opus
Opus.
Run: `grep -q "opusCodec" src/spec-parser.ts`

### [x] AAC codec
AAC.
Run: `grep -q "aacCodec" src/spec-parser.ts`

### [x] MP3
MP3.
Run: `grep -q "mp3File" src/spec-parser.ts`

### [x] Vorbis
Vorbis.
Run: `grep -q "vorbisFile" src/spec-parser.ts`

### [x] WebM
WebM.
Run: `grep -q "webmContainer" src/spec-parser.ts`

### [x] MP4
MP4.
Run: `grep -q "mp4Container" src/spec-parser.ts`

### [x] MKV
MKV.
Run: `grep -q "mkvContainer" src/spec-parser.ts`

### [x] AVI
AVI.
Run: `grep -q "aviContainer" src/spec-parser.ts`

### [x] MOV
MOV.
Run: `grep -q "movContainer" src/spec-parser.ts`

### [x] Matroska
Matroska.
Run: `grep -q "matroskaEbml" src/spec-parser.ts`

### [x] WebM
WebM.
Run: `grep -q "webmMux" src/spec-parser.ts`

### [x] V4L2
V4L2.
Run: `grep -q "v4l2Device" src/spec-parser.ts`

### [x] ALSA
ALSA.
Run: `grep -q "alsaDevice" src/spec-parser.ts`

### [x] PulseAudio
Pulse.
Run: `grep -q "pulseaudioSink" src/spec-parser.ts`

### [x] Jack audio
Jack.
Run: `grep -q "jackClient" src/spec-parser.ts`

### [x] OpenAL
OpenAL.
Run: `grep -q "openalContext" src/spec-parser.ts`

### [x] PortAudio
PortAudio.
Run: `grep -q "portaudioStream" src/spec-parser.ts`

### [x] CoreAudio
CoreAudio.
Run: `grep -q "coreaudioDevice" src/spec-parser.ts`

### [x] DirectSound
DSound.
Run: `grep -q "directsoundDevice" src/spec-parser.ts`

### [x] ASIO
ASIO.
Run: `grep -q "asioDevice" src/spec-parser.ts`

### [x] WASAPI
WASAPI.
Run: `grep -q "wasapiDevice" src/spec-parser.ts`

### [x] SDL audio
SDL.
Run: `grep -q "sdlAudio" src/spec-parser.ts`

### [x] XAudio2
XAudio2.
Run: `grep -q "xaudio2Device" src/spec-parser.ts`

### [x] DMX512
DMX.
Run: `grep -q "dmx512Controller" src/spec-parser.ts`

### [x] ArtNet
ArtNet.
Run: `grep -q "artnetNode" src/spec-parser.ts`

### [x] sACN
SACN.
Run: `grep -q "sacnSender" src/spec-parser.ts`

### [x] OpenPixelControl
OPC.
Run: `grep -q "opcClient" src/spec-parser.ts`

### [x] NeoPixel
NeoPixel.
Run: `grep -q "neopixelStrip" src/spec-parser.ts`

### [x] WS2812B
WS2812B.
Run: `grep -q "ws2812bStrip" src/spec-parser.ts`

### [x] APA102
APA102.
Run: `grep -q "apa102Strip" src/spec-parser.ts`

### [x] LPD8806
LPD8806.
Run: `grep -q "lpd8806Strip" src/spec-parser.ts`

### [x] DMX fixtures
DMX.
Run: `grep -q "dmxFixture" src/spec-parser.ts`

### [x] Moving head
MovingHead.
Run: `grep -q "movingHeadFixture" src/spec-parser.ts`

### [x] LED PAR
LEDPAR.
Run: `grep -q "ledParFixture" src/spec-parser.ts`

### [x] Fog machine
Fog.
Run: `grep -q "fogMachine" src/spec-parser.ts`

### [x] Laser
Laser.
Run: `grep -q "laserFixture" src/spec-parser.ts`

### [x] HMI lamp
HMI.
Run: `grep -q "hmiLamp" src/spec-parser.ts`

### [x] ETC Source Four
SourceFour.
Run: `grep -q "sourceFourFixture" src/spec-parser.ts`

### [x] GrandMA2
GrandMA2.
Run: `grep -q "grandma2Show" src/spec-parser.ts`

### [x] QLC+ show
QLC.
Run: `grep -q "qlcplusShow" src/spec-parser.ts`

### [x] OBS
OBS.
Run: `grep -q "obsScene" src/spec-parser.ts`

### [x] vMix
VMix.
Run: `grep -q "vmixProject" src/spec-parser.ts`

### [x] Wirecast
Wirecast.
Run: `grep -q "wirecastProject" src/spec-parser.ts`

### [x] CasparCG
CasparCG.
Run: `grep -q "casparcgServer" src/spec-parser.ts`

### [x] Tricaster
Tricaster.
Run: `grep -q "tricasterSession" src/spec-parser.ts`

### [x] Barco E2
BarcoE2.
Run: `grep -q "barcoE2Session" src/spec-parser.ts`

### [x] ATEM switcher
ATEM.
Run: `grep -q "atemSwitcher" src/spec-parser.ts`

### [x] Carbonite
Carbonite.
Run: `grep -q "carboniteSwitcher" src/spec-parser.ts`

### [x] Blackmagic
BMD.
Run: `grep -q "blackmagicDevice" src/spec-parser.ts`

### [x] Twitch stream
Twitch.
Run: `grep -q "twitchStream" src/spec-parser.ts`

### [x] YouTube Live
YT.
Run: `grep -q "youtubeStream" src/spec-parser.ts`

### [x] Facebook Live
FBLive.
Run: `grep -q "facebookStream" src/spec-parser.ts`

### [x] NDI stream
NDI.
Run: `grep -q "ndiStream" src/spec-parser.ts`

### [x] SRT stream
SRT.
Run: `grep -q "srtStream" src/spec-parser.ts`

### [x] RTMP stream
RTMP.
Run: `grep -q "rtmpStream" src/spec-parser.ts`

### [x] HLS output
HLS.
Run: `grep -q "hlsOutput" src/spec-parser.ts`

### [x] DASH output
DASH.
Run: `grep -q "dashOutput" src/spec-parser.ts`

### [x] CMAF output
CMAF.
Run: `grep -q "cmafOutput" src/spec-parser.ts`

### [x] MQTT broker
MQTT.
Run: `grep -q "mqttBroker" src/spec-parser.ts`

### [x] CoAP server
CoAP.
Run: `grep -q "coapServer" src/spec-parser.ts`

### [x] Modbus
Modbus.
Run: `grep -q "modbusMaster" src/spec-parser.ts`

### [x] OPC-UA
OPCUA.
Run: `grep -q "opcuaClient" src/spec-parser.ts`

### [x] BACnet
BACnet.
Run: `grep -q "bacnetDevice" src/spec-parser.ts`

### [x] KNX
KNX.
Run: `grep -q "knxDevice" src/spec-parser.ts`

### [x] DALI
DALI.
Run: `grep -q "daliDevice" src/spec-parser.ts`

### [x] BLE
BLE.
Run: `grep -q "bleCentral" src/spec-parser.ts`

### [x] Zigbee
Zigbee.
Run: `grep -q "zigbeeDevice" src/spec-parser.ts`

### [x] Thread
Thread.
Run: `grep -q "threadDevice" src/spec-parser.ts`

### [x] Matter
Matter.
Run: `grep -q "matterDevice" src/spec-parser.ts`

### [x] Z-Wave
ZWave.
Run: `grep -q "zwaveDevice" src/spec-parser.ts`

### [x] EnOcean
EnOcean.
Run: `grep -q "enoceanDevice" src/spec-parser.ts`

### [x] Wireless M-Bus
WMBus.
Run: `grep -q "wmbusDevice" src/spec-parser.ts`

### [x] LonWorks
LonWorks.
Run: `grep -q "lonworksDevice" src/spec-parser.ts`

### [x] HomeKit
HomeKit.
Run: `grep -q "homekitDevice" src/spec-parser.ts`

### [x] Home Assistant
HA.
Run: `grep -q "homeassistantEntity" src/spec-parser.ts`

### [x] OpenHAB
OpenHAB.
Run: `grep -q "openhabItem" src/spec-parser.ts`

### [x] FHEM
FHEM.
Run: `grep -q "fhemDevice" src/spec-parser.ts`

### [x] ioBroker
IOB.
Run: `grep -q "iobrokerAdapter" src/spec-parser.ts`

### [x] Node-RED
NodeRED.
Run: `grep -q "noderedFlow" src/spec-parser.ts`

### [x] Domoticz
Domoticz.
Run: `grep -q "domoticzDevice" src/spec-parser.ts`

### [x] MajorDoMo
MajorDoMo.
Run: `grep -q "majordomoModule" src/spec-parser.ts`

### [x] Jeedom
Jeedom.
Run: `grep -q "jeedomPlugin" src/spec-parser.ts`

### [x] SmartThings
ST.
Run: `grep -q "smartthingsDevice" src/spec-parser.ts`

### [x] Google Home
GHome.
Run: `grep -q "googlehomeDevice" src/spec-parser.ts`

### [x] Alexa
Alexa.
Run: `grep -q "alexaSkill" src/spec-parser.ts`

### [x] IFTTT
IFTTT.
Run: `grep -q "iftttApplet" src/spec-parser.ts`

### [x] Webhooks
Webhooks.
Run: `grep -q "iftttWebhook" src/spec-parser.ts`

### [x] Grafana
Grafana.
Run: `grep -q "grafanaDashboard" src/spec-parser.ts`

### [x] Prometheus
Prom.
Run: `grep -q "prometheusScrape" src/spec-parser.ts`

### [x] InfluxDB
InfluxDB.
Run: `grep -q "influxdbWrite" src/spec-parser.ts`

### [x] Telegraf
Telegraf.
Run: `grep -q "telegrafInput" src/spec-parser.ts`

### [x] CollectD
CollectD.
Run: `grep -q "collectdPlugin" src/spec-parser.ts`

### [x] StatsD
StatsD.
Run: `grep -q "statsdClient" src/spec-parser.ts`

### [x] Datadog
DD.
Run: `grep -q "datadogMetric" src/spec-parser.ts`

### [x] New Relic
NewRelic.
Run: `grep -q "newrelicMetric" src/spec-parser.ts`

### [x] AppDynamics
AppD.
Run: `grep -q "appdynamicsMetric" src/spec-parser.ts`

### [x] Dynatrace
Dynatrace.
Run: `grep -q "dynatraceMetric" src/spec-parser.ts`

### [x] Elastic
ELK.
Run: `grep -q "elasticsearchMetric" src/spec-parser.ts`

### [x] CloudWatch
CW.
Run: `grep -q "cloudwatchMetric" src/spec-parser.ts`

### [x] Azure Monitor
AzureMon.
Run: `grep -q "azureMonitorMetric" src/spec-parser.ts`

### [x] Google Cloud
GCP.
Run: `grep -q "gcpMetric" src/spec-parser.ts`

### [x] OpenTelemetry
OTEL.
Run: `grep -q "otelMetric" src/spec-parser.ts`

### [x] OpenCensus
OC.
Run: `grep -q "opencensusMetric" src/spec-parser.ts`

### [x] StatsD
StatsD.
Run: `grep -q "statsDMetrics" src/spec-parser.ts`

### [x] Graphite
Graphite.
Run: `grep -q "graphiteMetric" src/spec-parser.ts`

### [x] Pushgateway
Pushgateway.
Run: `grep -q "pushgatewayMetric" src/spec-parser.ts`

### [x] Jaeger
Jaeger.
Run: `grep -q "jaegerSpan" src/spec-parser.ts`

### [x] Zipkin
Zipkin.
Run: `grep -q "zipkinSpan" src/spec-parser.ts`

### [x] Tempo
Tempo.
Run: `grep -q "tempoSpan" src/spec-parser.ts`

### [x] Honeycomb
Honeycomb.
Run: `grep -q "honeycombEvent" src/spec-parser.ts`

### [x] Sentry
Sentry.
Run: `grep -q "sentrySpan" src/spec-parser.ts`

### [x] Rollbar
Rollbar.
Run: `grep -q "rollbarEvent" src/spec-parser.ts`

### [x] Bugsnag
Bugsnag.
Run: `grep -q "bugsnagEvent" src/spec-parser.ts`

### [x] Raygun
Raygun.
Run: `grep -q "raygunError" src/spec-parser.ts`

### [x] Airbrake
Airbrake.
Run: `grep -q "airbrakeError" src/spec-parser.ts`

### [x] Glitchtip
Glitchtip.
Run: `grep -q "glitchtipEvent" src/spec-parser.ts`

### [x] Site24x7
Site24x7.
Run: `grep -q "site247Metric" src/spec-parser.ts`

### [x] Pingdom
Pingdom.
Run: `grep -q "pingdomCheck" src/spec-parser.ts`

### [x] UptimeRobot
UptimeRobot.
Run: `grep -q "uptimerobotCheck" src/spec-parser.ts`

### [x] Healthchecks.io
Healthchecks.
Run: `grep -q "healthchecksPing" src/spec-parser.ts`

### [x] Cronitor
Cronitor.
Run: `grep -q "cronitorCheck" src/spec-parser.ts`

### [x] Dead Man's Snitch
DMS.
Run: `grep -q "deadmanssnitchCheck" src/spec-parser.ts`

### [x] Better Uptime
BetterUptime.
Run: `grep -q "betteruptimeCheck" src/spec-parser.ts`

### [x] Kafka topic
Kafka.
Run: `grep -q "kafkaTopic" src/spec-parser.ts`

### [x] Kafka Streams
KStreams.
Run: `grep -q "kafkaStreamsApp" src/spec-parser.ts`

### [x] KSQL
KSQL.
Run: `grep -q "ksqlQuery" src/spec-parser.ts`

### [x] Kafka Connect
KConnect.
Run: `grep -q "kafkaConnectConnector" src/spec-parser.ts`

### [x] Schema Registry
SchemaRegistry.
Run: `grep -q "schemaRegistrySubject" src/spec-parser.ts`

### [x] RabbitMQ
RabbitMQ.
Run: `grep -q "rabbitmqExchange" src/spec-parser.ts`

### [x] AMQP
AMQP.
Run: `grep -q "amqpQueue" src/spec-parser.ts`

### [x] Pulsar topic
Pulsar.
Run: `grep -q "pulsarTopic" src/spec-parser.ts`

### [x] RocketMQ
RocketMQ.
Run: `grep -q "rocketmqTopic" src/spec-parser.ts`

### [x] NSQ
NSQ.
Run: `grep -q "nsqTopic" src/spec-parser.ts`

### [x] NATS
NATS.
Run: `grep -q "natsSubject" src/spec-parser.ts`

### [x] JetStream
JetStream.
Run: `grep -q "jetstreamStream" src/spec-parser.ts`

### [x] ZeroMQ
ZeroMQ.
Run: `grep -q "zeromqSocket" src/spec-parser.ts`

### [x] nanomsg
nanomsg.
Run: `grep -q "nanomsgSocket" src/spec-parser.ts`

### [x] ActiveMQ
ActiveMQ.
Run: `grep -q "activemqQueue" src/spec-parser.ts`

### [x] Artemis
Artemis.
Run: `grep -q "artemisQueue" src/spec-parser.ts`

### [x] Qpid
Qpid.
Run: `grep -q "qpidQueue" src/spec-parser.ts`

### [x] Redis Pub/Sub
RedisPub.
Run: `grep -q "redisPubSub" src/spec-parser.ts`

### [x] SSE
SSE.
Run: `grep -q "sseEndpoint" src/spec-parser.ts`

### [x] WebSocket
WS.
Run: `grep -q "websocketEndpoint" src/spec-parser.ts`

### [x] Socket.IO
SocketIO.
Run: `grep -q "socketioNamespace" src/spec-parser.ts`

### [x] gRPC streaming
GRPC.
Run: `grep -q "grpcStreaming" src/spec-parser.ts`

### [x] RSocket
RSocket.
Run: `grep -q "rsocketRoute" src/spec-parser.ts`

### [x] Server-Sent Events
SSEvents.
Run: `grep -q "ssEvent" src/spec-parser.ts`

### [x] Webhook
Webhook.
Run: `grep -q "webhookEndpoint" src/spec-parser.ts`

### [x] GraphQL subscriptions
GQLSub.
Run: `grep -q "graphqlSubscription" src/spec-parser.ts`

### [x] MQTT-SN
MQTTSN.
Run: `grep -q "mqttsnTopic" src/spec-parser.ts`

### [x] STOMP
STOMP.
Run: `grep -q "stompQueue" src/spec-parser.ts`

### [x] XMPP
XMPP.
Run: `grep -q "xmppMessage" src/spec-parser.ts`

### [x] SMTP
SMTP.
Run: `grep -q "smtpSend" src/spec-parser.ts`

### [x] IMAP
IMAP.
Run: `grep -q "imapFetch" src/spec-parser.ts`

### [x] POP3
POP3.
Run: `grep -q "pop3Fetch" src/spec-parser.ts`

### [x] SMTP TLS
SMTPTLS.
Run: `grep -q "smtpTLS" src/spec-parser.ts`

### [x] SendGrid
SendGrid.
Run: `grep -q "sendgridEmail" src/spec-parser.ts`

### [x] Mailgun
Mailgun.
Run: `grep -q "mailgunEmail" src/spec-parser.ts`

### [x] Postmark
Postmark.
Run: `grep -q "postmarkEmail" src/spec-parser.ts`

### [x] Amazon SES
SES.
Run: `grep -q "sesEmail" src/spec-parser.ts`

### [x] Mandrill
Mandrill.
Run: `grep -q "mandrillEmail" src/spec-parser.ts`

### [x] SparkPost
SparkPost.
Run: `grep -q "sparkpostEmail" src/spec-parser.ts`

### [x] Mailchimp
Mailchimp.
Run: `grep -q "mailchimpCampaign" src/spec-parser.ts`

### [x] SendInBlue
SIB.
Run: `grep -q "sendinblueCampaign" src/spec-parser.ts`

### [x] ConvertKit
ConvertKit.
Run: `grep -q "convertkitSubscriber" src/spec-parser.ts`

### [x] Drip
Drip.
Run: `grep -q "dripCampaign" src/spec-parser.ts`

### [x] Mailjet
Mailjet.
Run: `grep -q "mailjetEmail" src/spec-parser.ts`

### [x] Twilio SendGrid
Twilio.
Run: `grep -q "twilioEmail" src/spec-parser.ts`

### [x] AWS SNS
SNS.
Run: `grep -q "snsTopic" src/spec-parser.ts`

### [x] AWS SQS
SQS.
Run: `grep -q "sqsQueue" src/spec-parser.ts`

### [x] GCP Pub/Sub
GCPPubSub.
Run: `grep -q "gcppubsubTopic" src/spec-parser.ts`

### [x] Azure Service Bus
AzureSB.
Run: `grep -q "servicebusQueue" src/spec-parser.ts`

### [x] Azure Event Hubs
EH.
Run: `grep -q "eventhubNamespace" src/spec-parser.ts`

### [x] GCP Cloud Tasks
CloudTasks.
Run: `grep -q "cloudtasksQueue" src/spec-parser.ts`

### [x] GCP Cloud Scheduler
CloudScheduler.
Run: `grep -q "cloudschedulerJob" src/spec-parser.ts`

### [x] AWS EventBridge
EB.
Run: `grep -q "eventbridgeRule" src/spec-parser.ts`

### [x] Azure Logic Apps
LogicApps.
Run: `grep -q "logicappWorkflow" src/spec-parser.ts`

### [x] AWS Step Functions
StepFunctions.
Run: `grep -q "stepfunctionState" src/spec-parser.ts`

### [x] Temporal workflow
Temporal.
Run: `grep -q "temporalWorkflow" src/spec-parser.ts`

### [x] Conductor
Conductor.
Run: `grep -q "conductorWorkflow" src/spec-parser.ts`

### [x] Azkaban
Azkaban.
Run: `grep -q "azkabanFlow" src/spec-parser.ts`

### [x] Oozie
Oozie.
Run: `grep -q "oozieWorkflow" src/spec-parser.ts`

### [x] AWS Batch
AWSBatch.
Run: `grep -q "awsbatchJob" src/spec-parser.ts`

### [x] GCP Batch
GCPBatch.
Run: `grep -q "gcpbatchJob" src/spec-parser.ts`

### [x] Azure Batch
AzureBatch.
Run: `grep -q "azurebatchJob" src/spec-parser.ts`

### [x] DynamoDB
DynamoDB.
Run: `grep -q "dynamodbTable" src/spec-parser.ts`

### [x] DynamoDB Streams
DDBStreams.
Run: `grep -q "dynamodbStream" src/spec-parser.ts`

### [x] S3 bucket
S3.
Run: `grep -q "s3Bucket" src/spec-parser.ts`

### [x] S3 Multipart
S3Multipart.
Run: `grep -q "s3Multipart" src/spec-parser.ts`

### [x] S3 Transfer Acceleration
S3Accel.
Run: `grep -q "s3TransferAccel" src/spec-parser.ts`

### [x] CloudFront
CF.
Run: `grep -q "cloudfrontDist" src/spec-parser.ts`

### [x] Route53
R53.
Run: `grep -q "route53Zone" src/spec-parser.ts`

### [x] ACM certificate
ACM.
Run: `grep -q "acmCert" src/spec-parser.ts`

### [x] WAF
WAF.
Run: `grep -q "wafWebACL" src/spec-parser.ts`

### [x] Shield
Shield.
Run: `grep -q "shieldProtection" src/spec-parser.ts`

### [x] GuardDuty
GuardDuty.
Run: `grep -q "guarddutyFinding" src/spec-parser.ts`

### [x] Macie
Macie.
Run: `grep -q "macieFinding" src/spec-parser.ts`

### [x] Inspector
Inspector.
Run: `grep -q "inspectorFinding" src/spec-parser.ts`

### [x] Security Hub
SecHub.
Run: `grep -q "securityhubFinding" src/spec-parser.ts`

### [x] Config
Config.
Run: `grep -q "configRule" src/spec-parser.ts`

### [x] CloudTrail
CloudTrail.
Run: `grep -q "cloudtrailEvent" src/spec-parser.ts`

### [x] CloudWatch Logs
CWLogs.
Run: `grep -q "cwlogsLogGroup" src/spec-parser.ts`

### [x] VPC
VPC.
Run: `grep -q "vpcSubnet" src/spec-parser.ts`

### [x] Direct Connect
DX.
Run: `grep -q "directconnect" src/spec-parser.ts`

### [x] VPN
VPN.
Run: `grep -q "vpnConnection" src/spec-parser.ts`

### [x] Transit Gateway
TGW.
Run: `grep -q "transitGateway" src/spec-parser.ts`

### [x] PrivateLink
PrivateLink.
Run: `grep -q "privatelinkEndpoint" src/spec-parser.ts`

### [x] EKS
EKS.
Run: `grep -q "eksCluster" src/spec-parser.ts`

### [x] ECS
ECS.
Run: `grep -q "ecsCluster" src/spec-parser.ts`

### [x] Fargate
Fargate.
Run: `grep -q "fargateTask" src/spec-parser.ts`

### [x] Lambda
Lambda.
Run: `grep -q "lambdaFunction" src/spec-parser.ts`

### [x] Lambda@Edge
EdgeFunc.
Run: `grep -q "lambdaEdge" src/spec-parser.ts`

### [x] API Gateway
APIGateway.
Run: `grep -q "apiGateway" src/spec-parser.ts`

### [x] AppSync
AppSync.
Run: `grep -q "appsyncAPI" src/spec-parser.ts`

### [x] EventBridge
EventBridge.
Run: `grep -q "eventbridgeAPI" src/spec-parser.ts`

### [x] Cognito
Cognito.
Run: `grep -q "cognitoUserPool" src/spec-parser.ts`

### [x] IAM
IAM.
Run: `grep -q "iamRole" src/spec-parser.ts`

### [x] Secrets Manager
SecretsMgr.
Run: `grep -q "secretsManager" src/spec-parser.ts`

### [x] Parameter Store
SSMParam.
Run: `grep -q "ssmParameter" src/spec-parser.ts`

### [x] KMS
KMS.
Run: `grep -q "kmsKey" src/spec-parser.ts`

### [x] CloudHSM
CloudHSM.
Run: `grep -q "cloudhsmCluster" src/spec-parser.ts`

### [x] Directory Service
DS.
Run: `grep -q "directoryservice" src/spec-parser.ts`

### [x] Single Sign-On
SSO.
Run: `grep -q "ssoAssignment" src/spec-parser.ts`

### [x] Resource Access Manager
RAM.
Run: `grep -q "ramResource" src/spec-parser.ts`

### [x] Organizations
Org.
Run: `grep -q "orgPolicy" src/spec-parser.ts`

### [x] Control Tower
ControlTower.
Run: `grep -q "controltowerLandingZone" src/spec-parser.ts`

### [x] Security Hub
SecHubAWS.
Run: `grep -q "securityhubAWS" src/spec-parser.ts`

### [x] Detective
Detective.
Run: `grep -q "detectiveGraph" src/spec-parser.ts`

### [x] Audit Manager
AuditMgr.
Run: `grep -q "auditmanagerAssessment" src/spec-parser.ts`

### [x] Access Analyzer
AccessAnalyzer.
Run: `grep -q "accessanalyzer" src/spec-parser.ts`

### [x] Firewall Manager
FMS.
Run: `grep -q "fmsPolicy" src/spec-parser.ts`

### [x] Network Firewall
NFW.
Run: `grep -q "networkfirewall" src/spec-parser.ts`

### [x] Network Monitor
NetMonitor.
Run: `grep -q "networkmonitor" src/spec-parser.ts`

### [x] Internet Monitor
InetMonitor.
Run: `grep -q "internetmonitor" src/spec-parser.ts`

### [x] VPC Reachability Analyzer
ReachAnalyzer.
Run: `grep -q "reachabilityAnalyzer" src/spec-parser.ts`

### [x] IPAM
IPAM.
Run: `grep -q "ipamPool" src/spec-parser.ts`

### [x] DHCP Options
DHCPOpts.
Run: `grep -q "dhcpOptions" src/spec-parser.ts`

### [x] Elastic IP
EIP.
Run: `grep -q "elasticIP" src/spec-parser.ts`

### [x] NAT Gateway
NATGW.
Run: `grep -q "natGateway" src/spec-parser.ts`

### [x] Egress Only Internet Gateway
EIGW.
Run: `grep -q "egressOnlyIGW" src/spec-parser.ts`

### [x] Local Gateway
LocalGW.
Run: `grep -q "localGateway" src/spec-parser.ts`

### [x] Customer Gateway
CGW.
Run: `grep -q "customerGateway" src/spec-parser.ts`

### [x] Virtual Private Gateway
VPG.
Run: `grep -q "virtualPrivateGW" src/spec-parser.ts`

### [x] Gateway Load Balancer
GWLB.
Run: `grep -q "gatewayLoadBalancer" src/spec-parser.ts`

### [x] Gateway Load Balancer Endpoint
GWLBEP.
Run: `grep -q "gwLoadBalancerEndpoint" src/spec-parser.ts`

### [x] VPC Endpoint Services
VPES.
Run: `grep -q "vpcEndpointService" src/spec-parser.ts`

### [x] GCS bucket
GCS.
Run: `grep -q "gcsBucket" src/spec-parser.ts`

### [x] BigQuery dataset
BigQuery.
Run: `grep -q "bigqueryDataset" src/spec-parser.ts`

### [x] Cloud SQL
CloudSQL.
Run: `grep -q "cloudsqlInstance" src/spec-parser.ts`

### [x] Spanner
Spanner.
Run: `grep -q "spannerInstance" src/spec-parser.ts`

### [x] Firestore
Firestore.
Run: `grep -q "firestoreDB" src/spec-parser.ts`

### [x] Datastore
Datastore.
Run: `grep -q "datastoreKind" src/spec-parser.ts`

### [x] Cloud Storage
GCSStore.
Run: `grep -q "gcsObject" src/spec-parser.ts`

### [x] Pub/Sub
GCPPubSub.
Run: `grep -q "gcpPubSubTopic" src/spec-parser.ts`

### [x] Cloud Functions
GCF.
Run: `grep -q "gcpFunction" src/spec-parser.ts`

### [x] Cloud Run
CloudRun.
Run: `grep -q "cloudrunService" src/spec-parser.ts`

### [x] GKE
GKE.
Run: `grep -q "gkeCluster" src/spec-parser.ts`

### [x] Anthos
Anthos.
Run: `grep -q "anthosCluster" src/spec-parser.ts`

### [x] App Engine
AppEngine.
Run: `grep -q "appengineApp" src/spec-parser.ts`

### [x] Cloud Endpoints
CloudEndpoints.
Run: `grep -q "cloudEndpoints" src/spec-parser.ts`

### [x] API Gateway GCP
GCPAPIGateway.
Run: `grep -q "gcpAPIGateway" src/spec-parser.ts`

### [x] Cloud CDN
CloudCDN.
Run: `grep -q "cloudCDN" src/spec-parser.ts`

### [x] Load Balancing
GCPELB.
Run: `grep -q "gcpLoadBalancer" src/spec-parser.ts`

### [x] Cloud Armor
CloudArmor.
Run: `grep -q "cloudArmorPolicy" src/spec-parser.ts`

### [x] VPC GCP
GCPVPC.
Run: `grep -q "gcpVPCNetwork" src/spec-parser.ts`

### [x] Cloud DNS
CloudDNS.
Run: `grep -q "cloudDNSZone" src/spec-parser.ts`

### [x] VPN Cloud
CloudVPN.
Run: `grep -q "cloudVPNTunnel" src/spec-parser.ts`

### [x] Cloud Interconnect
Interconnect.
Run: `grep -q "cloudInterconnect" src/spec-parser.ts`

### [x] Cloud Router
CloudRouter.
Run: `grep -q "cloudRouter" src/spec-parser.ts`

### [x] Cloud NAT
CloudNAT.
Run: `grep -q "cloudNATGateway" src/spec-parser.ts`

### [x] Shared VPC
SharedVPC.
Run: `grep -q "sharedVPC" src/spec-parser.ts`

### [x] VPC Service Controls
VPCCtrl.
Run: `grep -q "vpcServiceControls" src/spec-parser.ts`

### [x] Identity-Aware Proxy
IAP.
Run: `grep -q "iapTunnel" src/spec-parser.ts`

### [x] Secret Manager GCP
GCPSecrets.
Run: `grep -q "gcpSecretManager" src/spec-parser.ts`

### [x] KMS GCP
GCPKMS.
Run: `grep -q "gcpKMSKey" src/spec-parser.ts`

### [x] Resource Manager
ResourceManager.
Run: `grep -q "gcpResourceManager" src/spec-parser.ts`

### [x] IAM GCP
GCPIAM.
Run: `grep -q "gcpServiceAccount" src/spec-parser.ts`

### [x] Cloud Asset Inventory
CAI.
Run: `grep -q "cloudAssetInventory" src/spec-parser.ts`

### [x] Security Command Center
SCC.
Run: `grep -q "securityCommandCenter" src/spec-parser.ts`

### [x] Cloud Armor
CloudArmorGCP.
Run: `grep -q "cloudArmorGCP" src/spec-parser.ts`

### [x] Binary Authorization
BinaryAuth.
Run: `grep -q "binaryAuthorization" src/spec-parser.ts`

### [x] Event Threat Detection
ETD.
Run: `grep -q "eventThreatDetection" src/spec-parser.ts`

### [x] Security Health Analytics
SHA.
Run: `grep -q "securityHealthAnalytics" src/spec-parser.ts`

### [x] Web Security Scanner
WSS.
Run: `grep -q "webSecurityScanner" src/spec-parser.ts`

### [x] Container Threat Detection
CTD.
Run: `grep -q "containerThreatDetection" src/spec-parser.ts`

### [x] VM Threat Detection
VMTD.
Run: `grep -q "vmThreatDetection" src/spec-parser.ts`

### [x] Cloud DLP
DLP.
Run: `grep -q "cloudDLPJob" src/spec-parser.ts`

### [x] Access Transparency
AccessTransparency.
Run: `grep -q "accessTransparency" src/spec-parser.ts`

### [x] Admin Activity logs
AdminActivity.
Run: `grep -q "adminActivityLogs" src/spec-parser.ts`

### [x] Data Access logs
DataAccessLogs.
Run: `grep -q "dataAccessLogs" src/spec-parser.ts`

### [x] VPC Flow Logs
VPCFlow.
Run: `grep -q "vpcFlowLogs" src/spec-parser.ts`

### [x] Firewall Rules Logging
FWLogs.
Run: `grep -q "firewallRulesLogging" src/spec-parser.ts`

### [x] Cloud Audit Logs
CloudAudit.
Run: `grep -q "cloudAuditLogs" src/spec-parser.ts`

### [x] Cloud Monitoring
CloudMonitoring.
Run: `grep -q "cloudMonitoringAlert" src/spec-parser.ts`

### [x] Cloud Logging
CloudLogging.
Run: `grep -q "cloudLoggingSink" src/spec-parser.ts`

### [x] Error Reporting
ErrorReporting.
Run: `grep -q "errorReporting" src/spec-parser.ts`

### [x] Trace
CloudTrace.
Run: `grep -q "cloudTraceSpan" src/spec-parser.ts`

### [x] Profiler
CloudProfiler.
Run: `grep -q "cloudProfiler" src/spec-parser.ts`

### [x] Debugger
CloudDebugger.
Run: `grep -q "cloudDebugger" src/spec-parser.ts`

### [x] Cloud Build
CloudBuild.
Run: `grep -q "cloudbuildTrigger" src/spec-parser.ts`

### [x] Cloud Deploy
CloudDeploy.
Run: `grep -q "clouddeployPipeline" src/spec-parser.ts`

### [x] Cloud Run Jobs
CloudRunJobs.
Run: `grep -q "cloudrunJob" src/spec-parser.ts`

### [x] Cloud Scheduler
CloudSchedulerGCP.
Run: `grep -q "cloudschedulerGCP" src/spec-parser.ts`

### [x] Cloud Tasks
CloudTasksGCP.
Run: `grep -q "cloudtasksGCP" src/spec-parser.ts`

### [x] Cloud Functions v2
GCFv2.
Run: `grep -q "gcpFunctionV2" src/spec-parser.ts`

### [x] Cloud Run v2
CloudRunV2.
Run: `grep -q "cloudrunV2Service" src/spec-parser.ts`

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
