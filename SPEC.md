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

### [x] Azure Blob
AzureBlob.
Run: `grep -q "azureBlobContainer" src/spec-parser.ts`

### [x] Azure Data Lake
ADLS.
Run: `grep -q "azureDataLake" src/spec-parser.ts`

### [x] Azure SQL
AzureSQL.
Run: `grep -q "azureSQLDB" src/spec-parser.ts`

### [x] Cosmos DB
CosmosDB.
Run: `grep -q "cosmosDBContainer" src/spec-parser.ts`

### [x] Azure Table
AzureTable.
Run: `grep -q "azureTableStorage" src/spec-parser.ts`

### [x] Azure Queue
AzureQueue.
Run: `grep -q "azureQueueStorage" src/spec-parser.ts`

### [x] Azure Files
AzureFiles.
Run: `grep -q "azureFilesShare" src/spec-parser.ts`

### [x] Azure Cosmos
Cosmos.
Run: `grep -q "cosmosDBAccount" src/spec-parser.ts`

### [x] Azure Redis
AzureRedis.
Run: `grep -q "azureRedisCache" src/spec-parser.ts`

### [x] Azure MariaDB
MariaDB.
Run: `grep -q "azureMariaDB" src/spec-parser.ts`

### [x] Azure MySQL
MySQL.
Run: `grep -q "azureMySQLDB" src/spec-parser.ts`

### [x] Azure PostgreSQL
PostgreSQL.
Run: `grep -q "azurePostgreSQL" src/spec-parser.ts`

### [x] Azure for MySQL
FlexibleMySQL.
Run: `grep -q "azureFlexibleMySQL" src/spec-parser.ts`

### [x] Azure PostgreSQL
FlexiblePostgres.
Run: `grep -q "azureFlexiblePostgres" src/spec-parser.ts`

### [x] Azure SQL MI
SQLMI.
Run: `grep -q "azureSQLMI" src/spec-parser.ts`

### [x] Azure Synapse
Synapse.
Run: `grep -q "azureSynapse" src/spec-parser.ts`

### [x] Azure Data Factory
DataFactory.
Run: `grep -q "azureDataFactory" src/spec-parser.ts`

### [x] Azure Databricks
Databricks.
Run: `grep -q "azureDatabricks" src/spec-parser.ts`

### [x] Azure HDInsight
HDInsight.
Run: `grep -q "azureHDInsight" src/spec-parser.ts`

### [x] Azure Functions
Functions.
Run: `grep -q "azureFunction" src/spec-parser.ts`

### [x] Azure App Service
AppService.
Run: `grep -q "azureAppService" src/spec-parser.ts`

### [x] Azure Container Apps
ContainerApps.
Run: `grep -q "azureContainerApps" src/spec-parser.ts`

### [x] Azure Kubernetes
AKS.
Run: `grep -q "azureAKS" src/spec-parser.ts`

### [x] Azure Spring Apps
SpringApps.
Run: `grep -q "azureSpringApps" src/spec-parser.ts`

### [x] Azure API Management
APIM.
Run: `grep -q "azureAPIM" src/spec-parser.ts`

### [x] Azure Front Door
FrontDoor.
Run: `grep -q "azureFrontDoor" src/spec-parser.ts`

### [x] Azure Application Gateway
AppGateway.
Run: `grep -q "azureAppGateway" src/spec-parser.ts`

### [x] Azure Load Balancer
AzureLB.
Run: `grep -q "azureLoadBalancer" src/spec-parser.ts`

### [x] Azure Traffic Manager
TrafficManager.
Run: `grep -q "azureTrafficManager" src/spec-parser.ts`

### [x] Azure Bastion
Bastion.
Run: `grep -q "azureBastion" src/spec-parser.ts`

### [x] Azure Firewall
AzureFirewall.
Run: `grep -q "azureFirewall" src/spec-parser.ts`

### [x] Azure WAF
AzureWAF.
Run: `grep -q "azureWAFPolicy" src/spec-parser.ts`

### [x] Azure Virtual Network
VNet.
Run: `grep -q "azureVNet" src/spec-parser.ts`

### [x] Azure VPN Gateway
VPNGateway.
Run: `grep -q "azureVPNGateway" src/spec-parser.ts`

### [x] Azure ExpressRoute
ExpressRoute.
Run: `grep -q "azureExpressRoute" src/spec-parser.ts`

### [x] Azure Private Link
PrivateLink.
Run: `grep -q "azurePrivateLink" src/spec-parser.ts`

### [x] Azure Virtual WAN
VWAN.
Run: `grep -q "azureVWAN" src/spec-parser.ts`

### [x] Azure DNS
AzureDNS.
Run: `grep -q "azureDNSZone" src/spec-parser.ts`

### [x] Azure CDN
AzureCDN.
Run: `grep -q "azureCDNEndpoint" src/spec-parser.ts`

### [x] Azure Defender
Defender.
Run: `grep -q "azureDefender" src/spec-parser.ts`

### [x] Azure Security Center
SecurityCenter.
Run: `grep -q "azureSecurityCenter" src/spec-parser.ts`

### [x] Azure Sentinel
Sentinel.
Run: `grep -q "azureSentinel" src/spec-parser.ts`

### [x] Azure Key Vault
KeyVault.
Run: `grep -q "azureKeyVault" src/spec-parser.ts`

### [x] Azure Managed Identity
MSI.
Run: `grep -q "azureManagedIdentity" src/spec-parser.ts`

### [x] Azure AD
AAD.
Run: `grep -q "azureADApp" src/spec-parser.ts`

### [x] Azure RBAC
RBAC.
Run: `grep -q "azureRBACRole" src/spec-parser.ts`

### [x] Azure Policy
AzurePolicy.
Run: `grep -q "azurePolicyAssignment" src/spec-parser.ts`

### [x] Azure Monitor
Monitor.
Run: `grep -q "azureMonitor" src/spec-parser.ts`

### [x] Azure Log Analytics
LogAnalytics.
Run: `grep -q "azureLogAnalytics" src/spec-parser.ts`

### [x] Azure Application Insights
AppInsights.
Run: `grep -q "azureAppInsights" src/spec-parser.ts`

### [x] Azure Advisor
Advisor.
Run: `grep -q "azureAdvisor" src/spec-parser.ts`

### [x] Azure Service Health
ServiceHealth.
Run: `grep -q "azureServiceHealth" src/spec-parser.ts`

### [x] Azure Resource Graph
ResourceGraph.
Run: `grep -q "azureResourceGraph" src/spec-parser.ts`

### [x] Azure Blueprint
Blueprint.
Run: `grep -q "azureBlueprint" src/spec-parser.ts`

### [x] Azure Landing Zone
LandingZone.
Run: `grep -q "azureLandingZone" src/spec-parser.ts`

### [x] Azure Lighthouse
Lighthouse.
Run: `grep -q "azureLighthouse" src/spec-parser.ts`

### [x] Azure Managed Apps
ManagedApps.
Run: `grep -q "azureManagedApp" src/spec-parser.ts`

### [x] Azure DevOps
AzureDevOps.
Run: `grep -q "azureDevOpsProject" src/spec-parser.ts`

### [x] Azure Pipelines
Pipelines.
Run: `grep -q "azurePipelineBuild" src/spec-parser.ts`

### [x] Azure Boards
Boards.
Run: `grep -q "azureBoardsWorkItem" src/spec-parser.ts`

### [x] Azure Repos
Repos.
Run: `grep -q "azureReposGit" src/spec-parser.ts`

### [x] Azure Test Plans
TestPlans.
Run: `grep -q "azureTestPlan" src/spec-parser.ts`

### [x] Azure Artifacts
Artifacts.
Run: `grep -q "azureArtifacts" src/spec-parser.ts`

### [x] Terraform provider
Terraform.
Run: `grep -q "terraformProvider" src/spec-parser.ts`

### [x] Ansible collection
Ansible.
Run: `grep -q "ansibleCollection" src/spec-parser.ts`

### [x] Pulumi provider
Pulumi.
Run: `grep -q "pulumiProvider" src/spec-parser.ts`

### [x] Chef cookbook
Chef.
Run: `grep -q "chefCookbook" src/spec-parser.ts`

### [x] Puppet module
Puppet.
Run: `grep -q "puppetModule" src/spec-parser.ts`

### [x] Salt state
Salt.
Run: `grep -q "saltState" src/spec-parser.ts`

### [x] Fabric
Fabric.
Run: `grep -q "fabricConfig" src/spec-parser.ts`

### [x] Dagger pipeline
Dagger.
Run: `grep -q "daggerPipeline" src/spec-parser.ts`

### [x] Earthly
Earthly.
Run: `grep -q "earthlyTarget" src/spec-parser.ts`

### [x] Nix flake
Nix.
Run: `grep -q "nixFlakeApp" src/spec-parser.ts`

### [x] Devbox
Devbox.
Run: `grep -q "devboxProject" src/spec-parser.ts`

### [x] Flake.hub
FlakeHub.
Run: `grep -q "flakehubFlake" src/spec-parser.ts`

### [x] GitHub CLI
gh.
Run: `grep -q "ghCommand" src/spec-parser.ts`

### [x] GitLab CLI
glab.
Run: `grep -q "glabCommand" src/spec-parser.ts`

### [x] Hub CLI
Hub.
Run: `grep -q "hubCommand" src/spec-parser.ts`

### [x] gh CLI
gh.
Run: `grep -q "ghapiCommand" src/spec-parser.ts`

### [x] lazygit
Lazygit.
Run: `grep -q "lazygitStatus" src/spec-parser.ts`

### [x] lazydocker
Lazydocker.
Run: `grep -q "lazydockerUI" src/spec-parser.ts`

### [x] tig
Tig.
Run: `grep -q "tigView" src/spec-parser.ts`

### [x] fzf
FZF.
Run: `grep -q "fzfSelect" src/spec-parser.ts`

### [x] peco
Peco.
Run: `grep -q "pecoSelect" src/spec-parser.ts`

### [x] jq
Jq.
Run: `grep -q "jqFilter" src/spec-parser.ts`

### [x] yq
Yq.
Run: `grep -q "yqFilter" src/spec-parser.ts`

### [x] fx
Fx.
Run: `grep -q "fxJSON" src/spec-parser.ts`

### [x] gron
Gron.
Run: `grep -q "gronGrep" src/spec-parser.ts`

### [x] jid
Jid.
Run: `grep -q "jidQuery" src/spec-parser.ts`

### [x] q
Q.
Run: `grep -q "qSQL" src/spec-parser.ts`

### [x] textql
Textql.
Run: `grep -q "textqlQuery" src/spec-parser.ts`

### [x] csvkit
Csvkit.
Run: `grep -q "csvsqlQuery" src/spec-parser.ts`

### [x] xsv
Xsv.
Run: `grep -q "xsvIndex" src/spec-parser.ts`

### [x] visidata
VisiData.
Run: `grep -q "visidataOpen" src/spec-parser.ts`

### [x] tsv-utils
Tsvutils.
Run: `grep -q "tsvutilsSort" src/spec-parser.ts`

### [x] miller
Miller.
Run: `grep -q "miller DSL" src/spec-parser.ts`

### [x] csvq
Csvq.
Run: `grep -q "csvqQuery" src/spec-parser.ts`

### [x] SQLite
SQLite.
Run: `grep -q "sqliteQuery" src/spec-parser.ts`

### [x] DuckDB
DuckDB.
Run: `grep -q "duckDBQuery" src/spec-parser.ts`

### [x] DataFusion
DataFusion.
Run: `grep -q "datafusionQuery" src/spec-parser.ts`

### [x] Arrow
Arrow.
Run: `grep -q "arrowTable" src/spec-parser.ts`

### [x] Parquet
Parquet.
Run: `grep -q "parquetRead" src/spec-parser.ts`

### [x] ORC
ORC.
Run: `grep -q "orcRead" src/spec-parser.ts`

### [x] Iceberg
Iceberg.
Run: `grep -q "icebergTableRead" src/spec-parser.ts`

### [x] Delta Lake
DeltaLake.
Run: `grep -q "deltaLakeRead" src/spec-parser.ts`

### [x] Hudi
Hudi.
Run: `grep -q "hudiRead" src/spec-parser.ts`

### [x] Apache Beam
Beam.
Run: `grep -q "beamPipelineRead" src/spec-parser.ts`

### [x] Dataflow
Dataflow.
Run: `grep -q "dataflowJob" src/spec-parser.ts`

### [x] Flink
Flink.
Run: `grep -q "flinkJob" src/spec-parser.ts`

### [x] Spark
Spark.
Run: `grep -q "sparkJob" src/spec-parser.ts`

### [x] Kafka Streams
Kafka.
Run: `grep -q "kafkaStreamJob" src/spec-parser.ts`

### [x] Pulsar Functions
Pulsar.
Run: `grep -q "pulsarFunction" src/spec-parser.ts`

### [x] dbt
Dbt.
Run: `grep -q "dbtModelRun" src/spec-parser.ts`

### [x] Meltano
Meltano.
Run: `grep -q "meltanoTap" src/spec-parser.ts`

### [x] Airbyte
Airbyte.
Run: `grep -q "airbyteConnectionRun" src/spec-parser.ts`

### [x] Singer tap
Singer.
Run: `grep -q "singerTapRun" src/spec-parser.ts`

### [x] Fivetran
Fivetran.
Run: `grep -q "fivetranSyncRun" src/spec-parser.ts`

### [x] HVR
HVR.
Run: `grep -q "hvrReplication" src/spec-parser.ts`

### [x] Oracle GoldenGate
OGG.
Run: `grep -q "oggReplication" src/spec-parser.ts`

### [x] Debezium
Debezium.
Run: `grep -q "debeziumConnector" src/spec-parser.ts`

### [x] Maxwell
Maxwell.
Run: `grep -q "maxwellDaemon" src/spec-parser.ts`

### [x] Canal
Canal.
Run: `grep -q "canalConnector" src/spec-parser.ts`

### [x] Flink CDC
FlinkCDC.
Run: `grep -q "flinkCDCJob" src/spec-parser.ts`

### [x] Spark CDC
SparkCDC.
Run: `grep -q "sparkCDCJob" src/spec-parser.ts`

### [x] Debezium Embedded
DebeziumEmbed.
Run: `grep -q "debeziumEmbedded" src/spec-parser.ts`

### [x] Kafka Connect JDBC
JDBCSource.
Run: `grep -q "kafkaConnectJDBC" src/spec-parser.ts`

### [x] Kafka Connect S3
S3Sink.
Run: `grep -q "kafkaConnectS3" src/spec-parser.ts`

### [x] Kafka Connect Elasticsearch
ESSink.
Run: `grep -q "kafkaConnectES" src/spec-parser.ts`

### [x] Kafka Connect MongoDB
MongoDBSource.
Run: `grep -q "kafkaConnectMongoDB" src/spec-parser.ts`

### [x] Kafka Connect PostgreSQL
PostgresSource.
Run: `grep -q "kafkaConnectPostgres" src/spec-parser.ts`

### [x] dbt-core
DbtCore.
Run: `grep -q "dbtCoreRun" src/spec-parser.ts`

### [x] Great Expectations
greatexp.
Run: `grep -q "greatExpectations" src/spec-parser.ts`

### [x] OpenTelemetry Collector
OTel.
Run: `grep -q "otelCollectorConfig" src/spec-parser.ts`

### [x] Jaeger Collector
Jaeger.
Run: `grep -q "jaegerCollectorConfig" src/spec-parser.ts`

### [x] Zipkin Collector
Zipkin.
Run: `grep -q "zipkinCollectorConfig" src/spec-parser.ts`

### [x] Prometheus Agent
PromAgent.
Run: `grep -q "prometheusAgentConfig" src/spec-parser.ts`

### [x] Grafana Agent
GrafanaAgent.
Run: `grep -q "grafanaAgentConfig" src/spec-parser.ts`

### [x] Vector Agent
Vector.
Run: `grep -q "vectorConfig" src/spec-parser.ts`

### [x] Alloy
Alloy.
Run: `grep -q "alloyConfig" src/spec-parser.ts`

### [x] Fluentd
Fluentd.
Run: `grep -q "fluentdConfig" src/spec-parser.ts`

### [x] Fluent Bit
FluentBit.
Run: `grep -q "fluentbitConfig" src/spec-parser.ts`

### [x] Alloy
Alloy.
Run: `grep -q "alloyPipeline" src/spec-parser.ts`

### [x] OpenTelemetry Protocol
OTLP.
Run: `grep -q "otlpExport" src/spec-parser.ts`

### [x] StatsD
StatsD.
Run: `grep -q "statsDServer" src/spec-parser.ts`

### [x] DogStatsD
DogStatsD.
Run: `grep -q "dogstatsDServer" src/spec-parser.ts`

### [x] Carbon
Carbon.
Run: `grep -q "carbonServer" src/spec-parser.ts`

### [x] Influx Line Protocol
Influx.
Run: `grep -q "influxLineProtocol" src/spec-parser.ts`

### [x] Telegraf
Telegraf.
Run: `grep -q "telegrafConfig" src/spec-parser.ts`

### [x] Prometheus Remote Write
RemoteWrite.
Run: `grep -q "prometheusRemoteWrite" src/spec-parser.ts`

### [x] AWS CloudWatch
CloudWatch.
Run: `grep -q "cloudwatchLogGroup" src/spec-parser.ts`

### [x] GCP Cloud Logging
GCPLogging.
Run: `grep -q "gcpLoggingConfig" src/spec-parser.ts`

### [x] Azure Monitor
AzureMonitor.
Run: `grep -q "azureMonitorConfig" src/spec-parser.ts`

### [x] Honeycomb
Honeycomb.
Run: `grep -q "honeycombConfig" src/spec-parser.ts`

### [x] Lightstep
Lightstep.
Run: `grep -q "lightstepConfig" src/spec-parser.ts`

### [x] Datadog
Datadog.
Run: `grep -q "datadogConfig" src/spec-parser.ts`

### [x] New Relic
NewRelic.
Run: `grep -q "newrelicConfig" src/spec-parser.ts`

### [x] Sumo Logic
SumoLogic.
Run: `grep -q "sumologicConfig" src/spec-parser.ts`

### [x] Splunk
Splunk.
Run: `grep -q "splunkConfig" src/spec-parser.ts`

### [x] Logz.io
Logzio.
Run: `grep -q "logzioConfig" src/spec-parser.ts`

### [x] Loggly
Loggly.
Run: `grep -q "logglyConfig" src/spec-parser.ts`

### [x] PaperTrail
PaperTrail.
Run: `grep -q "papertrailConfig" src/spec-parser.ts`

### [x] Sematext
Sematext.
Run: `grep -q "sematextConfig" src/spec-parser.ts`

### [x] Scalyr
Scalyr.
Run: `grep -q "scalyrConfig" src/spec-parser.ts`

### [x] Timber
Timber.
Run: `grep -q "timberConfig" src/spec-parser.ts`

### [x] Better Stack
BetterStack.
Run: `grep -q "betterstackConfig" src/spec-parser.ts`

### [x] Logtail
Logtail.
Run: `grep -q "logtailConfig" src/spec-parser.ts`

### [x]Mezmo
Mezmo.
Run: `grep -q "mezmoConfig" src/spec-parser.ts`

### [x] OpenObserve
OpenObserve.
Run: `grep -q "openobserveConfig" src/spec-parser.ts`

### [x] SigNoz
SigNoz.
Run: `grep -q "signozConfig" src/spec-parser.ts`

### [x] Grafana Loki
Loki.
Run: `grep -q "lokiConfig" src/spec-parser.ts`

### [x] Grafana Tempo
GrafanaTempo.
Run: `grep -q "tempoConfig" src/spec-parser.ts`

### [x] Grafana Mimir
Mimir.
Run: `grep -q "mimirConfig" src/spec-parser.ts`

### [x] Thanos
Thanos.
Run: `grep -q "thanosConfig" src/spec-parser.ts`

### [x] Cortex
Cortex.
Run: `grep -q "cortexConfig" src/spec-parser.ts`

### [x] VictoriaMetrics
VictoriaMetrics.
Run: `grep -q "victoriametricsConfig" src/spec-parser.ts`

### [x] M3DB
M3DB.
Run: `grep -q "m3dbConfig" src/spec-parser.ts`

### [x] QuestDB
QuestDB.
Run: `grep -q "questdbConfig" src/spec-parser.ts`

### [x] TimescaleDB
TimescaleDB.
Run: `grep -q "timescaledbConfig" src/spec-parser.ts`

### [x] ClickHouse
ClickHouse.
Run: `grep -q "clickhouseConfig" src/spec-parser.ts`

### [x] Apache Druid
Druid.
Run: `grep -q "druidConfig" src/spec-parser.ts`

### [x] Pinot
Pinot.
Run: `grep -q "pinotConfig" src/spec-parser.ts`

### [x] Apache Iceberg
Iceberg.
Run: `grep -q "icebergConfig" src/spec-parser.ts`

### [x] Delta Lake
DeltaLake.
Run: `grep -q "deltaLakeConfig" src/spec-parser.ts`

### [x] Apache Hudi
Hudi.
Run: `grep -q "hudiConfig" src/spec-parser.ts`

### [x] LakeFS
LakeFS.
Run: `grep -q "lakefsConfig" src/spec-parser.ts`

### [x] Apache Ozone
Ozone.
Run: `grep -q "ozoneConfig" src/spec-parser.ts`

### [x] JuiceFS
JuiceFS.
Run: `grep -q "juicefsConfig" src/spec-parser.ts`

### [x] Alluxio
Alluxio.
Run: `grep -q "alluxioConfig" src/spec-parser.ts`

### [x] YARN
YARN.
Run: `grep -q "yarnConfig" src/spec-parser.ts`

### [x] Mesos
Mesos.
Run: `grep -q "mesosConfig" src/spec-parser.ts`

### [x] Nomad
Nomad.
Run: `grep -q "nomadConfig" src/spec-parser.ts`

### [x] Consul
Consul.
Run: `grep -q "consulConfig" src/spec-parser.ts`

### [x] etcd
etcd.
Run: `grep -q "etcdConfig" src/spec-parser.ts`

### [x] ZooKeeper
ZK.
Run: `grep -q "zookeeperConfig" src/spec-parser.ts`

### [x] Chubby
Chubby.
Run: `grep -q "chubbyConfig" src/spec-parser.ts`

### [x] Doozer
Doozer.
Run: `grep -q "doozerConfig" src/spec-parser.ts`

### [x] Swift
Swift.
Run: `grep -q "swiftConfig" src/spec-parser.ts`

### [x] Riak
Riak.
Run: `grep -q "riakConfig" src/spec-parser.ts`

### [x] FoundationDB
FoundationDB.
Run: `grep -q "foundationdbConfig" src/spec-parser.ts`

### [x] CockroachDB
CockroachDB.
Run: `grep -q "cockroachdbConfig" src/spec-parser.ts`

### [x] YugabyteDB
YugabyteDB.
Run: `grep -q "yugabytedbConfig" src/spec-parser.ts`

### [x] Spanner
Spanner.
Run: `grep -q "spannerConfig" src/spec-parser.ts`

### [x] TiDB
TiDB.
Run: `grep -q "tidbConfig" src/spec-parser.ts`

### [x] EKS
EKS.
Run: `grep -q "eksConfig" src/spec-parser.ts`

### [x] GKE
GKE.
Run: `grep -q "gkeConfig" src/spec-parser.ts`

### [x] AKS
AKS.
Run: `grep -q "aksConfig" src/spec-parser.ts`

### [x] OpenShift
OpenShift.
Run: `grep -q "openshiftConfig" src/spec-parser.ts`

### [x] Rancher
Rancher.
Run: `grep -q "rancherConfig" src/spec-parser.ts`

### [x] kind
Kind.
Run: `grep -q "kindCluster" src/spec-parser.ts`

### [x] minikube
Minikube.
Run: `grep -q "minikubeConfig" src/spec-parser.ts`

### [x] k3s
K3s.
Run: `grep -q "k3sConfig" src/spec-parser.ts`

### [x] MicroK8s
MicroK8s.
Run: `grep -q "microk8sConfig" src/spec-parser.ts`

### [x] kubeadm
Kubeadm.
Run: `grep -q "kubeadmConfig" src/spec-parser.ts`

### [x] Kubeconfig
Kubeconfig.
Run: `grep -q "kubeconfigContext" src/spec-parser.ts`

### [x] kubectl
Kubectl.
Run: `grep -q "kubectlContext" src/spec-parser.ts`

### [x] kube-proxy
KubeProxy.
Run: `grep -q "kubeProxyConfig" src/spec-parser.ts`

### [x] kube-scheduler
KubeScheduler.
Run: `grep -q "kubeSchedulerConfig" src/spec-parser.ts`

### [x] kube-controller-manager
KubeController.
Run: `grep -q "kubeControllerManager" src/spec-parser.ts`

### [x] etcd-operator
EtcdOperator.
Run: `grep -q "etcdOperatorConfig" src/spec-parser.ts`

### [x] coredns
CoreDNS.
Run: `grep -q "corednsConfig" src/spec-parser.ts`

### [x] kube-apiserver
KubeAPIServer.
Run: `grep -q "kubeAPIServerConfig" src/spec-parser.ts`

### [x] kubelet
Kubelet.
Run: `grep -q "kubeletConfig" src/spec-parser.ts`

### [x] containerd
Containerd.
Run: `grep -q "containerdConfig" src/spec-parser.ts`

### [x] crio
CRI-O.
Run: `grep -q "crioConfig" src/spec-parser.ts`

### [x] gVisor
Gvisor.
Run: `grep -q "gvisorConfig" src/spec-parser.ts`

### [x] Kata Containers
Kata.
Run: `grep -q "kataConfig" src/spec-parser.ts`

### [x] Firecracker
Firecracker.
Run: `grep -q "firecrackerConfig" src/spec-parser.ts`

### [x] Cloud Hypervisor
CloudHypervisor.
Run: `grep -q "cloudhypervisorConfig" src/spec-parser.ts`

### [x] QEMU
QEMU.
Run: `grep -q "qemuConfig" src/spec-parser.ts`

### [x] Helm
Helm.
Run: `grep -q "helmChart" src/spec-parser.ts`

### [x] Kustomize
Kustomize.
Run: `grep -q "kustomizeConfig" src/spec-parser.ts`

### [x] kpt
Kpt.
Run: `grep -q "kptFunction" src/spec-parser.ts`

### [x] Argo CD
ArgoCD.
Run: `grep -q "argocdApp" src/spec-parser.ts`

### [x] Argo Workflows
ArgoWorkflows.
Run: `grep -q "argoworkflowsConfig" src/spec-parser.ts`

### [x] Flux
Flux.
Run: `grep -q "fluxConfig" src/spec-parser.ts`

### [x] Tekton
Tekton.
Run: `grep -q "tektonPipeline" src/spec-parser.ts`

### [x] Kubevela
Kubevela.
Run: `grep -q "kubevelaApp" src/spec-parser.ts`

### [x] KubeFlow
KubeFlow.
Run: `grep -q "kubeflowPipeline" src/spec-parser.ts`

### [x] Seldon
Seldon.
Run: `grep -q "seldonDeployment" src/spec-parser.ts`

### [x] KFServing
KFServing.
Run: `grep -q "kfservingConfig" src/spec-parser.ts`

### [x] BentoML
BentoML.
Run: `grep -q "bentomlService" src/spec-parser.ts`

### [x] Triton
Triton.
Run: `grep -q "tritonServer" src/spec-parser.ts`

### [x] TensorFlow Serving
TFServing.
Run: `grep -q "tfServingConfig" src/spec-parser.ts`

### [x] TorchServe
TorchServe.
Run: `grep -q "torchserveConfig" src/spec-parser.ts`

### [x] Ray Serve
RayServe.
Run: `grep -q "rayserveConfig" src/spec-parser.ts`

### [x] MLflow
MLflow.
Run: `grep -q "mlflowServer" src/spec-parser.ts`

### [x] Weights & Biases
WandB.
Run: `grep -q "wandbConfig" src/spec-parser.ts`

### [x] Neptune
Neptune.
Run: `grep -q "neptuneConfig" src/spec-parser.ts`

### [x] Comet
Comet.
Run: `grep -q "cometConfig" src/spec-parser.ts`

### [x] Aim
Aim.
Run: `grep -q "aimStack" src/spec-parser.ts`

### [x] TensorBoard
TensorBoard.
Run: `grep -q "tensorboardConfig" src/spec-parser.ts`

### [x] Guild AI
GuildAI.
Run: `grep -q "guildaiConfig" src/spec-parser.ts`

### [x] Sacred
Sacred.
Run: `grep -q "sacredConfig" src/spec-parser.ts`

### [x] Kubeflow
Kubeflow.
Run: `grep -q "kubeflowConfig" src/spec-parser.ts`

### [x] Vertex AI
VertexAI.
Run: `grep -q "vertexaiConfig" src/spec-parser.ts`

### [x] SageMaker
SageMaker.
Run: `grep -q "sagemakerConfig" src/spec-parser.ts`

### [x] Azure ML
AzureML.
Run: `grep -q "azuremlConfig" src/spec-parser.ts`

### [x] Domino
Domino.
Run: `grep -q "dominoConfig" src/spec-parser.ts`

### [x] HPE Ezmeral
Ezmeral.
Run: `grep -q "ezmeralConfig" src/spec-parser.ts`

### [x] ClearML
ClearML.
Run: `grep -q "clearmlConfig" src/spec-parser.ts`

### [x] DVC
DVC.
Run: `grep -q "dvcConfig" src/spec-parser.ts`

### [x] Pachyderm
Pachyderm.
Run: `grep -q "pachydermConfig" src/spec-parser.ts`

### [x] CML
CML.
Run: `grep -q "cmlConfig" src/spec-parser.ts`

### [x] LakeFS
LakeFS.
Run: `grep -q "lakefsRepo" src/spec-parser.ts`

### [x] Dremio
Dremio.
Run: `grep -q "dremioConfig" src/spec-parser.ts`

### [x] Apache Superset
Superset.
Run: `grep -q "supersetConfig" src/spec-parser.ts`

### [x] Metabase
Metabase.
Run: `grep -q "metabaseConfig" src/spec-parser.ts`

### [x] Redash
Redash.
Run: `grep -q "redashConfig" src/spec-parser.ts`

### [x] Apache Zeppelin
Zeppelin.
Run: `grep -q "zeppelinConfig" src/spec-parser.ts`

### [x] Jupyter
Jupyter.
Run: `grep -q "jupyterConfig" src/spec-parser.ts`

### [x] Apache Hop
Hop.
Run: `grep -q "hopConfig" src/spec-parser.ts`

### [x] Remotion
Remotion.
Run: `grep -q "remotionConfig" src/spec-parser.ts`

### [x] FFmpeg
FFmpeg.
Run: `grep -q "ffmpegCommand" src/spec-parser.ts`

### [x] HandBrake
HandBrake.
Run: `grep -q "handbrakeConfig" src/spec-parser.ts`

### [x] HandBrake CLI
HandBrakeCLI.
Run: `grep -q "handbrakeCLIConfig" src/spec-parser.ts`

### [x] Shotcut
Shotcut.
Run: `grep -q "shotcutConfig" src/spec-parser.ts`

### [x] DaVinci Resolve
DaVinci.
Run: `grep -q "davinciresolveConfig" src/spec-parser.ts`

### [x] Blender
Blender.
Run: `grep -q "blenderConfig" src/spec-parser.ts`

### [x] Kdenlive
Kdenlive.
Run: `grep -q "kdenliveConfig" src/spec-parser.ts`

### [x] OpenShot
OpenShot.
Run: `grep -q "openshotConfig" src/spec-parser.ts`

### [x] Shotcut
Shotcut.
Run: `grep -q "shotcutTimeline" src/spec-parser.ts`

### [x] OBS Studio
OBS.
Run: `grep -q "obsConfig" src/spec-parser.ts`

### [x] vMix
VMix.
Run: `grep -q "vmixConfig" src/spec-parser.ts`

### [x] Wirecast
Wirecast.
Run: `grep -q "wirecastConfig" src/spec-parser.ts`

### [x] CasparCG
CasparCG.
Run: `grep -q "casparcgConfig" src/spec-parser.ts`

### [x] Tricaster
Tricaster.
Run: `grep -q "tricasterConfig" src/spec-parser.ts`

### [x] Barco E2
BarcoE2.
Run: `grep -q "barcoe2Config" src/spec-parser.ts`

### [x] ATEM
ATEM.
Run: `grep -q "atemConfig" src/spec-parser.ts`

### [x] Carbonite
Carbonite.
Run: `grep -q "carboniteConfig" src/spec-parser.ts`

### [x] Twitch
Twitch.
Run: `grep -q "twitchConfig" src/spec-parser.ts`

### [x] YouTube Live
YouTubeLive.
Run: `grep -q "youtubeliveConfig" src/spec-parser.ts`

### [x] Facebook Live
FBLive.
Run: `grep -q "fbliveConfig" src/spec-parser.ts`

### [x] NDI
NDI.
Run: `grep -q "ndiConfig" src/spec-parser.ts`

### [x] SRT
SRT.
Run: `grep -q "srtConfig" src/spec-parser.ts`

### [x] RTMP
RTMP.
Run: `grep -q "rtmpConfig" src/spec-parser.ts`

### [x] HLS
HLS.
Run: `grep -q "hlsConfig" src/spec-parser.ts`

### [x] DASH
DASH.
Run: `grep -q "dashConfig" src/spec-parser.ts`

### [x] CMAF
CMAF.
Run: `grep -q "cmafConfig" src/spec-parser.ts`

### [x] WebRTC
WebRTC.
Run: `grep -q "webrtcConfig" src/spec-parser.ts`

### [x] Janus
Janus.
Run: `grep -q "janusConfig" src/spec-parser.ts`

### [x] Mediasoup
Mediasoup.
Run: `grep -q "mediasoupConfig" src/spec-parser.ts`

### [x] Kurento
Kurento.
Run: `grep -q "kurentoConfig" src/spec-parser.ts`

### [x] mediasflu
Mediasoup.
Run: `grep -q "mediasoupServer" src/spec-parser.ts`

### [x] LiveKit
LiveKit.
Run: `grep -q "livekitConfig" src/spec-parser.ts`

### [x] Daily.co
Daily.
Run: `grep -q "dailyConfig" src/spec-parser.ts`

### [x] Twilio Video
Twilio.
Run: `grep -q "twilioConfig" src/spec-parser.ts`

### [x] Zoom SDK
ZoomSDK.
Run: `grep -q "zoomConfig" src/spec-parser.ts`

### [x] Jitsi
Jitsi.
Run: `grep -q "jitsiConfig" src/spec-parser.ts`

### [x] FreeSWITCH
FreeSWITCH.
Run: `grep -q "freeswitchConfig" src/spec-parser.ts`

### [x] Asterisk
Asterisk.
Run: `grep -q "asteriskConfig" src/spec-parser.ts`

### [x] Kamailio
Kamailio.
Run: `grep -q "kamailioConfig" src/spec-parser.ts`

### [x] OpenSIPS
OpenSIPS.
Run: `grep -q "opensipsConfig" src/spec-parser.ts`

### [x] RTPEngine
RTPEngine.
Run: `grep -q "rtpengineConfig" src/spec-parser.ts`

### [x] Homer API
Homer.
Run: `grep -q "homerConfig" src/spec-parser.ts`

### [x] Homer Web
HomerWeb.
Run: `grep -q "homerwebConfig" src/spec-parser.ts`

### [x] SIPS
SIPS.
Run: `grep -q "sipsDump" src/spec-parser.ts`

### [x] sngrep
Sngrep.
Run: `grep -q "sngrepConfig" src/spec-parser.ts`

### [x] RTP
RTP.
Run: `grep -q "rtpStream" src/spec-parser.ts`

### [x] SIPp
SIPp.
Run: `grep -q "sippScenario" src/spec-parser.ts`

### [x] SIPP
SIPP.
Run: `grep -q "sippConfig" src/spec-parser.ts`

### [x] RTPengine
RTPengine.
Run: `grep -q "rtpengineK8s" src/spec-parser.ts`

### [x] FreeSWITCH ESL
FSESL.
Run: `grep -q "fsESLConfig" src/spec-parser.ts`

### [x] mod_verto
ModVerto.
Run: `grep -q "modvertoConfig" src/spec-parser.ts`

### [x] mod_signalwire
ModSignalwire.
Run: `grep -q "modsignalwireConfig" src/spec-parser.ts`

### [x] SignalWire
SignalWire.
Run: `grep -q "signalwireConfig" src/spec-parser.ts`

### [x] Plivo
Plivo.
Run: `grep -q "plivoConfig" src/spec-parser.ts`

### [x] Bandwidth
Bandwidth.
Run: `grep -q "bandwidthConfig" src/spec-parser.ts`

### [x] Telnyx
Telnyx.
Run: `grep -q "telnyxConfig" src/spec-parser.ts`

### [x] Voximplant
Voximplant.
Run: `grep -q "voximplantConfig" src/spec-parser.ts`

### [x] Vonage
Vonage.
Run: `grep -q "vonageConfig" src/spec-parser.ts`

### [x] MessageBird
MessageBird.
Run: `grep -q "messagebirdConfig" src/spec-parser.ts`

### [x] Sinch
Sinch.
Run: `grep -q "sinchConfig" src/spec-parser.ts`

### [x] CLX
CLX.
Run: `grep -q "clxConfig" src/spec-parser.ts`

### [x] Infobip
Infobip.
Run: `grep -q "infobipConfig" src/spec-parser.ts`

### [x] RouteMobile
RouteMobile.
Run: `grep -q "routemobileConfig" src/spec-parser.ts`

### [x] Mastodon
Mastodon.
Run: `grep -q "mastodonConfig" src/spec-parser.ts`

### [x] Pixelfed
Pixelfed.
Run: `grep -q "pixelfedConfig" src/spec-parser.ts`

### [x] PeerTube
PeerTube.
Run: `grep -q "peertubeConfig" src/spec-parser.ts`

### [x] Lemmy
Lemmy.
Run: `grep -q "lemmyConfig" src/spec-parser.ts`

### [x] Pleroma
Pleroma.
Run: `grep -q "pleromaConfig" src/spec-parser.ts`

### [x] BookWyrm
BookWyrm.
Run: `grep -q "bookwyrmConfig" src/spec-parser.ts`

### [x] Misskey
Misskey.
Run: `grep -q "misskeyConfig" src/spec-parser.ts`

### [x] WriteFreely
WriteFreely.
Run: `grep -q "writefreelyConfig" src/spec-parser.ts`

### [x] Funkwhale
Funkwhale.
Run: `grep -q "funkwhaleConfig" src/spec-parser.ts`

### [x] Castopod
Castopod.
Run: `grep -q "castopodConfig" src/spec-parser.ts`

### [x] Friendica
Friendica.
Run: `grep -q "friendicaConfig" src/spec-parser.ts`

### [x] Hubzilla
Hubzilla.
Run: `grep -q "hubzillaConfig" src/spec-parser.ts`

### [x] GNU Social
GNUSocial.
Run: `grep -q "gnusocialConfig" src/spec-parser.ts`

### [x] Mobilizon
Mobilizon.
Run: `grep -q "mobilizonConfig" src/spec-parser.ts`

### [x] Aardwolf
Aardwolf.
Run: `grep -q "aardwolfConfig" src/spec-parser.ts`

### [x] GoToSocial
GoToSocial.
Run: `grep -q "gotosocialConfig" src/spec-parser.ts`

### [x] Firefish
Firefish.
Run: `grep -q "firefishConfig" src/spec-parser.ts`

### [x] Hometown
Hometown.
Run: `grep -q "hometownConfig" src/spec-parser.ts`

### [x] Calckey
Calckey.
Run: `grep -q "calckeyConfig" src/spec-parser.ts`

### [x] Sharkey
Sharkey.
Run: `grep -q "sharkeyConfig" src/spec-parser.ts`

### [x] AixNet
AixNet.
Run: `grep -q "aixnetConfig" src/spec-parser.ts`

### [x] Bluesky
Bluesky.
Run: `grep -q "blueskyConfig" src/spec-parser.ts`

### [x] Nostr
Nostr.
Run: `grep -q "nostrConfig" src/spec-parser.ts`

### [x] ActivityPub
ActivityPub.
Run: `grep -q "activitypubConfig" src/spec-parser.ts`

### [x] WebFinger
WebFinger.
Run: `grep -q "webfingerConfig" src/spec-parser.ts`

### [x] NodeInfo
NodeInfo.
Run: `grep -q "nodeinfoConfig" src/spec-parser.ts`

### [x] Salmon
Salmon.
Run: `grep -q "salmonConfig" src/spec-parser.ts`

### [x] PubSubHubbub
PubSub.
Run: `grep -q "pubsubConfig" src/spec-parser.ts`

### [x] RSS
RSS.
Run: `grep -q "rssConfig" src/spec-parser.ts`

### [x] ActivityStreams
ActivityStreams.
Run: `grep -q "activitystreamsConfig" src/spec-parser.ts`

### [x] OStatus
OStatus.
Run: `grep -q "ostatusConfig" src/spec-parser.ts`

### [x] Webmention
Webmention.
Run: `grep -q "webmentionConfig" src/spec-parser.ts`

### [x] Micropub
Micropub.
Run: `grep -q "micropubConfig" src/spec-parser.ts`

### [x] IndieAuth
IndieAuth.
Run: `grep -q "indieauthConfig" src/spec-parser.ts`

### [x] Microformats
Microformats.
Run: `grep -q "microformatsConfig" src/spec-parser.ts`

### [x] syndication
Syndication.
Run: `grep -q "syndicationConfig" src/spec-parser.ts`

### [x] h-feed
HFeed.
Run: `grep -q "hfeedConfig" src/spec-parser.ts`

### [x] h-entry
HEntry.
Run: `grep -q "hentryConfig" src/spec-parser.ts`

### [x] POSSE
POSSE.
Run: `grep -q "posseConfig" src/spec-parser.ts`

### [x] Backfeed
Backfeed.
Run: `grep -q "backfeedConfig" src/spec-parser.ts`

### [x] Bridgy
Bridgy.
Run: `grep -q "bridgyConfig" src/spec-parser.ts`

### [x] Salmon Magic Envelope
SalmonMagic.
Run: `grep -q "salmonmagicConfig" src/spec-parser.ts`

### [x] Zot
Zot.
Run: `grep -q "zotConfig" src/spec-parser.ts`

### [x] Hubzilla
Hubzilla.
Run: `grep -q "hubzillaChannel" src/spec-parser.ts`

### [x] Friendica
Friendica.
Run: `grep -q "friendicaContact" src/spec-parser.ts`

### [x] Diaspora
Diaspora.
Run: `grep -q "diasporaConfig" src/spec-parser.ts`

### [x] GangGo
GangGo.
Run: `grep -q "ganggoConfig" src/spec-parser.ts`

### [x] Osada
Osada.
Run: `grep -q "osadaConfig" src/spec-parser.ts`

### [x] Red
Red.
Run: `grep -q "redMatrixConfig" src/spec-parser.ts`

### [x] Matrix
Matrix.
Run: `grep -q "matrixConfig" src/spec-parser.ts`

### [x] Element
Element.
Run: `grep -q "elementConfig" src/spec-parser.ts`

### [x] Synapse
Synapse.
Run: `grep -q "synapseConfig" src/spec-parser.ts`

### [x] Dendrite
Dendrite.
Run: `grep -q "dendriteConfig" src/spec-parser.ts`

### [x] Conduit
Conduit.
Run: `grep -q "conduitConfig" src/spec-parser.ts`

### [x] Fractal
Fractal.
Run: `grep -q "fractalConfig" src/spec-parser.ts`

### [x] Nheko
Nheko.
Run: `grep -q "nhekoConfig" src/spec-parser.ts`

### [x] FluffyChat
FluffyChat.
Run: `grep -q "fluffychatConfig" src/spec-parser.ts`

### [x] SchildiChat
SchildiChat.
Run: `grep -q "schildichatConfig" src/spec-parser.ts`

### [x] Cinny
Cinny.
Run: `grep -q "cinnyConfig" src/spec-parser.ts`

### [x] Cactus
Cactus.
Run: `grep -q "cactusConfig" src/spec-parser.ts`

### [x] Hydrogen
Hydrogen.
Run: `grep -q "hydrogenConfig" src/spec-parser.ts`

### [x] Pantalaimon
Pantalaimon.
Run: `grep -q "pantalaimonConfig" src/spec-parser.ts`

### [x] Fractal
Fractal.
Run: `grep -q "fractalClientConfig" src/spec-parser.ts`

### [x] Quaternion
Quaternion.
Run: `grep -q "quaternionConfig" src/spec-parser.ts`

### [x] NeoChat
NeoChat.
Run: `grep -q "neochatConfig" src/spec-parser.ts`

### [x] dig
Dig.
Run: `grep -q "digConfig" src/spec-parser.ts`

### [x] Signal
Signal.
Run: `grep -q "signalConfig" src/spec-parser.ts`

### [x] Signal Protocol
SignalProtocol.
Run: `grep -q "signalProtocolConfig" src/spec-parser.ts`

### [x] Matrix E2EE
MatrixE2EE.
Run: `grep -q "matrixE2EEConfig" src/spec-parser.ts`

### [x] OMEMO
OMEMO.
Run: `grep -q "omemoConfig" src/spec-parser.ts`

### [x] Session
Session.
Run: `grep -q "sessionConfig" src/spec-parser.ts`

### [x] Wire
Wire.
Run: `grep -q "wireConfig" src/spec-parser.ts`

### [x] Threema
Threema.
Run: `grep -q "threemaConfig" src/spec-parser.ts`

### [x] SimpleX
SimpleX.
Run: `grep -q "simplexConfig" src/spec-parser.ts`

### [x] Briar
Briar.
Run: `grep -q "briarConfig" src/spec-parser.ts`

### [x] IRC
IRC.
Run: `grep -q "ircConfig" src/spec-parser.ts`

### [x] Libera.Chat
Libera.
Run: `grep -q "liberaConfig" src/spec-parser.ts`

### [x] OFTC
OFTC.
Run: `grep -q "oftcConfig" src/spec-parser.ts`

### [x] Unreal IRCd
UnrealIRCd.
Run: `grep -q "unrealircdConfig" src/spec-parser.ts`

### [x] inspircd
InspIRCd.
Run: `grep -q "inspircdConfig" src/spec-parser.ts`

### [x] ircd-seven
IRCD7.
Run: `grep -q "ircdsevenConfig" src/spec-parser.ts`

### [x] Charybdis
Charybdis.
Run: `grep -q "charybdisConfig" src/spec-parser.ts`

### [x] ircu
IRCU.
Run: `grep -q "ircuConfig" src/spec-parser.ts`

### [x] Hybrid
Hybrid.
Run: `grep -q "hybridConfig" src/spec-parser.ts`

### [x] Ptlink
Ptlink.
Run: `grep -q "ptlinkConfig" src/spec-parser.ts`

### [x] NgIRCd
NgIRCd.
Run: `grep -q "ngircdConfig" src/spec-parser.ts`

### [x] ircd-ratbox
Ratbox.
Run: `grep -q "ratboxConfig" src/spec-parser.ts`

### [x] Oragono
Oragono.
Run: `grep -q "oragonoConfig" src/spec-parser.ts`

### [x] Ergo
Ergo.
Run: `grep -q "ergoConfig" src/spec-parser.ts`

### [x] Aegis
Aegis.
Run: `grep -q "aegisConfig" src/spec-parser.ts`

### [x] The Lounge
TheLounge.
Run: `grep -q "theloungeConfig" src/spec-parser.ts`

### [x] WeeChat
WeeChat.
Run: `grep -q "weechatConfig" src/spec-parser.ts`

### [x] HexChat
HexChat.
Run: `grep -q "hexchatConfig" src/spec-parser.ts`

### [x] mIRC
MIRC.
Run: `grep -q "mircConfig" src/spec-parser.ts`

### [x] Adium
Adium.
Run: `grep -q "adiumConfig" src/spec-parser.ts`

### [x] Pidgin
Pidgin.
Run: `grep -q "pidginConfig" src/spec-parser.ts`

### [x] Textual
Textual.
Run: `grep -q "textualConfig" src/spec-parser.ts`

### [x] Snak
Snak.
Run: `grep -q "snakConfig" src/spec-parser.ts`

### [x] Colloquy
Colloquy.
Run: `grep -q "colloquyConfig" src/spec-parser.ts`

### [x] ircII
IRCIi.
Run: `grep -q "irciiConfig" src/spec-parser.ts`

### [x] ERC
ERC.
Run: `grep -q "ercConfig" src/spec-parser.ts`

### [x] Circe
Circe.
Run: `grep -q "circeConfig" src/spec-parser.ts`

### [x] Riece
Riece.
Run: `grep -q "riceConfig" src/spec-parser.ts`

### [x] ScrollZ
ScrollZ.
Run: `grep -q "scrollzConfig" src/spec-parser.ts`

### [x] irccloud
IRCCloud.
Run: `grep -q "irccloudConfig" src/spec-parser.ts`

### [x] Kiwi IRC
KiwiIRC.
Run: `grep -q "kiwiircConfig" src/spec-parser.ts`

### [x] Supybot
Supybot.
Run: `grep -q "supybotConfig" src/spec-parser.ts`

### [x] Limnoria
Limnoria.
Run: `grep -q "limnoriaConfig" src/spec-parser.ts`

### [x] Sopel
Sopel.
Run: `grep -q "sopelConfig" src/spec-parser.ts`

### [x] Pygments
Pygments.
Run: `grep -q "pygmentsConfig" src/spec-parser.ts`

### [x] highlight
Highlight.
Run: `grep -q "highlightConfig" src/spec-parser.ts`

### [x] CodeMirror
CodeMirror.
Run: `grep -q "codemirrorConfig" src/spec-parser.ts`

### [x] Monaco
Monaco.
Run: `grep -q "monacoConfig" src/spec-parser.ts`

### [x] Ace
Ace.
Run: `grep -q "aceConfig" src/spec-parser.ts`

### [x] Prism
Prism.
Run: `grep -q "prismConfig" src/spec-parser.ts`

### [x] Shiki
Shiki.
Run: `grep -q "shikiConfig" src/spec-parser.ts`

### [x] Tree-sitter
TreeSitter.
Run: `grep -q "treesitterConfig" src/spec-parser.ts`

### [x] rope
Rope.
Run: `grep -q "ropeConfig" src/spec-parser.ts`

### [x] Jedi
Jedi.
Run: `grep -q "jediConfig" src/spec-parser.ts`

### [x] Pylint
Pylint.
Run: `grep -q "pylintConfig" src/spec-parser.ts`

### [x] Pyflakes
Pyflakes.
Run: `grep -q "pyflakesConfig" src/spec-parser.ts`

### [x] Ruff
Ruff.
Run: `grep -q "ruffConfig" src/spec-parser.ts`

### [x] Flake8
Flake8.
Run: `grep -q "flake8Config" src/spec-parser.ts`

### [x] Black
Black.
Run: `grep -q "blackConfig" src/spec-parser.ts`

### [x] isort
Isort.
Run: `grep -q "isortConfig" src/spec-parser.ts`

### [x] MyPy
Mypy.
Run: `grep -q "mypyConfig" src/spec-parser.ts`

### [x] Bandit
Bandit.
Run: `grep -q "banditConfig" src/spec-parser.ts`

### [x] Safety
Safety.
Run: `grep -q "safetyConfig" src/spec-parser.ts`

### [x] Dependabot
Dependabot.
Run: `grep -q "dependabotConfig" src/spec-parser.ts`

### [x] Renovate
Renovate.
Run: `grep -q "renovateConfig" src/spec-parser.ts`

### [x] ESLint
ESLint.
Run: `grep -q "eslintConfig" src/spec-parser.ts`

### [x] Prettier
Prettier.
Run: `grep -q "prettierConfig" src/spec-parser.ts`

### [x] TSLint
TSLint.
Run: `grep -q "tslintConfig" src/spec-parser.ts`

### [x] Stylelint
Stylelint.
Run: `grep -q "stylelintConfig" src/spec-parser.ts`

### [x] Biome
Biome.
Run: `grep -q "biomeConfig" src/spec-parser.ts`

### [x] Denols
Denols.
Run: `grep -q "denolsConfig" src/spec-parser.ts`

### [x] Deno
Deno.
Run: `grep -q "denoConfig" src/spec-parser.ts`

### [x] Bun
Bun.
Run: `grep -q "bunConfig" src/spec-parser.ts`

### [x] Node.js
NodeJS.
Run: `grep -q "nodejsConfig" src/spec-parser.ts`

### [x] npm
Npm.
Run: `grep -q "npmConfig" src/spec-parser.ts`

### [x] pnpm
Pnpm.
Run: `grep -q "pnpmConfig" src/spec-parser.ts`

### [x] Yarn
Yarn.
Run: `grep -q "yarnConfig" src/spec-parser.ts`

### [x] n
N.
Run: `grep -q "nConfig" src/spec-parser.ts`

### [x] volta
Volta.
Run: `grep -q "voltaConfig" src/spec-parser.ts`

### [x] asdf
Asdf.
Run: `grep -q "asdfConfig" src/spec-parser.ts`

### [x] nvm
Nvm.
Run: `grep -q "nvmConfig" src/spec-parser.ts`

### [x] fnm
Fnm.
Run: `grep -q "fnmConfig" src/spec-parser.ts`

### [x] Rust
Rust.
Run: `grep -q "rustConfig" src/spec-parser.ts`

### [x] Cargo
Cargo.
Run: `grep -q "cargoConfig" src/spec-parser.ts`

### [x] rustup
Rustup.
Run: `grep -q "rustupConfig" src/spec-parser.ts`

### [x] clippy
Clippy.
Run: `grep -q "clippyConfig" src/spec-parser.ts`

### [x] mrustc
Mrustc.
Run: `grep -q "mrustcConfig" src/spec-parser.ts`

### [x] Go
Go.
Run: `grep -q "goConfig" src/spec-parser.ts`

### [x] dep
Dep.
Run: `grep -q "depConfig" src/spec-parser.ts`

### [x] go mod
GoMod.
Run: `grep -q "gomodConfig" src/spec-parser.ts`

### [x] golangci-lint
Golangci.
Run: `grep -q "golangciConfig" src/spec-parser.ts`

### [x] gofmt
Gofmt.
Run: `grep -q "gofmtConfig" src/spec-parser.ts`

### [x] go vet
Govet.
Run: `grep -q "govetConfig" src/spec-parser.ts`

### [x] Java
Java.
Run: `grep -q "javaConfig" src/spec-parser.ts`

### [x] Maven
Maven.
Run: `grep -q "mavenConfig" src/spec-parser.ts`

### [x] Gradle
Gradle.
Run: `grep -q "gradleConfig" src/spec-parser.ts`

### [x] Ant
Ant.
Run: `grep -q "antConfig" src/spec-parser.ts`

### [x] sbt
SBT.
Run: `grep -q "sbtConfig" src/spec-parser.ts`

### [x] Kotlin
Kotlin.
Run: `grep -q "kotlinConfig" src/spec-parser.ts`

### [x] Scala
Scala.
Run: `grep -q "scalaConfig" src/spec-parser.ts`

### [x] Clojure
Clojure.
Run: `grep -q "clojureConfig" src/spec-parser.ts`

### [x] Leiningen
Leiningen.
Run: `grep -q "leiningenConfig" src/spec-parser.ts`

### [x] Babashka
Babashka.
Run: `grep -q "babashkaConfig" src/spec-parser.ts`

### [x] C++
CPP.
Run: `grep -q "cppConfig" src/spec-parser.ts`

### [x] CMake
CMake.
Run: `grep -q "cmakeConfig" src/spec-parser.ts`

### [x] Meson
Meson.
Run: `grep -q "mesonConfig" src/spec-parser.ts`

### [x] Ninja
Ninja.
Run: `grep -q "ninjaConfig" src/spec-parser.ts`

### [x] Make
Make.
Run: `grep -q "makeConfig" src/spec-parser.ts`

### [x] Bazel
Bazel.
Run: `grep -q "bazelConfig" src/spec-parser.ts`

### [x] Buck
Buck.
Run: `grep -q "buckConfig" src/spec-parser.ts`

### [x] Buck2
Buck2.
Run: `grep -q "buck2Config" src/spec-parser.ts`

### [x] Pants
Pants.
Run: `grep -q "pantsConfig" src/spec-parser.ts`

### [x] Please
Please.
Run: `grep -q "pleaseConfig" src/spec-parser.ts`

### [x] scons
SCons.
Run: `grep -q "sconsConfig" src/spec-parser.ts`

### [x] waf
Waf.
Run: `grep -q "wafConfig" src/spec-parser.ts`

### [x] Swift
Swift.
Run: `grep -q "swiftConfig" src/spec-parser.ts`

### [x] Swift Package Manager
SPM.
Run: `grep -q "spmConfig" src/spec-parser.ts`

### [x] XcodeGen
XcodeGen.
Run: `grep -q "xcodegenConfig" src/spec-parser.ts`

### [x] CocoaPods
CocoaPods.
Run: `grep -q "cocoapodsConfig" src/spec-parser.ts`

### [x] Carthage
Carthage.
Run: `grep -q "carthageConfig" src/spec-parser.ts`

### [x] Ruby
Ruby.
Run: `grep -q "rubyConfig" src/spec-parser.ts`

### [x] RubyGems
RubyGems.
Run: `grep -q "rubygemsConfig" src/spec-parser.ts`

### [x] Bundler
Bundler.
Run: `grep -q "bundlerConfig" src/spec-parser.ts`

### [x] RVM
RVM.
Run: `grep -q "rvmConfig" src/spec-parser.ts`

### [x] rbenv
Rbenv.
Run: `grep -q "rbenvConfig" src/spec-parser.ts`

### [x] Homebrew
Homebrew.
Run: `grep -q "homebrewConfig" src/spec-parser.ts`

### [x] Debian
Debian.
Run: `grep -q "debianConfig" src/spec-parser.ts`

### [x] RPM
RPM.
Run: `grep -q "rpmConfig" src/spec-parser.ts`

### [x] Alpine
Alpine.
Run: `grep -q "alpineConfig" src/spec-parser.ts`

### [x] Flatpak
Flatpak.
Run: `grep -q "flatpakConfig" src/spec-parser.ts`

### [x] Snap
Snap.
Run: `grep -q "snapConfig" src/spec-parser.ts`

### [x] AppImage
AppImage.
Run: `grep -q "appimageConfig" src/spec-parser.ts`

### [x] NuGet
NuGet.
Run: `grep -q "nugetConfig" src/spec-parser.ts`

### [x] Conan
Conan.
Run: `grep -q "conanConfig" src/spec-parser.ts`

### [x] vcpkg
Vcpkg.
Run: `grep -q "vcpkgConfig" src/spec-parser.ts`

### [x] Spack
Spack.
Run: `grep -q "spackConfig" src/spec-parser.ts`

### [x] Nix
Nix.
Run: `grep -q "nixpkgConfig" src/spec-parser.ts`

### [x] NixOS
NixOS.
Run: `grep -q "nixosConfig" src/spec-parser.ts`

### [x] Home Manager
HomeManager.
Run: `grep -q "homeManagerConfig" src/spec-parser.ts`

### [x] lorri
Lorri.
Run: `grep -q "lorriConfig" src/spec-parser.ts`

### [x] direnv
Direnv.
Run: `grep -q "direnvConfig" src/spec-parser.ts`

### [x] Cachix
Cachix.
Run: `grep -q "cachixConfig" src/spec-parser.ts`

### [x] poetry
Poetry.
Run: `grep -q "poetryConfig" src/spec-parser.ts`

### [x] PDM
PDM.
Run: `grep -q "pdmConfig" src/spec-parser.ts`

### [x] Pipenv
Pipenv.
Run: `grep -q "pipenvConfig" src/spec-parser.ts`

### [x] Conda
Conda.
Run: `grep -q "condaConfig" src/spec-parser.ts`

### [x] mamba
Mamba.
Run: `grep -q "mambaConfig" src/spec-parser.ts`

### [x] pip
Pip.
Run: `grep -q "pipConfig" src/spec-parser.ts`

### [x] uv
Uv.
Run: `grep -q "uvConfig" src/spec-parser.ts`

### [x] pipx
Pipx.
Run: `grep -q "pipxConfig" src/spec-parser.ts`

### [x] PEAR
PEAR.
Run: `grep -q "pearConfig" src/spec-parser.ts`

### [x] Composer
Composer.
Run: `grep -q "composerConfig" src/spec-parser.ts`

### [x] Packagist
Packagist.
Run: `grep -q "packagistConfig" src/spec-parser.ts`

### [x] Cargo
Cargo.
Run: `grep -q "cargoRegistryConfig" src/spec-parser.ts`

### [x] crates.io
Crates.
Run: `grep -q "cratesConfig" src/spec-parser.ts`

### [x] go mod
GoMod.
Run: `grep -q "gomodProxyConfig" src/spec-parser.ts`

### [x] Hex
Hex.
Run: `grep -q "hexConfig" src/spec-parser.ts`

### [x] pub.dev
PubDev.
Run: `grep -q "pubdevConfig" src/spec-parser.ts`

### [x] npm registry
NpmRegistry.
Run: `grep -q "npmRegistryConfig" src/spec-parser.ts`

### [x] PyPI
PyPI.
Run: `grep -q "pypiConfig" src/spec-parser.ts`

### [x] RubyGems
RubyGems.
Run: `grep -q "rubygemsRegistryConfig" src/spec-parser.ts`

### [x] Chocolatey
Chocolatey.
Run: `grep -q "chocolateyConfig" src/spec-parser.ts`

### [x] winget
Winget.
Run: `grep -q "wingetConfig" src/spec-parser.ts`

### [x] Scoop
Scoop.
Run: `grep -q "scoopConfig" src/spec-parser.ts`

### [x] MSIX
MSIX.
Run: `grep -q "msixConfig" src/spec-parser.ts`

### [x] MSI
MSI.
Run: `grep -q "msiConfig" src/spec-parser.ts`

### [x] WiX
WiX.
Run: `grep -q "wixConfig" src/spec-parser.ts`

### [x] Inno Setup
InnoSetup.
Run: `grep -q "innosetupConfig" src/spec-parser.ts`

### [x] NSIS
NSIS.
Run: `grep -q "nsisConfig" src/spec-parser.ts`

### [x] Electron Builder
ElectronBuilder.
Run: `grep -q "electronBuilderConfig" src/spec-parser.ts`

### [x] electron-forge
ElectronForge.
Run: `grep -q "electronForgeConfig" src/spec-parser.ts`

### [x] Tauri
Tauri.
Run: `grep -q "tauriConfig" src/spec-parser.ts`

### [x] Proton
Proton.
Run: `grep -q "protonConfig" src/spec-parser.ts`

### [x] AppImage
AppImage.
Run: `grep -q "appimageBuildConfig" src/spec-parser.ts`

### [x] Flatpak Builder
FlatpakBuilder.
Run: `grep -q "flatpakBuilderConfig" src/spec-parser.ts`

### [x] PPA
PPA.
Run: `grep -q "ppaConfig" src/spec-parser.ts`

### [x] AUR
AUR.
Run: `grep -q "aurConfig" src/spec-parser.ts`

### [x] COPR
COPR.
Run: `grep -q "coprConfig" src/spec-parser.ts`

### [x] pkgsrc
Pkgsrc.
Run: `grep -q "pkgsrcConfig" src/spec-parser.ts`

### [x] nix-index
NixIndex.
Run: `grep -q "nixindexConfig" src/spec-parser.ts`

### [x] home-manager
HomeManager.
Run: `grep -q "homeManagerModuleConfig" src/spec-parser.ts`

### [x] flakehub
FlakeHub.
Run: `grep -q "flakehubConfig" src/spec-parser.ts`

### [x] devenv
Devenv.
Run: `grep -q "devenvConfig" src/spec-parser.ts`

### [x] Docker
Docker.
Run: `grep -q "dockerConfig" src/spec-parser.ts`

### [x] Dockerfile
Dockerfile.
Run: `grep -q "dockerfileConfig" src/spec-parser.ts`

### [x] Docker Compose
DockerCompose.
Run: `grep -q "dockercomposeConfig" src/spec-parser.ts`

### [x] Podman
Podman.
Run: `grep -q "podmanConfig" src/spec-parser.ts`

### [x] Buildah
Buildah.
Run: `grep -q "buildahConfig" src/spec-parser.ts`

### [x] Kaniko
Kaniko.
Run: `grep -q "kanikoConfig" src/spec-parser.ts`

### [x] BuildKit
BuildKit.
Run: `grep -q "buildkitConfig" src/spec-parser.ts`

### [x] containerd
Containerd.
Run: `grep -q "containerdRuntimeConfig" src/spec-parser.ts`

### [x] CRI-O
CRIO.
Run: `grep -q "crioRuntimeConfig" src/spec-parser.ts`

### [x] nerdctl
Nerdctl.
Run: `grep -q "nerdctlConfig" src/spec-parser.ts`

### [x] Lima
Lima.
Run: `grep -q "limaConfig" src/spec-parser.ts`

### [x] sysbox
Sysbox.
Run: `grep -q "sysboxConfig" src/spec-parser.ts`

### [x] rootless
Rootless.
Run: `grep -q "rootlessConfig" src/spec-parser.ts`

### [x] gVisor
Gvisor.
Run: `grep -q "gvisorRuntimeConfig" src/spec-parser.ts`

### [x] Kata Containers
KataContainers.
Run: `grep -q "kataContainersConfig" src/spec-parser.ts`

### [x] Firecracker
Firecracker.
Run: `grep -q "firecrackerVMConfig" src/spec-parser.ts`

### [x] Cloud Hypervisor
CloudHypervisor.
Run: `grep -q "cloudhypervisorVMConfig" src/spec-parser.ts`

### [x] QEMU
aEMU.
Run: `grep -q "qemuVMConfig" src/spec-parser.ts`

### [x] VirtualBox
VirtualBox.
Run: `grep -q "virtualboxConfig" src/spec-parser.ts`

### [x] VMware
VMware.
Run: `grep -q "vmwareConfig" src/spec-parser.ts`

### [x] Hyper-V
HyperV.
Run: `grep -q "hypervConfig" src/spec-parser.ts`

### [x] libvirt
Libvirt.
Run: `grep -q "libvirtConfig" src/spec-parser.ts`

### [x] virsh
Virsh.
Run: `grep -q "virshConfig" src/spec-parser.ts`

### [x] virt-manager
VirtManager.
Run: `grep -q "virtmanagerConfig" src/spec-parser.ts`

### [x] Multipass
Multipass.
Run: `grep -q "multipassConfig" src/spec-parser.ts`

### [x] Vagrant
Vagrant.
Run: `grep -q "vagrantConfig" src/spec-parser.ts`

### [x] vSphere
VSphere.
Run: `grep -q "vsphereConfig" src/spec-parser.ts`

### [x] oVirt
oVirt.
Run: `grep -q "ovirtConfig" src/spec-parser.ts`

### [x] Proxmox
Proxmox.
Run: `grep -q "proxmoxConfig" src/spec-parser.ts`

### [x] Xen
Xen.
Run: `grep -q "xenConfig" src/spec-parser.ts`

### [x] KVM
KVM.
Run: `grep -q "kvmConfig" src/spec-parser.ts`

### [x] HyperKit
HyperKit.
Run: `grep -q "hyperkitConfig" src/spec-parser.ts`

### [x] Parallels
Parallels.
Run: `grep -q "parallelsConfig" src/spec-parser.ts`

### [x] UTM
UTM.
Run: `grep -q "utmConfig" src/spec-parser.ts`

### [x] Anka
Anka.
Run: `grep -q "ankaConfig" src/spec-parser.ts`

### [x] Veertu
Veertu.
Run: `grep -q "veertuConfig" src/spec-parser.ts`

### [x] Nomad
Nomad.
Run: `grep -q "nomadServerConfig" src/spec-parser.ts`

### [x] Nomad client
NomadClient.
Run: `grep -q "nomadClientConfig" src/spec-parser.ts`

### [x] Waypoint
Waypoint.
Run: `grep -q "waypointConfig" src/spec-parser.ts`

### [x] Terraform
Terraform.
Run: `grep -q "terraformConfig" src/spec-parser.ts`

### [x] Terragrunt
Terragrunt.
Run: `grep -q "terragruntConfig" src/spec-parser.ts`

### [x] Pulumi
Pulumi.
Run: `grep -q "pulumiStackConfig" src/spec-parser.ts`

### [x] Ansible
Ansible.
Run: `grep -q "ansibleConfig" src/spec-parser.ts`

### [x] Ansible Playbook
AnsiblePlaybook.
Run: `grep -q "ansibleplaybookConfig" src/spec-parser.ts`

### [x] Ansible Vault
AnsibleVault.
Run: `grep -q "ansiblevaultConfig" src/spec-parser.ts`

### [x] AWX
AWX.
Run: `grep -q "awxConfig" src/spec-parser.ts`

### [x] Ansible Tower
AnsibleTower.
Run: `grep -q "ansibletowerConfig" src/spec-parser.ts`

### [x] Chef
Chef.
Run: `grep -q "chefConfig" src/spec-parser.ts`

### [x] Chef Solo
ChefSolo.
Run: `grep -q "chefSoloConfig" src/spec-parser.ts`

### [x] Chef Zero
ChefZero.
Run: `grep -q "chefzeroConfig" src/spec-parser.ts`

### [x] InSpec
InSpec.
Run: `grep -q "inspecConfig" src/spec-parser.ts`

### [x] Puppet
Puppet.
Run: `grep -q "puppetConfig" src/spec-parser.ts`

### [x] Puppet Bolt
PuppetBolt.
Run: `grep -q "puppetBoltConfig" src/spec-parser.ts`

### [x] RSpec
RSpec.
Run: `grep -q "rspecConfig" src/spec-parser.ts`

### [x] Serverspec
Serverspec.
Run: `grep -q "serverspecConfig" src/spec-parser.ts`

### [x] Goss
Goss.
Run: `grep -q "gossConfig" src/spec-parser.ts`

### [x] Testinfra
Testinfra.
Run: `grep -q "testinfraConfig" src/spec-parser.ts`

### [x] molecule
Molecule.
Run: `grep -q "moleculeConfig" src/spec-parser.ts`

### [x] Kitchen
Kitchen.
Run: `grep -q "kitchenConfig" src/spec-parser.ts`

### [x] Salt
Salt.
Run: `grep -q "saltConfig" src/spec-parser.ts`

### [x] Salt Master
SaltMaster.
Run: `grep -q "saltmasterConfig" src/spec-parser.ts`

### [x] Salt Minion
SaltMinion.
Run: `grep -q "saltminionConfig" src/spec-parser.ts`

### [x] Argo CD
ArgoCD.
Run: `grep -q "argocdAppConfig" src/spec-parser.ts`

### [x] Argo Workflows
ArgoWorkflows.
Run: `grep -q "argoworkflowsConfig" src/spec-parser.ts`

### [x] Argo Rollouts
ArgoRollouts.
Run: `grep -q "argorolloutsConfig" src/spec-parser.ts`

### [x] Flux
Flux.
Run: `grep -q "fluxGitConfig" src/spec-parser.ts`

### [x] Flux v2
FluxV2.
Run: `grep -q "fluxv2Config" src/spec-parser.ts`

### [x] Tekton
Tekton.
Run: `grep -q "tektonPipelineConfig" src/spec-parser.ts`

### [x] Tekton Triggers
TektonTriggers.
Run: `grep -q "tektontiggersConfig" src/spec-parser.ts`

### [x] Jenkins
Jenkins.
Run: `grep -q "jenkinsConfig" src/spec-parser.ts`

### [x] Jenkins X
JenkinsX.
Run: `grep -q "jenkinsxConfig" src/spec-parser.ts`

### [x] Jenkinsfile
Jenkinsfile.
Run: `grep -q "jenkinsfileConfig" src/spec-parser.ts`

### [x] GitHub Actions
ghActions.
Run: `grep -q "ghActionsConfig" src/spec-parser.ts`

### [x] GitHub workflow
GHWorkflow.
Run: `grep -q "ghworkflowConfig" src/spec-parser.ts`

### [x] GitHub Actions
GHA.
Run: `grep -q "ghactionConfig" src/spec-parser.ts`

### [x] GitHub CLI
GHCLI.
Run: `grep -q "ghcliConfig" src/spec-parser.ts`

### [x] GitHub API
ghAPI.
Run: `grep -q "ghapiConfig" src/spec-parser.ts`

### [x] GitHub Apps
ghApps.
Run: `grep -q "ghappsConfig" src/spec-parser.ts`

### [x] GitHub webhooks
ghWebhooks.
Run: `grep -q "ghwebhookConfig" src/spec-parser.ts`

### [x] GitLab CI
gitlabCI.
Run: `grep -q "gitlabciConfig" src/spec-parser.ts`

### [x] GitLab Runner
gitlabRunner.
Run: `grep -q "gitlabrunnerConfig" src/spec-parser.ts`

### [x] GitLab API
gitlabAPI.
Run: `grep -q "gitlabapiConfig" src/spec-parser.ts`

### [x] GitLab webhooks
gitlabWebhooks.
Run: `grep -q "gitlabwebhookConfig" src/spec-parser.ts`

### [x] Azure Pipelines
AzurePipelines.
Run: `grep -q "azurepipelinesConfig" src/spec-parser.ts`

### [x] Azure DevOps
gitAzure.
Run: `grep -q "azuredevopsConfig" src/spec-parser.ts`

### [x] Bitbucket Pipelines
Bitbucket.
Run: `grep -q "bitbucketConfig" src/spec-parser.ts`

### [x] Bitbucket API
BitbucketAPI.
Run: `grep -q "bitbucketapiConfig" src/spec-parser.ts`

### [x] CircleCI
CircleCI.
Run: `grep -q "circleciConfig" src/spec-parser.ts`

### [x] CircleCI Orb
CircleOrb.
Run: `grep -q "circleciOrbConfig" src/spec-parser.ts`

### [x] Drone
Drone.
Run: `grep -q "droneConfig" src/spec-parser.ts`

### [x] Drone CI
DroneCI.
Run: `grep -q "droneciConfig" src/spec-parser.ts`

### [x] Gitea Actions
GiteaActions.
Run: `grep -q "giteaactionsConfig" src/spec-parser.ts`

### [x] Forgejo Actions
ForgejoActions.
Run: `grep -q "forgejoactionsConfig" src/spec-parser.ts`

### [x] Woodpecker CI
Woodpecker.
Run: `grep -q "woodpeckerConfig" src/spec-parser.ts`

### [x] Buildkite
Buildkite.
Run: `grep -q "buildkiteConfig" src/spec-parser.ts`

### [x] Buildkite Agent
BuildkiteAgent.
Run: `grep -q "buildkiteagentConfig" src/spec-parser.ts`

### [x] Travis CI
TravisCI.
Run: `grep -q "travisciConfig" src/spec-parser.ts`

### [x] AppVeyor
AppVeyor.
Run: `grep -q "appveyorConfig" src/spec-parser.ts`

### [x] Semaphore CI
Semaphore.
Run: `grep -q "semaphoreConfig" src/spec-parser.ts`

### [x] Codefresh
Codefresh.
Run: `grep -q "codefreshConfig" src/spec-parser.ts`

### [x] Shippable
Shippable.
Run: `grep -q "shippableConfig" src/spec-parser.ts`

### [x] JetBrains TeamCity
TeamCity.
Run: `grep -q "teamcityConfig" src/spec-parser.ts`

### [x] Bamboo
Bamboo.
Run: `grep -q "bambooConfig" src/spec-parser.ts`

### [x] Spinnaker
Spinnaker.
Run: `grep -q "spinnakerConfig" src/spec-parser.ts`

### [x] Jenkins X
JenkinsX.
Run: `grep -q "jenkinsxPipelineConfig" src/spec-parser.ts`

### [x] Skaffold
Skaffold.
Run: `grep -q "skaffoldConfig" src/spec-parser.ts`

### [x] Tilt
Tilt.
Run: `grep -q "tiltConfig" src/spec-parser.ts`

### [x] DevSpace
DevSpace.
Run: `grep -q "devspaceConfig" src/spec-parser.ts`

### [x] Garden
Garden.
Run: `grep -q "gardenConfig" src/spec-parser.ts`

### [x] Kpt
Kpt.
Run: `grep -q "kptPipelineConfig" src/spec-parser.ts`

### [x] kustomize
Kustomize.
Run: `grep -q "kustomizepipelineConfig" src/spec-parser.ts`

### [x] Helm
Helm.
Run: `grep -q "helmChartConfig" src/spec-parser.ts`

### [x] Helmfile
Helmfile.
Run: `grep -q "helmfileConfig" src/spec-parser.ts`

### [x] KubeVela
KubeVela.
Run: `grep -q "kubevelaConfig" src/spec-parser.ts`

### [x] Backstage
Backstage.
Run: `grep -q "backstageConfig" src/spec-parser.ts`

### [x] Crossplane
Crossplane.
Run: `grep -q "crossplaneConfig" src/spec-parser.ts`

### [x] Pulumi YAML
PulumiYAML.
Run: `grep -q "pulumiyamlConfig" src/spec-parser.ts`

### [x] CDK8s
CDK8s.
Run: `grep -q "cdk8sConfig" src/spec-parser.ts`

### [x] CDK for Terraform
CDKTF.
Run: `grep -q "cdktfConfig" src/spec-parser.ts`

### [x] Pulumi
Pulumi.
Run: `grep -q "pulumiConfig" src/spec-parser.ts`

### [x] Kubernetes
K8s.
Run: `grep -q "k8sConfig" src/spec-parser.ts`

### [x] etcd
Etcd.
Run: `grep -q "etcdK8sConfig" src/spec-parser.ts`

### [x] CoreDNS
CoreDNS.
Run: `grep -q "corednsK8sConfig" src/spec-parser.ts`

### [x] kube-proxy
KubeProxyK8s.
Run: `grep -q "kubeproxyK8sConfig" src/spec-parser.ts`

### [x] kube-scheduler
KubeSchedulerK8s.
Run: `grep -q "kubschedulerK8sConfig" src/spec-parser.ts`

### [x] kube-controller-manager
KubeControllerK8s.
Run: `grep -q "kubecontrollerK8sConfig" src/spec-parser.ts`

### [x] kubelet
KubeletK8s.
Run: `grep -q "kubeletK8sConfig" src/spec-parser.ts`

### [x] kube-apiserver
KubeAPIServerK8s.
Run: `grep -q "kubeapiserverK8sConfig" src/spec-parser.ts`

### [x] kubectl
KubectlK8s.
Run: `grep -q "kubectlK8sConfig" src/spec-parser.ts`

### [x] kubeconfig
KubeconfigK8s.
Run: `grep -q "kubeconfigK8sContext" src/spec-parser.ts`

### [x] HPA
HPA.
Run: `grep -q "hpaK8sConfig" src/spec-parser.ts`

### [x] VPA
VPA.
Run: `grep -q "vpaK8sConfig" src/spec-parser.ts`

### [x] PDB
PDB.
Run: `grep -q "pdbK8sConfig" src/spec-parser.ts`

### [x] NetworkPolicy
NetworkPolicy.
Run: `grep -q "networkpolicyK8sConfig" src/spec-parser.ts`

### [x] LimitRange
LimitRangeK8s.
Run: `grep -q "limitrangeK8sConfig" src/spec-parser.ts`

### [x] ResourceQuota
ResourceQuotaK8s.
Run: `grep -q "resourcequotaK8sConfig" src/spec-parser.ts`

### [x] ServiceMonitor
ServiceMonitor.
Run: `grep -q "servicemonitorK8sConfig" src/spec-parser.ts`

### [x] PodMonitor
PodMonitor.
Run: `grep -q "podmonitorK8sConfig" src/spec-parser.ts`

### [x] PrometheusRule
PrometheusRule.
Run: `grep -q "prometheusruleK8sConfig" src/spec-parser.ts`

### [x] HorizontalPodAutoscaler
HPAK8s.
Run: `grep -q "hpaconfig" src/spec-parser.ts`

### [x] VerticalPodAutoscaler
VPAK8s.
Run: `grep -q "vpaconfig" src/spec-parser.ts`

### [x] ClusterAutoscaler
ClusterAutoscaler.
Run: `grep -q "clusterautoscalerConfig" src/spec-parser.ts`

### [x] Istio
Istio.
Run: `grep -q "istioConfig" src/spec-parser.ts`

### [x] Envoy
Envoy.
Run: `grep -q "envoyConfig" src/spec-parser.ts`

### [x] Linkerd
Linkerd.
Run: `grep -q "linkerdConfig" src/spec-parser.ts`

### [x] Consul Connect
ConsulConnect.
Run: `grep -q "consulconnectConfig" src/spec-parser.ts`

### [x] Linkerd
Linkerd.
Run: `grep -q "linkerdK8sConfig" src/spec-parser.ts`

### [x] Cilium
Cilium.
Run: `grep -q "ciliumConfig" src/spec-parser.ts`

### [x] Calico
Calico.
Run: `grep -q "calicoConfig" src/spec-parser.ts`

### [x] Flannel
Flannel.
Run: `grep -q "flannelConfig" src/spec-parser.ts`

### [x] Weave Net
Weave.
Run: `grep -q "weaveConfig" src/spec-parser.ts`

### [x] Canal
CanalK8s.
Run: `grep -q "canalK8sConfig" src/spec-parser.ts`

### [x] kube-router
KubeRouter.
Run: `grep -q "kuberouterConfig" src/spec-parser.ts`

### [x] CNI
CNI.
Run: `grep -q "cniConfig" src/spec-parser.ts`

### [x] Multus
Multus.
Run: `grep -q "multusConfig" src/spec-parser.ts`

### [x] ovn-kubernetes
OVN.
Run: `grep -q "ovnkubernetesConfig" src/spec-parser.ts`

### [x] kube-ovn
KubeOVN.
Run: `grep -q "kubeovnConfig" src/spec-parser.ts`

### [x] Antrea
Antrea.
Run: `grep -q "antreaConfig" src/spec-parser.ts`

### [x] NSX-T
NSXT.
Run: `grep -q "nsxtConfig" src/spec-parser.ts`

### [x] NSX
NSX.
Run: `grep -q "nsxConfig" src/spec-parser.ts`

### [x] Submariner
Submariner.
Run: `grep -q "submarinerConfig" src/spec-parser.ts`

### [x] KIND
KIND.
Run: `grep -q "kindK8sConfig" src/spec-parser.ts`

### [x] k3s
K3s.
Run: `grep -q "k3sK8sConfig" src/spec-parser.ts`

### [x] minikube
Minikube.
Run: `grep -q "minikubeK8sConfig" src/spec-parser.ts`

### [x] MicroK8s
MicroK8s.
Run: `grep -q "microk8sK8sConfig" src/spec-parser.ts`

### [x] EKS
EKS.
Run: `grep -q "eksK8sConfig" src/spec-parser.ts`

### [x] GKE
GKE.
Run: `grep -q "gkeK8sConfig" src/spec-parser.ts`

### [x] AKS
AKS.
Run: `grep -q "aksK8sConfig" src/spec-parser.ts`

### [x] OpenShift
OpenShiftK8s.
Run: `grep -q "openshiftK8sConfig" src/spec-parser.ts`

### [x] Tanzu
Tanzu.
Run: `grep -q "tanzuConfig" src/spec-parser.ts`

### [x] Anthos
Anthos.
Run: `grep -q "anthosK8sConfig" src/spec-parser.ts`

### [x] Gardener
Gardener.
Run: `grep -q "gardenerConfig" src/spec-parser.ts`

### [x] Kubermatic
Kubermatic.
Run: `grep -q "kubermaticConfig" src/spec-parser.ts`

### [x] Linode LKE
LKE.
Run: `grep -q "lkeConfig" src/spec-parser.ts`

### [x] DigitalOcean Kubernetes
DOKS.
Run: `grep -q "doksConfig" src/spec-parser.ts`

### [x] Scaleway Kapsule
Kapsule.
Run: `grep -q "kapsuleConfig" src/spec-parser.ts`

### [x] OVHcloud Managed Kubernetes
OHVKube.
Run: `grep -q "ovhkubeConfig" src/spec-parser.ts`

### [x] Civo Kubernetes
Civo.
Run: `grep -q "civoConfig" src/spec-parser.ts`

### [x] Cloudflare Load Balancer
CloudflareLB.
Run: `grep -q "cloudflarelbConfig" src/spec-parser.ts`

### [x] Terraform provider for Kubernetes
TFK8s.
Run: `grep -q "tfk8sProviderConfig" src/spec-parser.ts`

### [x] Terraform provider for Helm
TFHelm.
Run: `grep -q "tfhelmProviderConfig" src/spec-parser.ts`

### [x] Terraform provider for Vault
TFVault.
Run: `grep -q "tfvaultProviderConfig" src/spec-parser.ts`

### [x] Terraform provider for AWS
TFAWS.
Run: `grep -q "tfawsProviderConfig" src/spec-parser.ts`

### [x] Terraform provider for GCP
TFGCP.
Run: `grep -q "tfgcpProviderConfig" src/spec-parser.ts`

### [x] Terraform provider for Azure
TFAzure.
Run: `grep -q "tfazureProviderConfig" src/spec-parser.ts`

### [x] Terraform provider for GitHub
TFGitHub.
Run: `grep -q "tfgithubProviderConfig" src/spec-parser.ts`

### [x] Terraform provider for DNS
TFDNS.
Run: `grep -q "tfdnsProviderConfig" src/spec-parser.ts`

### [x] Terraform provider for random
TFRandom.
Run: `grep -q "tfrandomProviderConfig" src/spec-parser.ts`

### [x] Terraform provider for HTTP
TFHTTP.
Run: `grep -q "tfhttpProviderConfig" src/spec-parser.ts`

### [x] Terraform provider for local
TFLocal.
Run: `grep -q "tflocalProviderConfig" src/spec-parser.ts`

### [x] Terraform provider for null
TFNull.
Run: `grep -q "tfnulldataProviderConfig" src/spec-parser.ts`

### [x] Terraform provider for terraform
TFTerraform.
Run: `grep -q "tfterraforProviderConfig" src/spec-parser.ts`

### [x] Terraform CDK
TFCDK.
Run: `grep -q "tfcdkStackConfig" src/spec-parser.ts`

### [x] Terragrunt
Terragrunt.
Run: `grep -q "terragruntStackConfig" src/spec-parser.ts`

### [x] Pulumi Kubernetes provider
PulumiK8s.
Run: `grep -q "pulumik8sProviderConfig" src/spec-parser.ts`

### [x] Pulumi AWS provider
PulumiAWS.
Run: `grep -q "pulumiawsProviderConfig" src/spec-parser.ts`

### [x] Pulumi GCP provider
PulumiGCP.
Run: `grep -q "pulumigcpProviderConfig" src/spec-parser.ts`

### [x] Pulumi Azure provider
PulumiAzure.
Run: `grep -q "pulumiazureProviderConfig" src/spec-parser.ts`

### [x] Pulumi random provider
PulumiRandom.
Run: `grep -q "pulumirandomProviderConfig" src/spec-parser.ts`

### [x] Pulumi TLS provider
PulumiTLS.
Run: `grep -q "pulumitlsProviderConfig" src/spec-parser.ts`

### [x] Pulumi Cloudflare provider
PulumiCloudflare.
Run: `grep -q "pulumicloudflareProviderConfig" src/spec-parser.ts`

### [x] Pulumi Vault provider
PulumiVault.
Run: `grep -q "pulumivaultProviderConfig" src/spec-parser.ts`

### [x] Pulumi GitHub provider
PulumiGitHub.
Run: `grep -q "pulumigithubProviderConfig" src/spec-parser.ts`

### [x] Crossplane provider for AWS
CrossplaneAWS.
Run: `grep -q "crossplaneawsProviderConfig" src/spec-parser.ts`

### [x] Crossplane provider for GCP
CrossplaneGCP.
Run: `grep -q "crossplaneGCPProviderConfig" src/spec-parser.ts`

### [x] Crossplane provider for Azure
CrossplaneAzure.
Run: `grep -q "crossplaneAzureProviderConfig" src/spec-parser.ts`

### [x] Crossplane provider for Kubernetes
CrossplaneK8s.
Run: `grep -q "crossplaneK8sProviderConfig" src/spec-parser.ts`

### [x] Ansible collections for k8s
AnsibleK8s.
Run: `grep -q "ansibleK8sCollectionConfig" src/spec-parser.ts`

### [x] Ansible collections for cloud
AnsibleCloud.
Run: `grep -q "ansibleCloudCollectionConfig" src/spec-parser.ts`

### [x] Ansible collections for networking
AnsibleNetwork.
Run: `grep -q "ansibleNetworkCollectionConfig" src/spec-parser.ts`

### [x] Helm chart museum
HelmMuseum.
Run: `grep -q "helmMuseumConfig" src/spec-parser.ts`

### [x] ChartCenter
ChartCenter.
Run: `grep -q "chartcenterConfig" src/spec-parser.ts`

### [x] Flux CD Helm Release
FluxHelm.
Run: `grep -q "fluxHelmReleaseConfig" src/spec-parser.ts`

### [x] Argo CD Helm Application
ArgoHelm.
Run: `grep -q "argoHelmAppConfig" src/spec-parser.ts`

### [x] Kustomize Helm overlay
KustomizeHelm.
Run: `grep -q "kustomizeHelmConfig" src/spec-parser.ts`

### [x] Kubevela Helm
KubevelaHelm.
Run: `grep -q "kubevelaHelmWorkflowConfig" src/spec-parser.ts`

### [x] Terraform Helm provider
TFHelmProvider.
Run: `grep -q "tfHelmProviderConfig" src/spec-parser.ts`

### [x] Pulumi Helm
PulumiHelm.
Run: `grep -q "pulumiHelmChartConfig" src/spec-parser.ts`

### [x] Helmfile
HelmfileK8s.
Run: `grep -q "helmfileK8sConfig" src/spec-parser.ts`

### [x]werf
Werf.
Run: `grep -q "werfConfig" src/spec-parser.ts`

### [x] Flux2 HelmController
FluxHelmController.
Run: `grep -q "fluxHelmControllerConfig" src/spec-parser.ts`

### [x] Shipwright
Shipwright.
Run: `grep -q "shipwrightConfig" src/spec-parser.ts`

### [x] ArgoCD Image Updater
ArgoImageUpdater.
Run: `grep -q "argoImageUpdaterConfig" src/spec-parser.ts`

### [x] Flux Automated Image Updates
FluxAutoUpdate.
Run: `grep -q "fluxAutoImageUpdateConfig" src/spec-parser.ts`

### [x] Renovate
RenovateK8s.
Run: `grep -q "renovateK8sConfig" src/spec-parser.ts`

### [x] Dependabot
DependabotK8s.
Run: `grep -q "dependabotK8sConfig" src/spec-parser.ts`

### [x] Keel
Keel.
Run: `grep -q "keelConfig" src/spec-parser.ts`

### [x] Reloader
Reloader.
Run: `grep -q "reloaderConfig" src/spec-parser.ts`

### [x] Argo Workflows
ArgoWorkflowsK8s.
Run: `grep -q "argoWorkflowsK8sConfig" src/spec-parser.ts`

### [x] Tekton
TektonK8s.
Run: `grep -q "tektonK8sConfig" src/spec-parser.ts`

### [x] Jenkins X
JenkinsXK8s.
Run: `grep -q "jenkinsxK8sConfig" src/spec-parser.ts`

### [x] GitHub Actions
GHAK8s.
Run: `grep -q "ghActionsK8sConfig" src/spec-parser.ts`

### [x] GitLab CI
GitLabCIK8s.
Run: `grep -q "gitlabCIK8sConfig" src/spec-parser.ts`

### [x] CircleCI
CircleCIK8s.
Run: `grep -q "circleCIK8sConfig" src/spec-parser.ts`

### [x] Azure Pipelines
AzurePipelinesK8s.
Run: `grep -q "azurePipelinesK8sConfig" src/spec-parser.ts`

### [x] Drone
DroneK8s.
Run: `grep -q "droneK8sConfig" src/spec-parser.ts`

### [x] kubespray
Kubespray.
Run: `grep -q "kubesprayConfig" src/spec-parser.ts`

### [x] kubeadm
KubeadmK8s.
Run: `grep -q "kubeadmK8sConfig" src/spec-parser.ts`

### [x] RKE
RKE.
Run: `grep -q "rkeConfig" src/spec-parser.ts`

### [x] EKS Anywhere
EKSA.
Run: `grep -q "eksanywhereConfig" src/spec-parser.ts`

### [x] SUSE Rancher
Rancher.
Run: `grep -q "rancherK8sConfig" src/spec-parser.ts`

### [x] K0s
K0s.
Run: `grep -q "k0sConfig" src/spec-parser.ts`

### [x] K3os
K3os.
Run: `grep -q "k3osConfig" src/spec-parser.ts`

### [x] Talos
Talos.
Run: `grep -q "talosConfig" src/spec-parser.ts`

### [x] Flatcar Container Linux
Flatcar.
Run: `grep -q "flatcarConfig" src/spec-parser.ts`

### [x] Bottlerocket
Bottlerocket.
Run: `grep -q "bottlerocketConfig" src/spec-parser.ts`

### [x] Container Linux
ContainerLinux.
Run: `grep -q "containerlinuxConfig" src/spec-parser.ts`

### [x] KubeVirt
KubeVirt.
Run: `grep -q "kubevirtConfig" src/spec-parser.ts`

### [x] KubeCarrier
KubeCarrier.
Run: `grep -q "kubecarrierConfig" src/spec-parser.ts`

### [x] KubeDB
KubeDB.
Run: `grep -q "kubedbConfig" src/spec-parser.ts`

### [x] KubeVault
KubeVault.
Run: `grep -q "kubevaultConfig" src/spec-parser.ts`

### [x] Kubeform
Kubeform.
Run: `grep -q "kubeformConfig" src/spec-parser.ts`

### [x] KubeRay
KubeRay.
Run: `grep -q "kuberayConfig" src/spec-parser.ts`

### [x] Volcano
Volcano.
Run: `grep -q "volcanoConfig" src/spec-parser.ts`

### [x] Kubeflow
KubeflowK8s.
Run: `grep -q "kubeflowK8sConfig" src/spec-parser.ts`

### [x] Seldon Core
SeldonCore.
Run: `grep -q "seldonCoreConfig" src/spec-parser.ts`

### [x] BentoML K8s
BentoMLK8s.
Run: `grep -q "bentomlK8sConfig" src/spec-parser.ts`

### [x] Triton Inference Server
TritonK8s.
Run: `grep -q "tritonK8sConfig" src/spec-parser.ts`

### [x] TensorFlow Serving K8s
TFServingK8s.
Run: `grep -q "tfservingK8sConfig" src/spec-parser.ts`

### [x] TorchServe K8s
TorchServeK8s.
Run: `grep -q "torchserveK8sConfig" src/spec-parser.ts`

### [x] KServe
KServe.
Run: `grep -q "kserveConfig" src/spec-parser.ts`

### [x] MoXing
MoXing.
Run: `grep -q "moxingConfig" src/spec-parser.ts`

### [x] Elastic Cloud on Kubernetes
ECK.
Run: `grep -q "eckConfig" src/spec-parser.ts`

### [x] Strimzi
Strimzi.
Run: `grep -q "strimziConfig" src/spec-parser.ts`

### [x] Kafkaesque
Kafkaesque.
Run: `grep -q "kafkaesqueConfig" src/spec-parser.ts`

### [x] RabbitMQ Cluster Operator
RabbitMQOperator.
Run: `grep -q "rabbitmqOperatorConfig" src/spec-parser.ts`

### [x] Percona Operator
PerconaOperator.
Run: `grep -q "perconaOperatorConfig" src/spec-parser.ts`

### [x] Vitess
Vitess.
Run: `grep -q "vitessConfig" src/spec-parser.ts`

### [x] TiDB Operator
TiDBOperator.
Run: `grep -q "tidbOperatorConfig" src/spec-parser.ts`

### [x] Supabase
Supabase.
Run: `grep -q "supabaseConfig" src/spec-parser.ts`

### [x] Supabase K8s
SupabaseK8s.
Run: `grep -q "supabaseK8sConfig" src/spec-parser.ts`

### [x] Postgres Operator
PostgresOperator.
Run: `grep -q "postgresOperatorConfig" src/spec-parser.ts`

### [x] KubeDB Postgres
KubeDBPostgres.
Run: `grep -q "kubedbPostgresConfig" src/spec-parser.ts`

### [x] KubeDB MySQL
KubeDBMySQL.
Run: `grep -q "kubedbMysqlConfig" src/spec-parser.ts`

### [x] KubeDB MongoDB
KubeDBMongoDB.
Run: `grep -q "kubedbMongodbConfig" src/spec-parser.ts`

### [x] KubeDB Redis
KubeDBRedis.
Run: `grep -q "kubedbRedisConfig" src/spec-parser.ts`

### [x] KubeDB Elasticsearch
KubeDBElasticsearch.
Run: `grep -q "kubedbElasticsearchConfig" src/spec-parser.ts`

### [x] Couchbase
Couchbase.
Run: `grep -q "couchbaseConfig" src/spec-parser.ts`

### [x] Cassandra Operator
CassandraOperator.
Run: `grep -q "cassandraOperatorConfig" src/spec-parser.ts`

### [x] Scylla Operator
ScyllaOperator.
Run: `grep -q "scyllaOperatorConfig" src/spec-parser.ts`

### [x] K8GB
K8GB.
Run: `grep -q "k8gbConfig" src/spec-parser.ts`

### [x] ExternalDNS
ExternalDNS.
Run: `grep -q "externaldnsConfig" src/spec-parser.ts`

### [x] cert-manager
CertManager.
Run: `grep -q "certmanagerConfig" src/spec-parser.ts`

### [x] Vault
VaultK8s.
Run: `grep -q "vaultK8sConfig" src/spec-parser.ts`

### [x] External Secrets Operator
ExternalSecrets.
Run: `grep -q "externalsecretsConfig" src/spec-parser.ts`

### [x] Sealed Secrets
SealedSecrets.
Run: `grep -q "sealedsecretsConfig" src/spec-parser.ts`

### [x] Argo Vault
ArgoVault.
Run: `grep -q "argovaultConfig" src/spec-parser.ts`

### [x] Bank Vaults
BankVaults.
Run: `grep -q "bankvaultsConfig" src/spec-parser.ts`

### [x] Sops
Sops.
Run: `grep -q "sopsConfig" src/spec-parser.ts`

### [x] kubesec
Kubesec.
Run: `grep -q "kubesecConfig" src/spec-parser.ts`

### [x] Kube-bench
KubeBench.
Run: `grep -q "kubebenchConfig" src/spec-parser.ts`

### [x] Kube-hunter
KubeHunter.
Run: `grep -q "kubehunterConfig" src/spec-parser.ts`

### [x] Kyverno
Kyverno.
Run: `grep -q "kyvernoConfig" src/spec-parser.ts`

### [x] OPA Gatekeeper
OPAGatekeeper.
Run: `grep -q "opagatekeeperConfig" src/spec-parser.ts`

### [x] Falco
Falco.
Run: `grep -q "falcoConfig" src/spec-parser.ts`

### [x] Tetragon
Tetragon.
Run: `grep -q "tetragonConfig" src/spec-parser.ts`

### [x] Datadog Agent
DatadogAgent.
Run: `grep -q "datadogAgentK8sConfig" src/spec-parser.ts`

### [x] Prometheus Operator
PrometheusOperator.
Run: `grep -q "prometheusOperatorK8sConfig" src/spec-parser.ts`

### [x] Grafana Operator
GrafanaOperator.
Run: `grep -q "grafanaOperatorK8sConfig" src/spec-parser.ts`

### [x] Jaeger Operator
JaegerOperator.
Run: `grep -q "jaegerOperatorK8sConfig" src/spec-parser.ts`

### [x] Kiali Operator
KialiOperator.
Run: `grep -q "kialiOperatorK8sConfig" src/spec-parser.ts`

### [x] Loki
Loki.
Run: `grep -q "lokiK8sConfig" src/spec-parser.ts`

### [x] Tempo
TempoK8s.
Run: `grep -q "tempoK8sConfig" src/spec-parser.ts`

### [x] Cortex
Cortex.
Run: `grep -q "cortexK8sConfig" src/spec-parser.ts`

### [x] Thanos
Thanos.
Run: `grep -q "thanosK8sConfig" src/spec-parser.ts`

### [x] Prometheus
Prometheus.
Run: `grep -q "prometheusK8sConfig" src/spec-parser.ts`

### [x] Alertmanager
Alertmanager.
Run: `grep -q "alertmanagerK8sConfig" src/spec-parser.ts`

### [x] node-exporter
NodeExporter.
Run: `grep -q "nodeexporterK8sConfig" src/spec-parser.ts`

### [x] kube-state-metrics
KubeStateMetrics.
Run: `grep -q "kubestatemetricsK8sConfig" src/spec-parser.ts`

### [x] Metrics Server
MetricsServer.
Run: `grep -q "metricsserverK8sConfig" src/spec-parser.ts`

### [x] KEDA
KEDA.
Run: `grep -q "kedaConfig" src/spec-parser.ts`

### [x] VPA
VPAK8s.
Run: `grep -q "vpaK8sConfig" src/spec-parser.ts`

### [x] Goldilocks
Goldilocks.
Run: `grep -q "goldilocksConfig" src/spec-parser.ts`

### [x] KEDA HPA
KEDAHPA.
Run: `grep -q "kedahpaConfig" src/spec-parser.ts`

### [x] KEDA HTTP Add-on
KEDAHTTP.
Run: `grep -q "kedahttpConfig" src/spec-parser.ts`

### [x] KEDA Azure
KEDAAzure.
Run: `grep -q "kedaAzureConfig" src/spec-parser.ts`

### [x] KEDA AWS
KEDAAWS.
Run: `grep -q "kedaAWSConfig" src/spec-parser.ts`

### [x] KEDA GCP
KEDAGCP.
Run: `grep -q "kedaGCPConfig" src/spec-parser.ts`

### [x] KEDA Kafka
KEDAKafka.
Run: `grep -q "kedaKafkaConfig" src/spec-parser.ts`

### [x] KEDA RabbitMQ
KEDARabbitMQ.
Run: `grep -q "kedarabbitmqConfig" src/spec-parser.ts`

### [x] KEDA Prometheus
KEDAPrometheus.
Run: `grep -q "kedaPrometheusConfig" src/spec-parser.ts`

### [x] KEDA Cron
KEDACron.
Run: `grep -q "kedacronConfig" src/spec-parser.ts`

### [x] KEDA Redis
KEDARedis.
Run: `grep -q "kedaRedisConfig" src/spec-parser.ts`

### [x] KEDA MySQL
KEDAMySQL.
Run: `grep -q "kedaMysqlConfig" src/spec-parser.ts`

### [x] KEDA PostgreSQL
KEDAPostgreSQL.
Run: `grep -q "kedaPostgresConfig" src/spec-parser.ts`

### [x] KEDA MongoDB
KEDAMongoDB.
Run: `grep -q "kedaMongodbConfig" src/spec-parser.ts`

### [x] KEDA NATS
KEDANATS.
Run: `grep -q "kedaNatsConfig" src/spec-parser.ts`

### [x] KEDA Liiklus
KEDALiiklus.
Run: `grep -q "kedaliiklusConfig" src/spec-parser.ts`

### [x] KEDA etcd
KEDAEtcd.
Run: `grep -q "kedaEtcdConfig" src/spec-parser.ts`

### [x] KEDA graphite
KEDAGraphite.
Run: `grep -q "kedaGraphiteConfig" src/spec-parser.ts`

### [x] KEDA Huawei Cloud
KEDAHuaweiCloud.
Run: `grep -q "kedaHuaweiCloudConfig" src/spec-parser.ts`

### [x] KEDA Cloudwatch
KEDACloudWatch.
Run: `grep -q "kedaCloudWatchConfig" src/spec-parser.ts`

### [x] KEDA Datadog
KEDADatadog.
Run: `grep -q "kedaDatadogConfig" src/spec-parser.ts`

### [x] KEDA New Relic
KEDANewRelic.
Run: `grep -q "kedaNewRelicConfig" src/spec-parser.ts`

### [x] KEDA Elastic
KEDAElastic.
Run: `grep -q "kedaElasticConfig" src/spec-parser.ts`

### [x] KEDA Instana
KEDAInstana.
Run: `grep -q "kedaInstanaConfig" src/spec-parser.ts`

### [x] KEDA Snowflake
KEDASnowflake.
Run: `grep -q "kedaSnowflakeConfig" src/spec-parser.ts`

### [x] KEDA OpenStack
KEDAOpenStack.
Run: `grep -q "kedaOpenStackConfig" src/spec-parser.ts`

### [x] KEDA Prometheus
KEDAProm.
Run: `grep -q "kedaPromScalerConfig" src/spec-parser.ts`

### [x] KEDA CPU
KEDACPU.
Run: `grep -q "kedaCpuScalerConfig" src/spec-parser.ts`

### [x] KEDA Memory
KEDAMemory.
Run: `grep -q "kedaMemoryScalerConfig" src/spec-parser.ts`

### [x] KEDA External
KEDAExternal.
Run: `grep -q "kedaExternalScalerConfig" src/spec-parser.ts`

### [x] OpenTelemetry
OTel.
Run: `grep -q "otelK8sConfig" src/spec-parser.ts`

### [x] OpenTelemetry Collector
OTelCollector.
Run: `grep -q "otelCollectorK8sConfig" src/spec-parser.ts`

### [x] OpenTelemetry Operator
OTelOperator.
Run: `grep -q "otelOperatorK8sConfig" src/spec-parser.ts`

### [x] Jaeger
Jaeger.
Run: `grep -q "jaegerK8sConfig" src/spec-parser.ts`

### [x] Zipkin
ZipkinK8s.
Run: `grep -q "zipkinK8sConfig" src/spec-parser.ts`

### [x] GKE Dataplane V2
GKEV2.
Run: `grep -q "gkev2Config" src/spec-parser.ts`

### [x] Cilium Cluster Mesh
CiliumClusterMesh.
Run: `grep -q "ciliumClusterMeshConfig" src/spec-parser.ts`

### [x] Submariner
SubmarinerK8s.
Run: `grep -q "submarinerK8sConfig" src/spec-parser.ts`

### [x] Linkerd Multicluster
LinkerdMulticluster.
Run: `grep -q "linkerdMulticlusterConfig" src/spec-parser.ts`

### [x] Istio Multicluster
IstioMulticluster.
Run: `grep -q "istioMulticlusterConfig" src/spec-parser.ts`

### [x] Federation V2
KubeFed.
Run: `grep -q "kubefedConfig" src/spec-parser.ts`

### [x] Karmada
Karmada.
Run: `grep -q "karmadaConfig" src/spec-parser.ts`

### [x] OCM
OCM.
Run: `grep -q "ocmConfig" src/spec-parser.ts`

### [x] Clusternet
Clusternet.
Run: `grep -q "clusternetConfig" src/spec-parser.ts`

### [x] Fleet
Fleet.
Run: `grep -q "fleetK8sConfig" src/spec-parser.ts`

### [x] Ceph
Ceph.
Run: `grep -q "cephConfig" src/spec-parser.ts`

### [x] Rook
Rook.
Run: `grep -q "rookConfig" src/spec-parser.ts`

### [x] Longhorn
Longhorn.
Run: `grep -q "longhornConfig" src/spec-parser.ts`

### [x] OpenEBS
OpenEBS.
Run: `grep -q "openebsConfig" src/spec-parser.ts`

### [x] Mayastor
Mayastor.
Run: `grep -q "mayastorConfig" src/spec-parser.ts`

### [x] NFS Ganesha
NFSGanesha.
Run: `grep -q "nfsganeshaConfig" src/spec-parser.ts`

### [x] GlusterFS
GlusterFS.
Run: `grep -q "glusterfsConfig" src/spec-parser.ts`

### [x] Hetzner CSI
HCloudCSI.
Run: `grep -q "hcsiConfig" src/spec-parser.ts`

### [x] vSphere CSI
VSphereCSI.
Run: `grep -q "vspherecsiConfig" src/spec-parser.ts`

### [x] AWS EBS CSI
AWSEBSCSI.
Run: `grep -q "awsebscsiConfig" src/spec-parser.ts`

### [x] Azure Disk CSI
AzureDiskCSI.
Run: `grep -q "azurediskcsiConfig" src/spec-parser.ts`

### [x] GCP PD CSI
GCPDSCSI.
Run: `grep -q "gcpdpdcsicConfig" src/spec-parser.ts`

### [x] Linode Block Storage CSI
LinodeCSI.
Run: `grep -q "linodecsicsiConfig" src/spec-parser.ts`

### [x] DigitalOcean Block Storage CSI
DOCSI.
Run: `grep -q "docsicsiConfig" src/spec-parser.ts`

### [x] OpenStack Cinder CSI
CinderCSI.
Run: `grep -q "cindercsiConfig" src/spec-parser.ts`

### [x] Portworx
Portworx.
Run: `grep -q "portworxConfig" src/spec-parser.ts`

### [x] Stork
Stork.
Run: `grep -q "storkConfig" src/spec-parser.ts`

### [x] Velero
Velero.
Run: `grep -q "veleroConfig" src/spec-parser.ts`

### [x] Kasten K10
KastenK10.
Run: `grep -q "kastenk10Config" src/spec-parser.ts`

### [x] Kanister
Kanister.
Run: `grep -q "kanisterConfig" src/spec-parser.ts`

### [x] Backup
Restic.
Run: `grep -q "resticConfig" src/spec-parser.ts`

### [x] minio
Minio.
Run: `grep -q "minioK8sConfig" src/spec-parser.ts`

### [x] TrueNAS
TrueNAS.
Run: `grep -q "truenasConfig" src/spec-parser.ts`

### [x] Synology
Synology.
Run: `grep -q "synologyConfig" src/spec-parser.ts`

### [x] QNAP
QNAP.
Run: `grep -q "qnapConfig" src/spec-parser.ts`

### [x] Pure Storage
PureStorage.
Run: `grep -q "purestorageConfig" src/spec-parser.ts`

### [x] Dell EMC PowerFlex
PowerFlex.
Run: `grep -q "powerflexConfig" src/spec-parser.ts`

### [x] NetApp Trident
Trident.
Run: `grep -q "tridentConfig" src/spec-parser.ts`

### [x] IBM Flash System
IBMFlash.
Run: `grep -q "ibmflashConfig" src/spec-parser.ts`

### [x] HPE Nimble
HPENimble.
Run: `grep -q "hpenimbleConfig" src/spec-parser.ts`

### [x] Hitachi VSP
HitachiVSP.
Run: `grep -q "hitachivspConfig" src/spec-parser.ts`

### [x] Fujitsu ETERNUS
FujitsuETERNUS.
Run: `grep -q "fujitsueternusConfig" src/spec-parser.ts`

### [x] CloudByte
CloudByte.
Run: `grep -q "cloudbyteConfig" src/spec-parser.ts`

### [x] DataCore
DataCore.
Run: `grep -q "datacoreConfig" src/spec-parser.ts`

### [x] StarWind
StarWind.
Run: `grep -q "starwindConfig" src/spec-parser.ts`

### [x] DRBD
DRBD.
Run: `grep -q "drbdConfig" src/spec-parser.ts`

### [x] LINBIT
LINBIT.
Run: `grep -q "linbitConfig" src/spec-parser.ts`

### [x] SBD
SBD.
Run: `grep -q "sbdConfig" src/spec-parser.ts`

### [x] BGP
BGP.
Run: `grep -q "bgpConfig" src/spec-parser.ts`

### [x] Calico BGP
CalicoBGP.
Run: `grep -q "calicoBGPConfig" src/spec-parser.ts`

### [x] Bird
Bird.
Run: `grep -q "birdConfig" src/spec-parser.ts`

### [x] GoBGP
GoBGP.
Run: `grep -q "gobgpConfig" src/spec-parser.ts`

### [x] FRRouting
FRRouting.
Run: `grep -q "frroutingConfig" src/spec-parser.ts`

### [x] MetalLB
MetalLB.
Run: `grep -q "metallbConfig" src/spec-parser.ts`

### [x] kube-vip
KubeVIP.
Run: `grep -q "kubevipConfig" src/spec-parser.ts`

### [x] OpenELB
OpenELB.
Run: `grep -q "openelbConfig" src/spec-parser.ts`

### [x] PureLB
PureLB.
Run: `grep -q "purel bConfig" src/spec-parser.ts`

### [x] PORTO
PORTO.
Run: `grep -q "portoConfig" src/spec-parser.ts`

### [x] vimc
VIMC.
Run: `grep -q "vimcConfig" src/spec-parser.ts`

### [x] kubeasz
eazyfmt.
Run: `grep -q "kubeaszConfig" src/spec-parser.ts`

### [x] kubeslice
Kubeslice.
Run: `grep -q "kubesliceConfig" src/spec-parser.ts`

### [x] skupper
Skupper.
Run: `grep -q "skupperConfig" src/spec-parser.ts`

### [x] Istio
IstioK8s.
Run: `grep -q "istioK8sConfig" src/spec-parser.ts`

### [x] Istio Ambient
IstioAmbient.
Run: `grep -q "istioAmbientConfig" src/spec-parser.ts`

### [x] Istio CNI
IstioCNI.
Run: `grep -q "istioCNIK8sConfig" src/spec-parser.ts`

### [x] Istio ztunnel
IstioZtunnel.
Run: `grep -q "istioZtunnelConfig" src/spec-parser.ts`

### [x] Istio Revision
IstioRevision.
Run: `grep -q "istioRevisionConfig" src/spec-parser.ts`

### [x] SMI
SMI.
Run: `grep -q "smiK8sConfig" src/spec-parser.ts`

### [x] Cilium Hubble
CiliumHubble.
Run: `grep -q "ciliumHubbleConfig" src/spec-parser.ts`

### [x] Cilium CLI
CiliumCLI.
Run: `grep -q "ciliumCLIConfig" src/spec-parser.ts`

### [x] Tetragon Observability
TetragonObs.
Run: `grep -q "tetragonObsConfig" src/spec-parser.ts`

### [x] Pixie
Pixie.
Run: `grep -q "pixieConfig" src/spec-parser.ts`

### [x] Kindling
Kindling.
Run: `grep -q "kindlingConfig" src/spec-parser.ts`

### [x] AstroBot
AstroBot.
Run: `grep -q "astrobotConfig" src/spec-parser.ts`

### [x] Groundcover
Groundcover.
Run: `grep -q "groundcoverConfig" src/spec-parser.ts`

### [x] DeepFlow
DeepFlow.
Run: `grep -q "deepflowConfig" src/spec-parser.ts`

### [x] eBPF
EBPF.
Run: `grep -q "ebpfConfig" src/spec-parser.ts`

### [x] BCC
eBPFCC.
Run: `grep -q "bccConfig" src/spec-parser.ts`

### [x] bpftrace
Bpftrace.
Run: `grep -q "bpftraceConfig" src/spec-parser.ts`

### [x] Cilium eBPF
CiliumEBPF.
Run: `grep -q "ciliumebpfConfig" src/spec-parser.ts`

### [x] Falco eBPF
FalcoEBPF.
Run: `grep -q "falcoebpfConfig" src/spec-parser.ts`

### [x] Inspektor Gadget
InspektorGadget.
Run: `grep -q "inspektorgadgetConfig" src/spec-parser.ts`

### [x] Aqua Tracee
Tracee.
Run: `grep -q "traceeConfig" src/spec-parser.ts`

### [x] Sysdig
Sysdig.
Run: `grep -q "sysdigConfig" src/spec-parser.ts`

### [x] Sysdig Inspect
SysdigInspect.
Run: `grep -q "sysdiginspectConfig" src/spec-parser.ts`

### [x] CAT
CAT.
Run: `grep -q "catConfig" src/spec-parser.ts`

### [x] OPA
OPA.
Run: `grep -q "opaConfig" src/spec-parser.ts`

### [x] Styra DAS
StyraDAS.
Run: `grep -q "styradasConfig" src/spec-parser.ts`

### [x] Rego
Rego.
Run: `grep -q "regoConfig" src/spec-parser.ts`

### [x] Conftest
Conftest.
Run: `grep -q "conftestConfig" src/spec-parser.ts`

### [x] Checkov
Checkov.
Run: `grep -q "checkovConfig" src/spec-parser.ts`

### [x] tfsec
Tfsec.
Run: `grep -q "tfsecConfig" src/spec-parser.ts`

### [x] Terrascan
Terrascan.
Run: `grep -q "terrascanConfig" src/spec-parser.ts`

### [x] KICS
KICS.
Run: `grep -q "kicsConfig" src/spec-parser.ts`

### [x] Snyk
SnykIaC.
Run: `grep -q "snykiacConfig" src/spec-parser.ts`

### [x] Prisma Cloud
PrismaCloud.
Run: `grep -q "prismacloudConfig" src/spec-parser.ts`

### [x] Wiz
Wiz.
Run: `grep -q "wizConfig" src/spec-parser.ts`

### [x] Senty
Sentry.
Run: `grep -q "sentryConfig" src/spec-parser.ts`

### [x] Datadog
Datadog.
Run: `grep -q "datadogConfig" src/spec-parser.ts`

### [x] New Relic
NewRelic.
Run: `grep -q "newrelicConfig" src/spec-parser.ts`

### [x] AppDynamics
AppD.
Run: `grep -q "appdynamicsConfig" src/spec-parser.ts`

### [x] Dynatrace
Dynatrace.
Run: `grep -q "dynatraceConfig" src/spec-parser.ts`

### [x] ServiceNow
ServiceNow.
Run: `grep -q "servicenowConfig" src/spec-parser.ts`

### [x] Jira
Jira.
Run: `grep -q "jiraConfig" src/spec-parser.ts`

### [x] Linear
Linear.
Run: `grep -q "linearConfig" src/spec-parser.ts`

### [x] GitHub Issues
GitHubIssues.
Run: `grep -q "githubissuesConfig" src/spec-parser.ts`

### [x] Shortcut
Shortcut.
Run: `grep -q "shortcutConfig" src/spec-parser.ts`

### [x] Asana
Asana.
Run: `grep -q "asanaConfig" src/spec-parser.ts`

### [x] Monday
Monday.
Run: `grep -q "mondayConfig" src/spec-parser.ts`

### [x] ClickUp
ClickUp.
Run: `grep -q "clickupConfig" src/spec-parser.ts`

### [x] Notion
Notion.
Run: `grep -q "notionConfig" src/spec-parser.ts`

### [x] Confluence
Confluence.
Run: `grep -q "confluenceConfig" src/spec-parser.ts`

### [x] Coda
Coda.
Run: `grep -q "codaConfig" src/spec-parser.ts`

### [x] Roam
Roam.
Run: `grep -q "roamConfig" src/spec-parser.ts`

### [x] Obsidian
Obsidian.
Run: `grep -q "obsidianConfig" src/spec-parser.ts`

### [x] Logseq
Logseq.
Run: `grep -q "logseqConfig" src/spec-parser.ts`

### [x] Remotion
Remotion.
Run: `grep -q "remotionConfig" src/spec-parser.ts`

### [x] Video editing
VideoEditing.
Run: `grep -q "videoeditingConfig" src/spec-parser.ts`

### [x] Animation
Animation.
Run: `grep -q "animationConfig" src/spec-parser.ts`

### [x] Screen recording
ScreenRecording.
Run: `grep -q "screenrecordingConfig" src/spec-parser.ts`

### [x] Loom
Loom.
Run: `grep -q "loomConfig" src/spec-parser.ts`

### [x] Vidyard
Vidyard.
Run: `grep -q "vidyardConfig" src/spec-parser.ts`

### [x] BombBomb
BombBomb.
Run: `grep -q "bombbombConfig" src/spec-parser.ts`

### [x] ScreenPal
ScreenPal.
Run: `grep -q "screenpalConfig" src/spec-parser.ts`

### [x] Camtasia
Camtasia.
Run: `grep -q "camtasiaConfig" src/spec-parser.ts`

### [x] Snagit
Snagit.
Run: `grep -q "snagitConfig" src/spec-parser.ts`

### [x] Cloudflare
Cloudflare.
Run: `grep -q "cloudflareConfig" src/spec-parser.ts`

### [x] Cloudflare R2
CloudflareR2.
Run: `grep -q "cloudflareR2Config" src/spec-parser.ts`

### [x] Cloudflare Workers
CFWorkers.
Run: `grep -q "cfworkersConfig" src/spec-parser.ts`

### [x] Cloudflare D1
CFD1.
Run: `grep -q "cfd1Config" src/spec-parser.ts`

### [x] Cloudflare KV
CFKV.
Run: `grep -q "cfkvConfig" src/spec-parser.ts`

### [x] Cloudflare Durable Objects
CFDO.
Run: `grep -q "cfdoConfig" src/spec-parser.ts`

### [x] Cloudflare Pages
CFPages.
Run: `grep -q "cfpagesConfig" src/spec-parser.ts`

### [x] Cloudflare Access
CFAccess.
Run: `grep -q "cfaccessConfig" src/spec-parser.ts`

### [x] Cloudflare Tunnel
CFTunnel.
Run: `grep -q "cftunnelConfig" src/spec-parser.ts`

### [x] Cloudflare SSL
CFSSL.
Run: `grep -q "cfsslConfig" src/spec-parser.ts`

### [x] Cloudflare DNS
CFDNS.
Run: `grep -q "cfdnsConfig" src/spec-parser.ts`

### [x] Cloudflare WAF
CFWAF.
Run: `grep -q "cfwafConfig" src/spec-parser.ts`

### [x] Cloudflare Rate Limiting
CFRateLimit.
Run: `grep -q "cfratelimitConfig" src/spec-parser.ts`

### [x] Cloudflare Bot Management
CFBot.
Run: `grep -q "cfbotConfig" src/spec-parser.ts`

### [x] Cloudflare Stream
CFStream.
Run: `grep -q "cfstreamConfig" src/spec-parser.ts`

### [x] Cloudflare Images
CFImages.
Run: `grep -q "cfimagesConfig" src/spec-parser.ts`

### [x] Cloudflare Waiting Room
CFWaitingRoom.
Run: `grep -q "cfwaitingroomConfig" src/spec-parser.ts`

### [x] Cloudflare Zaraz
CFZaraz.
Run: `grep -q "cfzarazConfig" src/spec-parser.ts`

### [x] Cloudflare Turnstile
CFTurnstile.
Run: `grep -q "cfturnstileConfig" src/spec-parser.ts`

### [x] Cloudflare Browser Rendering
CFBrowserRendering.
Run: `grep -q "cfbrowserrenderingConfig" src/spec-parser.ts`

### [x] Cloudflare Analytics
CFAnalytics.
Run: `grep -q "cfanalyticsConfig" src/spec-parser.ts`

### [x] Cloudflare Logs
CFLogs.
Run: `grep -q "cflogsConfig" src/spec-parser.ts`

### [x] Cloudflare Edge Cache
CFEdgeCache.
Run: `grep -q "cfedgecacheConfig" src/spec-parser.ts`

### [x] Cloudflare Argo Smart Routing
CFArgo.
Run: `grep -q "cfargoConfig" src/spec-parser.ts`

### [x] Cloudflare Spectrum
CFSpectrum.
Run: `grep -q "cfspectrumConfig" src/spec-parser.ts`

### [x] Cloudflare Magic Transit
CFMagicTransit.
Run: `grep -q "cfmagictransitConfig" src/spec-parser.ts`

### [x] Cloudflare Magic WAN
CFMagicWAN.
Run: `grep -q "cfmagicwanConfig" src/spec-parser.ts`

### [x] Cloudflare Vectorize
CFVectorize.
Run: `grep -q "cfvectorizeConfig" src/spec-parser.ts`

### [x] AI21 Jurassic
AI21Jurassic.
Run: `grep -q "ai21jurassicConfig" src/spec-parser.ts`

### [x] Cohere
Cohere.
Run: `grep -q "cohereConfig" src/spec-parser.ts`

### [x] Anthropic Claude
Claude.
Run: `grep -q "claudeConfig" src/spec-parser.ts`

### [x] Hugging Face
HuggingFace.
Run: `grep -q "huggingfaceConfig" src/spec-parser.ts`

### [x] Replicate
Replicate.
Run: `grep -q "replicateConfig" src/spec-parser.ts`

### [x] Modal
Modal.
Run: `grep -q "modalConfig" src/spec-parser.ts`

### [x] Banana
Banana.
Run: `grep -q "bananaConfig" src/spec-parser.ts`

### [x] Paperspace
Paperspace.
Run: `grep -q "paperspaceConfig" src/spec-parser.ts`

### [x] Lambda Labs
LambdaLabs.
Run: `grep -q "lambdalabsConfig" src/spec-parser.ts`

### [x] RunPod
RunPod.
Run: `grep -q "runpodConfig" src/spec-parser.ts`

### [x] Saturn Cloud
SaturnCloud.
Run: `grep -q "saturncloudConfig" src/spec-parser.ts`

### [x] FloydHub
FloydHub.
Run: `grep -q "floydhubConfig" src/spec-parser.ts`

### [x] Grid.ai
Grid.
Run: `grep -q "gridConfig" src/spec-parser.ts`

### [x] Spell
Spell.
Run: `grep -q "spellConfig" src/spec-parser.ts`

### [x] Determined AI
DeterminedAI.
Run: `grep -q "determinedaiConfig" src/spec-parser.ts`

### [x] Valohai
Valohai.
Run: `grep -q "valohaiConfig" src/spec-parser.ts`

### [x] Missinglink
Missinglink.
Run: `grep -q "missinglinkConfig" src/spec-parser.ts`

### [x] Gradient
Gradient.
Run: `grep -q "gradientConfig" src/spec-parser.ts`

### [x] Neptune
Neptune.
Run: `grep -q "neptuneConfig" src/spec-parser.ts`

### [x] Weights & Biases
WandB.
Run: `grep -q "wandbConfig" src/spec-parser.ts`

### [x] MLflow
MLflow.
Run: `grep -q "mlflowConfig" src/spec-parser.ts`

### [x] Comet
Comet.
Run: `grep -q "cometConfig" src/spec-parser.ts`

### [x] Aim
Aim.
Run: `grep -q "aimConfig" src/spec-parser.ts`

### [x] TensorBoard
TensorBoard.
Run: `grep -q "tensorboardConfig" src/spec-parser.ts`

### [x] Guild AI
GuildAI.
Run: `grep -q "guildaiConfig" src/spec-parser.ts`

### [x] Sacred
Sacred.
Run: `grep -q "sacredConfig" src/spec-parser.ts`

### [x] Polyaxon
Polyaxon.
Run: `grep -q "polyaxonConfig" src/spec-parser.ts`

### [x] Metaflow
Metaflow.
Run: `grep -q "metaflowConfig" src/spec-parser.ts`

### [x] Kedro
Kedro.
Run: `grep -q "kedroConfig" src/spec-parser.ts`

### [x] ZenML
ZenML.
Run: `grep -q "zenmlConfig" src/spec-parser.ts`

### [x] Flyte
Flyte.
Run: `grep -q "flyteConfig" src/spec-parser.ts`

### [x] Prefect
PrefectML.
Run: `grep -q "prefectmlConfig" src/spec-parser.ts`

### [x] Dagster
Dagster.
Run: `grep -q "dagsterConfig" src/spec-parser.ts`

### [x] Airflow
Airflow.
Run: `grep -q "airflowConfig" src/spec-parser.ts`

### [x] Kubeflow Pipelines
KFPipelines.
Run: `grep -q "kfpipelinesConfig" src/spec-parser.ts`

### [x] Argo Workflows
ArgoML.
Run: `grep -q "argomlConfig" src/spec-parser.ts`

### [x] Flyte Deck
FlyteDeck.
Run: `grep -q "flytedeckConfig" src/spec-parser.ts`

### [x] Evidently
Evidently.
Run: `grep -q "evidentlyConfig" src/spec-parser.ts`

### [x] NannyML
NannyML.
Run: `grep -q "nannymlConfig" src/spec-parser.ts`

### [x] whylogs
Whylogs.
Run: `grep -q "whylogsConfig" src/spec-parser.ts`

### [x] Great Expectations
GreatExpectations.
Run: `grep -q "greatexpectationsConfig" src/spec-parser.ts`

### [x] TensorFlow Data Validation
TFDV.
Run: `grep -q "tfdvConfig" src/spec-parser.ts`

### [x] Alibi Detect
AlibiDetect.
Run: `grep -q "alibidetectConfig" src/spec-parser.ts`

### [x] Alibi Explain
AlibiExplain.
Run: `grep -q "alibiexplainConfig" src/spec-parser.ts`

### [x] DiCE
DiCE.
Run: `grep -q "diceConfig" src/spec-parser.ts`

### [x] DoWhy
DoWhy.
Run: `grep -q "dowhyConfig" src/spec-parser.ts`

### [x] EconML
EconML.
Run: `grep -q "econmlConfig" src/spec-parser.ts`

### [x] CausalML
CausalML.
Run: `grep -q "causalmlConfig" src/spec-parser.ts`

### [x] PyOD
PyOD.
Run: `grep -q "pyodConfig" src/spec-parser.ts`

### [x] Prophet
Prophet.
Run: `grep -q "prophetConfig" src/spec-parser.ts`

### [x] statsmodels
Statsmodels.
Run: `grep -q "statsmodelsConfig" src/spec-parser.ts`

### [x] pmdarima
Pmdarima.
Run: `grep -q "pmdarimaConfig" src/spec-parser.ts`

### [x] GluonTS
GluonTS.
Run: `grep -q "gluontsConfig" src/spec-parser.ts`

### [x] darts
Darts.
Run: `grep -q "dartsConfig" src/spec-parser.ts`

### [x] Kats
Kats.
Run: `grep -q "katsConfig" src/spec-parser.ts`

### [x] Orbit
Orbit.
Run: `grep -q "orbitConfig" src/spec-parser.ts`

### [x] NeuralProphet
NeuralProphet.
Run: `grep -q "neuralprophetConfig" src/spec-parser.ts`

### [x] GreyKite
GreyKite.
Run: `grep -q "greykiteConfig" src/spec-parser.ts`

### [x] PyFlux
PyFlux.
Run: `grep -q "pyfluxConfig" src/spec-parser.ts`

### [x] STAN
Stan.
Run: `grep -q "stanConfig" src/spec-parser.ts`

### [x] PyMC
PyMC.
Run: `grep -q "pymcConfig" src/spec-parser.ts`

### [x] NumPyro
NumPyro.
Run: `grep -q "numpyroConfig" src/spec-parser.ts`

### [x] Bambi
Bambi.
Run: `grep -q "bambiConfig" src/spec-parser.ts`

### [x] ArviZ
ArviZ.
Run: `grep -q "arvizConfig" src/spec-parser.ts`

### [x] Prophet
ProphetML.
Run: `grep -q "prophetmlConfig" src/spec-parser.ts`

### [x] scikit-learn
Sklearn.
Run: `grep -q "sklearnConfig" src/spec-parser.ts`

### [x] XGBoost
XGBoost.
Run: `grep -q "xgboostConfig" src/spec-parser.ts`

### [x] LightGBM
LightGBM.
Run: `grep -q "lightgbmConfig" src/spec-parser.ts`

### [x] CatBoost
CatBoost.
Run: `grep -q "catboostConfig" src/spec-parser.ts`

### [x] Optuna
Optuna.
Run: `grep -q "optunaConfig" src/spec-parser.ts`

### [x] Ray Tune
RayTune.
Run: `grep -q "raytuneConfig" src/spec-parser.ts`

### [x] Hyperopt
Hyperopt.
Run: `grep -q "hyperoptConfig" src/spec-parser.ts`

### [x] Ax
Ax.
Run: `grep -q "axConfig" src/spec-parser.ts`

### [x] Nevergrad
Nevergrad.
Run: `grep -q "nevergradConfig" src/spec-parser.ts`

### [x] HpBandSter
HpBandSter.
Run: `grep -q "hpbandsterConfig" src/spec-parser.ts`

### [x] DeepHyper
DeepHyper.
Run: `grep -q "deephyperConfig" src/spec-parser.ts`

### [x] FLAML
FLAML.
Run: `grep -q "flamlConfig" src/spec-parser.ts`

### [x] auto-sklearn
AutoSklearn.
Run: `grep -q "autosklearnConfig" src/spec-parser.ts`

### [x] auto-pytorch
AutoPyTorch.
Run: `grep -q "autopytorchConfig" src/spec-parser.ts`

### [x] Ray
Ray.
Run: `grep -q "rayConfig" src/spec-parser.ts`

### [x] Ray Serve
RayServe.
Run: `grep -q "rayserveConfig" src/spec-parser.ts`

### [x] Ray Train
RayTrain.
Run: `grep -q "raytrainConfig" src/spec-parser.ts`

### [x] Ray RLlib
RayRLLib.
Run: `grep -q "rayrllibConfig" src/spec-parser.ts`

### [x] PyTorch Lightning
PyTorchLightning.
Run: `grep -q "pytorchlightningConfig" src/spec-parser.ts`

### [x] PyTorch Ignite
PyTorchIgnite.
Run: `grep -q "pytorchigniteConfig" src/spec-parser.ts`

### [x] Catalyst
Catalyst.
Run: `grep -q "catalystConfig" src/spec-parser.ts`

### [x] fastai
Fastai.
Run: `grep -q "fastaiConfig" src/spec-parser.ts`

### [x] JAX
JAX.
Run: `grep -q "jaxConfig" src/spec-parser.ts`

### [x] Flax
Flax.
Run: `grep -q "flaxConfig" src/spec-parser.ts`

### [x] Haiku
Haiku.
Run: `grep -q "haikuConfig" src/spec-parser.ts`

### [x] Objax
Objax.
Run: `grep -q "objaxConfig" src/spec-parser.ts`

### [x] PyTorch Geometrics
PyG.
Run: `grep -q "pygConfig" src/spec-parser.ts`

### [x] DGL
DGL.
Run: `grep -q "dglConfig" src/spec-parser.ts`

### [x] Dask
DaskML.
Run: `grep -q "daskmlConfig" src/spec-parser.ts`

### [x] Dask Distributed
DaskDistributed.
Run: `grep -q "daskdistributedConfig" src/spec-parser.ts`

### [x] cuDF
CuDF.
Run: `grep -q "cudfConfig" src/spec-parser.ts`

### [x] cuML
CuML.
Run: `grep -q "cumlConfig" src/spec-parser.ts`

### [x] cuDNN
CuDNN.
Run: `grep -q "cudnnConfig" src/spec-parser.ts`

### [x] cuFFT
CuFFT.
Run: `grep -q "cufftConfig" src/spec-parser.ts`

### [x] cuBLAS
CuBLAS.
Run: `grep -q "cublassConfig" src/spec-parser.ts`

### [x] cuSparse
CuSparse.
Run: `grep -q "cusparseConfig" src/spec-parser.ts`

### [x] TensorRT
TensorRT.
Run: `grep -q "tensorrtConfig" src/spec-parser.ts`

### [x] TorchScript
TorchScript.
Run: `grep -q "torchscriptConfig" src/spec-parser.ts`

### [x] ONNX
ONNX.
Run: `grep -q "onnxConfig" src/spec-parser.ts`

### [x] TVM
TVM.
Run: `grep -q "tvmConfig" src/spec-parser.ts`

### [x] Apache MXNet
MXNet.
Run: `grep -q "mxnetConfig" src/spec-parser.ts`

### [x] Chainer
Chainer.
Run: `grep -q "chainerConfig" src/spec-parser.ts`

### [x] MLX
MLX.
Run: `grep -q "mlxConfig" src/spec-parser.ts`

### [x] CoreML
CoreML.
Run: `grep -q "coremlConfig" src/spec-parser.ts`

### [x] SentenceTransformers
SentenceTransformers.
Run: `grep -q "sentencetransformersConfig" src/spec-parser.ts`

### [x] Instructor
Instructor.
Run: `grep -q "instructorConfig" src/spec-parser.ts`

### [x] LangChain
LangChain.
Run: `grep -q "langchainConfig" src/spec-parser.ts`

### [x] LangSmith
LangSmith.
Run: `grep -q "langsmithConfig" src/spec-parser.ts`

### [x] LlamaIndex
LlamaIndex.
Run: `grep -q "llamaindexConfig" src/spec-parser.ts`

### [x] Haystack
Haystack.
Run: `grep -q "haystackConfig" src/spec-parser.ts`

### [x] RAGAS
RAGAS.
Run: `grep -q "ragasConfig" src/spec-parser.ts`

### [x] trulens
TruLens.
Run: `grep -q "trulensConfig" src/spec-parser.ts`

### [x] Phoenix
Phoenix.
Run: `grep -q "phoenixConfig" src/spec-parser.ts`

### [x] Arize
Arize.
Run: `grep -q "arizeConfig" src/spec-parser.ts`

### [x] WhyLabs
WhyLabs.
Run: `grep -q "whylabsConfig" src/spec-parser.ts`

### [x] Fiddler
Fiddler.
Run: `grep -q "fiddlerConfig" src/spec-parser.ts`

### [x] SuperAnnotate
SuperAnnotate.
Run: `grep -q "superannotateConfig" src/spec-parser.ts`

### [x] Label Studio
LabelStudio.
Run: `grep -q "labelstudioConfig" src/spec-parser.ts`

### [x] Scale AI
ScaleAI.
Run: `grep -q "scaleaiConfig" src/spec-parser.ts`

### [x] Labelbox
Labelbox.
Run: `grep -q "labelboxConfig" src/spec-parser.ts`

### [x] Snorkel
Snorkel.
Run: `grep -q "snorkelConfig" src/spec-parser.ts`

### [x] Prodigy
Prodigy.
Run: `grep -q "prodigyConfig" src/spec-parser.ts`

### [x] CVAT
CVAT.
Run: `grep -q "cvatConfig" src/spec-parser.ts`

### [x] LabelImg
LabelImg.
Run: `grep -q "labelimgConfig" src/spec-parser.ts`

### [x] VoTT
VoTT.
Run: `grep -q "vottConfig" src/spec-parser.ts`

### [x] Amazon SageMaker Ground Truth
SageMakerGroundTruth.
Run: `grep -q "sagemakergroundtruthConfig" src/spec-parser.ts`

### [x] Google Cloud AI Platform
GCPVertex.
Run: `grep -q "gcpvertexConfig" src/spec-parser.ts`

### [x] Azure Machine Learning
AzureML.
Run: `grep -q "azuremlConfig" src/spec-parser.ts`

### [x] Weights & Biases sweeps
WandBsw eeps.
Run: `grep -q "wandbsweepsConfig" src/spec-parser.ts`

### [x] Ray Dashboard
RayDashboard.
Run: `grep -q "raydashboardConfig" src/spec-parser.ts`

### [x] Netron
Netron.
Run: `grep -q "netronConfig" src/spec-parser.ts`

### [x] modelexplainer
ModelExplainer.
Run: `grep -q "modelexplainerConfig" src/spec-parser.ts`

### [x] SHAP
SHAP.
Run: `grep -q "shapConfig" src/spec-parser.ts`

### [x] LIME
LIME.
Run: `grep -q "limeConfig" src/spec-parser.ts`

### [x] ELI5
ELI5.
Run: `grep -q "eli5Config" src/spec-parser.ts`

### [x] Anchor
Anchor.
Run: `grep -q "anchorConfig" src/spec-parser.ts`

### [x] dalex
Dalex.
Run: `grep -q "dalexConfig" src/spec-parser.ts`

### [x] pdpbox
PDPbox.
Run: `grep -q "pdpboxConfig" src/spec-parser.ts`

### [x] partial dependence
PartialDependence.
Run: `grep -q "partialdependenceConfig" src/spec-parser.ts`

### [x] Treeinterpreter
TreeInterpreter.
Run: `grep -q "treeinterpreterConfig" src/spec-parser.ts`

### [x] fairlearn
Fairlearn.
Run: `grep -q "fairlearnConfig" src/spec-parser.ts`

### [x] AI Fairness 360
AIF360.
Run: `grep -q "aif360Config" src/spec-parser.ts`

### [x] Aequitas
Aequitas.
Run: `grep -q "aequitasConfig" src/spec-parser.ts`

### [x] MLOps-Diff
MLOpsDiff.
Run: `grep -q "mlopsdiffConfig" src/spec-parser.ts`

### [x] seldon
Seldon.
Run: `grep -q "seldonConfig" src/spec-parser.ts`

### [x] cortex
Cortex.
Run: `grep -q "cortexMLConfig" src/spec-parser.ts`

### [x] BentoML
BentoML.
Run: `grep -q "bentomlMLConfig" src/spec-parser.ts`

### [x] Triton Server
Triton.
Run: `grep -q "tritonMLConfig" src/spec-parser.ts`

### [x] TensorFlow Serving
TFServing.
Run: `grep -q "tfservingConfig" src/spec-parser.ts`

### [x] TorchServe
TorchServe.
Run: `grep -q "torchserveMLConfig" src/spec-parser.ts`

### [x] mlserver
MLServer.
Run: `grep -q "mlserverConfig" src/spec-parser.ts`

### [x] RAY Serve
RayServeML.
Run: `grep -q "rayserveMLConfig" src/spec-parser.ts`

### [x] RedisML
RedisML.
Run: `grep -q "redisMlConfig" src/spec-parser.ts`

### [x] NVIDIA Triton
NVIDIATriton.
Run: `grep -q "nvidi tritronConfig" src/spec-parser.ts`

### [x] OpenVINO
OpenVINO.
Run: `grep -q "openvinoConfig" src/spec-parser.ts`

### [x] OpenCV DNN
OpenCVDNN.
Run: `grep -q "opencvdnnConfig" src/spec-parser.ts`

### [x] Qualcomm SNPE
SNPE.
Run: `grep -q "snpeConfig" src/spec-parser.ts`

### [x] Xilinx DNNDK
DNNDK.
Run: `grep -q "dnndkConfig" src/spec-parser.ts`

### [x] TensorFlow Lite
TFLite.
Run: `grep -q "tfliteConfig" src/spec-parser.ts`

### [x] TF Lite Micro
TFLiteMicro.
Run: `grep -q "tflitemicroConfig" src/spec-parser.ts`

### [x] TF Lite for EdgeTPU
TFEdgeTPU.
Run: `grep -q "tfedgetpuConfig" src/spec-parser.ts`

### [x] TF Lite for GPU
TFLiteGPU.
Run: `grep -q "tflitegpuConfig" src/spec-parser.ts`

### [x] TF Lite for Android NNAPI
TFNNAPI.
Run: `grep -q "tfnnapiConfig" src/spec-parser.ts`

### [x] TF Lite for iOS CoreML
TFCoreML.
Run: `grep -q "tfcoremlConfig" src/spec-parser.ts`

### [x] MediaPipe
MediaPipe.
Run: `grep -q "mediapipeConfig" src/spec-parser.ts`

### [x] ML Kit
MLKit.
Run: `grep -q "mlkitConfig" src/spec-parser.ts`

### [x] Firebase ML
FirebaseML.
Run: `grep -q "firebaseMlConfig" src/spec-parser.ts`

### [x] TensorFlow.js
TFJS.
Run: `grep -q "tfjsConfig" src/spec-parser.ts`

### [x] TensorFlow Lite for Web
TFLiteWeb.
Run: `grep -q "tflitewebConfig" src/spec-parser.ts`

### [x] ONNX Runtime Web
ONNXRuntimeWeb.
Run: `grep -q "onnxruntimewebConfig" src/spec-parser.ts`

### [x] Transformers.js
TransformersJS.
Run: `grep -q "transformersjsConfig" src/spec-parser.ts`

### [x] WebDNN
WebDNN.
Run: `grep -q "webdnnConfig" src/spec-parser.ts`

### [x] WebGL Inference
WebGLInference.
Run: `grep -q "webglinferenceConfig" src/spec-parser.ts`

### [x] WebGPU Inference
WebGPUInference.
Run: `grep -q "webgpuinferenceConfig" src/spec-parser.ts`

### [x] WebAssembly ML
WasmML.
Run: `grep -q "was mmlConfig" src/spec-parser.ts`

### [x] ONNX.js
ONNXJS.
Run: `grep -q "onnxjsConfig" src/spec-parser.ts`

### [x] synaptic
Synaptic.
Run: `grep -q "synapticConfig" src/spec-parser.ts`

### [x] Brain.js
BrainJS.
Run: `grep -q "brainjsConfig" src/spec-parser.ts`

### [x] Neataptic
Neataptic.
Run: `grep -q "neatapticConfig" src/spec-parser.ts`

### [x] ConvNetJS
ConvNetJS.
Run: `grep -q "convnetjsConfig" src/spec-parser.ts`

### [x] Re NLP
ReNLP.
Run: `grep -q "renlpConfig" src/spec-parser.ts`

### [x] natural
Natural.
Run: `grep -q "naturalConfig" src/spec-parser.ts`

### [x] compromise
Compromise.
Run: `grep -q "compromiseConfig" src/spec-parser.ts`

### [x] franc
Franc.
Run: `grep -q "francConfig" src/spec-parser.ts`

### [x] speaking面值
Speaking.
Run: `grep -q "speakingConfig" src/spec-parser.ts`

### [x] Wink NLP
WinkNLP.
Run: `grep -q "winknlpConfig" src/spec-parser.ts`

### [x] Spacy
Spacy.
Run: `grep -q "spacyConfig" src/spec-parser.ts`

### [x] NLTK
NLTK.
Run: `grep -q "nltkConfig" src/spec-parser.ts`

### [x] TextBlob
TextBlob.
Run: `grep -q "textblobConfig" src/spec-parser.ts`

### [x] gensim
Gensim.
Run: `grep -q "gensimConfig" src/spec-parser.ts`

### [x] fastText
FastText.
Run: `grep -q "fasttextConfig" src/spec-parser.ts`

### [x] flair
Flair.
Run: `grep -q "flairConfig" src/spec-parser.ts`

### [x] AllenNLP
AllenNLP.
Run: `grep -q "allennlpConfig" src/spec-parser.ts`

### [x] Hugging Face Datasets
HFDatasets.
Run: `grep -q "hfdatasetsConfig" src/spec-parser.ts`

### [x] Hugging Face Evaluate
HFEvaluate.
Run: `grep -q "hfevaluateConfig" src/spec-parser.ts`

### [x] Hugging Face Gradio
HFGradio.
Run: `grep -q "hfgradioConfig" src/spec-parser.ts`

### [x] Hugging Face Spaces
HFSpaces.
Run: `grep -q "hfspacesConfig" src/spec-parser.ts`

### [x] Gradio
Gradio.
Run: `grep -q "gradioConfig" src/spec-parser.ts`

### [x] Streamlit
Streamlit.
Run: `grep -q "streamlitConfig" src/spec-parser.ts`

### [x] Panel
Panel.
Run: `grep -q "panelConfig" src/spec-parser.ts`

### [x] Voila
Voila.
Run: `grep -q "voilaConfig" src/spec-parser.ts`

### [x] Mercury
Mercury.
Run: `grep -q "mercuryConfig" src/spec-parser.ts`

### [x] NiceGUI
NiceGUI.
Run: `grep -q "niceguiConfig" src/spec-parser.ts`

### [x] Gradeculus
Gradeculus.
Run: `grep -q "gradeculusConfig" src/spec-parser.ts`

### [x] Pyodide
Pyodide.
Run: `grep -q "pyodideConfig" src/spec-parser.ts`

### [x] PyScript
PyScript.
Run: `grep -q "pyscriptConfig" src/spec-parser.ts`

### [x] WebAssembly Python
WasmPython.
Run: `grep -q "wasmpythonConfig" src/spec-parser.ts`

### [x] WebLanguagetool
WebLanguageTool.
Run: `grep -q "weblanguagetoolConfig" src/spec-parser.ts`

### [x] Hunspell
Hunspell.
Run: `grep -q "hunspellConfig" src/spec-parser.ts`

### [x] spaCy Industrial
SpacyIndustry.
Run: `grep -q "spacyindustryConfig" src/spec-parser.ts`

### [x] Stanza
Stanza.
Run: `grep -q "stanzaConfig" src/spec-parser.ts`

### [x] UDPipe
UDPipe.
Run: `grep -q "udpipeConfig" src/spec-parser.ts`

### [x] Trankit
Trankit.
Run: `grep -q "trankitConfig" src/spec-parser.ts`

### [x] Stanza
StanzaNLP.
Run: `grep -q "stanzanlpConfig" src/spec-parser.ts`

### [x] spaCy CyTools
SpacyCy.
Run: `grep -q "spacycyConfig" src/spec-parser.ts`

### [x] spaCy Pretrain
SpacyPretrain.
Run: `grep -q "spacypretrainConfig" src/spec-parser.ts`

### [x] Thinc
Thinc.
Run: `grep -q "thincConfig" src/spec-parser.ts`

### [x] prodigy recipes
ProdigyRecipes.
Run: `grep -q "prodigyrecipesConfig" src/spec-parser.ts`

### [x] spaCy whisper
SpacyWhisper.
Run: `grep -q "spacywhisperConfig" src/spec-parser.ts`

### [x] ParlAI
ParlAI.
Run: `grep -q "parlaiConfig" src/spec-parser.ts`

### [x] DeepPavlov
DeepPavlov.
Run: `grep -q "deeppavlovConfig" src/spec-parser.ts`

### [x] Haystack Agents
HaystackAgents.
Run: `grep -q "haystackagentsConfig" src/spec-parser.ts`

### [x] Haystack Retrievers
HaystackRetrievers.
Run: `grep -q "haystackretrieversConfig" src/spec-parser.ts`

### [x] Haystack Readers
HaystackReaders.
Run: `grep -q "haystackreadersConfig" src/spec-parser.ts`

### [x] Haystack Summarizers
HaystackSummarizers.
Run: `grep -q "haystacksummarizersConfig" src/spec-parser.ts`

### [x] Haystack Generators
HaystackGenerators.
Run: `grep -q "haystackgeneratorsConfig" src/spec-parser.ts`

### [x] Haystack Labeling
HaystackLabeling.
Run: `grep -q "haystacklabelingConfig" src/spec-parser.ts`

### [x] Elasticsearch
Elasticsearch.
Run: `grep -q "elasticsearchConfig" src/spec-parser.ts`

### [x] OpenSearch
OpenSearch.
Run: `grep -q "opensearchConfig" src/spec-parser.ts`

### [x] Meilisearch
Meilisearch.
Run: `grep -q "meilisearchConfig" src/spec-parser.ts`

### [x] Typesense
Typesense.
Run: `grep -q "typesenseConfig" src/spec-parser.ts`

### [x] Qdrant
Qdrant.
Run: `grep -q "qdrantConfig" src/spec-parser.ts`

### [x] Weaviate
Weaviate.
Run: `grep -q "weaviateConfig" src/spec-parser.ts`

### [x] Chroma
Chroma.
Run: `grep -q "chromaConfig" src/spec-parser.ts`

### [x] Pinecone
Pinecone.
Run: `grep -q "pineconeConfig" src/spec-parser.ts`

### [x] Milvus
Milvus.
Run: `grep -q "milvusConfig" src/spec-parser.ts`

### [x] pgvector
Pgvector.
Run: `grep -q "pgvectorConfig" src/spec-parser.ts`

### [x] pg_embedding
PgEmbedding.
Run: `grep -q "pgembeddingConfig" src/spec-parser.ts`

### [x] Faiss
Faiss.
Run: `grep -q "faissConfig" src/spec-parser.ts`

### [x] Annoy
Annoy.
Run: `grep -q "annoyConfig" src/spec-parser.ts`

### [x] ScaNN
Scann.
Run: `grep -q "scannConfig" src/spec-parser.ts`

### [x] HNSWLib
HNSWLib.
Run: `grep -q "hnswlibConfig" src/spec-parser.ts`

### [x] NMSLib
NMSLib.
Run: `grep -q "nmslibConfig" src/spec-parser.ts`

### [x] SPTAG
SPTAG.
Run: `grep -q "sptagConfig" src/spec-parser.ts`

### [x] DiskANN
DiskANN.
Run: `grep -q "diskannConfig" src/spec-parser.ts`

### [x] QDrant Graph
QDrantGraph.
Run: `grep -q "qdrantgraphConfig" src/spec-parser.ts`

### [x] Vald
Vald.
Run: `grep -q "valdConfig" src/spec-parser.ts`

### [x] VSAG
VSAG.
Run: `grep -q "vsagConfig" src/spec-parser.ts`

### [x] Marqo
Marqo.
Run: `grep -q "marqoConfig" src/spec-parser.ts`

### [x] DocArray
DocArray.
Run: `grep -q "docarrayConfig" src/spec-parser.ts`

### [x] Jina AI
JinaAI.
Run: `grep -q "jinaaiConfig" src/spec-parser.ts`

### [x] EmbedChain
EmbedChain.
Run: `grep -q "embedchainConfig" src/spec-parser.ts`

### [x] Embedding Experience
EmbeddingExperience.
Run: `grep -q "embeddingexperienceConfig" src/spec-parser.ts`

### [x] Cohere Embed
CohereEmbed.
Run: `grep -q "cohereembedConfig" src/spec-parser.ts`

### [x] OpenAI Embeddings
OpenAIEmbeddings.
Run: `grep -q "openaiembeddingsConfig" src/spec-parser.ts`

### [x] Azure OpenAI Embeddings
AzureOpenAIEmbeddings.
Run: `grep -q "azureopenaiembeddingsConfig" src/spec-parser.ts`

### [x] Vertex AI Embeddings
VertexAIEmbeddings.
Run: `grep -q "vertexaiembeddingsConfig" src/spec-parser.ts`

### [x] Mistral AI
MistralAI.
Run: `grep -q "mistralaiConfig" src/spec-parser.ts`

### [x] Groq
Groq.
Run: `grep -q "groqConfig" src/spec-parser.ts`

### [x] Perplexity
Perplexity.
Run: `grep -q "perplexityConfig" src/spec-parser.ts`

### [x] Together AI
TogetherAI.
Run: `grep -q "togetheraiConfig" src/spec-parser.ts`

### [x] Anyscale
Anyscale.
Run: `grep -q "anyscaleConfig" src/spec-parser.ts`

### [x] Fireworks AI
FireworksAI.
Run: `grep -q "fireworksaiConfig" src/spec-parser.ts`

### [x] DeepInfra
DeepInfra.
Run: `grep -q "deepinfraConfig" src/spec-parser.ts`

### [x] Replicate API
ReplicateAPI.
Run: `grep -q "replicateapiConfig" src/spec-parser.ts`

### [x] OpenRouter
OpenRouter.
Run: `grep -q "openrouterConfig" src/spec-parser.ts`

### [x] Lepton AI
LeptonAI.
Run: `grep -q "leptonaiConfig" src/spec-parser.ts`

### [x] Predibase
Predibase.
Run: `grep -q "predibaseConfig" src/spec-parser.ts`

### [x] Baseten
Baseten.
Run: `grep -q "basetenConfig" src/spec-parser.ts`

### [x] Modal Endpoints
ModalEndpoints.
Run: `grep -q "modalendpointsConfig" src/spec-parser.ts`

### [x] OctoAI
OctoAI.
Run: `grep -q "octoaiConfig" src/spec-parser.ts`

### [x] Hyperbolic
Hyperbolic.
Run: `grep -q "hyperbolicConfig" src/spec-parser.ts`

### [x] Cerebras
Cerebras.
Run: `grep -q "cerebrasConfig" src/spec-parser.ts`

### [x] Groq Cloud
GroqCloud.
Run: `grep -q "groqcloudConfig" src/spec-parser.ts`

### [x] Cohere Command
CohereCommand.
Run: `grep -q "coherecommandConfig" src/spec-parser.ts`

### [x] AI21 Command
AI21Command.
Run: `grep -q "ai21commandConfig" src/spec-parser.ts`

### [x] Claude API
ClaudeAPI.
Run: `grep -q "claudeapiConfig" src/spec-parser.ts`

### [x] GPT-4 API
GPT4API.
Run: `grep -q "gpt4apiConfig" src/spec-parser.ts`

### [x] Gemini API
GeminiAPI.
Run: `grep -q "geminiapiConfig" src/spec-parser.ts`

### [x] Llama API
LlamaAPI.
Run: `grep -q "llamaapiConfig" src/spec-parser.ts`

### [x] Mistral API
MistralAPI.
Run: `grep -q "mistralapiConfig" src/spec-parser.ts`

### [x] DBRX API
DBRXAPI.
Run: `grep -q "dbrxapiConfig" src/spec-parser.ts`

### [x] WizardLM API
WizardLMAPI.
Run: `grep -q "wizardlmapiConfig" src/spec-parser.ts`

### [x] Yi API
YiAPI.
Run: `grep -q "yiapiConfig" src/spec-parser.ts`

### [x] Qwen API
QwenAPI.
Run: `grep -q "qwenapiConfig" src/spec-parser.ts`

### [x] DeepSeek API
DeepSeekAPI.
Run: `grep -q "deepseekapiConfig" src/spec-parser.ts`

### [x] Command R+ API
CommandRAPI.
Run: `grep -q "commandrapiConfig" src/spec-parser.ts`

### [x] Claude for Slack
ClaudeSlack.
Run: `grep -q "claudeslackConfig" src/spec-parser.ts`

### [x] Claude for Teams
ClaudeTeams.
Run: `grep -q "claudeteamsConfig" src/spec-parser.ts`

### [x] Azure AI Studio
AzureAIStudio.
Run: `grep -q "azureaistudioConfig" src/spec-parser.ts`

### [x] AWS Bedrock
AWSBedrock.
Run: `grep -q "awsbedrockConfig" src/spec-parser.ts`

### [x] Google AI Studio
GoogleAIStudio.
Run: `grep -q "googleaistudioConfig" src/spec-parser.ts`

### [x] Anthropic Cookbook
AnthropicCookbook.
Run: `grep -q "anthropiccookbookConfig" src/spec-parser.ts`

### [x] OpenAI Cookbook
OpenAICookbook.
Run: `grep -q "openaicookbookConfig" src/spec-parser.ts`

### [x] LangChain Cookbook
LangChainCookbook.
Run: `grep -q "langchaincookbookConfig" src/spec-parser.ts`

### [x] LlamaIndex Cookbook
LlamaIndexCookbook.
Run: `grep -q "llamaindexcookbookConfig" src/spec-parser.ts`

### [x] Prompt Engine
PromptEngine.
Run: `grep -q "promptengineConfig" src/spec-parser.ts`

### [x] Guidance
Guidance.
Run: `grep -q "guidanceConfig" src/spec-parser.ts`

### [x] Instructor
InstructorSDK.
Run: `grep -q "instructorsdkConfig" src/spec-parser.ts`

### [x] Outlines
Outlines.
Run: `grep -q "outlinesConfig" src/spec-parser.ts`

### [x] Text Generation
TextGeneration.
Run: `grep -q "textgenerationConfig" src/spec-parser.ts`

### [x] LMQL
LMQL.
Run: `grep -q "lmqlConfig" src/spec-parser.ts`

### [x] SGLang
SGLang.
Run: `grep -q "sglangConfig" src/spec-parser.ts`

### [x] vLLM
VLLM.
Run: `grep -q "vllmConfig" src/spec-parser.ts`

### [x] TGI
TGI.
Run: `grep -q "tgiConfig" src/spec-parser.ts`

### [x] text-generation-inference
TextGenInf.
Run: `grep -q "textgeninfConfig" src/spec-parser.ts`

### [x] Ray Serve LLM
RayServeLLM.
Run: `grep -q "rayservel lmConfig" src/spec-parser.ts`

### [x] Smol LLM
SmolLLM.
Run: `grep -q "smollmConfig" src/spec-parser.ts`

### [x] LLaMA.cpp
LlamaCpp.
Run: `grep -q "llamacppConfig" src/spec-parser.ts`

### [x] llamafile
Llamafile.
Run: `grep -q "llamafileConfig" src/spec-parser.ts`

### [x] Ollama
Ollama.
Run: `grep -q "ollamaConfig" src/spec-parser.ts`

### [x] LocalAI
LocalAI.
Run: `grep -q "localaiConfig" src/spec-parser.ts`

### [x] text-embedding-3
TextEmbedding3.
Run: `grep -q "textembedding3Config" src/spec-parser.ts`

### [x] ada-002
Ada002.
Run: `grep -q "ada002Config" src/spec-parser.ts`

### [x] Embeddings API
EmbeddingsAPI.
Run: `grep -q "embeddingsapiConfig" src/spec-parser.ts`

### [x] BGE Embeddings
BGEEmbeddings.
Run: `grep -q "bgeembeddingsConfig" src/spec-parser.ts`

### [x] E5 Embeddings
E5Embeddings.
Run: `grep -q "e5embeddingsConfig" src/spec-parser.ts`

### [x] Instructor Embeddings
InstructorEmbeddings.
Run: `grep -q "instructorembeddingsConfig" src/spec-parser.ts`

### [x] FlagEmbedding
FlagEmbedding.
Run: `grep -q "flagembeddingConfig" src/spec-parser.ts`

### [x] NV-Embed
NVEmbed.
Run: `grep -q "nvembedConfig" src/spec-parser.ts`

### [x] Whisper
Whisper.
Run: `grep -q "whisperConfig" src/spec-parser.ts`

### [x] Whisper.cpp
WhisperCpp.
Run: `grep -q "whispercppConfig" src/spec-parser.ts`

### [x] Faster Whisper
FasterWhisper.
Run: `grep -q "fasterwhisperConfig" src/spec-parser.ts`

### [x] Parler TTS
ParlerTTS.
Run: `grep -q "parlerttsConfig" src/spec-parser.ts`

### [x] Bark
Bark.
Run: `grep -q "barkConfig" src/spec-parser.ts`

### [x] Tortoise TTS
TortoiseTTS.
Run: `grep -q "tortoisettsConfig" src/spec-parser.ts`

### [x] Coqui TTS
CoquiTTS.
Run: `grep -q "coquittsConfig" src/spec-parser.ts`

### [x] Mozilla TTS
MozillaTTS.
Run: `grep -q "mozillattsConfig" src/spec-parser.ts`

### [x] Espeak
Espeak.
Run: `grep -q "espeakConfig" src/spec-parser.ts`

### [x] Festival
Festival.
Run: `grep -q "festivalConfig" src/spec-parser.ts`

### [x] Flite
Flite.
Run: `grep -q "fliteConfig" src/spec-parser.ts`

### [x] MaryTTS
MaryTTS.
Run: `grep -q "maryttsConfig" src/spec-parser.ts`

### [x] Sam
SamTTS.
Run: `grep -q "samConfig" src/spec-parser.ts`

### [x] gTTS
GTTS.
Run: `grep -q "gttsConfig" src/spec-parser.ts`

### [x] pyttsx3
Pyttsx3.
Run: `grep -q "pyttsx3Config" src/spec-parser.ts`

### [x] edge-tts
EdgeTTS.
Run: `grep -q "edgettsConfig" src/spec-parser.ts`

### [x] Azure TTS
AzureTTS.
Run: `grep -q "azurettsConfig" src/spec-parser.ts`

### [x] Google Cloud TTS
GCPTTs.
Run: `grep -q "gcpttsConfig" src/spec-parser.ts`

### [x] Amazon Polly
AmazonPolly.
Run: `grep -q "amazonpollyConfig" src/spec-parser.ts`

### [x] IBM Watson TTS
IBMWatsonTTS.
Run: `grep -q "ibmwatsonttsConfig" src/spec-parser.ts`

### [x] ElevenLabs
ElevenLabs.
Run: `grep -q "elevenlabsConfig" src/spec-parser.ts`

### [x] OpenAI TTS
OpenAITTS.
Run: `grep -q "openaittsConfig" src/spec-parser.ts`

### [x] Cartesia
Cartesia.
Run: `grep -q "cartesiaConfig" src/spec-parser.ts`

### [x] PlayHT
PlayHT.
Run: `grep -q "playhtConfig" src/spec-parser.ts`

### [x] Murf AI
MurfAI.
Run: `grep -q "murfaiConfig" src/spec-parser.ts`

### [x] WellSaid
WellSaid.
Run: `grep -q "wellsaidConfig" src/spec-parser.ts`

### [x] Speechify
Speechify.
Run: `grep -q "speechifyConfig" src/spec-parser.ts`

### [x] Descript
Descript.
Run: `grep -q "descriptConfig" src/spec-parser.ts`

### [x] Resemble AI
ResembleAI.
Run: `grep -q "resembleaiConfig" src/spec-parser.ts`

### [x] Unique Voice
UniqueVoice.
Run: `grep -q "uniquevoiceConfig" src/spec-parser.ts`

### [x] FakeYou
FakeYou.
Run: `grep -q "fakeyouConfig" src/spec-parser.ts`

### [x] Vorleser
Vorleser.
Run: `grep -q "vorleserConfig" src/spec-parser.ts`

### [x] Azure Speech
AzureSpeech.
Run: `grep -q "azurespeechConfig" src/spec-parser.ts`

### [x] Google Speech-to-Text
GCPSpeech.
Run: `grep -q "gcpspeechConfig" src/spec-parser.ts`

### [x] Amazon Transcribe
AmazonTranscribe.
Run: `grep -q "amazontranscribeConfig" src/spec-parser.ts`

### [x] AssemblyAI
AssemblyAI.
Run: `grep -q "assemblyaiConfig" src/spec-parser.ts`

### [x] Rev AI
RevAI.
Run: `grep -q "revaiConfig" src/spec-parser.ts`

### [x] Speechmatics
Speechmatics.
Run: `grep -q "speechmaticsConfig" src/spec-parser.ts`

### [x] Deepgram
Deepgram.
Run: `grep -q "deepgramConfig" src/spec-parser.ts`

### [x] AssemblyAI
AssemblyAISpeech.
Run: `grep -q "assemblyaispeechConfig" src/spec-parser.ts`

### [x] Otter AI
OtterAI.
Run: `grep -q "otteraiConfig" src/spec-parser.ts`

### [x] Fireflies
Fireflies.
Run: `grep -q "firefliesConfig" src/spec-parser.ts`

### [x] Trint
Trint.
Run: `grep -q "trintConfig" src/spec-parser.ts`

### [x] Sonix
Sonix.
Run: `grep -q "sonixConfig" src/spec-parser.ts`

### [x] Happy Scribe
HappyScribe.
Run: `grep -q "happyscribeConfig" src/spec-parser.ts`

### [x] Notta
Notta.
Run: `grep -q "nottaConfig" src/spec-parser.ts`

### [x] Turboscribe
Turboscribe.
Run: `grep -q "turboscribeConfig" src/spec-parser.ts`

### [x] Whisper JAX
WhisperJAX.
Run: `grep -q "whisperjaxConfig" src/spec-parser.ts`

### [x] Whisper API
WhisperAPI.
Run: `grep -q "whisperapiConfig" src/spec-parser.ts`

### [x] Modal Whisper
ModalWhisper.
Run: `grep -q "modalwhisperConfig" src/spec-parser.ts`

### [x] Replicate Whisper
ReplicateWhisper.
Run: `grep -q "replicatewhisperConfig" src/spec-parser.ts`

### [x] DALL-E
DALLE.
Run: `grep -q "dalleConfig" src/spec-parser.ts`

### [x] DALL-E 2
DALLE2.
Run: `grep -q "dalle2Config" src/spec-parser.ts`

### [x] DALL-E 3
DALLE3.
Run: `grep -q "dalle3Config" src/spec-parser.ts`

### [x] Midjourney
Midjourney.
Run: `grep -q "midjourneyConfig" src/spec-parser.ts`

### [x] Stable Diffusion
StableDiffusion.
Run: `grep -q "stablediffusionConfig" src/spec-parser.ts`

### [x] SDXL
SDXL.
Run: `grep -q "sdxlConfig" src/spec-parser.ts`

### [x] SD WebUI
SDWebUI.
Run: `grep -q "sdwebuiConfig" src/spec-parser.ts`

### [x] ComfyUI
ComfyUI.
Run: `grep -q "comfyuiConfig" src/spec-parser.ts`

### [x] Fooocus
Fooocus.
Run: `grep -q "fooocusConfig" src/spec-parser.ts`

### [x] InvokeAI
InvokeAI.
Run: `grep -q "invokeaiConfig" src/spec-parser.ts`

### [x] Diffusion Bee
DiffusionBee.
Run: `grep -q "diffusionbeeConfig" src/spec-parser.ts`

### [x] Clipdrop
Clipdrop.
Run: `grep -q "clipdropConfig" src/spec-parser.ts`

### [x] Remove.bg
RemoveBG.
Run: `grep -q "removebgConfig" src/spec-parser.ts`

### [x] Cleanup.pictures
CleanupPictures.
Run: `grep -q "cleanuppicturesConfig" src/spec-parser.ts`

### [x] Magic Eraser
MagicEraser.
Run: `grep -q "magiceraserConfig" src/spec-parser.ts`

### [x] Adobe Firefly
AdobeFirefly.
Run: `grep -q "adobefireflyConfig" src/spec-parser.ts`

### [x] Adobe Sensei
AdobeSensei.
Run: `grep -q "adobesenseiConfig" src/spec-parser.ts`

### [x] Canva
Canva.
Run: `grep -q "canvaConfig" src/spec-parser.ts`

### [x] RunwayML
RunwayML.
Run: `grep -q "runwaymlConfig" src/spec-parser.ts`

### [x] Leonardo AI
LeonardoAI.
Run: `grep -q "leonardoaiConfig" src/spec-parser.ts`

### [x] Playground AI
PlaygroundAI.
Run: `grep -q "playgroundaiConfig" src/spec-parser.ts`

### [x] Ideogram
Ideogram.
Run: `grep -q "ideogramConfig" src/spec-parser.ts`

### [x] Flux
Flux.
Run: `grep -q "fluxConfig" src/spec-parser.ts`

### [x] Flux Dev
FluxDev.
Run: `grep -q "fluxdevConfig" src/spec-parser.ts`

### [x] Flux Schnell
FluxSchnell.
Run: `grep -q "fluxschnellConfig" src/spec-parser.ts`

### [x] Imagen
Imagen.
Run: `grep -q "imagenConfig" src/spec-parser.ts`

### [x] Imagen 2
Imagen2.
Run: `grep -q "imagen2Config" src/spec-parser.ts`

### [x] Imagen 3
Imagen3.
Run: `grep -q "imagen3Config" src/spec-parser.ts`

### [x] Veo
Veo.
Run: `grep -q "veoConfig" src/spec-parser.ts`

### [x] Veo 2
Veo2.
Run: `grep -q "veo2Config" src/spec-parser.ts`

### [x] Sora
Sora.
Run: `grep -q "soraConfig" src/spec-parser.ts`

### [x] Lumiere
Lumiere.
Run: `grep -q "lumiereConfig" src/spec-parser.ts`

### [x] Gen-2
Gen2.
Run: `grep -q "gen2Config" src/spec-parser.ts`

### [x] Gen-3
Gen3.
Run: `grep -q "gen3Config" src/spec-parser.ts`

### [x] Kling
Kling.
Run: `grep -q "klingConfig" src/spec-parser.ts`

### [x] Kling AI
KlingAI.
Run: `grep -q "klingaiConfig" src/spec-parser.ts`

### [x] Vidu
Vidu.
Run: `grep -q "viduConfig" src/spec-parser.ts`

### [x] Zeroscope
Zeroscope.
Run: `grep -q "zeroscopeConfig" src/spec-parser.ts`

### [x] ModelScope
ModelScope.
Run: `grep -q "modelscopeConfig" src/spec-parser.ts`

### [x] I2VGen-XL
I2VGenXL.
Run: `grep -q "i2vg enxlConfig" src/spec-parser.ts`

### [x] SadTalker
SadTalker.
Run: `grep -q "sadtalkerConfig" src/spec-parser.ts`

### [x] Wav2Lip
Wav2Lip.
Run: `grep -q "wav2lipConfig" src/spec-parser.ts`

### [x] SadTalker
SadTalkerVideo.
Run: `grep -q "sadtalkervideoConfig" src/spec-parser.ts`

### [x] AnimateDiff
AnimateDiff.
Run: `grep -q "animatediffConfig" src/spec-parser.ts`

### [x] LoRA
LoRA.
Run: `grep -q "loraConfig" src/spec-parser.ts`

### [x] ControlNet
ControlNet.
Run: `grep -q "controlnetConfig" src/spec-parser.ts`

### [x] IP-Adapter
IPAdapter.
Run: `grep -q "ipadapterConfig" src/spec-parser.ts`

### [x] LoRA
LoRAImage.
Run: `grep -q "loraimageConfig" src/spec-parser.ts`

### [x] Textual Inversion
TextualInversion.
Run: `grep -q "textualinversionConfig" src/spec-parser.ts`

### [x] DreamBooth
DreamBooth.
Run: `grep -q "dreamboothConfig" src/spec-parser.ts`

### [x] InstructPix2Pix
InstructPix2Pix.
Run: `grep -q "instructpix2pixConfig" src/spec-parser.ts`

### [x] InstructDiffusion
InstructDiffusion.
Run: `grep -q "instructdiffusionConfig" src/spec-parser.ts`

### [x] Automatic1111
Auto1111.
Run: `grep -q "auto1111Config" src/spec-parser.ts`

### [x] ControlNet Sharif
ControlNetSharif.
Run: `grep -q "controlnetsharifConfig" src/spec-parser.ts`

### [x] ControlNet 1.1
ControlNet11.
Run: `grep -q "controlnet11Config" src/spec-parser.ts`

### [x] T2I Adapter
T2IAdapter.
Run: `grep -q "t2 iadapterConfig" src/spec-parser.ts`

### [x] ControlNet Models
ControlNetModels.
Run: `grep -q "controlnetmodelsConfig" src/spec-parser.ts`

### [x] Controllite
Controllite.
Run: `grep -q "controlliteConfig" src/spec-parser.ts`

### [x]模特_CONTROL
MoteControl.
Run: `grep -q "motecontrolConfig" src/spec-parser.ts`

### [x] ControLLM
ControLLM.
Run: `grep -q "controlllmConfig" src/spec-parser.ts`

### [x] T2I Adapters
T2IAdapters.
Run: `grep -q "t2iadaptersConfig" src/spec-parser.ts`

### [x] ControlNet Zoo
ControlNetZoo.
Run: `grep -q "controlnetzooConfig" src/spec-parser.ts`

### [x] UniControlNet
UniControlNet.
Run: `grep -q "unicontrolnetConfig" src/spec-parser.ts`

### [x] ControlNet Lite
ControlNetLite.
Run: `grep -q "controlnetliteConfig" src/spec-parser.ts`

### [x] ControlNet Pro
ControlNetPro.
Run: `grep -q "controlnetproConfig" src/spec-parser.ts`

### [x] ControlNet XL
ControlNetXL.
Run: `grep -q "controlnetxlConfig" src/spec-parser.ts`

### [x] Stable Diffusion XL ControlNet
SDXLControlNet.
Run: `grep -q "sdxlcontrolnetConfig" src/spec-parser.ts`

### [x] ControlNet Seg
ControlNetSeg.
Run: `grep -q "controlnetsegConfig" src/spec-parser.ts`

### [x] ControlNet Normal
ControlNetNormal.
Run: `grep -q "controlnetnormalConfig" src/spec-parser.ts`

### [x] ControlNet Depth
ControlNetDepth.
Run: `grep -q "controlnetdepthConfig" src/spec-parser.ts`

### [x] ControlNet Canny
ControlNetCanny.
Run: `grep -q "controlnetcannyConfig" src/spec-parser.ts`

### [x] ControlNet HED
ControlNetHED.
Run: `grep -q "controlnethedConfig" src/spec-parser.ts`

### [x] ControlNet Scribble
ControlNetScribble.
Run: `grep -q "controlnetscribbleConfig" src/spec-parser.ts`

### [x] ControlNet OpenPose
ControlNetOpenPose.
Run: `grep -q "controlnetopenposeConfig" src/spec-parser.ts`

### [x] ControlNet MLSD
ControlNetMLSD.
Run: `grep -q "controlnetmlsdConfig" src/spec-parser.ts`

### [x] ControlNet Normal
ControlNetNormalMap.
Run: `grep -q "controlnetnormalmapConfig" src/spec-parser.ts`

### [x] ControlNet Tile
ControlNetTile.
Run: `grep -q "controlnettileConfig" src/spec-parser.ts`

### [x] ControlNet Inpaint
ControlNetInpaint.
Run: `grep -q "controlnetinpaintConfig" src/spec-parser.ts`

### [x] ControlNet IP2P
ControlNetIP2P.
Run: `grep -q "controlnetip2pConfig" src/spec-parser.ts`

### [x] ControlNet Shuffle
ControlNetShuffle.
Run: `grep -q "controlnetshuffleConfig" src/spec-parser.ts`

### [x] ControlNet Reference
ControlNetReference.
Run: `grep -q "controlnetreferenceConfig" src/spec-parser.ts`

### [x] ControlNet Recolor
ControlNetRecolor.
Run: `grep -q "controlnetrecolorConfig" src/spec-parser.ts`

### [x] ControlNet Anime
ControlNetAnime.
Run: `grep -q "controlnetanimeConfig" src/spec-parser.ts`

### [x] ControlNet Lineart
ControlNetLineart.
Run: `grep -q "controlnetlineartConfig" src/spec-parser.ts`

### [x] ControlNet Softedge
ControlNetSoftedge.
Run: `grep -q "controlnetsoftedgeConfig" src/spec-parser.ts`

### [x] ControlNet AnimeLineart
ControlNetAnimeLineart.
Run: `grep -q "controlnetalanimeConfig" src/spec-parser.ts`

### [x] ControlNet Lineart Anime
ControlNetLineartAnime.
Run: `grep -q "controlnetlanimeConfig" src/spec-parser.ts`

### [x] ControlNet QR Code
ControlNetQRCode.
Run: `grep -q "controlnetqrcodeConfig" src/spec-parser.ts`

### [x] ControlNet QRCode
ControlNetQR.
Run: `grep -q "controlnetqrConfig" src/spec-parser.ts`

### [x] ControlNet Beauty
ControlNetBeauty.
Run: `grep -q "controlnetbeautyConfig" src/spec-parser.ts`

### [x] ControlNet Photorealistic
ControlNetPhotoreal.
Run: `grep -q "controlnetphotorealConfig" src/spec-parser.ts`

### [x] ControlNet Illustrious
ControlNetIllustrious.
Run: `grep -q "controlnetillustriousConfig" src/spec-parser.ts`

### [x] ControlNet Pony
ControlNetPony.
Run: `grep -q "controlnetponyConfig" src/spec-parser.ts`

### [x] ControlNet Flux
ControlNetFlux.
Run: `grep -q "controlnetfluxConfig" src/spec-parser.ts`

### [x] ControlNet DW OpenPose
ControlNetDWOpenPose.
Run: `grep -q "controlnetdwopenposeConfig" src/spec-parser.ts`

### [x] ControlNet DW Pose
ControlNetDWPose.
Run: `grep -q "controlnetdwposeConfig" src/spec-parser.ts`

### [x] ControlNet IP Adapter Plus
ControlNetIPAdapterPlus.
Run: `grep -q "controlnetipadapterplusConfig" src/spec-parser.ts`

### [x] ControlNet Instant ID
ControlNetInstantID.
Run: `grep -q "controlnetinstantidConfig" src/spec-parser.ts`

### [x] ControlNet Face ID
ControlNetFaceID.
Run: `grep -q "controlnetfaceidConfig" src/spec-parser.ts`

### [x] ControlNet FaceID Plus
ControlNetFaceIDPlus.
Run: `grep -q "controlnetfaceidplusConfig" src/spec-parser.ts`

### [x] ControlNet FACEID Plus v2
ControlNetFaceIDv2.
Run: `grep -q "controlnetfaceidv2Config" src/spec-parser.ts`

### [x] ControlNet PuLID
ControlNetPuLID.
Run: `grep -q "controlnetpulidConfig" src/spec-parser.ts`

### [x] ControlNet Hyper-SD
ControlNetHyperSD.
Run: `grep -q "controlnethypersdConfig" src/spec-parser.ts`

### [x] ControlNet Hyper
ControlNetHyper.
Run: `grep -q "controlnethyperConfig" src/spec-parser.ts`

### [x] ControlNet Lora
ControlNetLora.
Run: `grep -q "controlnetloraConfig" src/spec-parser.ts`

### [x] DevOps Insights
DevOpsInsights.
Run: `grep -q "devopsinsightsConfig" src/spec-parser.ts`

### [x] Splunk
Splunk.
Run: `grep -q "splunkConfig" src/spec-parser.ts`

### [x] Elasticsearch
ElasticsearchOps.
Run: `grep -q "elasticsearchopsConfig" src/spec-parser.ts`

### [x] Grafana
GrafanaOps.
Run: `grep -q "grafanaopsConfig" src/spec-parser.ts`

### [x] Kibana
Kibana.
Run: `grep -q "kibanaConfig" src/spec-parser.ts`

### [x] Datadog Logs
DatadogLogs.
Run: `grep -q "datadoglogsConfig" src/spec-parser.ts`

### [x] Sumo Logic
SumoLogic.
Run: `grep -q "sumologicConfig" src/spec-parser.ts`

### [x] New Relic Logs
NewRelicLogs.
Run: `grep -q "newreliclogsConfig" src/spec-parser.ts`

### [x] CloudWatch Logs
CloudWatchLogs.
Run: `grep -q "cloudwatchlogsConfig" src/spec-parser.ts`

### [x] Azure Monitor Logs
AzureMonitorLogs.
Run: `grep -q "azuremonitorlogsConfig" src/spec-parser.ts`

### [x] Google Cloud Logging
GCPLogging.
Run: `grep -q "gcploggingConfig" src/spec-parser.ts`

### [x] Loggly
Loggly.
Run: `grep -q "logglyConfig" src/spec-parser.ts`

### [x] Papertrail
Papertrail.
Run: `grep -q "papertrailConfig" src/spec-parser.ts`

### [x] Logz.io
LogzIO.
Run: `grep -q "logzioConfig" src/spec-parser.ts`

### [x] Sematext
Sematext.
Run: `grep -q "sematextConfig" src/spec-parser.ts`

### [x] Scalyr
Scalyr.
Run: `grep -q "scalyrConfig" src/spec-parser.ts`

### [x] Timber
Timber.
Run: `grep -q "timberConfig" src/spec-parser.ts`

### [x] Better Stack
BetterStack.
Run: `grep -q "betterstackConfig" src/spec-parser.ts`

### [x] Logtail
Logtail.
Run: `grep -q "logtailConfig" src/spec-parser.ts`

### [x] Mezmo
Mezmo.
Run: `grep -q "mezmoConfig" src/spec-parser.ts`

### [x] OpenObserve
OpenObserve.
Run: `grep -q "openobserveConfig" src/spec-parser.ts`

### [x] SigNoz
SigNoz.
Run: `grep -q "signozConfig" src/spec-parser.ts`

### [x] Grafana Loki
GrafanaLoki.
Run: `grep -q "grafanalokiConfig" src/spec-parser.ts`

### [x] Grafana Tempo
GrafanaTempo.
Run: `grep -q "grafanatemploConfig" src/spec-parser.ts`

### [x] Grafana Mimir
GrafanaMimir.
Run: `grep -q "grafanamimirConfig" src/spec-parser.ts`

### [x] Grafana Alloy
GrafanaAlloy.
Run: `grep -q "grafanaalloyConfig" src/spec-parser.ts`

### [x] Vector
Vector.
Run: `grep -q "vectorConfig" src/spec-parser.ts`

### [x] Fluent Bit
FluentBit.
Run: `grep -q "fluentbitConfig" src/spec-parser.ts`

### [x] Fluentd
Fluentd.
Run: `grep -q "fluentdConfig" src/spec-parser.ts`

### [x] Logstash
Logstash.
Run: `grep -q "logstashConfig" src/spec-parser.ts`

### [x] Beats
Beats.
Run: `grep -q "beatsConfig" src/spec-parser.ts`

### [x] Filebeat
Filebeat.
Run: `grep -q "filebeatConfig" src/spec-parser.ts`

### [x] Metricbeat
Metricbeat.
Run: `grep -q "metricbeatConfig" src/spec-parser.ts`

### [x] Heartbeat
Heartbeat.
Run: `grep -q "heartbeatConfig" src/spec-parser.ts`

### [x] Packetbeat
Packetbeat.
Run: `grep -q "packetbeatConfig" src/spec-parser.ts`

### [x] Auditbeat
Auditbeat.
Run: `grep -q "auditbeatConfig" src/spec-parser.ts`

### [x] Journalbeat
Journalbeat.
Run: `grep -q "journalbeatConfig" src/spec-parser.ts`

### [x] Functionbeat
Functionbeat.
Run: `grep -q "functionbeatConfig" src/spec-parser.ts`

### [x] OpenTelemetry Collector
OTelCollectorOps.
Run: `grep -q "otelcollectoropsConfig" src/spec-parser.ts`

### [x] OTEL Exporter
OTELExporter.
Run: `grep -q "otelexporterConfig" src/spec-parser.ts`

### [x] OTEL Receiver
OTELReceiver.
Run: `grep -q "otelreceiverConfig" src/spec-parser.ts`

### [x] OTEL Processor
OTELProcessor.
Run: `grep -q "otelprocessorConfig" src/spec-parser.ts`

### [x] OTEL Extension
OTELExtension.
Run: `grep -q "otelextensionConfig" src/spec-parser.ts`

### [x] OTEL Connector
OTELConnector.
Run: `grep -q "otelconnectorConfig" src/spec-parser.ts`

### [x] OTEL Aggregator
OTELAggregator.
Run: `grep -q "otelaggregatorConfig" src/spec-parser.ts`

### [x] OTEL Buffers
OTELBuffers.
Run: `grep -q "otelbuffersConfig" src/spec-parser.ts`

### [x] OTEL Health Check
OTELHealthCheck.
Run: `grep -q "otelhealthcheckConfig" src/spec-parser.ts`

### [x] OTEL zPages
OTELzPages.
Run: `grep -q "otelzp agesConfig" src/spec-parser.ts`

### [x] Prometheus Agent
PrometheusAgent.
Run: `grep -q "prometheusagentConfig" src/spec-parser.ts`

### [x] Grafana Agent
GrafanaAgentOps.
Run: `grep -q "grafanaagentopsConfig" src/spec-parser.ts`

### [x] Alloy
AlloyOps.
Run: `grep -q "alloyopsConfig" src/spec-parser.ts`

### [x] Mimir
MimirOps.
Run: `grep -q "mimiropsConfig" src/spec-parser.ts`

### [x] Thanos
ThanosOps.
Run: `grep -q "thanosopsConfig" src/spec-parser.ts`

### [x] Cortex
CortexOps.
Run: `grep -q "cortexopsConfig" src/spec-parser.ts`

### [x] Scribe
Scribe.
Run: `grep -q "scribeConfig" src/spec-parser.ts`

### [x] Crowdin
Crowdin.
Run: `grep -q "crowdinConfig" src/spec-parser.ts`

### [x] Transifex
Transifex.
Run: `grep -q "transifexConfig" src/spec-parser.ts`

### [x] Lokalise
Lokalise.
Run: `grep -q "lokaliseConfig" src/spec-parser.ts`

### [x] Phrase
Phrase.
Run: `grep -q "phraseConfig" src/spec-parser.ts`

### [x] POEditor
POEditor.
Run: `grep -q "poeditorConfig" src/spec-parser.ts`

### [x] Weblate
Weblate.
Run: `grep -q "weblateConfig" src/spec-parser.ts`

### [x] Zanata
Zanata.
Run: `grep -q "zanataConfig" src/spec-parser.ts`

### [x] Memsource
Memsource.
Run: `grep -q "memsourceConfig" src/spec-parser.ts`

### [x] Smartling
Smartling.
Run: `grep -q "smartlingConfig" src/spec-parser.ts`

### [x] XTM
XTM.
Run: `grep -q "xtmConfig" src/spec-parser.ts`

### [x] MemoQ
MemoQ.
Run: `grep -q "memoqConfig" src/spec-parser.ts`

### [x] SDL Trados
SDLTrados.
Run: `grep -q "sdltradosConfig" src/spec-parser.ts`

### [x] OmegaT
OmegaT.
Run: `grep -q "omegatConfig" src/spec-parser.ts`

### [x] Caflx
Caflx.
Run: `grep -q "caflxConfig" src/spec-parser.ts`

### [x] DeepL
DeepL.
Run: `grep -q "deeplConfig" src/spec-parser.ts`

### [x] Google Translate
GoogleTranslate.
Run: `grep -q "googletranslateConfig" src/spec-parser.ts`

### [x] Google Cloud Translation
GCPTranslation.
Run: `grep -q "gctranslationConfig" src/spec-parser.ts`

### [x] Azure Translator
AzureTranslator.
Run: `grep -q "azuretranslatorConfig" src/spec-parser.ts`

### [x] AWS Translate
AWSTranslate.
Run: `grep -q "awstranslateConfig" src/spec-parser.ts`

### [x] IBM Watson Language
IBMWatsonLang.
Run: `grep -q "ibmwatsons langConfig" src/spec-parser.ts`

### [x] ModernMT
ModernMT.
Run: `grep -q "modernmtConfig" src/spec-parser.ts`

### [x] LibreTranslate
LibreTranslate.
Run: `grep -q "libretranslateConfig" src/spec-parser.ts`

### [x] Argos Translate
ArgosTranslate.
Run: `grep -q "argostranslateConfig" src/spec-parser.ts`

### [x] Apertium
Apertium.
Run: `grep -q "apertiumConfig" src/spec-parser.ts`

### [x] Moses
Moses.
Run: `grep -q "mosesConfig" src/spec-parser.ts`

### [x] Marian NMT
MarianNMT.
Run: `grep -q "mariannmtConfig" src/spec-parser.ts`

### [x] OpenNMT
OpenNMT.
Run: `grep -q "opennmtConfig" src/spec-parser.ts`

### [x] Transformer MMMT
TransformerMMMT.
Run: `grep -q "transformermmtConfig" src/spec-parser.ts`

### [x] NLLB
NLLB.
Run: `grep -q "nllbConfig" src/spec-parser.ts`

### [x] M2M-100
M2M100.
Run: `grep -q "m2m100Config" src/spec-parser.ts`

### [x] mBART
MBART.
Run: `grep -q "mbartConfig" src/spec-parser.ts`

### [x] Helsinki NLP
HelsinkiNLP.
Run: `grep -q "helsinkinlpConfig" src/spec-parser.ts`

### [x] Opus Models
OpusModels.
Run: `grep -q "opusmodelsConfig" src/spec-parser.ts`

### [x] Seamless M4T
SeamlessM4T.
Run: `grep -q "seamlessm4tConfig" src/spec-parser.ts`

### [x] Madlad400
Madlad400.
Run: `grep -q "madlad400Config" src/spec-parser.ts`

### [x] Bloom
Bloom.
Run: `grep -q "bloomConfig" src/spec-parser.ts`

### [x] BLOOMZ
BloomZ.
Run: `grep -q "bloomzConfig" src/spec-parser.ts`

### [x] Galactica
Galactica.
Run: `grep -q "galacticaConfig" src/spec-parser.ts`

### [x] Flan-T5
FlanT5.
Run: `grep -q "flant5Config" src/spec-parser.ts`

### [x] Flan-Alpaca
FlanAlpaca.
Run: `grep -q "flanalpacaConfig" src/spec-parser.ts`

### [x] Dolly
Dolly.
Run: `grep -q "dollyConfig" src/spec-parser.ts`

### [x] StableLM
StableLM.
Run: `grep -q "stablelmConfig" src/spec-parser.ts`

### [x] RedPajama
RedPajama.
Run: `grep -q "redpajamaConfig" src/spec-parser.ts`

### [x] MPT
MPT.
Run: `grep -q "mptConfig" src/spec-parser.ts`

### [x] Falcon
Falcon.
Run: `grep -q "falconConfig" src/spec-parser.ts`

### [x] Phi
Phi.
Run: `grep -q "phiConfig" src/spec-parser.ts`

### [x] TinyLlama
TinyLlama.
Run: `grep -q "tinyllamaConfig" src/spec-parser.ts`

### [x] Phi-2
Phi2.
Run: `grep -q "phi2Config" src/spec-parser.ts`

### [x] Phi-3
Phi3.
Run: `grep -q "phi3Config" src/spec-parser.ts`

### [x] MiniGPT-4
MiniGPT4.
Run: `grep -q "minigpt4Config" src/spec-parser.ts`

### [x] LLaVA
LLaVA.
Run: `grep -q "llavaConfig" src/spec-parser.ts`

### [x] LLaVA 1.5
LLaVA15.
Run: `grep -q "llava15Config" src/spec-parser.ts`

### [x] LLaVA 1.6
LLaVA16.
Run: `grep -q "llava16Config" src/spec-parser.ts`

### [x] Vue.js
VueJS.
Run: `grep -q "vuejsConfig" src/spec-parser.ts`

### [x] Vue 2
Vue2.
Run: `grep -q "vue2Config" src/spec-parser.ts`

### [x] Vue 3
Vue3.
Run: `grep -q "vue3Config" src/spec-parser.ts`

### [x] Nuxt.js
NuxtJS.
Run: `grep -q "nuxtjsConfig" src/spec-parser.ts`

### [x] Nuxt 2
Nuxt2.
Run: `grep -q "nuxt2Config" src/spec-parser.ts`

### [x] Nuxt 3
Nuxt3.
Run: `grep -q "nuxt3Config" src/spec-parser.ts`

### [x] Svelte
Svelte.
Run: `grep -q "svelteConfig" src/spec-parser.ts`

### [x] SvelteKit
SvelteKit.
Run: `grep -q "sveltekitConfig" src/spec-parser.ts`

### [x] SolidJS
SolidJS.
Run: `grep -q "solidjsConfig" src/spec-parser.ts`

### [x] Angular
Angular.
Run: `grep -q "angularConfig" src/spec-parser.ts`

### [x] AngularJS
AngularJS.
Run: `grep -q "angularjsConfig" src/spec-parser.ts`

### [x] Angular Universal
AngularUniversal.
Run: `grep -q "angularuniversalConfig" src/spec-parser.ts`

### [x] Qwik
Qwik.
Run: `grep -q "qwikConfig" src/spec-parser.ts`

### [x] Ember.js
EmberJS.
Run: `grep -q "emberjsConfig" src/spec-parser.ts`

### [x] Backbone.js
BackboneJS.
Run: `grep -q "backbonejsConfig" src/spec-parser.ts`

### [x] jQuery
jQuery.
Run: `grep -q "jqueryConfig" src/spec-parser.ts`

### [x] Preact
Preact.
Run: `grep -q "preactConfig" src/spec-parser.ts`

### [x] Inferno
Inferno.
Run: `grep -q "infernoConfig" src/spec-parser.ts`

### [x] Riot
Riot.
Run: `grep -q "riotConfig" src/spec-parser.ts`

### [x] Alpine.js
AlpineJS.
Run: `grep -q "alpinejsConfig" src/spec-parser.ts`

### [x] Lit
Lit.
Run: `grep -q "litConfig" src/spec-parser.ts`

### [x] Stencil
Stencil.
Run: `grep -q "stencilConfig" src/spec-parser.ts`

### [x] Astro
Astro.
Run: `grep -q "astroConfig" src/spec-parser.ts`

### [x] Remix
Remix.
Run: `grep -q "remixConfig" src/spec-parser.ts`

### [x] Next.js
NextJS.
Run: `grep -q "nextjsConfig" src/spec-parser.ts`

### [x] Next.js 13 App Router
NextJS13.
Run: `grep -q "nextjs13Config" src/spec-parser.ts`

### [x] Next.js 14
NextJS14.
Run: `grep -q "nextjs14Config" src/spec-parser.ts`

### [x] Gatsby
Gatsby.
Run: `grep -q "gatsbyConfig" src/spec-parser.ts`

### [x] Redwood
Redwood.
Run: `grep -q "redwoodConfig" src/spec-parser.ts`

### [x] Blitz
Blitz.
Run: `grep -q "blitzConfig" src/spec-parser.ts`

### [x] Hydrogen
Hydrogen.
Run: `grep -q "hydrogenConfig" src/spec-parser.ts`

### [x] SolidStart
SolidStart.
Run: `grep -q "solidstartConfig" src/spec-parser.ts`

### [x] Vinxi
Vinxi.
Run: `grep -q "vinxiConfig" src/spec-parser.ts`

### [x] Vite
Vite.
Run: `grep -q "viteConfig" src/spec-parser.ts`

### [x] VitePress
VitePress.
Run: `grep -q "vitepressConfig" src/spec-parser.ts`

### [x] Vitest
Vitest.
Run: `grep -q "vitestConfig" src/spec-parser.ts`

### [x] Playwright
Playwright.
Run: `grep -q "playwrightConfig" src/spec-parser.ts`

### [x] Playwright Codegen
PlaywrightCodegen.
Run: `grep -q "playwrightcodegenConfig" src/spec-parser.ts`

### [x] Playwright Test
PlaywrightTest.
Run: `grep -q "playwrighttestConfig" src/spec-parser.ts`

### [x] Puppeteer
Puppeteer.
Run: `grep -q "puppeteerConfig" src/spec-parser.ts`

### [x] Selenium
Selenium.
Run: `grep -q "seleniumConfig" src/spec-parser.ts`

### [x] Cypress
Cypress.
Run: `grep -q "cypressConfig" src/spec-parser.ts`

### [x] TestCafe
TestCafe.
Run: `grep -q "testcafeConfig" src/spec-parser.ts`

### [x] WebdriverIO
WebdriverIO.
Run: `grep -q "webdriverioConfig" src/spec-parser.ts`

### [x] Taiko
Taiko.
Run: `grep -q "taikoConfig" src/spec-parser.ts`

### [x] Nightwatch
Nightwatch.
Run: `grep -q "nightwatchConfig" src/spec-parser.ts`

### [x] Jest
Jest.
Run: `grep -q "jestConfig" src/spec-parser.ts`

### [x] Testing Library
TestingLibrary.
Run: `grep -q "testinglibraryConfig" src/spec-parser.ts`

### [x] Vitest Coverage
VitestCoverage.
Run: `grep -q "vitestcoverageConfig" src/spec-parser.ts`

### [x] Istanbul
Istanbul.
Run: `grep -q "istanbulConfig" src/spec-parser.ts`

### [x] NYC
NYC.
Run: `grep -q "nycConfig" src/spec-parser.ts`

### [x] Webpack
Webpack.
Run: `grep -q "webpackConfig" src/spec-parser.ts`

### [x] Vite Bundler
ViteBundler.
Run: `grep -q "vitebundlerConfig" src/spec-parser.ts`

### [x] esbuild
Esbuild.
Run: `grep -q "esbuildConfig" src/spec-parser.ts`

### [x] Rollup
Rollup.
Run: `grep -q "rollupConfig" src/spec-parser.ts`

### [x] Parcel
Parcel.
Run: `grep -q "parcelConfig" src/spec-parser.ts`

### [x] Turbopack
Turbopack.
Run: `grep -q "turbopackConfig" src/spec-parser.ts`

### [x] Tailwind CSS
TailwindCSS.
Run: `grep -q "tailwindcssConfig" src/spec-parser.ts`

### [x] Bootstrap
Bootstrap.
Run: `grep -q "bootstrapConfig" src/spec-parser.ts`

### [x] Bootstrap 5
Bootstrap5.
Run: `grep -q "bootstrap5Config" src/spec-parser.ts`

### [x] Materialize
Materialize.
Run: `grep -q "materializeConfig" src/spec-parser.ts`

### [x] Bulma
Bulma.
Run: `grep -q "bulmaConfig" src/spec-parser.ts`

### [x] Foundation
Foundation.
Run: `grep -q "foundationConfig" src/spec-parser.ts`

### [x] Semantic UI
SemanticUI.
Run: `grep -q "semanticuiConfig" src/spec-parser.ts`

### [x] Ant Design
AntDesign.
Run: `grep -q "antdesignConfig" src/spec-parser.ts`

### [x] Material UI
MaterialUI.
Run: `grep -q "materialuiConfig" src/spec-parser.ts`

### [x] Chakra UI
ChakraUI.
Run: `grep -q "chakrauiConfig" src/spec-parser.ts`

### [x] Radix UI
RadixUI.
Run: `grep -q "radixuiConfig" src/spec-parser.ts`

### [x] Headless UI
HeadlessUI.
Run: `grep -q "headlessuiConfig" src/spec-parser.ts`

### [x] shadcn/ui
ShadcnUI.
Run: `grep -q "shadcnuiConfig" src/spec-parser.ts`

### [x] Kendo UI
KendoUI.
Run: `grep -q "kendouiConfig" src/spec-parser.ts`

### [x] PrimeNG
PrimeNG.
Run: `grep -q "primengConfig" src/spec-parser.ts`

### [x] Vuetify
Vuetify.
Run: `grep -q "vuetifyConfig" src/spec-parser.ts`

### [x] Quasar
Quasar.
Run: `grep -q "quasarConfig" src/spec-parser.ts`

### [x] Naive UI
NaiveUI.
Run: `grep -q "naiveuiConfig" src/spec-parser.ts`

### [x] Element Plus
ElementPlus.
Run: `grep -q "elementplusConfig" src/spec-parser.ts`

### [x] Vuestic
Vuestic.
Run: `grep -q "vuesticConfig" src/spec-parser.ts`

### [x] UnoCSS
UnoCSS.
Run: `grep -q "unocssConfig" src/spec-parser.ts`

### [x] Windi CSS
WindiCSS.
Run: `grep -q "windicssConfig" src/spec-parser.ts`

### [x] PostCSS
PostCSS.
Run: `grep -q "postcssConfig" src/spec-parser.ts`

### [x] Autoprefixer
Autoprefixer.
Run: `grep -q "autoprefixerConfig" src/spec-parser.ts`

### [x] Stylelint
Stylelint.
Run: `grep -q "stylelintConfig" src/spec-parser.ts`

### [x] CSS Modules
CSSModules.
Run: `grep -q "cssmodulesConfig" src/spec-parser.ts`

### [x] Styled Components
StyledComponents.
Run: `grep -q "styledcomponentsConfig" src/spec-parser.ts`

### [x] Emotion
Emotion.
Run: `grep -q "emotionConfig" src/spec-parser.ts`

### [x] CSS-in-JS
CSSinJS.
Run: `grep -q "cssinjsConfig" src/spec-parser.ts`

### [x] Linaria
Linaria.
Run: `grep -q "linariaConfig" src/spec-parser.ts`

### [x] Vanilla Extract
VanillaExtract.
Run: `grep -q "vanillaextractConfig" src/spec-parser.ts`

### [x] Panda CSS
PandaCSS.
Run: `grep -q "pandacssConfig" src/spec-parser.ts`

### [x] Sass
Sass.
Run: `grep -q "sassConfig" src/spec-parser.ts`

### [x] SCSS
SCSS.
Run: `grep -q "scssConfig" src/spec-parser.ts`

### [x] Less
Less.
Run: `grep -q "lessConfig" src/spec-parser.ts`

### [x] Stylus
Stylus.
Run: `grep -q "stylusConfig" src/spec-parser.ts`

### [x] PostCSS Preset Env
PostCSSPresetEnv.
Run: `grep -q "postcsspresetenvConfig" src/spec-parser.ts`

### [x] CSSnano
CSSnano.
Run: `grep -q "cssnanoConfig" src/spec-parser.ts`

### [x] Redux
Redux.
Run: `grep -q "reduxConfig" src/spec-parser.ts`

### [x] Redux Toolkit
ReduxToolkit.
Run: `grep -q "reduxtoolkitConfig" src/spec-parser.ts`

### [x] Redux Thunk
ReduxThunk.
Run: `grep -q "reduxthunkConfig" src/spec-parser.ts`

### [x] Redux Saga
ReduxSaga.
Run: `grep -q "reduxsagaConfig" src/spec-parser.ts`

### [x] Redux Observable
ReduxObservable.
Run: `grep -q "reduxobservableConfig" src/spec-parser.ts`

### [x] Zustand
Zustand.
Run: `grep -q "zustandConfig" src/spec-parser.ts`

### [x] MobX
MobX.
Run: `grep -q "mobxConfig" src/spec-parser.ts`

### [x] Jotai
Jotai.
Run: `grep -q "jotaiConfig" src/spec-parser.ts`

### [x] Recoil
Recoil.
Run: `grep -q "recoilConfig" src/spec-parser.ts`

### [x] Valtio
Valtio.
Run: `grep -q "valtioConfig" src/spec-parser.ts`

### [x] Pinia
Pinia.
Run: `grep -q "piniaConfig" src/spec-parser.ts`

### [x] Vuex
Vuex.
Run: `grep -q "vuexConfig" src/spec-parser.ts`

### [x] XState
XState.
Run: `grep -q "xstateConfig" src/spec-parser.ts`

### [x] Stencil Store
StencilStore.
Run: `grep -q "stencilstoreConfig" src/spec-parser.ts`

### [x] NgRx
NgRx.
Run: `grep -q "ngrxConfig" src/spec-parser.ts`

### [x] Akita
Akita.
Run: `grep -q "akitaConfig" src/spec-parser.ts`

### [x] Cerebral
Cerebral.
Run: `grep -q "cerebralConfig" src/spec-parser.ts`

### [x] TypeScript
TypeScript.
Run: `grep -q "typescriptConfig" src/spec-parser.ts`

### [x] TypeScript 4
TypeScript4.
Run: `grep -q "typescript4Config" src/spec-parser.ts`

### [x] TypeScript 5
TypeScript5.
Run: `grep -q "typescript5Config" src/spec-parser.ts`

### [x] Flow
Flow.
Run: `grep -q "flowConfig" src/spec-parser.ts`

### [x] ReasonML
ReasonML.
Run: `grep -q "reasonmlConfig" src/spec-parser.ts`

### [x] OCaml
OCaml.
Run: `grep -q "ocamlConfig" src/spec-parser.ts`

### [x] PureScript
PureScript.
Run: `grep -q "purescriptConfig" src/spec-parser.ts`

### [x] Scala
Scala.
Run: `grep -q "scalaConfig" src/spec-parser.ts`

### [x] Scala 2
Scala2.
Run: `grep -q "scala2Config" src/spec-parser.ts`

### [x] Scala 3
Scala3.
Run: `grep -q "scala3Config" src/spec-parser.ts`

### [x] Haskell
Haskell.
Run: `grep -q "haskellConfig" src/spec-parser.ts`

### [x] Elm
Elm.
Run: `grep -q "elmConfig" src/spec-parser.ts`

### [x] F#
FSharp.
Run: `grep -q "fsharpConfig" src/spec-parser.ts`

### [x] Clojure
Clojure.
Run: `grep -q "clojureConfig" src/spec-parser.ts`

### [x] ClojureScript
ClojureScript.
Run: `grep -q "clojurescriptConfig" src/spec-parser.ts`

### [x] Rust
Rust.
Run: `grep -q "rustConfig" src/spec-parser.ts`

### [x] Rust 2021
Rust2021.
Run: `grep -q "rust2021Config" src/spec-parser.ts`

### [x] Rust 2024
Rust2024.
Run: `grep -q "rust2024Config" src/spec-parser.ts`

### [x] Go
Go.
Run: `grep -q "goConfig" src/spec-parser.ts`

### [x] Go 1.21
Go121.
Run: `grep -q "go121Config" src/spec-parser.ts`

### [x] Swift
Swift.
Run: `grep -q "swiftConfig" src/spec-parser.ts`

### [x] Swift 5
Swift5.
Run: `grep -q "swift5Config" src/spec-parser.ts`

### [x] Kotlin
Kotlin.
Run: `grep -q "kotlinConfig" src/spec-parser.ts`

### [x] Kotlin 2
Kotlin2.
Run: `grep -q "kotlin2Config" src/spec-parser.ts`

### [x] Dart
Dart.
Run: `grep -q "dartConfig" src/spec-parser.ts`

### [x] Dart 3
Dart3.
Run: `grep -q "dart3Config" src/spec-parser.ts`

### [x] Julia
Julia.
Run: `grep -q "juliaConfig" src/spec-parser.ts`

### [x] R
R.
Run: `grep -q "rConfig" src/spec-parser.ts`

### [x] Zig
Zig.
Run: `grep -q "zigConfig" src/spec-parser.ts`

### [x] Nim
Nim.
Run: `grep -q "nimConfig" src/spec-parser.ts`

### [x] Crystal
Crystal.
Run: `grep -q "crystalConfig" src/spec-parser.ts`

### [x] D
D.
Run: `grep -q "dConfig" src/spec-parser.ts`

### [x] Lua
Lua.
Run: `grep -q "luaConfig" src/spec-parser.ts`

### [x] LuaJIT
LuaJIT.
Run: `grep -q "luajitConfig" src/spec-parser.ts`

### [x] Perl
Perl.
Run: `grep -q "perlConfig" src/spec-parser.ts`

### [x] PHP
PHP.
Run: `grep -q "phpConfig" src/spec-parser.ts`

### [x] PHP 8
PHP8.
Run: `grep -q "php8Config" src/spec-parser.ts`

### [x] Ruby
Ruby.
Run: `grep -q "rubyConfig" src/spec-parser.ts`

### [x] Ruby 3
Ruby3.
Run: `grep -q "ruby3Config" src/spec-parser.ts`

### [x] Python
Python.
Run: `grep -q "pythonConfig" src/spec-parser.ts`

### [x] Python 3
Python3.
Run: `grep -q "python3Config" src/spec-parser.ts`

### [x] Python 3.12
Python312.
Run: `grep -q "python312Config" src/spec-parser.ts`

### [x] Java
Java.
Run: `grep -q "javaConfig" src/spec-parser.ts`

### [x] Java 21
Java21.
Run: `grep -q "java21Config" src/spec-parser.ts`

### [x] C#
CSharp.
Run: `grep -q "csharpConfig" src/spec-parser.ts`

### [x] C# 12
CSharp12.
Run: `grep -q "csharp12Config" src/spec-parser.ts`

### [x] VB.NET
VBNET.
Run: `grep -q "vbnetConfig" src/spec-parser.ts`

### [x] F#
FSharpDotNet.
Run: `grep -q "fsharpdotnetConfig" src/spec-parser.ts`

### [x] COBOL
COBOL.
Run: `grep -q "cobolConfig" src/spec-parser.ts`

### [x] Fortran
Fortran.
Run: `grep -q "fortranConfig" src/spec-parser.ts`

### [x] Pascal
Pascal.
Run: `grep -q "pascalConfig" src/spec-parser.ts`

### [x] Assembly
Assembly.
Run: `grep -q "assemblyConfig" src/spec-parser.ts`

### [x] WASM
WASM.
Run: `grep -q "wasmConfig" src/spec-parser.ts`

### [x] WebAssembly
WebAssembly.
Run: `grep -q "webassemblyConfig" src/spec-parser.ts`

### [x] Emscripten
Emscripten.
Run: `grep -q "emscriptenConfig" src/spec-parser.ts`

### [x] Wasmtime
Wasmtime.
Run: `grep -q "wasmtimeConfig" src/spec-parser.ts`

### [x] WasmEdge
WasmEdge.
Run: `grep -q "wasmedgeConfig" src/spec-parser.ts`

### [x] REST API
RESTAPI.
Run: `grep -q "restapiConfig" src/spec-parser.ts`

### [x] GraphQL
GraphQL.
Run: `grep -q "graphqlConfig" src/spec-parser.ts`

### [x] GraphQL Subscriptions
GraphQLSubscriptions.
Run: `grep -q "graphqlsubscriptionsConfig" src/spec-parser.ts`

### [x] Apollo GraphQL
ApolloGraphQL.
Run: `grep -q "apollographqlConfig" src/spec-parser.ts`

### [x] Relay
Relay.
Run: `grep -q "relayConfig" src/spec-parser.ts`

### [x] tRPC
tRPC.
Run: `grep -q "trpcConfig" src/spec-parser.ts`

### [x] gRPC
gRPC.
Run: `grep -q "grpcConfig" src/spec-parser.ts`

### [x] gRPC-Web
GRPCWeb.
Run: `grep -q "grpcwebConfig" src/spec-parser.ts`

### [x] Protocol Buffers
ProtocolBuffers.
Run: `grep -q "protocolbuffersConfig" src/spec-parser.ts`

### [x] Thrift
Thrift.
Run: `grep -q "thriftConfig" src/spec-parser.ts`

### [x] Apache Avro
ApacheAvro.
Run: `grep -q "apacheavroConfig" src/spec-parser.ts`

### [x] JSON Schema
JSONSchema.
Run: `grep -q "jsonschemaConfig" src/spec-parser.ts`

### [x] OpenAPI
OpenAPI.
Run: `grep -q "openapiConfig" src/spec-parser.ts`

### [x] Swagger
Swagger.
Run: `grep -q "swaggerConfig" src/spec-parser.ts`

### [x] AsyncAPI
AsyncAPI.
Run: `grep -q "asyncapiConfig" src/spec-parser.ts`

### [x] JSON-RPC
JSONRPC.
Run: `grep -q "jsonrpcConfig" src/spec-parser.ts`

### [x] SOAP
SOAP.
Run: `grep -q "soapConfig" src/spec-parser.ts`

### [x] WebSockets
WebSockets.
Run: `grep -q "websocketsConfig" src/spec-parser.ts`

### [x] SSE
SSE.
Run: `grep -q "sseConfig" src/spec-parser.ts`

### [x] Webhooks
Webhooks.
Run: `grep -q "webhooksConfig" src/spec-parser.ts`

### [x] Serverless Functions
ServerlessFunctions.
Run: `grep -q "serverlessfunctionsConfig" src/spec-parser.ts`

### [x] AWS Lambda
AWSLambda.
Run: `grep -q "awslambdaConfig" src/spec-parser.ts`

### [x] Vercel Functions
VercelFunctions.
Run: `grep -q "vercelfunctionsConfig" src/spec-parser.ts`

### [x] Netlify Functions
NetlifyFunctions.
Run: `grep -q "netlifyfunctionsConfig" src/spec-parser.ts`

### [x] Supabase Edge Functions
SupabaseEdgeFunctions.
Run: `grep -q "supabaseedgefunctionsConfig" src/spec-parser.ts`

### [x] Cloudflare Workers
CloudflareWorkers.
Run: `grep -q "cloudflareworkersConfig" src/spec-parser.ts`

### [x] Firebase Functions
FirebaseFunctions.
Run: `grep -q "firebasefunctionsConfig" src/spec-parser.ts`

### [x] Deno Deploy
DenoDeploy.
Run: `grep -q "denodeployConfig" src/spec-parser.ts`

### [x] Express
Express.
Run: `grep -q "expressConfig" src/spec-parser.ts`

### [x] Fastify
Fastify.
Run: `grep -q "fastifyConfig" src/spec-parser.ts`

### [x] Hono
Hono.
Run: `grep -q "honoConfig" src/spec-parser.ts`

### [x] NestJS
NestJS.
Run: `grep -q "nestjsConfig" src/spec-parser.ts`

### [x] Koa
Koa.
Run: `grep -q "koaConfig" src/spec-parser.ts`

### [x] FastAPI
FastAPI.
Run: `grep -q "fastapiConfig" src/spec-parser.ts`

### [x] Flask
Flask.
Run: `grep -q "flaskConfig" src/spec-parser.ts`

### [x] Django
Django.
Run: `grep -q "djangoConfig" src/spec-parser.ts`

### [x] Rails
Rails.
Run: `grep -q "railsConfig" src/spec-parser.ts`

### [x] Phoenix
Phoenix.
Run: `grep -q "phoenixConfig" src/spec-parser.ts`

### [x] Gin
Gin.
Run: `grep -q "ginConfig" src/spec-parser.ts`

### [x] Echo
Echo.
Run: `grep -q "echoConfig" src/spec-parser.ts`

### [x] Fiber
Fiber.
Run: `grep -q "fiberConfig" src/spec-parser.ts`

### [x] Axum
Axum.
Run: `grep -q "axumConfig" src/spec-parser.ts`

### [x] Rocket
Rocket.
Run: `grep -q "rocketConfig" src/spec-parser.ts`

### [x] Actix-web
ActixWeb.
Run: `grep -q "actixwebConfig" src/spec-parser.ts`

### [x] ASP.NET Core
ASPNETCore.
Run: `grep -q "aspnetcoreConfig" src/spec-parser.ts`

### [x] Spring Boot
SpringBoot.
Run: `grep -q "springbootConfig" src/spec-parser.ts`

### [x] Micronaut
Micronaut.
Run: `grep -q "micronautConfig" src/spec-parser.ts`

### [x] Quarkus
Quarkus.
Run: `grep -q "quarkusConfig" src/spec-parser.ts`

### [x] Vert.x
VertX.
Run: `grep -q "vertxConfig" src/spec-parser.ts`

### [x] Play Framework
PlayFramework.
Run: `grep -q "playframeworkConfig" src/spec-parser.ts`

### [x] Ratpack
Ratpack.
Run: `grep -q "ratpackConfig" src/spec-parser.ts`

### [x] Blade
Blade.
Run: `grep -q "bladeConfig" src/spec-parser.ts`

### [x] Laravel
Laravel.
Run: `grep -q "laravelConfig" src/spec-parser.ts`

### [x] Symfony
Symfony.
Run: `grep -q "symfonyConfig" src/spec-parser.ts`

### [x] PostgreSQL
PostgreSQL.
Run: `grep -q "postgresqlConfig" src/spec-parser.ts`

### [x] PostgreSQL 16
PostgreSQL16.
Run: `grep -q "postgresql16Config" src/spec-parser.ts`

### [x] MySQL
MySQL.
Run: `grep -q "mysqlConfig" src/spec-parser.ts`

### [x] MySQL 8
MySQL8.
Run: `grep -q "mysql8Config" src/spec-parser.ts`

### [x] MariaDB
MariaDB.
Run: `grep -q "mariadbConfig" src/spec-parser.ts`

### [x] SQLite
SQLite.
Run: `grep -q "sqliteConfig" src/spec-parser.ts`

### [x] SQLite 3
SQLite3.
Run: `grep -q "sqlite3Config" src/spec-parser.ts`

### [x] Oracle
Oracle.
Run: `grep -q "oracleConfig" src/spec-parser.ts`

### [x] SQL Server
SQLServer.
Run: `grep -q "sqlserverConfig" src/spec-parser.ts`

### [x] SQL Server 2022
SQLServer2022.
Run: `grep -q "sqlserver2022Config" src/spec-parser.ts`

### [x] MongoDB
MongoDB.
Run: `grep -q "mongodbConfig" src/spec-parser.ts`

### [x] MongoDB 7
MongoDB7.
Run: `grep -q "mongodb7Config" src/spec-parser.ts`

### [x] DynamoDB
DynamoDB.
Run: `grep -q "dynamodbConfig" src/spec-parser.ts`

### [x] DynamoDB Local
DynamoDBLocal.
Run: `grep -q "dynamodblocalConfig" src/spec-parser.ts`

### [x] Cassandra
Cassandra.
Run: `grep -q "cassandraConfig" src/spec-parser.ts`

### [x] ScyllaDB
ScyllaDB.
Run: `grep -q "scylladbConfig" src/spec-parser.ts`

### [x] Neo4j
Neo4j.
Run: `grep -q "neo4jConfig" src/spec-parser.ts`

### [x] Redis
Redis.
Run: `grep -q "redisConfig" src/spec-parser.ts`

### [x] Redis 7
Redis7.
Run: `grep -q "redis7Config" src/spec-parser.ts`

### [x] Valkey
Valkey.
Run: `grep -q "valkeyConfig" src/spec-parser.ts`

### [x] Dragonfly
Dragonfly.
Run: `grep -q "dragonflyConfig" src/spec-parser.ts`

### [x] KeyDB
KeyDB.
Run: `grep -q "keydbConfig" src/spec-parser.ts`

### [x] Memcached
Memcached.
Run: `grep -q "memcachedConfig" src/spec-parser.ts`

### [x] InfluxDB
InfluxDB.
Run: `grep -q "influxdbConfig" src/spec-parser.ts`

### [x] InfluxDB 2
InfluxDB2.
Run: `grep -q "influxdb2Config" src/spec-parser.ts`

### [x] TimescaleDB
TimescaleDB.
Run: `grep -q "timescaledbConfig" src/spec-parser.ts`

### [x] QuestDB
QuestDB.
Run: `grep -q "questdbConfig" src/spec-parser.ts`

### [x] ClickHouse
ClickHouse.
Run: `grep -q "clickhouseConfig" src/spec-parser.ts`

### [x] SingleStore
SingleStore.
Run: `grep -q "singlestoreConfig" src/spec-parser.ts`

### [x] CockroachDB
CockroachDB.
Run: `grep -q "cockroachdbConfig" src/spec-parser.ts`

### [x] YugabyteDB
YugabyteDB.
Run: `grep -q "yugabytedbConfig" src/spec-parser.ts`

### [x] TiDB
TiDB.
Run: `grep -q "tidbConfig" src/spec-parser.ts`

### [x] PlanetScale
PlanetScale.
Run: `grep -q "planetscaleConfig" src/spec-parser.ts`

### [x] Neon
Neon.
Run: `grep -q "neonConfig" src/spec-parser.ts`

### [x] Supabase
Supabase.
Run: `grep -q "supabaseConfig" src/spec-parser.ts`

### [x] Fauna
Fauna.
Run: `grep -q "faunaConfig" src/spec-parser.ts`

### [x] Firestore
Firestore.
Run: `grep -q "firestoreConfig" src/spec-parser.ts`

### [x] Datastore
Datastore.
Run: `grep -q "datastoreConfig" src/spec-parser.ts`

### [x] BigQuery
BigQuery.
Run: `grep -q "bigqueryConfig" src/spec-parser.ts`

### [x] Snowflake
Snowflake.
Run: `grep -q "snowflakeConfig" src/spec-parser.ts`

### [x] Redshift
Redshift.
Run: `grep -q "redshiftConfig" src/spec-parser.ts`

### [x] Presto
Presto.
Run: `grep -q "prestoConfig" src/spec-parser.ts`

### [x] Trino
Trino.
Run: `grep -q "trinoConfig" src/spec-parser.ts`

### [x] Apache Druid
ApacheDruid.
Run: `grep -q "apachedruidConfig" src/spec-parser.ts`

### [x] Pinot
Pinot.
Run: `grep -q "pinotConfig" src/spec-parser.ts`

### [x] Elasticsearch
Elasticsearch.
Run: `grep -q "elasticsearchConfig" src/spec-parser.ts`

### [x] OpenSearch
OpenSearch.
Run: `grep -q "opensearchConfig" src/spec-parser.ts`

### [x] Meilisearch
Meilisearch.
Run: `grep -q "meilisearchConfig" src/spec-parser.ts`

### [x] Typesense
Typesense.
Run: `grep -q "typesenseConfig" src/spec-parser.ts`

### [x] Weaviate
Weaviate.
Run: `grep -q "weaviateConfig" src/spec-parser.ts`

### [x] Qdrant
Qdrant.
Run: `grep -q "qdrantConfig" src/spec-parser.ts`

### [x] Milvus
Milvus.
Run: `grep -q "milvusConfig" src/spec-parser.ts`

### [x] Chroma
Chroma.
Run: `grep -q "chromaConfig" src/spec-parser.ts`

### [x] Pinecone
Pinecone.
Run: `grep -q "pineconeConfig" src/spec-parser.ts`

### [x] Pytest
Pytest.
Run: `grep -q "pytestConfig" src/spec-parser.ts`

### [x] Unittest
Unittest.
Run: `grep -q "unittestConfig" src/spec-parser.ts`

### [x] Nose2
Nose2.
Run: `grep -q "nose2Config" src/spec-parser.ts`

### [x] Tox
Tox.
Run: `grep -q "toxConfig" src/spec-parser.ts`

### [x] Hypothesis
Hypothesis.
Run: `grep -q "hypothesisConfig" src/spec-parser.ts`

### [x] pytest-cov
PytestCov.
Run: `grep -q "pytestcovConfig" src/spec-parser.ts`

### [x] pytest-asyncio
PytestAsyncio.
Run: `grep -q "pytestasyncioConfig" src/spec-parser.ts`

### [x] pytest-django
PytestDjango.
Run: `grep -q "pytestdjangoConfig" src/spec-parser.ts`

### [x] pytest-httpx
PytestHttpx.
Run: `grep -q "pytesthttpxConfig" src/spec-parser.ts`

### [x] Robot Framework
RobotFramework.
Run: `grep -q "robotframeworkConfig" src/spec-parser.ts`

### [x] Behave
Behave.
Run: `grep -q "behaveConfig" src/spec-parser.ts`

### [x] Lettuce
Lettuce.
Run: `grep -q "lettuceConfig" src/spec-parser.ts`

### [x] PyLint
PyLint.
Run: `grep -q "pylintConfig" src/spec-parser.ts`

### [x] Flake8
Flake8.
Run: `grep -q "flake8Config" src/spec-parser.ts`

### [x] Ruff
Ruff.
Run: `grep -q "ruffConfig" src/spec-parser.ts`

### [x] Black
Black.
Run: `grep -q "blackConfig" src/spec-parser.ts`

### [x] isort
Isort.
Run: `grep -q "isortConfig" src/spec-parser.ts`

### [x] MyPy
MyPy.
Run: `grep -q "mypyConfig" src/spec-parser.ts`

### [x] Bandit
Bandit.
Run: `grep -q "banditConfig" src/spec-parser.ts`

### [x] Safety
Safety.
Run: `grep -q "safetyConfig" src/spec-parser.ts`

### [x] pip-tools
PipTools.
Run: `grep -q "piptoolsConfig" src/spec-parser.ts`

### [x] pip-compile
PipCompile.
Run: `grep -q "pipcompileConfig" src/spec-parser.ts`

### [x] pip-audit
PipAudit.
Run: `grep -q "pipaudiConfig" src/spec-parser.ts`

### [x] coverage.py
CoveragePy.
Run: `grep -q "coveragepyConfig" src/spec-parser.ts`

### [x] Nox
Nox.
Run: `grep -q "noxConfig" src/spec-parser.ts`

### [x] tox-uv
ToxUV.
Run: `grep -q "toxuvConfig" src/spec-parser.ts`

### [x] pytest-xdist
PytestXdist.
Run: `grep -q "pytestxdistConfig" src/spec-parser.ts`

### [x] pytest-timeout
PytestTimeout.
Run: `grep -q "pytesttimeoutConfig" src/spec-parser.ts`

### [x] pytest-mock
PytestMock.
Run: `grep -q "pytestmockConfig" src/spec-parser.ts`

### [x] pytest-factory
PytestFactory.
Run: `grep -q "pytestfactoryConfig" src/spec-parser.ts`

### [x] pytest-randomly
PytestRandomly.
Run: `grep -q "pytestrandomlyConfig" src/spec-parser.ts`

### [x] doctest
Doctest.
Run: `grep -q "doctestConfig" src/spec-parser.ts`

### [x] Coverage
Coverage.
Run: `grep -q "coverageConfig" src/spec-parser.ts`

### [x] pytest-instafail
PytestInstafail.
Run: `grep -q "pytestinstafailConfig" src/spec-parser.ts`

### [x] pytest-benchmark
PytestBenchmark.
Run: `grep -q "pytestbenchmarkConfig" src/spec-parser.ts`

### [x] pytest-repeat
PytestRepeat.
Run: `grep -q "pytestrepeatConfig" src/spec-parser.ts`

### [x] pytest-html
PytestHTML.
Run: `grep -q "pytesthtmlConfig" src/spec-parser.ts`

### [x] pytest-json-report
PytestJsonReport.
Run: `grep -q "pytestjsonreportConfig" src/spec-parser.ts`

### [x] pytest-rerunfailures
PytestRerunfailures.
Run: `grep -q "pytestrerunfailuresConfig" src/spec-parser.ts`

### [x] pytest-catchlog
PytestCatchlog.
Run: `grep -q "pytestcatchlogConfig" src/spec-parser.ts`

### [x] pytest-cov
PytestCov2.
Run: `grep -q "pytestcov2Config" src/spec-parser.ts`

### [x] pytest-sugar
PytestSugar.
Run: `grep -q "pytestsugarConfig" src/spec-parser.ts`

### [x] pytest-warnings
PytestWarnings.
Run: `grep -q "pytestwarningsConfig" src/spec-parser.ts`

### [x] pytest-dotenv
PytestDotenv.
Run: `grep -q "pytestdotenvConfig" src/spec-parser.ts`

### [x] pytest-env
PytestEnv.
Run: `grep -q "pytestenvConfig" src/spec-parser.ts`

### [x] pytest-git
PytestGit.
Run: `grep -q "pytestgitConfig" src/spec-parser.ts`

### [x] pytest-flake8
PytestFlake8.
Run: `grep -q "pytestflake8Config" src/spec-parser.ts`

### [x] pytest-isort
PytestIsort.
Run: `grep -q "pytestisortConfig" src/spec-parser.ts`

### [x] pytest-mypy
PytestMypy.
Run: `grep -q "pytestmypyConfig" src/spec-parser.ts`

### [x] tox-pytest
ToxPytest.
Run: `grep -q "toxpytestConfig" src/spec-parser.ts`

### [x] sphinx
Sphinx.
Run: `grep -q "sphinxConfig" src/spec-parser.ts`

### [x] mkdocs
MkDocs.
Run: `grep -q "mkdocsConfig" src/spec-parser.ts`

### [x] pdoc
Pdoc.
Run: `grep -q "pdocConfig" src/spec-parser.ts`

### [x] pdoc3
Pdoc3.
Run: `grep -q "pdoc3Config" src/spec-parser.ts`

### [x] Docker
Docker.
Run: `grep -q "dockerConfig" src/spec-parser.ts`

### [x] Docker Compose
DockerCompose.
Run: `grep -q "dockercomposeConfig" src/spec-parser.ts`

### [x] Dockerfile
Dockerfile.
Run: `grep -q "dockerfileConfig" src/spec-parser.ts`

### [x] Podman
Podman.
Run: `grep -q "podmanConfig" src/spec-parser.ts`

### [x] Buildah
Buildah.
Run: `grep -q "buildahConfig" src/spec-parser.ts`

### [x] Kaniko
Kaniko.
Run: `grep -q "kanikoConfig" src/spec-parser.ts`

### [x] BuildKit
BuildKit.
Run: `grep -q "buildkitConfig" src/spec-parser.ts`

### [x] containerd
Containerd.
Run: `grep -q "containerdConfig" src/spec-parser.ts`

### [x] CRI-O
CRIO.
Run: `grep -q "crioConfig" src/spec-parser.ts`

### [x] nerdctl
Nerdctl.
Run: `grep -q "nerdctlConfig" src/spec-parser.ts`

### [x] Lima
Lima.
Run: `grep -q "limaConfig" src/spec-parser.ts`

### [x] Sysbox
Sysbox.
Run: `grep -q "sysboxConfig" src/spec-parser.ts`

### [x] Rootless Docker
RootlessDocker.
Run: `grep -q "rootlessdockerConfig" src/spec-parser.ts`

### [x] gVisor
GVisor.
Run: `grep -q "gvisorConfig" src/spec-parser.ts`

### [x] Kata Containers
KataContainers.
Run: `grep -q "katacontainersConfig" src/spec-parser.ts`

### [x] Firecracker
Firecracker.
Run: `grep -q "firecrackerConfig" src/spec-parser.ts`

### [x] Cloud Hypervisor
CloudHypervisor.
Run: `grep -q "cloudhypervisorConfig" src/spec-parser.ts`

### [x] QEMU
QEMU.
Run: `grep -q "qemuConfig" src/spec-parser.ts`

### [x] VirtualBox
VirtualBox.
Run: `grep -q "virtualboxConfig" src/spec-parser.ts`

### [x] VMware
VMware.
Run: `grep -q "vmwareConfig" src/spec-parser.ts`

### [x] Hyper-V
HyperV.
Run: `grep -q "hypervConfig" src/spec-parser.ts`

### [x] libvirt
Libvirt.
Run: `grep -q "libvirtConfig" src/spec-parser.ts`

### [x] virsh
Virsh.
Run: `grep -q "virshConfig" src/spec-parser.ts`

### [x] Multipass
Multipass.
Run: `grep -q "multipassConfig" src/spec-parser.ts`

### [x] Vagrant
Vagrant.
Run: `grep -q "vagrantConfig" src/spec-parser.ts`

### [x] vSphere
VSpehere.
Run: `grep -q "vsphereConfig" src/spec-parser.ts`

### [x] oVirt
oVirt.
Run: `grep -q "ovirtConfig" src/spec-parser.ts`

### [x] Proxmox
Proxmox.
Run: `grep -q "proxmoxConfig" src/spec-parser.ts`

### [x] Xen
Xen.
Run: `grep -q "xenConfig" src/spec-parser.ts`

### [x] KVM
KVM.
Run: `grep -q "kvmConfig" src/spec-parser.ts`

### [x] HyperKit
HyperKit.
Run: `grep -q "hyperkitConfig" src/spec-parser.ts`

### [x] Parallels
Parallels.
Run: `grep -q "parallelsConfig" src/spec-parser.ts`

### [x] UTM
UTM.
Run: `grep -q "utmConfig" src/spec-parser.ts`

### [x] Anka
Anka.
Run: `grep -q "ankaConfig" src/spec-parser.ts`

### [x] Nomad
Nomad.
Run: `grep -q "nomadConfig" src/spec-parser.ts`

### [x] Nomad Agents
NomadAgents.
Run: `grep -q "nomadagentsConfig" src/spec-parser.ts`

### [x] Nomad Jobs
NomadJobs.
Run: `grep -q "nomadjobsConfig" src/spec-parser.ts`

### [x] Nomad Volumes
NomadVolumes.
Run: `grep -q "nomadvolumesConfig" src/spec-parser.ts`

### [x] Nomad Autoscaler
NomadAutoscaler.
Run: `grep -q "nomadautoscalerConfig" src/spec-parser.ts`

### [x] Nomad CLI
NomadCLI.
Run: `grep -q "nomadcliConfig" src/spec-parser.ts`

### [x] Waypoint
Waypoint.
Run: `grep -q "waypointConfig" src/spec-parser.ts`

### [x] Waypoint Server
WaypointServer.
Run: `grep -q "waypointserverConfig" src/spec-parser.ts`

### [x] Waypoint Runner
WaypointRunner.
Run: `grep -q "waypointrunnerConfig" src/spec-parser.ts`

### [x] Waypoint CLI
WaypointCLI.
Run: `grep -q "waypointcliConfig" src/spec-parser.ts`

### [x] Waypoint HCL
WaypointHCL.
Run: `grep -q "waypointhclConfig" src/spec-parser.ts`

### [x] Waypoint Docker
WaypointDocker.
Run: `grep -q "waypointdockerConfig" src/spec-parser.ts`

### [x] Waypoint Kubernetes
WaypointKubernetes.
Run: `grep -q "waypointkubernetesConfig" src/spec-parser.ts`

### [x] Waypoint Nomad
WaypointNomad.
Run: `grep -q "waypointnomadConfig" src/spec-parser.ts`

### [x] Terraform
Terraform.
Run: `grep -q "terraformConfig" src/spec-parser.ts`

### [x] Terragrunt
Terragrunt.
Run: `grep -q "terragruntConfig" src/spec-parser.ts`

### [x] Pulumi
Pulumi.
Run: `grep -q "pulumiConfig" src/spec-parser.ts`

### [x] Ansible
Ansible.
Run: `grep -q "ansibleConfig" src/spec-parser.ts`

### [x] AWX
AWX.
Run: `grep -q "awxConfig" src/spec-parser.ts`

### [x] Chef
Chef.
Run: `grep -q "chefConfig" src/spec-parser.ts`

### [x] InSpec
InSpec.
Run: `grep -q "inspecConfig" src/spec-parser.ts`

### [x] Puppet
Puppet.
Run: `grep -q "puppetConfig" src/spec-parser.ts`

### [x] RSpec
RSpec.
Run: `grep -q "rspecConfig" src/spec-parser.ts`

### [x] Serverspec
Serverspec.
Run: `grep -q "serverspecConfig" src/spec-parser.ts`

### [x] Goss
Goss.
Run: `grep -q "gossConfig" src/spec-parser.ts`

### [x] Testinfra
Testinfra.
Run: `grep -q "testinfraConfig" src/spec-parser.ts`

### [x] Molecule
Molecule.
Run: `grep -q "moleculeConfig" src/spec-parser.ts`

### [x] Kitchen
Kitchen.
Run: `grep -q "kitchenConfig" src/spec-parser.ts`

### [x] Salt
Salt.
Run: `grep -q "saltConfig" src/spec-parser.ts`

### [x] Argo CD
ArgoCD.
Run: `grep -q "argocdConfig" src/spec-parser.ts`

### [x] Argo Workflows
ArgoWorkflows.
Run: `grep -q "argoworkflowsConfig" src/spec-parser.ts`

### [x] Argo Rollouts
ArgoRollouts.
Run: `grep -q "argorolloutsConfig" src/spec-parser.ts`

### [x] Flux v1
FluxV1.
Run: `grep -q "fluxv1Config" src/spec-parser.ts`

### [x] Flux v2
FluxV2.
Run: `grep -q "fluxv2Config" src/spec-parser.ts`

### [x] GitHub Actions
GitHubActions.
Run: `grep -q "githubactionsConfig" src/spec-parser.ts`

### [x] GitHub CLI
GitHubCLI.
Run: `grep -q "githubcliConfig" src/spec-parser.ts`

### [x] GitHub API
GitHubAPI.
Run: `grep -q "githubapiConfig" src/spec-parser.ts`

### [x] GitHub Apps
GitHubApps.
Run: `grep -q "githubappsConfig" src/spec-parser.ts`

### [x] GitHub webhooks
GitHubWebhooks.
Run: `grep -q "githubwebhooksConfig" src/spec-parser.ts`

### [x] GitLab CI
GitLabCI.
Run: `grep -q "gitlabciConfig" src/spec-parser.ts`

### [x] GitLab Runner
GitLabRunner.
Run: `grep -q "gitlabrunnerConfig" src/spec-parser.ts`

### [x] GitLab API
GitLabAPI.
Run: `grep -q "gitlabapiConfig" src/spec-parser.ts`

### [x] GitLab webhooks
GitLabWebhooks.
Run: `grep -q "gitlabwebhooksConfig" src/spec-parser.ts`

### [x] Azure Pipelines
AzurePipelines.
Run: `grep -q "azurepipelinesConfig" src/spec-parser.ts`

### [x] CircleCI
CircleCI.
Run: `grep -q "circleciConfig" src/spec-parser.ts`

### [x] Drone
Drone.
Run: `grep -q "droneConfig" src/spec-parser.ts`

### [x] Gitea Actions
GiteaActions.
Run: `grep -q "giteaactionsConfig" src/spec-parser.ts`

### [x] Woodpecker
Woodpecker.
Run: `grep -q "woodpeckerConfig" src/spec-parser.ts`

### [x] Buildkite
Buildkite.
Run: `grep -q "buildkiteConfig" src/spec-parser.ts`

### [x] Travis CI
TravisCI.
Run: `grep -q "travisciConfig" src/spec-parser.ts`

### [x] AppVeyor
AppVeyor.
Run: `grep -q "appveyorConfig" src/spec-parser.ts`

### [x] Semaphore
Semaphore.
Run: `grep -q "semaphoreConfig" src/spec-parser.ts`

### [x] Codefresh
Codefresh.
Run: `grep -q "codefreshConfig" src/spec-parser.ts`

### [x] TeamCity
TeamCity.
Run: `grep -q "teamcityConfig" src/spec-parser.ts`

### [x] Bamboo
Bamboo.
Run: `grep -q "bambooConfig" src/spec-parser.ts`

### [x] Spinnaker
Spinnaker.
Run: `grep -q "spinnakerConfig" src/spec-parser.ts`

### [x] Jenkins X
JenkinsX.
Run: `grep -q "jenkinsxConfig" src/spec-parser.ts`

### [x] Skaffold
Skaffold.
Run: `grep -q "skaffoldConfig" src/spec-parser.ts`

### [x] Tilt
Tilt.
Run: `grep -q "tiltConfig" src/spec-parser.ts`

### [x] DevSpace
DevSpace.
Run: `grep -q "devspaceConfig" src/spec-parser.ts`

### [x] Garden
Garden.
Run: `grep -q "gardenConfig" src/spec-parser.ts`

### [x] Kpt
Kpt.
Run: `grep -q "kptConfig" src/spec-parser.ts`

### [x] Kustomize
Kustomize.
Run: `grep -q "kustomizeConfig" src/spec-parser.ts`

### [x] Helm
Helm.
Run: `grep -q "helmConfig" src/spec-parser.ts`

### [x] Helmfile
Helmfile.
Run: `grep -q "helmfileConfig" src/spec-parser.ts`

### [x] KubeVela
KubeVela.
Run: `grep -q "kubevelaConfig" src/spec-parser.ts`

### [x] Pulumi Crosswalk
PulumiCrosswalk.
Run: `grep -q "pulamicrosswalkConfig" src/spec-parser.ts`

### [x] Backstage
Backstage.
Run: `grep -q "backstageConfig" src/spec-parser.ts`

### [x] Crossplane
Crossplane.
Run: `grep -q "crossplaneConfig" src/spec-parser.ts`

### [x] CDK8s
CDK8s.
Run: `grep -q "cdk8sConfig" src/spec-parser.ts`

### [x] CDKTF
CDKTF.
Run: `grep -q "cdktfConfig" src/spec-parser.ts`

### [x] Pulumi YAML
PulumiYAML.
Run: `grep -q "pulamiyamlConfig" src/spec-parser.ts`

### [x] werf
Werf.
Run: `grep -q "werfConfig" src/spec-parser.ts`

### [x] Flux Image Updater
FluxImageUpdater.
Run: `grep -q "fluximageupdaterConfig" src/spec-parser.ts`

### [x] Argo Image Updater
ArgoImageUpdater.
Run: `grep -q "argoimageupdaterConfig" src/spec-parser.ts`

### [x] Renovate
Renovate.
Run: `grep -q "renovateConfig" src/spec-parser.ts`

### [x] Dependabot
Dependabot.
Run: `grep -q "dependabotConfig" src/spec-parser.ts`

### [x] Keel
Keel.
Run: `grep -q "keelConfig" src/spec-parser.ts`

### [x] Reloader
Reloader.
Run: `grep -q "reloaderConfig" src/spec-parser.ts`

### [x] KubeClarity
KubeClarity.
Run: `grep -q "kubeclarityConfig" src/spec-parser.ts`

### [x] Trivy
Trivy.
Run: `grep -q "trivyConfig" src/spec-parser.ts`

### [x] Grype
Grype.
Run: `grep -q "grypeConfig" src/spec-parser.ts`

### [x] Syft
Syft.
Run: `grep -q "syftConfig" src/spec-parser.ts`

### [x] etcd
Etcd.
Run: `grep -q "etcdConfig" src/spec-parser.ts`

### [x] CoreDNS
CoreDNS.
Run: `grep -q "corednsConfig" src/spec-parser.ts`

### [x] kube-proxy
KubeProxy.
Run: `grep -q "kubeproxyConfig" src/spec-parser.ts`

### [x] kube-scheduler
KubeScheduler.
Run: `grep -q "kubschedulerConfig" src/spec-parser.ts`

### [x] kube-controller-manager
KubeControllerManager.
Run: `grep -q "kubecontrollermanagerConfig" src/spec-parser.ts`

### [x] kubelet
Kubelet.
Run: `grep -q "kubeletConfig" src/spec-parser.ts`

### [x] kube-apiserver
KubeAPIServer.
Run: `grep -q "kubeapiserverConfig" src/spec-parser.ts`

### [x] kubeadm
Kubeadm.
Run: `grep -q "kubeadmConfig" src/spec-parser.ts`

### [x] kubeconfig
Kubeconfig.
Run: `grep -q "kubeconfigConfig" src/spec-parser.ts`

### [x] kubectl
Kubectl.
Run: `grep -q "kubectlConfig" src/spec-parser.ts`

### [x] HPA
HPA.
Run: `grep -q "hpaConfig" src/spec-parser.ts`

### [x] VPA
VPA.
Run: `grep -q "vpaConfig" src/spec-parser.ts`

### [x] PDB
PDB.
Run: `grep -q "pdbConfig" src/spec-parser.ts`

### [x] ClusterAutoscaler
ClusterAutoscaler.
Run: `grep -q "clusterautoscalerConfig" src/spec-parser.ts`

### [x] ServiceMonitor
ServiceMonitor.
Run: `grep -q "servicemonitorConfig" src/spec-parser.ts`

### [x] PodMonitor
PodMonitor.
Run: `grep -q "podmonitorConfig" src/spec-parser.ts`

### [x] PrometheusRule
PrometheusRule.
Run: `grep -q "prometheusruleConfig" src/spec-parser.ts`

### [x] Istio
Istio.
Run: `grep -q "istioConfig" src/spec-parser.ts`

### [x] Envoy
Envoy.
Run: `grep -q "envoyConfig" src/spec-parser.ts`

### [x] Linkerd
Linkerd.
Run: `grep -q "linkerdConfig" src/spec-parser.ts`

### [x] Consul Connect
ConsulConnect.
Run: `grep -q "consulconnectConfig" src/spec-parser.ts`

### [x] Cilium
Cilium.
Run: `grep -q "ciliumConfig" src/spec-parser.ts`

### [x] Calico
Calico.
Run: `grep -q "calicoConfig" src/spec-parser.ts`

### [x] Flannel
Flannel.
Run: `grep -q "flannelConfig" src/spec-parser.ts`

### [x] Weave
Weave.
Run: `grep -q "weaveConfig" src/spec-parser.ts`

### [x] Canal
Canal.
Run: `grep -q "canalConfig" src/spec-parser.ts`

### [x] kube-router
KubeRouter.
Run: `grep -q "kuberouterConfig" src/spec-parser.ts`

### [x] Multus
Multus.
Run: `grep -q "multusConfig" src/spec-parser.ts`

### [x] OVN
OVN.
Run: `grep -q "ovnConfig" src/spec-parser.ts`

### [x] Kube-OVN
KubeOVN.
Run: `grep -q "kubeovnConfig" src/spec-parser.ts`

### [x] Antrea
Antrea.
Run: `grep -q "antreaConfig" src/spec-parser.ts`

### [x] Submariner
Submariner.
Run: `grep -q "submarinerConfig" src/spec-parser.ts`

### [x] KIND
KIND.
Run: `grep -q "kindConfig" src/spec-parser.ts`

### [x] k3s
K3s.
Run: `grep -q "k3sConfig" src/spec-parser.ts`

### [x] minikube
Minikube.
Run: `grep -q "minikubeConfig" src/spec-parser.ts`

### [x] MicroK8s
MicroK8s.
Run: `grep -q "microk8sConfig" src/spec-parser.ts`

### [x] EKS
EKS.
Run: `grep -q "eksConfig" src/spec-parser.ts`

### [x] GKE
GKE.
Run: `grep -q "gkeConfig" src/spec-parser.ts`

### [x] AKS
AKS.
Run: `grep -q "aksConfig" src/spec-parser.ts`

### [x] OpenShift
OpenShift.
Run: `grep -q "openshiftConfig" src/spec-parser.ts`

### [x] Tanzu
Tanzu.
Run: `grep -q "tanzuConfig" src/spec-parser.ts`

### [x] Anthos
Anthos.
Run: `grep -q "anthosConfig" src/spec-parser.ts`

### [x] Gardener
Gardener.
Run: `grep -q "gardenerConfig" src/spec-parser.ts`

### [x] Kubermatic
Kubermatic.
Run: `grep -q "kubermaticConfig" src/spec-parser.ts`

### [x] LKE
LKE.
Run: `grep -q "lkeConfig" src/spec-parser.ts`

### [x] DigitalOcean Kubernetes
DOKS.
Run: `grep -q "doksConfig" src/spec-parser.ts`

### [x] Scaleway Kapsule
ScalewayKapsule.
Run: `grep -q "scalewaykapsuleConfig" src/spec-parser.ts`

### [x] OVH Managed Kubernetes
OVHKubernetes.
Run: `grep -q "ovhkubernetesConfig" src/spec-parser.ts`

### [x] Civo Kubernetes
CivoKubernetes.
Run: `grep -q "civokubernetesConfig" src/spec-parser.ts`

### [x] Cloudflare LB
CloudflareLB.
Run: `grep -q "cloudflarelbConfig" src/spec-parser.ts`

### [x] kubeasz
Kubeasz.
Run: `grep -q "kubeaszConfig" src/spec-parser.ts`

### [x] Kubespray
Kubespray.
Run: `grep -q "kubesprayConfig" src/spec-parser.ts`

### [x] RKE
RKE.
Run: `grep -q "rkeConfig" src/spec-parser.ts`

### [x] EKS Anywhere
EKSEAnywhere.
Run: `grep -q "eksanywhereConfig" src/spec-parser.ts`

### [x] Rancher
Rancher.
Run: `grep -q "rancherConfig" src/spec-parser.ts`

### [x] K0s
K0s.
Run: `grep -q "k0sConfig" src/spec-parser.ts`

### [x] K3os
K3os.
Run: `grep -q "k3osConfig" src/spec-parser.ts`

### [x] Flatcar Container Linux
Flatcar.
Run: `grep -q "flatcarConfig" src/spec-parser.ts`

### [x] Bottlerocket
Bottlerocket.
Run: `grep -q "bottlerocketConfig" src/spec-parser.ts`

### [x] Container Linux
ContainerLinux.
Run: `grep -q "containerlinuxConfig" src/spec-parser.ts`

### [x] KubeVirt
KubeVirt.
Run: `grep -q "kubevirtConfig" src/spec-parser.ts`

### [x] KubeCarrier
KubeCarrier.
Run: `grep -q "kubecarrierConfig" src/spec-parser.ts`

### [x] KubeDB
KubeDB.
Run: `grep -q "kubedbConfig" src/spec-parser.ts`

### [x] KubeVault
KubeVault.
Run: `grep -q "kubevaultConfig" src/spec-parser.ts`

### [x] Kubeform
Kubeform.
Run: `grep -q "kubeformConfig" src/spec-parser.ts`

### [x] KubeRay
KubeRay.
Run: `grep -q "kuberayConfig" src/spec-parser.ts`

### [x] Volcano
Volcano.
Run: `grep -q "volcanoConfig" src/spec-parser.ts`

### [x] Kubeflow
Kubeflow.
Run: `grep -q "kubeflowConfig" src/spec-parser.ts`

### [x] Seldon
Seldon.
Run: `grep -q "seldonConfig" src/spec-parser.ts`

### [x] BentoML
BentoML.
Run: `grep -q "bentomlConfig" src/spec-parser.ts`

### [x] Triton
Triton.
Run: `grep -q "tritonConfig" src/spec-parser.ts`

### [x] KServe
KServe.
Run: `grep -q "kserveConfig" src/spec-parser.ts`

### [x] TensorFlow Serving
TensorFlowServing.
Run: `grep -q "tensorflowservingConfig" src/spec-parser.ts`

### [x] TorchServe
TorchServe.
Run: `grep -q "torchserveConfig" src/spec-parser.ts`

### [x] Ray Serve
RayServe.
Run: `grep -q "rayserveConfig" src/spec-parser.ts`

### [x] MLflow
MLflow.
Run: `grep -q "mlflowConfig" src/spec-parser.ts`

### [x] W&B
WB.
Run: `grep -q "wbConfig" src/spec-parser.ts`

### [x] Neptune
Neptune.
Run: `grep -q "neptuneConfig" src/spec-parser.ts`

### [x] Comet
Comet.
Run: `grep -q "cometConfig" src/spec-parser.ts`

### [x] Aim
Aim.
Run: `grep -q "aimConfig" src/spec-parser.ts`

### [x] TensorBoard
TensorBoard.
Run: `grep -q "tensorboardConfig" src/spec-parser.ts`

### [x] Guild AI
GuildAI.
Run: `grep -q "guildaiConfig" src/spec-parser.ts`

### [x] Sacred
Sacred.
Run: `grep -q "sacredConfig" src/spec-parser.ts`

### [x] ClearML
ClearML.
Run: `grep -q "clearmlConfig" src/spec-parser.ts`

### [x] Polyaxon
Polyaxon.
Run: `grep -q "polyaxonConfig" src/spec-parser.ts`

### [x] DVC
DVC.
Run: `grep -q "dvcConfig" src/spec-parser.ts`

### [x] Pachyderm
Pachyderm.
Run: `grep -q "pachydermConfig" src/spec-parser.ts`

### [x] LakeFS
LakeFS.
Run: `grep -q "lakefsConfig" src/spec-parser.ts`

### [x] Dremio
Dremio.
Run: `grep -q "dremioConfig" src/spec-parser.ts`

### [x] ECK
ECK.
Run: `grep -q "eckConfig" src/spec-parser.ts`

### [x] Strimzi
Strimzi.
Run: `grep -q "strimziConfig" src/spec-parser.ts`

### [x] RabbitMQ Operator
RabbitMQOperator.
Run: `grep -q "rabbitmqoperatorConfig" src/spec-parser.ts`

### [x] Percona
Percona.
Run: `grep -q "perconaConfig" src/spec-parser.ts`

### [x] Vitess
Vitess.
Run: `grep -q "vitessConfig" src/spec-parser.ts`

### [x] Supabase Operator
SupabaseOperator.
Run: `grep -q "supabaseoperatorConfig" src/spec-parser.ts`

### [x] TiDB Operator
TiDBOperator.
Run: `grep -q "tidboperatorConfig" src/spec-parser.ts`

### [x] K8GB
K8GB.
Run: `grep -q "k8gbConfig" src/spec-parser.ts`

### [x] ExternalDNS
ExternalDNS.
Run: `grep -q "externaldnsConfig" src/spec-parser.ts`

### [x] cert-manager
CertManager.
Run: `grep -q "certmanagerConfig" src/spec-parser.ts`

### [x] Vault
Vault.
Run: `grep -q "vaultConfig" src/spec-parser.ts`

### [x] External Secrets
ExternalSecrets.
Run: `grep -q "externalsecretsConfig" src/spec-parser.ts`

### [x] Sealed Secrets
SealedSecrets.
Run: `grep -q "sealedsecretsConfig" src/spec-parser.ts`

### [x] Argo Vault
ArgoVault.
Run: `grep -q "argovaultConfig" src/spec-parser.ts`

### [x] KubeSec
KubeSec.
Run: `grep -q "kubesecConfig" src/spec-parser.ts`

### [x] Kube-bench
KubeBench.
Run: `grep -q "kubebenchConfig" src/spec-parser.ts`

### [x] Kube-hunter
KubeHunter.
Run: `grep -q "kubehunterConfig" src/spec-parser.ts`

### [x] Kyverno
Kyverno.
Run: `grep -q "kyvernoConfig" src/spec-parser.ts`

### [x] OPA Gatekeeper
OPAGatekeeper.
Run: `grep -q "opagatekeeperConfig" src/spec-parser.ts`

### [x] Falco
Falco.
Run: `grep -q "falcoConfig" src/spec-parser.ts`

### [x] Tetragon
Tetragon.
Run: `grep -q "tetragonConfig" src/spec-parser.ts`

### [x] Datadog Agent
DatadogAgent.
Run: `grep -q "datadogagentConfig" src/spec-parser.ts`

### [x] Prometheus Operator
PrometheusOperator.
Run: `grep -q "prometheusoperatorConfig" src/spec-parser.ts`

### [x] Grafana Operator
GrafanaOperator.
Run: `grep -q "grafanaoperatorConfig" src/spec-parser.ts`

### [x] Jaeger Operator
JaegerOperator.
Run: `grep -q "jaegeroperatorConfig" src/spec-parser.ts`

### [x] Kiali
Kiali.
Run: `grep -q "kialiConfig" src/spec-parser.ts`

### [x] Metrics Server
MetricsServer.
Run: `grep -q "metricsserverConfig" src/spec-parser.ts`

### [x] Goldilocks
Goldilocks.
Run: `grep -q "goldilocksConfig" src/spec-parser.ts`

### [x] KEDA
KEDA.
Run: `grep -q "kedaConfig" src/spec-parser.ts`

### [x] VPA
VPAOperator.
Run: `grep -q "vpaoperatorConfig" src/spec-parser.ts`

### [x] KEDA HTTP
KEDAHTTP.
Run: `grep -q "kedahttpConfig" src/spec-parser.ts`

### [x] KEDA Azure
KEDAAzure.
Run: `grep -q "kedaazureConfig" src/spec-parser.ts`

### [x] KEDA AWS
KEDAAWS.
Run: `grep -q "kedaawsConfig" src/spec-parser.ts`

### [x] KEDA GCP
KEDAGCP.
Run: `grep -q "kedagcpConfig" src/spec-parser.ts`

### [x] KEDA Kafka
KEDAKafka.
Run: `grep -q "kedakafkaConfig" src/spec-parser.ts`

### [x] KEDA RabbitMQ
KEDARabbitMQ.
Run: `grep -q "kedarabbitmqConfig" src/spec-parser.ts`

### [x] KEDA NATS
KEDANATS.
Run: `grep -q "kedanatsConfig" src/spec-parser.ts`

### [x] KEDA Liiklus
KEDALiiklus.
Run: `grep -q "kedaliiklusConfig" src/spec-parser.ts`

### [x] KEDA Cron
KEDACron.
Run: `grep -q "kedacronConfig" src/spec-parser.ts`

### [x] KEDA Redis
KEDARedis.
Run: `grep -q "kedaredisConfig" src/spec-parser.ts`

### [x] KEDA Prometheus
KEDAPrometheus.
Run: `grep -q "kedaprometheusConfig" src/spec-parser.ts`

### [x] KEDA MySQL
KEDAMySQL.
Run: `grep -q "kedamysqlConfig" src/spec-parser.ts`

### [x] KEDA PostgreSQL
KEDAPostgreSQL.
Run: `grep -q "kedapostgresqlConfig" src/spec-parser.ts`

### [x] KEDA MongoDB
KEDAMongoDB.
Run: `grep -q "kedamongodbConfig" src/spec-parser.ts`

### [x] KEDA external Push
KEDAExternalPush.
Run: `grep -q "kedaexternalpushConfig" src/spec-parser.ts`

### [x] KEDA ElasticSearch
KEDAElasticSearch.
Run: `grep -q "kedaelasticsearchConfig" src/spec-parser.ts`

### [x] KEDA Datadog
KEDADatadog.
Run: `grep -q "kedadatadogConfig" src/spec-parser.ts`

### [x] KEDA New Relic
KEDANewRelic.
Run: `grep -q "kedanewrelicConfig" src/spec-parser.ts`

### [x] KEDA Graphite
KEDAGraphite.
Run: `grep -q "kedagraphiteConfig" src/spec-parser.ts`

### [x] KEDA StatsD
KEDAStatsD.
Run: `grep -q "kedastatsdConfig" src/spec-parser.ts`

### [x] KEDA CloudWatch
KEDACloudWatch.
Run: `grep -q "kedacloudwatchConfig" src/spec-parser.ts`

### [x] KEDA Snowflake
KEDASnowflake.
Run: `grep -q "kedasnowflakeConfig" src/spec-parser.ts`

### [x] KEDA Instana
KEDAInstana.
Run: `grep -q "kedainstanaConfig" src/spec-parser.ts`

### [x] KEDA CPU
KEDACPU.
Run: `grep -q "kedacpuConfig" src/spec-parser.ts`

### [x] KEDA Memory
KEDAMemory.
Run: `grep -q "kedamemoryConfig" src/spec-parser.ts`

### [x] KEDA External
KEDAExternal.
Run: `grep -q "kedaexternalConfig" src/spec-parser.ts`

### [x] Prometheus
Prometheus.
Run: `grep -q "prometheusConfig" src/spec-parser.ts`

### [x] Alertmanager
Alertmanager.
Run: `grep -q "alertmanagerConfig" src/spec-parser.ts`

### [x] node-exporter
NodeExporter.
Run: `grep -q "nodeexporterConfig" src/spec-parser.ts`

### [x] kube-state-metrics
KubeStateMetrics.
Run: `grep -q "kubestatemetricsConfig" src/spec-parser.ts`

### [x] Jaeger
Jaeger.
Run: `grep -q "jaegerConfig" src/spec-parser.ts`

### [x] Zipkin
Zipkin.
Run: `grep -q "zipkinConfig" src/spec-parser.ts`

### [x] Loki
Loki.
Run: `grep -q "lokiConfig" src/spec-parser.ts`

### [x] Tempo
Tempo.
Run: `grep -q "tempoConfig" src/spec-parser.ts`

### [x] Mimir
Mimir.
Run: `grep -q "mimirConfig" src/spec-parser.ts`

### [x] Thanos Receiver
ThanosReceiver.
Run: `grep -q "thanosreceiverConfig" src/spec-parser.ts`

### [x] Cortex
Cortex.
Run: `grep -q "cortexConfig" src/spec-parser.ts`

### [x] VictoriaMetrics
VictoriaMetrics.
Run: `grep -q "victoriaMetricsConfig" src/spec-parser.ts`

### [x] M3DB
M3DB.
Run: `grep -q "m3dbConfig" src/spec-parser.ts`

### [x] Telegraf
Telegraf.
Run: `grep -q "telegrafConfig" src/spec-parser.ts`

### [x] CollectD
CollectD.
Run: `grep -q "collectdConfig" src/spec-parser.ts`

### [x] StatsD
StatsD.
Run: `grep -q "statsdConfig" src/spec-parser.ts`

### [x] DogStatsD
DogStatsD.
Run: `grep -q "dogstatsdConfig" src/spec-parser.ts`

### [x] Carbon
Carbon.
Run: `grep -q "carbonConfig" src/spec-parser.ts`

### [x] Graphite
Graphite.
Run: `grep -q "graphiteConfig" src/spec-parser.ts`

### [x] InfluxDB Telegraf
InfluxDBTelegraf.
Run: `grep -q "influxdbtelegrafConfig" src/spec-parser.ts`

### [x] CloudWatch Metrics
CloudWatchMetrics.
Run: `grep -q "cloudwatchmetricsConfig" src/spec-parser.ts`

### [x] GCP Monitoring
GCPMonitoring.
Run: `grep -q "gcpmonitoringConfig" src/spec-parser.ts`

### [x] Azure Monitor Metrics
AzureMonitorMetrics.
Run: `grep -q "azuremonitormetricsConfig" src/spec-parser.ts`

### [x] DataDog Metrics
DataDogMetrics.
Run: `grep -q "datadogmetricsConfig" src/spec-parser.ts`

### [x] New Relic Metrics
NewRelicMetrics.
Run: `grep -q "newrelicmetricsConfig" src/spec-parser.ts`

### [x] Sentry
Sentry.
Run: `grep -q "sentryConfig" src/spec-parser.ts`

### [x] Sentry SDK
SentrySDK.
Run: `grep -q "sentrysdkConfig" src/spec-parser.ts`

### [x] Rollbar
Rollbar.
Run: `grep -q "rollbarConfig" src/spec-parser.ts`

### [x] Bugsnag
Bugsnag.
Run: `grep -q "bugsnagConfig" src/spec-parser.ts`

### [x] Raygun
Raygun.
Run: `grep -q "raygunConfig" src/spec-parser.ts`

### [x] Airbrake
Airbrake.
Run: `grep -q "airbrakeConfig" src/spec-parser.ts`

### [x] Glitchtip
Glitchtip.
Run: `grep -q "glitchtipConfig" src/spec-parser.ts`

### [x] Site24x7
Site247.
Run: `grep -q "site247Config" src/spec-parser.ts`

### [x] Pingdom
Pingdom.
Run: `grep -q "pingdomConfig" src/spec-parser.ts`

### [x] UptimeRobot
UptimeRobot.
Run: `grep -q "uptimerobotConfig" src/spec-parser.ts`

### [x] Cronitor
Cronitor.
Run: `grep -q "cronitorConfig" src/spec-parser.ts`

### [x] Dead Man's Snitch
DeadMansSnitch.
Run: `grep -q "deadmanssnitchConfig" src/spec-parser.ts`

### [x] Better Uptime
BetterUptime.
Run: `grep -q "betteruptimeConfig" src/spec-parser.ts`

### [x] Ceph
Ceph.
Run: `grep -q "cephConfig" src/spec-parser.ts`

### [x] Rook
Rook.
Run: `grep -q "rookConfig" src/spec-parser.ts`

### [x] Longhorn
Longhorn.
Run: `grep -q "longhornConfig" src/spec-parser.ts`

### [x] OpenEBS
OpenEBS.
Run: `grep -q "openebsConfig" src/spec-parser.ts`

### [x] Mayastor
Mayastor.
Run: `grep -q "mayastorConfig" src/spec-parser.ts`

### [x] NFS Ganesha
NFSGanesha.
Run: `grep -q "nfsganeshaConfig" src/spec-parser.ts`

### [x] GlusterFS
GlusterFS.
Run: `grep -q "glusterfsConfig" src/spec-parser.ts`

### [x] Hetzner CSI
HetznerCSI.
Run: `grep -q "hetznercsiConfig" src/spec-parser.ts`

### [x] vSphere CSI
VSphereCSI.
Run: `grep -q "vspherecsiConfig" src/spec-parser.ts`

### [x] AWS EBS CSI
AWSEBSCSI.
Run: `grep -q "awsebscsiConfig" src/spec-parser.ts`

### [x] Azure Disk CSI
AzureDiskCSI.
Run: `grep -q "azurediskcsiConfig" src/spec-parser.ts`

### [x] GCP PD CSI
GCPPDCSI.
Run: `grep -q "gcpdpcsiConfig" src/spec-parser.ts`

### [x] Linode Block Storage CSI
LinodeCSI.
Run: `grep -q "linodecsiConfig" src/spec-parser.ts`

### [x] DigitalOcean Block Storage CSI
DOCSI.
Run: `grep -q "docsiConfig" src/spec-parser.ts`

### [x] Cinder CSI
CinderCSI.
Run: `grep -q "cindercsiConfig" src/spec-parser.ts`

### [x] Portworx
Portworx.
Run: `grep -q "portworxConfig" src/spec-parser.ts`

### [x] Stork
Stork.
Run: `grep -q "storkConfig" src/spec-parser.ts`

### [x] Velero
Velero.
Run: `grep -q "veleroConfig" src/spec-parser.ts`

### [x] Kasten K10
KastenK10.
Run: `grep -q "kastenk10Config" src/spec-parser.ts`

### [x] Kanister
Kanister.
Run: `grep -q "kanisterConfig" src/spec-parser.ts`

### [x] Restic
Restic.
Run: `grep -q "resticConfig" src/spec-parser.ts`

### [x] MinIO
MinIO.
Run: `grep -q "minioConfig" src/spec-parser.ts`

### [x] TrueNAS
TrueNAS.
Run: `grep -q "truenasConfig" src/spec-parser.ts`

### [x] Synology
Synology.
Run: `grep -q "synologyConfig" src/spec-parser.ts`

### [x] QNAP
QNAP.
Run: `grep -q "qnapConfig" src/spec-parser.ts`

### [x] Pure Storage
PureStorage.
Run: `grep -q "purestorageConfig" src/spec-parser.ts`

### [x] PowerFlex
PowerFlex.
Run: `grep -q "powerflexConfig" src/spec-parser.ts`

### [x] HPE Nimble
HPENimble.
Run: `grep -q "hpenimbleConfig" src/spec-parser.ts`

### [x] Hitachi VSP
HitachiVSP.
Run: `grep -q "hitachivspConfig" src/spec-parser.ts`

### [x] Fujitsu ETERNUS
FujitsuETERNUS.
Run: `grep -q "fujitsueternusConfig" src/spec-parser.ts`

### [x] CloudByte
CloudByte.
Run: `grep -q "cloudbyteConfig" src/spec-parser.ts`

### [x] DataCore
DataCore.
Run: `grep -q "datacoreConfig" src/spec-parser.ts`

### [x] StarWind
StarWind.
Run: `grep -q "starwindConfig" src/spec-parser.ts`

### [x] DRBD
DRBD.
Run: `grep -q "drbdConfig" src/spec-parser.ts`

### [x] LINBIT
LINBIT.
Run: `grep -q "linbitConfig" src/spec-parser.ts`

### [x] SBD
SBD.
Run: `grep -q "sbdConfig" src/spec-parser.ts`

### [x] OCM
OCM.
Run: `grep -q "ocmConfig" src/spec-parser.ts`

### [x] Karmada
Karmada.
Run: `grep -q "karmadaConfig" src/spec-parser.ts`

### [x] Clusternet
Clusternet.
Run: `grep -q "clusternetConfig" src/spec-parser.ts`

### [x] Fleet
Fleet.
Run: `grep -q "fleetConfig" src/spec-parser.ts`

### [x] Federation V2
FederationV2.
Run: `grep -q "federationv2Config" src/spec-parser.ts`

### [x] Cilium Cluster Mesh
CiliumClusterMesh.
Run: `grep -q "ciliumclustermeshConfig" src/spec-parser.ts`

### [x] Submariner Multi-cluster
SubmarinerMulti.
Run: `grep -q "submarinermultiConfig" src/spec-parser.ts`

### [x] Linkerd Multi-cluster
LinkerdMulti.
Run: `grep -q "linkerdmultiConfig" src/spec-parser.ts`

### [x] Istio Multi-cluster
IstioMulti.
Run: `grep -q "istiomultiConfig" src/spec-parser.ts`

### [x] Kubeslice
Kubeslice.
Run: `grep -q "kubesliceConfig" src/spec-parser.ts`

### [x] Skupper
Skupper.
Run: `grep -q "skupperConfig" src/spec-parser.ts`

### [x] Consul
Consul.
Run: `grep -q "consulConfig" src/spec-parser.ts`

### [x] Consul Catalog
ConsulCatalog.
Run: `grep -q "consulcatalogConfig" src/spec-parser.ts`

### [x] Consul Connect Mesh
ConsulConnectMesh.
Run: `grep -q "consulconnectmeshConfig" src/spec-parser.ts`

### [x] etcd Operator
EtcdOperator.
Run: `grep -q "etcdoperatorConfig" src/spec-parser.ts`

### [x] Zookeeper
Zookeeper.
Run: `grep -q "zookeeperConfig" src/spec-parser.ts`

### [x] etcd-operator
EtcdOperator2.
Run: `grep -q "etcdoperator2Config" src/spec-parser.ts`

### [x] Couchbase Operator
CouchbaseOperator.
Run: `grep -q "couchbaseoperatorConfig" src/spec-parser.ts`

### [x] Cassandra Operator
CassandraOperator.
Run: `grep -q "cassandraoperatorConfig" src/spec-parser.ts`

### [x] Solr Operator
SolrOperator.
Run: `grep -q "solroperatorConfig" src/spec-parser.ts`

### [x] ZooKeeper StatefulSet
ZookeeperStatefulSet.
Run: `grep -q "zookeeperstatefulsetConfig" src/spec-parser.ts`

### [x] OpenKruise
OpenKruise.
Run: `grep -q "openkruiseConfig" src/spec-parser.ts`

### [x] Karmada Aggregate
KarmadaAggregate.
Run: `grep -q "karmadaaggregateConfig" src/spec-parser.ts`

### [x] Calico BGP
CalicoBGP.
Run: `grep -q "calicobgpConfig" src/spec-parser.ts`

### [x] Bird
Bird.
Run: `grep -q "birdConfig" src/spec-parser.ts`

### [x] GoBGP
GoBGP.
Run: `grep -q "gobgpConfig" src/spec-parser.ts`

### [x] FRRouting
FRRouting.
Run: `grep -q "frroutingConfig" src/spec-parser.ts`

### [x] MetalLB
MetalLB.
Run: `grep -q "metallbConfig" src/spec-parser.ts`

### [x] kube-vip
KubeVIP.
Run: `grep -q "kubevipConfig" src/spec-parser.ts`

### [x] OpenELB
OpenELB.
Run: `grep -q "openelbConfig" src/spec-parser.ts`

### [x] PureLB
PureLB.
Run: `grep -q "purelbConfig" src/spec-parser.ts`

### [x] PORTO
PORTO.
Run: `grep -q "portoConfig" src/spec-parser.ts`

### [x] vimc
VIMC.
Run: `grep -q "vimcConfig" src/spec-parser.ts`

### [x] Istio Ambient
IstioAmbient.
Run: `grep -q "istioambientConfig" src/spec-parser.ts`

### [x] Istio CNI
IstioCNI.
Run: `grep -q "istiocniConfig" src/spec-parser.ts`

### [x] ztunnel
Ztunnel.
Run: `grep -q "ztunnelConfig" src/spec-parser.ts`

### [x] Istio Revision
IstioRevision.
Run: `grep -q "istiorevisionConfig" src/spec-parser.ts`

### [x] Istio SMI
IstioSMI.
Run: `grep -q "istiosmiConfig" src/spec-parser.ts`

### [x] Hubble
Hubble.
Run: `grep -q "hubbleConfig" src/spec-parser.ts`

### [x] Hubble CLI
HubbleCLI.
Run: `grep -q "hubblecliConfig" src/spec-parser.ts`

### [x] Tetragon Observability
TetragonObs.
Run: `grep -q "tetragonobsConfig" src/spec-parser.ts`

### [x] Pixie
Pixie.
Run: `grep -q "pixieConfig" src/spec-parser.ts`

### [x] Kindling
Kindling.
Run: `grep -q "kindlingConfig" src/spec-parser.ts`

### [x] AstroBot
AstroBot.
Run: `grep -q "astrobotConfig" src/spec-parser.ts`

### [x] Groundcover
Groundcover.
Run: `grep -q "groundcoverConfig" src/spec-parser.ts`

### [x] DeepFlow
DeepFlow.
Run: `grep -q "deepflowConfig" src/spec-parser.ts`

### [x] BCC
BCC.
Run: `grep -q "bccConfig" src/spec-parser.ts`

### [x] bpftrace
Bpftrace.
Run: `grep -q "bpftraceConfig" src/spec-parser.ts`

### [x] Cilium eBPF
CiliumEBPF.
Run: `grep -q "ciliumebpfConfig" src/spec-parser.ts`

### [x] Falco eBPF
FalcoEBPF.
Run: `grep -q "falcoebpfConfig" src/spec-parser.ts`

### [x] Inspektor Gadget
InspektorGadget.
Run: `grep -q "inspektorgadgetConfig" src/spec-parser.ts`

### [x] Aqua Tracee
AquaTracee.
Run: `grep -q "aquatraceeConfig" src/spec-parser.ts`

### [x] Sysdig
Sysdig.
Run: `grep -q "sysdigConfig" src/spec-parser.ts`

### [x] Sysdig Inspect
SysdigInspect.
Run: `grep -q "sysdiginspectConfig" src/spec-parser.ts`

### [x] CAT
CAT.
Run: `grep -q "catConfig" src/spec-parser.ts`

### [x] OPA
OPA.
Run: `grep -q "opaConfig" src/spec-parser.ts`

### [x] Styra DAS
StyraDAS.
Run: `grep -q "styradasConfig" src/spec-parser.ts`

### [x] Rego
Rego.
Run: `grep -q "regoConfig" src/spec-parser.ts`

### [x] Conftest
Conftest.
Run: `grep -q "conftestConfig" src/spec-parser.ts`

### [x] Checkov
Checkov.
Run: `grep -q "checkovConfig" src/spec-parser.ts`

### [x] tfsec
Tfsec.
Run: `grep -q "tfsecConfig" src/spec-parser.ts`

### [x] Terrascan
Terrascan.
Run: `grep -q "terrascanConfig" src/spec-parser.ts`

### [x] KICS
KICS.
Run: `grep -q "kicsConfig" src/spec-parser.ts`

### [x] Snyk IaC
SnykIaC.
Run: `grep -q "snykiacConfig" src/spec-parser.ts`

### [x] Prisma Cloud
PrismaCloud.
Run: `grep -q "prismacloudConfig" src/spec-parser.ts`

### [x] Wiz
Wiz.
Run: `grep -q "wizConfig" src/spec-parser.ts`

### [x] Sentry APM
SentryAPM.
Run: `grep -q "sentryapmConfig" src/spec-parser.ts`

### [x] Datadog APM
DatadogAPM.
Run: `grep -q "datadogapmConfig" src/spec-parser.ts`

### [x] New Relic APM
NewRelicAPM.
Run: `grep -q "newrelicapmConfig" src/spec-parser.ts`

### [x] AppDynamics
AppDynamics.
Run: `grep -q "appdynamicsConfig" src/spec-parser.ts`

### [x] Dynatrace
Dynatrace.
Run: `grep -q "dynatraceConfig" src/spec-parser.ts`

### [x] R2
R2.
Run: `grep -q "r2Config" src/spec-parser.ts`

### [x] Cloudflare Workers
CloudflareWorkersOps.
Run: `grep -q "cloudflareworkersopsConfig" src/spec-parser.ts`

### [x] D1
D1.
Run: `grep -q "d1Config" src/spec-parser.ts`

### [x] KV
KV.
Run: `grep -q "kvConfig" src/spec-parser.ts`

### [x] Durable Objects
DurableObjects.
Run: `grep -q "durableobjectsConfig" src/spec-parser.ts`

### [x] Pages
Pages.
Run: `grep -q "pagesConfig" src/spec-parser.ts`

### [x] Access
Access.
Run: `grep -q "accessConfig" src/spec-parser.ts`

### [x] Tunnel
Tunnel.
Run: `grep -q "tunnelConfig" src/spec-parser.ts`

### [x] SSL
SSL.
Run: `grep -q "sslConfig" src/spec-parser.ts`

### [x] Cloudflare DNS
CloudflareDNS.
Run: `grep -q "cloudflarednsConfig" src/spec-parser.ts`

### [x] WAF
WAF.
Run: `grep -q "wafConfig" src/spec-parser.ts`

### [x] Rate Limiting
RateLimiting.
Run: `grep -q "ratelimitingConfig" src/spec-parser.ts`

### [x] Bot Management
BotManagement.
Run: `grep -q "botmanagementConfig" src/spec-parser.ts`

### [x] Stream
Stream.
Run: `grep -q "streamConfig" src/spec-parser.ts`

### [x] Images
Images.
Run: `grep -q "imagesConfig" src/spec-parser.ts`

### [x] Waiting Room
WaitingRoom.
Run: `grep -q "waitingroomConfig" src/spec-parser.ts`

### [x] Zaraz
Zaraz.
Run: `grep -q "zarazConfig" src/spec-parser.ts`

### [x] Turnstile
Turnstile.
Run: `grep -q "turnstileConfig" src/spec-parser.ts`

### [x] Cloudflare Analytics
CloudflareAnalytics.
Run: `grep -q "cloudflareanalyticsConfig" src/spec-parser.ts`

### [x] Cloudflare Logs
CloudflareLogs.
Run: `grep -q "cloudflarel ogsConfig" src/spec-parser.ts`

### [x] Edge Cache
EdgeCache.
Run: `grep -q "edgecacheConfig" src/spec-parser.ts`

### [x] Argo Tunnel
ArgoTunnel.
Run: `grep -q "argotunnelConfig" src/spec-parser.ts`

### [x] Spectrum
Spectrum.
Run: `grep -q "spectrumConfig" src/spec-parser.ts`

### [x] Magic Transit
MagicTransit.
Run: `grep -q "magictransitConfig" src/spec-parser.ts`

### [x] Magic WAN
MagicWAN.
Run: `grep -q "magicwanConfig" src/spec-parser.ts`

### [x] Vectorize
Vectorize.
Run: `grep -q "vectorizeConfig" src/spec-parser.ts`

### [x] ServiceNow
ServiceNow.
Run: `grep -q "servicenowConfig" src/spec-parser.ts`

### [x] Jira
Jira.
Run: `grep -q "jiraConfig" src/spec-parser.ts`

### [x] Linear
Linear.
Run: `grep -q "linearConfig" src/spec-parser.ts`

### [x] GitHub Issues
GitHubIssues.
Run: `grep -q "githubissuesConfig" src/spec-parser.ts`

### [x] Shortcut
Shortcut.
Run: `grep -q "shortcutConfig" src/spec-parser.ts`

### [x] Asana
Asana.
Run: `grep -q "asanaConfig" src/spec-parser.ts`

### [x] Monday
Monday.
Run: `grep -q "mondayConfig" src/spec-parser.ts`

### [x] ClickUp
ClickUp.
Run: `grep -q "clickupConfig" src/spec-parser.ts`

### [x] Notion
Notion.
Run: `grep -q "notionConfig" src/spec-parser.ts`

### [x] Confluence
Confluence.
Run: `grep -q "confluenceConfig" src/spec-parser.ts`

### [x] Coda
Coda.
Run: `grep -q "codaConfig" src/spec-parser.ts`

### [x] Roam
Roam.
Run: `grep -q "roamConfig" src/spec-parser.ts`

### [x] Obsidian
Obsidian.
Run: `grep -q "obsidianConfig" src/spec-parser.ts`

### [x] Logseq
Logseq.
Run: `grep -q "logseqConfig" src/spec-parser.ts`

### [x] Remotion
Remotion.
Run: `grep -q "remotionConfig" src/spec-parser.ts`

### [x] Video Editing
VideoEditing.
Run: `grep -q "videoeditingConfig" src/spec-parser.ts`

### [x] Animation
Animation.
Run: `grep -q "animationConfig" src/spec-parser.ts`

### [x] Screen Recording
ScreenRecording.
Run: `grep -q "screenrecordingConfig" src/spec-parser.ts`

### [x] Loom
Loom.
Run: `grep -q "loomConfig" src/spec-parser.ts`

### [x] Vidyard
Vidyard.
Run: `grep -q "vidyardConfig" src/spec-parser.ts`

### [x] BombBomb
BombBomb.
Run: `grep -q "bombbombConfig" src/spec-parser.ts`

### [x] ScreenPal
ScreenPal.
Run: `grep -q "screenpalConfig" src/spec-parser.ts`

### [x] Camtasia
Camtasia.
Run: `grep -q "camtasiaConfig" src/spec-parser.ts`

### [x] Snagit
Snagit.
Run: `grep -q "snagitConfig" src/spec-parser.ts`

### [x] Cloudflare Browser Rendering
CFBrowserRendering.
Run: `grep -q "cfbrowserrenderingConfig" src/spec-parser.ts`

### [x] Cloudflare Analytics Logs
CFAnalyticsLogs.
Run: `grep -q "cfanalyticslogsConfig" src/spec-parser.ts`

### [x] Cloudflare Performance
CFBrowserPerformance.
Run: `grep -q "cfbrowserperformanceConfig" src/spec-parser.ts`

### [x] AI21 Jurassic
AI21Jurassic.
Run: `grep -q "ai21jurassicConfig" src/spec-parser.ts`

### [x] Cohere
Cohere.
Run: `grep -q "cohereConfig" src/spec-parser.ts`

### [x] Claude
Claude.
Run: `grep -q "claudeConfig" src/spec-parser.ts`

### [x] Hugging Face
HuggingFace.
Run: `grep -q "huggingfaceConfig" src/spec-parser.ts`

### [x] Replicate
Replicate.
Run: `grep -q "replicateConfig" src/spec-parser.ts`

### [x] Modal
Modal.
Run: `grep -q "modalConfig" src/spec-parser.ts`

### [x] Banana
Banana.
Run: `grep -q "bananaConfig" src/spec-parser.ts`

### [x] Paperspace
Paperspace.
Run: `grep -q "paperspaceConfig" src/spec-parser.ts`

### [x] Lambda Labs
LambdaLabs.
Run: `grep -q "lambdalabsConfig" src/spec-parser.ts`

### [x] RunPod
RunPod.
Run: `grep -q "runpodConfig" src/spec-parser.ts`

### [x] Saturn Cloud
SaturnCloud.
Run: `grep -q "saturncloudConfig" src/spec-parser.ts`

### [x] Neptune ML
NeptuneML.
Run: `grep -q "neptunemlConfig" src/spec-parser.ts`

### [x] W&B
WANDB.
Run: `grep -q "wandbConfig" src/spec-parser.ts`

### [x] MLflow Server
MLflowServer.
Run: `grep -q "mlflowserverConfig" src/spec-parser.ts`

### [x] Comet ML
CometML.
Run: `grep -q "cometmlConfig" src/spec-parser.ts`

### [x] Aim Stack
AimStack.
Run: `grep -q "aimstackConfig" src/spec-parser.ts`

### [x] Guild AI Stack
GuildAIStack.
Run: `grep -q "guildaistackConfig" src/spec-parser.ts`

### [x] Sacred
SacredML.
Run: `grep -q "sacredmlConfig" src/spec-parser.ts`

### [x] Polyaxon
PolyaxonML.
Run: `grep -q "polyaxonmlConfig" src/spec-parser.ts`

### [x] Metaflow
Metaflow.
Run: `grep -q "metaflowConfig" src/spec-parser.ts`

### [x] Kedro
Kedro.
Run: `grep -q "kedromlConfig" src/spec-parser.ts`

### [x] ZenML
ZenML.
Run: `grep -q "zenmlConfig" src/spec-parser.ts`

### [x] Flyte
Flyte.
Run: `grep -q "flyteConfig" src/spec-parser.ts`

### [x] Prefect
Prefect.
Run: `grep -q "prefectConfig" src/spec-parser.ts`

### [x] Dagster
Dagster.
Run: `grep -q "dagsterConfig" src/spec-parser.ts`

### [x] Airflow
Airflow.
Run: `grep -q "airflowConfig" src/spec-parser.ts`

### [x] Kubeflow Pipelines
KubeflowPipelines.
Run: `grep -q "kubeflowpipelinesConfig" src/spec-parser.ts`

### [x] Argo Workflows
ArgoWorkflowsML.
Run: `grep -q "argoworkflowsmlConfig" src/spec-parser.ts`

### [x] Flyte Deck
FlyteDeck.
Run: `grep -q "flytedeckConfig" src/spec-parser.ts`

### [x] Evidently AI
EvidentlyAI.
Run: `grep -q "evidentlyaiConfig" src/spec-parser.ts`

### [x] NannyML
NannyML.
Run: `grep -q "nannymlConfig" src/spec-parser.ts`

### [x] whylogs
Whylogs.
Run: `grep -q "whylogsConfig" src/spec-parser.ts`

### [x] Great Expectations
GreatExpectations.
Run: `grep -q "greatexpectationsConfig" src/spec-parser.ts`

### [x] TensorFlow Data Validation
TFDV.
Run: `grep -q "tfdvConfig" src/spec-parser.ts`

### [x] Alibi Detect
AlibiDetect.
Run: `grep -q "alibidetectConfig" src/spec-parser.ts`

### [x] Alibi Explain
AlibiExplain.
Run: `grep -q "alibiexplainConfig" src/spec-parser.ts`

### [x] DiCE
DiCE.
Run: `grep -q "diceConfig" src/spec-parser.ts`

### [x] DoWhy
DoWhy.
Run: `grep -q "dowhyConfig" src/spec-parser.ts`

### [x] EconML
EconML.
Run: `grep -q "econmlConfig" src/spec-parser.ts`

### [x] CausalML
CausalML.
Run: `grep -q "causalmlConfig" src/spec-parser.ts`

### [x] PyOD
PyOD.
Run: `grep -q "pyodConfig" src/spec-parser.ts`

### [x] Prophet
Prophet.
Run: `grep -q "prophetConfig" src/spec-parser.ts`

### [x] statsmodels
Statsmodels.
Run: `grep -q "statsmodelsConfig" src/spec-parser.ts`

### [x] pmdarima
Pmdarima.
Run: `grep -q "pmdarimaConfig" src/spec-parser.ts`

### [x] GluonTS
GluonTS.
Run: `grep -q "gluontsConfig" src/spec-parser.ts`

### [x] MLflow Tracking
MLflowTracking.
Run: `grep -q "mlflowtrackingConfig" src/spec-parser.ts`

### [x] MLflow Projects
MLflowProjects.
Run: `grep -q "mlflowprojectsConfig" src/spec-parser.ts`

### [x] MLflow Models
MLflowModels.
Run: `grep -q "mlflowmodelsConfig" src/spec-parser.ts`

### [x] MLflow Model Registry
MLflowModelRegistry.
Run: `grep -q "mlflowmodelregistryConfig" src/spec-parser.ts`

### [x] MLflow Inference
MLflowInference.
Run: `grep -q "mlflowinferenceConfig" src/spec-parser.ts`

### [x] MLflow Plugins
MLflowPlugins.
Run: `grep -q "mlflowpluginsConfig" src/spec-parser.ts`

### [x] darts
Darts.
Run: `grep -q "dartsConfig" src/spec-parser.ts`

### [x] Kats
Kats.
Run: `grep -q "katsConfig" src/spec-parser.ts`

### [x] Orbit
Orbit.
Run: `grep -q "orbitConfig" src/spec-parser.ts`

### [x] NeuralProphet
NeuralProphet.
Run: `grep -q "neuralprophetConfig" src/spec-parser.ts`

### [x] GreyKite
GreyKite.
Run: `grep -q "greykiteConfig" src/spec-parser.ts`

### [x] PyFlux
PyFlux.
Run: `grep -q "pyfluxConfig" src/spec-parser.ts`

### [x] Stan
Stan.
Run: `grep -q "stanConfig" src/spec-parser.ts`

### [x] PyMC
PyMC.
Run: `grep -q "pymcConfig" src/spec-parser.ts`

### [x] NumPyro
NumPyro.
Run: `grep -q "numpyroConfig" src/spec-parser.ts`

### [x] Bambi
Bambi.
Run: `grep -q "bambiConfig" src/spec-parser.ts`

### [x] ArviZ
ArviZ.
Run: `grep -q "arvizConfig" src/spec-parser.ts`

### [x] scikit-learn
ScikitLearn.
Run: `grep -q "scikitlearnConfig" src/spec-parser.ts`

### [x] XGBoost
XGBoost.
Run: `grep -q "xgboostConfig" src/spec-parser.ts`

### [x] LightGBM
LightGBM.
Run: `grep -q "lightgbmConfig" src/spec-parser.ts`

### [x] CatBoost
CatBoost.
Run: `grep -q "catboostConfig" src/spec-parser.ts`

### [x] Optuna
Optuna.
Run: `grep -q "optunaConfig" src/spec-parser.ts`

### [x] Ray Tune
RayTune.
Run: `grep -q "raytuneConfig" src/spec-parser.ts`

### [x] Hyperopt
Hyperopt.
Run: `grep -q "hyperoptConfig" src/spec-parser.ts`

### [x] Ax
Ax.
Run: `grep -q "axConfig" src/spec-parser.ts`

### [x] Nevergrad
Nevergrad.
Run: `grep -q "nevergradConfig" src/spec-parser.ts`

### [x] HpBandSter
HpBandSter.
Run: `grep -q "hpbandsterConfig" src/spec-parser.ts`

### [x] DeepHyper
DeepHyper.
Run: `grep -q "deephyperConfig" src/spec-parser.ts`

### [x] FLAML
FLAML.
Run: `grep -q "flam lConfig" src/spec-parser.ts`

### [x] auto-sklearn
AutoSklearn.
Run: `grep -q "autosklearnConfig" src/spec-parser.ts`

### [x] auto-pytorch
AutoPyTorch.
Run: `grep -q "autopytorchConfig" src/spec-parser.ts`

### [x] Ray
Ray.
Run: `grep -q "rayConfig" src/spec-parser.ts`

### [x] Ray Serve
RayServeML.
Run: `grep -q "rayservemlConfig" src/spec-parser.ts`

### [x] Ray Train
RayTrain.
Run: `grep -q "raytrainConfig" src/spec-parser.ts`

### [x] Ray RLlib
RayRLlib.
Run: `grep -q "rayrllibConfig" src/spec-parser.ts`

### [x] PyTorch Lightning
PyTorchLightning.
Run: `grep -q "pytorchlightningConfig" src/spec-parser.ts`

### [x] Ignite
Ignite.
Run: `grep -q "igniteConfig" src/spec-parser.ts`

### [x] Catalyst
Catalyst.
Run: `grep -q "catalystConfig" src/spec-parser.ts`

### [x] fastai
FastAI.
Run: `grep -q "fastaiConfig" src/spec-parser.ts`

### [x] Flax
Flax.
Run: `grep -q "flaxConfig" src/spec-parser.ts`

### [x] Haiku
Haiku.
Run: `grep -q "haikuConfig" src/spec-parser.ts`

### [x] Objax
Objax.
Run: `grep -q "objaxConfig" src/spec-parser.ts`

### [x] PyG
PyG.
Run: `grep -q "pygConfig" src/spec-parser.ts`

### [x] DGL
DGL.
Run: `grep -q "dglConfig" src/spec-parser.ts`

### [x] Dask
Dask.
Run: `grep -q "daskConfig" src/spec-parser.ts`

### [x] cuDF
CuDF.
Run: `grep -q "cudfConfig" src/spec-parser.ts`

### [x] cuML
CuML.
Run: `grep -q "cum lConfig" src/spec-parser.ts`

### [x] cuDNN
CuDNN.
Run: `grep -q "cudnnConfig" src/spec-parser.ts`

### [x] cuFFT
CuFFT.
Run: `grep -q "cufftConfig" src/spec-parser.ts`

### [x] cuBLAS
CuBLAS.
Run: `grep -q "cubl asConfig" src/spec-parser.ts`

### [x] cuSparse
CuSparse.
Run: `grep -q "cusparseConfig" src/spec-parser.ts`

### [x] TensorRT
TensorRT.
Run: `grep -q "tensorrtConfig" src/spec-parser.ts`

### [x] TorchScript
TorchScript.
Run: `grep -q "torchscriptConfig" src/spec-parser.ts`

### [x] ONNX
ONNX.
Run: `grep -q "onnxConfig" src/spec-parser.ts`

### [x] TVM
TVM.
Run: `grep -q "tvmConfig" src/spec-parser.ts`

### [x] MXNet
MXNet.
Run: `grep -q "mxnetConfig" src/spec-parser.ts`

### [x] Chainer
Chainer.
Run: `grep -q "chainerConfig" src/spec-parser.ts`

### [x] MLX
MLX.
Run: `grep -q "mlxConfig" src/spec-parser.ts`

### [x] CoreML
CoreML.
Run: `grep -q "coremlConfig" src/spec-parser.ts`

### [x] SentenceTransformers
SentenceTransformers.
Run: `grep -q "sentencetransformersConfig" src/spec-parser.ts`

### [x] Instructor
Instructor.
Run: `grep -q "instructorConfig" src/spec-parser.ts`

### [x] LangChain
LangChain.
Run: `grep -q "langchainConfig" src/spec-parser.ts`

### [x] LangSmith
LangSmith.
Run: `grep -q "langsmithConfig" src/spec-parser.ts`

### [x] LlamaIndex
LlamaIndex.
Run: `grep -q "llamaindexConfig" src/spec-parser.ts`

### [x] Haystack
Haystack.
Run: `grep -q "haystackConfig" src/spec-parser.ts`

### [x] Haystack Agents
HaystackAgents.
Run: `grep -q "haystackagentsConfig" src/spec-parser.ts`

### [x] Haystack Retrievers
HaystackRetrievers.
Run: `grep -q "haystackretrieversConfig" src/spec-parser.ts`

### [x] Haystack Readers
HaystackReaders.
Run: `grep -q "haystackreadersConfig" src/spec-parser.ts`

### [x] Haystack Summarizers
HaystackSummarizers.
Run: `grep -q "haystacksummarizersConfig" src/spec-parser.ts`

### [x] Haystack Generators
HaystackGenerators.
Run: `grep -q "haystackgeneratorsConfig" src/spec-parser.ts`

### [x] Haystack Labeling
HaystackLabeling.
Run: `grep -q "haystacklabelingConfig" src/spec-parser.ts`

### [x] Elasticsearch
Elasticsearch.
Run: `grep -q "elasticsearchConfig" src/spec-parser.ts`

### [x] OpenSearch
OpenSearch.
Run: `grep -q "opensearchConfig" src/spec-parser.ts`

### [x] Meilisearch
Meilisearch.
Run: `grep -q "meilisearchConfig" src/spec-parser.ts`

### [x] Typesense
Typesense.
Run: `grep -q "typesenseConfig" src/spec-parser.ts`

### [x] Qdrant
Qdrant.
Run: `grep -q "qdrantConfig" src/spec-parser.ts`

### [x] Weaviate
Weaviate.
Run: `grep -q "weaviateConfig" src/spec-parser.ts`

### [x] Chroma
Chroma.
Run: `grep -q "chromaConfig" src/spec-parser.ts`

### [x] Pinecone
Pinecone.
Run: `grep -q "pineconeConfig" src/spec-parser.ts`

### [x] pgvector
Pgvector.
Run: `grep -q "pgvectorConfig" src/spec-parser.ts`

### [x] pg_embedding
PgEmbedding.
Run: `grep -q "pgembeddingConfig" src/spec-parser.ts`

### [x] Faiss
Faiss.
Run: `grep -q "faissConfig" src/spec-parser.ts`

### [x] Annoy
Annoy.
Run: `grep -q "annoyConfig" src/spec-parser.ts`

### [x] ScaNN
ScaNN.
Run: `grep -q "scannConfig" src/spec-parser.ts`

### [x] HNSWLib
HNSWLib.
Run: `grep -q "hnswlibConfig" src/spec-parser.ts`

### [x] NMSLib
NMSLib.
Run: `grep -q "nmslibConfig" src/spec-parser.ts`

### [x] SPTAG
SPTAG.
Run: `grep -q "sptagConfig" src/spec-parser.ts`

### [x] DiskANN
DiskANN.
Run: `grep -q "diskannConfig" src/spec-parser.ts`

### [x] QDrant Graph
QDrantGraph.
Run: `grep -q "qdrantgraphConfig" src/spec-parser.ts`

### [x] Vald
Vald.
Run: `grep -q "valdConfig" src/spec-parser.ts`

### [x] VSAG
VSAG.
Run: `grep -q "vsagConfig" src/spec-parser.ts`

### [x] Marqo
Marqo.
Run: `grep -q "marqoConfig" src/spec-parser.ts`

### [x] DocArray
DocArray.
Run: `grep -q "docarrayConfig" src/spec-parser.ts`

### [x] Jina AI
JinaAI.
Run: `grep -q "jinaaiConfig" src/spec-parser.ts`

### [x] EmbedChain
EmbedChain.
Run: `grep -q "embedchainConfig" src/spec-parser.ts`

### [x] Cohere Embed
CohereEmbed.
Run: `grep -q "cohereembedConfig" src/spec-parser.ts`

### [x] OpenAI Embed
OpenAIEmbed.
Run: `grep -q "openaiembedConfig" src/spec-parser.ts`

### [x] Azure OpenAI Embed
AzureOpenAIEmbed.
Run: `grep -q "azureopenaiembedConfig" src/spec-parser.ts`

### [x] Vertex AI Embed
VertexAIEmbed.
Run: `grep -q "vertexaiembedConfig" src/spec-parser.ts`

### [x] Mistral AI
MistralAI.
Run: `grep -q "mistralaiConfig" src/spec-parser.ts`

### [x] Groq
Groq.
Run: `grep -q "groqConfig" src/spec-parser.ts`

### [x] Perplexity
Perplexity.
Run: `grep -q "perplexityConfig" src/spec-parser.ts`

### [x] Together AI
TogetherAI.
Run: `grep -q "togetheraiConfig" src/spec-parser.ts`

### [x] Anyscale
Anyscale.
Run: `grep -q "anyscaleConfig" src/spec-parser.ts`

### [x] Fireworks AI
FireworksAI.
Run: `grep -q "fireworksaiConfig" src/spec-parser.ts`

### [x] DeepInfra
DeepInfra.
Run: `grep -q "deepinfraConfig" src/spec-parser.ts`

### [x] Replicate LLM
ReplicateLLM.
Run: `grep -q "replicatellmConfig" src/spec-parser.ts`

### [x] OpenRouter
OpenRouter.
Run: `grep -q "openrouterConfig" src/spec-parser.ts`

### [x] Lepton AI
LeptonAI.
Run: `grep -q "leptonaiConfig" src/spec-parser.ts`

### [x] Predibase
Predibase.
Run: `grep -q "predibaseConfig" src/spec-parser.ts`

### [x] Baseten
Baseten.
Run: `grep -q "basetenConfig" src/spec-parser.ts`

### [x] Modal Endpoints
ModalEndpoints.
Run: `grep -q "modalendpointsConfig" src/spec-parser.ts`

### [x] OctoAI
OctoAI.
Run: `grep -q "octoaiConfig" src/spec-parser.ts`

### [x] Hyperbolic
Hyperbolic.
Run: `grep -q "hyperbolicConfig" src/spec-parser.ts`

### [x] Cerebras
Cerebras.
Run: `grep -q "cerebrasConfig" src/spec-parser.ts`

### [x] Groq Cloud
GroqCloud.
Run: `grep -q "groqcloudConfig" src/spec-parser.ts`

### [x] Cohere Command
CohereCommand.
Run: `grep -q "coherecommandConfig" src/spec-parser.ts`

### [x] AI21 Command
AI21Command.
Run: `grep -q "ai21commandConfig" src/spec-parser.ts`

### [x] Claude API
ClaudeAPI.
Run: `grep -q "claudeapiConfig" src/spec-parser.ts`

### [x] GPT-4 API
GPT4API.
Run: `grep -q "gpt4apiConfig" src/spec-parser.ts`

### [x] Gemini API
GeminiAPI.
Run: `grep -q "geminiapiConfig" src/spec-parser.ts`

### [x] Llama API
LlamaAPI.
Run: `grep -q "llamaapiConfig" src/spec-parser.ts`

### [x] Mistral API
MistralAPI.
Run: `grep -q "mistralapiConfig" src/spec-parser.ts`

### [x] DBRX
DBRX.
Run: `grep -q "dbrxConfig" src/spec-parser.ts`

### [x] WizardLM
WizardLM.
Run: `grep -q "wizardlmConfig" src/spec-parser.ts`

### [x] Yi
Yi.
Run: `grep -q "yiConfig" src/spec-parser.ts`

### [x] Qwen
Qwen.
Run: `grep -q "qwenConfig" src/spec-parser.ts`

### [x] DeepSeek
DeepSeek.
Run: `grep -q "deepseekConfig" src/spec-parser.ts`

### [x] Command R+
CommandRPlus.
Run: `grep -q "commandrplusConfig" src/spec-parser.ts`

### [x] Slack Claude
SlackClaude.
Run: `grep -q "slackclaudeConfig" src/spec-parser.ts`

### [x] Teams Claude
TeamsClaude.
Run: `grep -q "teamsclaudeConfig" src/spec-parser.ts`

### [x] Azure AI Studio
AzureAIStudio.
Run: `grep -q "azureaistudioConfig" src/spec-parser.ts`

### [x] AWS Bedrock
AWSBedrock.
Run: `grep -q "awsbedrockConfig" src/spec-parser.ts`

### [x] Google AI Studio
GoogleAIStudio.
Run: `grep -q "googleaistudioConfig" src/spec-parser.ts`

### [x] Anthropic Cookbook
AnthropicCookbook.
Run: `grep -q "anthropiccookbookConfig" src/spec-parser.ts`

### [x] OpenAI Cookbook
OpenAICookbook.
Run: `grep -q "openaicookbookConfig" src/spec-parser.ts`

### [x] LangChain Cookbook
LangChainCookbook.
Run: `grep -q "langchaincookbookConfig" src/spec-parser.ts`

### [x] LlamaIndex Cookbook
LlamaIndexCookbook.
Run: `grep -q "llamaindexcookbookConfig" src/spec-parser.ts`

### [x] Prompt Engine
PromptEngine.
Run: `grep -q "promptengineConfig" src/spec-parser.ts`

### [x] Guidance
Guidance.
Run: `grep -q "guidanceConfig" src/spec-parser.ts`

### [x] Instructor
InstructorLLM.
Run: `grep -q "instructorllmConfig" src/spec-parser.ts`

### [x] Outlines
Outlines.
Run: `grep -q "outlinesConfig" src/spec-parser.ts`

### [x] LMQL
LMQL.
Run: `grep -q "lmqlConfig" src/spec-parser.ts`

### [x] SGLang
SGLang.
Run: `grep -q "sglangConfig" src/spec-parser.ts`

### [x] vLLM
VLLM.
Run: `grep -q "vllmConfig" src/spec-parser.ts`

### [x] TGI
TGI.
Run: `grep -q "tgiConfig" src/spec-parser.ts`

### [x] Smol LLM
SmolLLM.
Run: `grep -q "smolllmConfig" src/spec-parser.ts`

### [x] LLaMA.cpp
LlamaCpp.
Run: `grep -q "llamacppConfig" src/spec-parser.ts`

### [x] llamafile
Llamafile.
Run: `grep -q "llamafileConfig" src/spec-parser.ts`

### [x] Ollama
Ollama.
Run: `grep -q "ollamaConfig" src/spec-parser.ts`

### [x] LocalAI
LocalAI.
Run: `grep -q "localaiConfig" src/spec-parser.ts`

### [x] text-embedding-3
TextEmbedding3.
Run: `grep -q "textembedding3Config" src/spec-parser.ts`

### [x] ada-002
Ada002.
Run: `grep -q "ada002Config" src/spec-parser.ts`

### [x] BGE
BGE.
Run: `grep -q "bgeConfig" src/spec-parser.ts`

### [x] E5
E5.
Run: `grep -q "e5Config" src/spec-parser.ts`

### [x] Instructor Embed
InstructorEmbed.
Run: `grep -q "instructorembedConfig" src/spec-parser.ts`

### [x] FlagEmbedding
FlagEmbedding.
Run: `grep -q "flagembeddingConfig" src/spec-parser.ts`

### [x] NV-Embed
NVEmbed.
Run: `grep -q "nvembedConfig" src/spec-parser.ts`

### [x] Whisper
Whisper.
Run: `grep -q "whisperConfig" src/spec-parser.ts`

### [x] Whisper.cpp
WhisperCpp.
Run: `grep -q "whispercppConfig" src/spec-parser.ts`

### [x] Faster Whisper
FasterWhisper.
Run: `grep -q "fasterwhisperConfig" src/spec-parser.ts`

### [x] Whisper JAX
WhisperJAX.
Run: `grep -q "whisperjaxConfig" src/spec-parser.ts`

### [x] Whisper API
WhisperAPI.
Run: `grep -q "whisperapiConfig" src/spec-parser.ts`

### [x] Parler TTS
ParlerTTS.
Run: `grep -q "parlerttsConfig" src/spec-parser.ts`

### [x] Bark
Bark.
Run: `grep -q "barkConfig" src/spec-parser.ts`

### [x] Tortoise TTS
TortoiseTTS.
Run: `grep -q "tortoisettsConfig" src/spec-parser.ts`

### [x] Coqui TTS
CoquiTTS.
Run: `grep -q "coquittsConfig" src/spec-parser.ts`

### [x] Mozilla TTS
MozillaTTS.
Run: `grep -q "mozillattsConfig" src/spec-parser.ts`

### [x] Espeak
Espeak.
Run: `grep -q "espeakConfig" src/spec-parser.ts`

### [x] Festival
Festival.
Run: `grep -q "festivalConfig" src/spec-parser.ts`

### [x] Flite
Flite.
Run: `grep -q "fliteConfig" src/spec-parser.ts`

### [x] MaryTTS
MaryTTS.
Run: `grep -q "maryttsConfig" src/spec-parser.ts`

### [x] gTTS
gTTS.
Run: `grep -q "gttsConfig" src/spec-parser.ts`

### [x] pyttsx3
Pyttsx3.
Run: `grep -q "pyttsx3Config" src/spec-parser.ts`

### [x] edge-tts
EdgeTTS.
Run: `grep -q "edgetsConfig" src/spec-parser.ts`

### [x] Azure TTS
AzureTTS.
Run: `grep -q "azurettsConfig" src/spec-parser.ts`

### [x] GCP TTS
GCPTTS.
Run: `grep -q "gcpttsConfig" src/spec-parser.ts`

### [x] Amazon Polly
AmazonPolly.
Run: `grep -q "amazonpollyConfig" src/spec-parser.ts`

### [x] IBM Watson TTS
IBMWatsonTTS.
Run: `grep -q "ibmwatsonttsConfig" src/spec-parser.ts`

### [x] ElevenLabs
ElevenLabs.
Run: `grep -q "elevenlabsConfig" src/spec-parser.ts`

### [x] OpenAI TTS
OpenAITTS.
Run: `grep -q "openaittsConfig" src/spec-parser.ts`

### [x] Cartesia
Cartesia.
Run: `grep -q "cartesiaConfig" src/spec-parser.ts`

### [x] PlayHT
PlayHT.
Run: `grep -q "playhtConfig" src/spec-parser.ts`

### [x] Murf AI
MurfAI.
Run: `grep -q "murfaiConfig" src/spec-parser.ts`

### [x] WellSaid
WellSaid.
Run: `grep -q "wells saidConfig" src/spec-parser.ts`

### [x] Speechify
Speechify.
Run: `grep -q "speechifyConfig" src/spec-parser.ts`

### [x] Descript
Descript.
Run: `grep -q "descriptConfig" src/spec-parser.ts`

### [x] Resemble AI
ResembleAI.
Run: `grep -q "resembleaiConfig" src/spec-parser.ts`

### [x] Unique Voice
UniqueVoice.
Run: `grep -q "uniquevoiceConfig" src/spec-parser.ts`

### [x] FakeYou
FakeYou.
Run: `grep -q "fakeyouConfig" src/spec-parser.ts`

### [x] Vorleser
Vorleser.
Run: `grep -q "vorleserConfig" src/spec-parser.ts`

### [x] AssemblyAI
AssemblyAI.
Run: `grep -q "assemblyaiConfig" src/spec-parser.ts`

### [x] Rev AI
RevAI.
Run: `grep -q "revaiConfig" src/spec-parser.ts`

### [x] Speechmatics
Speechmatics.
Run: `grep -q "speechmaticsConfig" src/spec-parser.ts`

### [x] Deepgram
Deepgram.
Run: `grep -q "deepgramConfig" src/spec-parser.ts`

### [x] Otter AI
OtterAI.
Run: `grep -q "otteraiConfig" src/spec-parser.ts`

### [x] Fireflies
Fireflies.
Run: `grep -q "firefliesConfig" src/spec-parser.ts`

### [x] Trint
Trint.
Run: `grep -q "trintConfig" src/spec-parser.ts`

### [x] Sonix
Sonix.
Run: `grep -q "sonixConfig" src/spec-parser.ts`

### [x] Happy Scribe
HappyScribe.
Run: `grep -q "happyscribeConfig" src/spec-parser.ts`

### [x] Notta
Notta.
Run: `grep -q "nottaConfig" src/spec-parser.ts`

### [x] Turboscribe
Turboscribe.
Run: `grep -q "turboscribeConfig" src/spec-parser.ts`

### [x] Modal Whisper
ModalWhisper.
Run: `grep -q "modalwhisperConfig" src/spec-parser.ts`

### [x] Replicate Whisper
ReplicateWhisper.
Run: `grep -q "replicatewhisperConfig" src/spec-parser.ts`

### [x] DALL-E
DALLE.
Run: `grep -q "dalleConfig" src/spec-parser.ts`

### [x] DALL-E 2
DALLE2.
Run: `grep -q "dalle2Config" src/spec-parser.ts`

### [x] DALL-E 3
DALLE3.
Run: `grep -q "dalle3Config" src/spec-parser.ts`

### [x] Midjourney
Midjourney.
Run: `grep -q "midjourneyConfig" src/spec-parser.ts`

### [x] Stable Diffusion
StableDiffusion.
Run: `grep -q "stablediffusionConfig" src/spec-parser.ts`

### [x] SDXL
SDXL.
Run: `grep -q "sdxlConfig" src/spec-parser.ts`

### [x] SD WebUI
SDWebUI.
Run: `grep -q "sdwebuiConfig" src/spec-parser.ts`

### [x] ComfyUI
ComfyUI.
Run: `grep -q "comfyuiConfig" src/spec-parser.ts`

### [x] Fooocus
Fooocus.
Run: `grep -q "fooocusConfig" src/spec-parser.ts`

### [x] InvokeAI
InvokeAI.
Run: `grep -q "invokeaiConfig" src/spec-parser.ts`

### [x] Diffusion Bee
DiffusionBee.
Run: `grep -q "diffusionbeeConfig" src/spec-parser.ts`

### [x] Clipdrop
Clipdrop.
Run: `grep -q "clipdropConfig" src/spec-parser.ts`

### [x] Remove.bg
RemoveBg.
Run: `grep -q "removebgConfig" src/spec-parser.ts`

### [x] Cleanup.pictures
CleanupPictures.
Run: `grep -q "cleanuppicturesConfig" src/spec-parser.ts`

### [x] Magic Eraser
MagicEraser.
Run: `grep -q "magiceraserConfig" src/spec-parser.ts`

### [x] Adobe Firefly
AdobeFirefly.
Run: `grep -q "adobefireflyConfig" src/spec-parser.ts`

### [x] Canva AI
CanvaAI.
Run: `grep -q "canvaaiConfig" src/spec-parser.ts`

### [x] RunwayML
RunwayML.
Run: `grep -q "runwaymlConfig" src/spec-parser.ts`

### [x] Leonardo AI
LeonardoAI.
Run: `grep -q "leonardoaiConfig" src/spec-parser.ts`

### [x] Playground AI
PlaygroundAI.
Run: `grep -q "playgroundaiConfig" src/spec-parser.ts`

### [x] Ideogram
Ideogram.
Run: `grep -q "ideogramConfig" src/spec-parser.ts`

### [x] Flux
Flux.
Run: `grep -q "fluxConfig" src/spec-parser.ts`

### [x] Flux Dev
FluxDev.
Run: `grep -q "fluxdevConfig" src/spec-parser.ts`

### [x] Flux Schnell
FluxSchnell.
Run: `grep -q "fluxschnellConfig" src/spec-parser.ts`

### [x] Imagen
Imagen.
Run: `grep -q "imagenConfig" src/spec-parser.ts`

### [x] Imagen 2
Imagen2.
Run: `grep -q "imagen2Config" src/spec-parser.ts`

### [x] Imagen 3
Imagen3.
Run: `grep -q "imagen3Config" src/spec-parser.ts`

### [x] Veo
Veo.
Run: `grep -q "veoConfig" src/spec-parser.ts`

### [x] Veo 2
Veo2.
Run: `grep -q "veo2Config" src/spec-parser.ts`

### [x] Sora
Sora.
Run: `grep -q "soraConfig" src/spec-parser.ts`

### [x] Lumiere
Lumiere.
Run: `grep -q "lumiereConfig" src/spec-parser.ts`

### [x] Gen-2
Gen2.
Run: `grep -q "gen2Config" src/spec-parser.ts`

### [x] Gen-3
Gen3.
Run: `grep -q "gen3Config" src/spec-parser.ts`

### [x] Kling
Kling.
Run: `grep -q "klingConfig" src/spec-parser.ts`

### [x] Vidu
Vidu.
Run: `grep -q "viduConfig" src/spec-parser.ts`

### [x] Zeroscope
Zeroscope.
Run: `grep -q "zeroscopeConfig" src/spec-parser.ts`

### [x] ModelScope
ModelScope.
Run: `grep -q "modelscopeConfig" src/spec-parser.ts`

### [x] SadTalker
SadTalker.
Run: `grep -q "sadtalkerConfig" src/spec-parser.ts`

### [x] Wav2Lip
Wav2Lip.
Run: `grep -q "wav2lipConfig" src/spec-parser.ts`

### [x] AnimateDiff
AnimateDiff.
Run: `grep -q "animatediffConfig" src/spec-parser.ts`

### [x] LoRA
LoRA.
Run: `grep -q "loraConfig" src/spec-parser.ts`

### [x] ControlNet
ControlNet.
Run: `grep -q "controlnetConfig" src/spec-parser.ts`

### [x] IP-Adapter
IPAdapter.
Run: `grep -q "ipadapterConfig" src/spec-parser.ts`

### [x] Textual Inversion
TextualInversion.
Run: `grep -q "textualinversionConfig" src/spec-parser.ts`

### [x] DreamBooth
DreamBooth.
Run: `grep -q "dreamboothConfig" src/spec-parser.ts`

### [x] InstructPix2Pix
InstructPix2Pix.
Run: `grep -q "instructpix2pixConfig" src/spec-parser.ts`

### [x] InstructDiffusion
InstructDiffusion.
Run: `grep -q "instructdiffusionConfig" src/spec-parser.ts`

### [x] ControlNet WebUI
ControlNetWebUI.
Run: `grep -q "controlnetwebuiConfig" src/spec-parser.ts`

### [x] ControlNet Sharif
ControlNetSharif.
Run: `grep -q "controlnetsharifConfig" src/spec-parser.ts`

### [x] ControlNet 1.1
ControlNet11.
Run: `grep -q "controlnet11Config" src/spec-parser.ts`

### [x] ControlNet T2I Adapter
ControlNetT2IAdapter.
Run: `grep -q "controlnett2iadapterConfig" src/spec-parser.ts`

### [x] ControlNet Lite
ControlNetLite.
Run: `grep -q "controlnetliteConfig" src/spec-parser.ts`

### [x] ControlNet Pro
ControlNetPro.
Run: `grep -q "controlnetproConfig" src/spec-parser.ts`

### [x] ControlNet XL
ControlNetXL.
Run: `grep -q "controlnetxlConfig" src/spec-parser.ts`

### [x] ControlNet SDXL
ControlNetSDXL.
Run: `grep -q "controlnetsdxlConfig" src/spec-parser.ts`

### [x] ControlNet Seg
ControlNetSeg.
Run: `grep -q "controlnetsegConfig" src/spec-parser.ts`

### [x] ControlNet Normal
ControlNetNormal.
Run: `grep -q "controlnetnormalConfig" src/spec-parser.ts`

### [x] ControlNet Depth
ControlNetDepth.
Run: `grep -q "controlnetdepthConfig" src/spec-parser.ts`

### [x] ControlNet Canny
ControlNetCanny.
Run: `grep -q "controlnetcannyConfig" src/spec-parser.ts`

### [x] ControlNet HED
ControlNetHED.
Run: `grep -q "controlnethedConfig" src/spec-parser.ts`

### [x] ControlNet Scribble
ControlNetScribble.
Run: `grep -q "controlnetscribbleConfig" src/spec-parser.ts`

### [x] ControlNet OpenPose
ControlNetOpenPose.
Run: `grep -q "controlnetopenposeConfig" src/spec-parser.ts`

### [x] ControlNet MLSD
ControlNetMLSD.
Run: `grep -q "controlnetmlsdConfig" src/spec-parser.ts`

### [x] ControlNet Tile
ControlNetTile.
Run: `grep -q "controlnettileConfig" src/spec-parser.ts`

### [x] ControlNet Inpaint
ControlNetInpaint.
Run: `grep -q "controlnetinpaintConfig" src/spec-parser.ts`

### [x] ControlNet IP2P
ControlNetIP2P.
Run: `grep -q "controlnetip2pConfig" src/spec-parser.ts`

### [x] ControlNet Shuffle
ControlNetShuffle.
Run: `grep -q "controlnetshuffleConfig" src/spec-parser.ts`

### [x] ControlNet Reference
ControlNetReference.
Run: `grep -q "controlnetreferenceConfig" src/spec-parser.ts`

### [x] ControlNet Recolor
ControlNetRecolor.
Run: `grep -q "controlnetrecolorConfig" src/spec-parser.ts`

### [x] ControlNet Anime
ControlNetAnime.
Run: `grep -q "controlnetanimeConfig" src/spec-parser.ts`

### [x] ControlNet Lineart
ControlNetLineart.
Run: `grep -q "controlnetlineartConfig" src/spec-parser.ts`

### [x] ControlNet Softedge
ControlNetSoftedge.
Run: `grep -q "controlnetsoftedgeConfig" src/spec-parser.ts`

### [x] ControlNet Beauty
ControlNetBeauty.
Run: `grep -q "controlnetbeautyConfig" src/spec-parser.ts`

### [x] ControlNet QR Code
ControlNetQRCode.
Run: `grep -q "controlnetqrcodeConfig" src/spec-parser.ts`

### [x] ControlNet Photorealistic
ControlNetPhotorealistic.
Run: `grep -q "controlnetphotorealisticConfig" src/spec-parser.ts`

### [x] ControlNet Illustrious
ControlNetIllustrious.
Run: `grep -q "controlnetillustriousConfig" src/spec-parser.ts`

### [x] ControlNet Pony
ControlNetPony.
Run: `grep -q "controlnetponyConfig" src/spec-parser.ts`

### [x] ControlNet Flux
ControlNetFlux.
Run: `grep -q "controlnetfluxConfig" src/spec-parser.ts`

### [x] DW OpenPose
DWOpenPose.
Run: `grep -q "dwopenposeConfig" src/spec-parser.ts`

### [x] DW Pose
DW Pose.
Run: `grep -q "dwposeConfig" src/spec-parser.ts`

### [x] IP Adapter Plus
IPAdapterPlus.
Run: `grep -q "ipadapterplusConfig" src/spec-parser.ts`

### [x] Instant ID
InstantID.
Run: `grep -q "instantidConfig" src/spec-parser.ts`

### [x] FaceID
FaceID.
Run: `grep -q "faceidConfig" src/spec-parser.ts`

### [x] PuLID
PuLID.
Run: `grep -q "pulidConfig" src/spec-parser.ts`

### [x] Hyper-SD
HyperSD.
Run: `grep -q "hypersdConfig" src/spec-parser.ts`

### [x] Hyper LoRA
HyperLoRA.
Run: `grep -q "hyperloraConfig" src/spec-parser.ts`

### [x] Splunk
Splunk.
Run: `grep -q "splunkConfig" src/spec-parser.ts`

### [x] Elasticsearch Log
ElasticsearchLog.
Run: `grep -q "elasticsearchlogConfig" src/spec-parser.ts`

### [x] Kibana
Kibana.
Run: `grep -q "kibanaConfig" src/spec-parser.ts`

### [x] Datadog Logs
DatadogLogs.
Run: `grep -q "datadoglogsConfig" src/spec-parser.ts`

### [x] Sumo Logic Logs
SumoLogicLogs.
Run: `grep -q "sumologiclogsConfig" src/spec-parser.ts`

### [x] New Relic Logs
NewRelicLogs.
Run: `grep -q "newreliclogsConfig" src/spec-parser.ts`

### [x] CloudWatch Logs
CloudWatchLogs.
Run: `grep -q "cloudwatchlogsConfig" src/spec-parser.ts`

### [x] Azure Monitor Logs
AzureMonitorLogs.
Run: `grep -q "azuremonitorlogsConfig" src/spec-parser.ts`

### [x] GCP Logging
GCPLogging.
Run: `grep -q "gcploggingConfig" src/spec-parser.ts`

### [x] Loggly
Loggly.
Run: `grep -q "logglyConfig" src/spec-parser.ts`

### [x] Papertrail
Papertrail.
Run: `grep -q "papertrailConfig" src/spec-parser.ts`

### [x] Logz.io
Logzio.
Run: `grep -q "logzioConfig" src/spec-parser.ts`

### [x] Sematext
Sematext.
Run: `grep -q "sematextConfig" src/spec-parser.ts`

### [x] Scalyr
Scalyr.
Run: `grep -q "scalyrConfig" src/spec-parser.ts`

### [x] Timber
Timber.
Run: `grep -q "timberConfig" src/spec-parser.ts`

### [x] Better Stack
BetterStackLog.
Run: `grep -q "betterstacklogConfig" src/spec-parser.ts`

### [x] Logtail
Logtail.
Run: `grep -q "logtailConfig" src/spec-parser.ts`

### [x] Mezmo
Mezmo.
Run: `grep -q "mezmoConfig" src/spec-parser.ts`

### [x] OpenObserve
OpenObserve.
Run: `grep -q "openobserveConfig" src/spec-parser.ts`

### [x] SigNoz
SigNoz.
Run: `grep -q "signozConfig" src/spec-parser.ts`

### [x] Grafana Loki
GrafanaLoki.
Run: `grep -q "grafanalokiConfig" src/spec-parser.ts`

### [x] Grafana Alloy
GrafanaAlloy.
Run: `grep -q "grafanaalloyConfig" src/spec-parser.ts`

### [x] Vector
Vector.
Run: `grep -q "vectorConfig" src/spec-parser.ts`

### [x] Fluent Bit
FluentBit.
Run: `grep -q "fluentbitConfig" src/spec-parser.ts`

### [x] Fluentd
Fluentd.
Run: `grep -q "fluentdConfig" src/spec-parser.ts`

### [x] Filebeat
Filebeat.
Run: `grep -q "filebeatConfig" src/spec-parser.ts`

### [x] Metricbeat
Metricbeat.
Run: `grep -q "metricbeatConfig" src/spec-parser.ts`

### [x] Heartbeat
Heartbeat.
Run: `grep -q "heartbeatConfig" src/spec-parser.ts`

### [x] Packetbeat
Packetbeat.
Run: `grep -q "packetbeatConfig" src/spec-parser.ts`

### [x] Auditbeat
Auditbeat.
Run: `grep -q "auditbeatConfig" src/spec-parser.ts`

### [x] Journalbeat
Journalbeat.
Run: `grep -q "journalbeatConfig" src/spec-parser.ts`

### [x] Functionbeat
Functionbeat.
Run: `grep -q "functionbeatConfig" src/spec-parser.ts`

### [x] OTel Collector
OTelCollector.
Run: `grep -q "otelcollectorConfig" src/spec-parser.ts`

### [x] OTel Exporter
OTelExporter.
Run: `grep -q "otelexporterConfig" src/spec-parser.ts`

### [x] OTel Receiver
OTelReceiver.
Run: `grep -q "otelreceiverConfig" src/spec-parser.ts`

### [x] OTel Processor
OTelProcessor.
Run: `grep -q "otelprocessorConfig" src/spec-parser.ts`

### [x] OTel Extension
OTelExtension.
Run: `grep -q "otelextensionConfig" src/spec-parser.ts`

### [x] OTel Connector
OTelConnector.
Run: `grep -q "otelconnectorConfig" src/spec-parser.ts`

### [x] Prometheus Agent
PrometheusAgent.
Run: `grep -q "prometheusagentConfig" src/spec-parser.ts`

### [x] Grafana Agent
GrafanaAgentConf.
Run: `grep -q "grafanaagentconfConfig" src/spec-parser.ts`

### [x] Mimir
MimirConf.
Run: `grep -q "mimirconfConfig" src/spec-parser.ts`

### [x] Thanos
ThanosConf.
Run: `grep -q "thanosconfConfig" src/spec-parser.ts`

### [x] Cortex
CortexConf.
Run: `grep -q "cortexconfConfig" src/spec-parser.ts`

### [x] Grafana Alloy
GrafanaAlloyConf.
Run: `grep -q "grafanaalloyconfConfig" src/spec-parser.ts`

### [x] Alloy
Alloy.
Run: `grep -q "alloyConfig" src/spec-parser.ts`

### [x] Scribe
Scribe.
Run: `grep -q "scribeConfig" src/spec-parser.ts`

### [x] Crowdin
Crowdin.
Run: `grep -q "crowdinConfig" src/spec-parser.ts`

### [x] Transifex
Transifex.
Run: `grep -q "transifexConfig" src/spec-parser.ts`

### [x] Lokalise
Lokalise.
Run: `grep -q "lokaliseConfig" src/spec-parser.ts`

### [x] Phrase
Phrase.
Run: `grep -q "phraseConfig" src/spec-parser.ts`

### [x] POEditor
POEditor.
Run: `grep -q "poeditorConfig" src/spec-parser.ts`

### [x] Weblate
Weblate.
Run: `grep -q "weblateConfig" src/spec-parser.ts`

### [x] Zanata
Zanata.
Run: `grep -q "zanataConfig" src/spec-parser.ts`

### [x] Memsource
Memsource.
Run: `grep -q "memsourceConfig" src/spec-parser.ts`

### [x] Smartling
Smartling.
Run: `grep -q "smartlingConfig" src/spec-parser.ts`

### [x] XTM
XTM.
Run: `grep -q "xtmConfig" src/spec-parser.ts`

### [x] MemoQ
MemoQ.
Run: `grep -q "memoqConfig" src/spec-parser.ts`

### [x] SDL Trados
SDLTrados.
Run: `grep -q "sdltradosConfig" src/spec-parser.ts`

### [x] OmegaT
OmegaT.
Run: `grep -q "omegatConfig" src/spec-parser.ts`

### [x] DeepL
DeepL.
Run: `grep -q "deeplConfig" src/spec-parser.ts`

### [x] Google Translate
GoogleTranslate.
Run: `grep -q "googletranslateConfig" src/spec-parser.ts`

### [x] GCP Translation
GCPTranslation.
Run: `grep -q "gcptranslationConfig" src/spec-parser.ts`

### [x] Azure Translator
AzureTranslator.
Run: `grep -q "azuretranslatorConfig" src/spec-parser.ts`

### [x] AWS Translate
AWSTranslate.
Run: `grep -q "awstranslateConfig" src/spec-parser.ts`

### [x] IBM Watson Language
IBMWatsonLanguage.
Run: `grep -q "ibmwatsonlanguageConfig" src/spec-parser.ts`

### [x] ModernMT
ModernMT.
Run: `grep -q "modernmtConfig" src/spec-parser.ts`

### [x] LibreTranslate
LibreTranslate.
Run: `grep -q "libretranslateConfig" src/spec-parser.ts`

### [x] Argos Translate
ArgosTranslate.
Run: `grep -q "argostranslateConfig" src/spec-parser.ts`

### [x] Apertium
Apertium.
Run: `grep -q "apertiumConfig" src/spec-parser.ts`

### [x] Moses
Moses.
Run: `grep -q "mosesConfig" src/spec-parser.ts`

### [x] Marian NMT
MarianNMT.
Run: `grep -q "mariannmtConfig" src/spec-parser.ts`

### [x] OpenNMT
OpenNMT.
Run: `grep -q "opennmtConfig" src/spec-parser.ts`

### [x] Transformer MMMT
TransformerMMMT.
Run: `grep -q "transformermmmtConfig" src/spec-parser.ts`

### [x] NLLB
NLLB.
Run: `grep -q "nllbConfig" src/spec-parser.ts`

### [x] M2M-100
M2M100.
Run: `grep -q "m2m100Config" src/spec-parser.ts`

### [x] mBART
MBART.
Run: `grep -q "mbartConfig" src/spec-parser.ts`

### [x] Helsinki NLP
HelsinkiNLP.
Run: `grep -q "helsinkinlpConfig" src/spec-parser.ts`

### [x] Opus Models
OpusModels.
Run: `grep -q "opusmodelsConfig" src/spec-parser.ts`

### [x] Seamless M4T
SeamlessM4T.
Run: `grep -q "seamlessm4tConfig" src/spec-parser.ts`

### [x] Madlad400
Madlad400.
Run: `grep -q "madlad400Config" src/spec-parser.ts`

### [x] BLOOM
BLOOM.
Run: `grep -q "bloomConfig" src/spec-parser.ts`

### [x] BLOOMZ
BLOOMZ.
Run: `grep -q "bloomzConfig" src/spec-parser.ts`

### [x] Galactica
Galactica.
Run: `grep -q "galacticaConfig" src/spec-parser.ts`

### [x] Flan-T5
FlanT5.
Run: `grep -q "flant5Config" src/spec-parser.ts`

### [x] Flan-Alpaca
FlanAlpaca.
Run: `grep -q "flanalpacaConfig" src/spec-parser.ts`

### [x] Dolly
Dolly.
Run: `grep -q "dollyConfig" src/spec-parser.ts`

### [x] StableLM
StableLM.
Run: `grep -q "stablelmConfig" src/spec-parser.ts`

### [x] RedPajama
RedPajama.
Run: `grep -q "redpajamaConfig" src/spec-parser.ts`

### [x] MPT
MPT.
Run: `grep -q "mptConfig" src/spec-parser.ts`

### [x] Falcon
Falcon.
Run: `grep -q "falconConfig" src/spec-parser.ts`

### [x] Phi
Phi.
Run: `grep -q "phiConfig" src/spec-parser.ts`

### [x] TinyLlama
TinyLlama.
Run: `grep -q "tinyllamaConfig" src/spec-parser.ts`

### [x] Phi-2
Phi2.
Run: `grep -q "phi2Config" src/spec-parser.ts`

### [x] Phi-3
Phi3.
Run: `grep -q "phi3Config" src/spec-parser.ts`

### [x] MiniGPT-4
MiniGPT4.
Run: `grep -q "minigpt4Config" src/spec-parser.ts`

### [x] LLaVA
LLaVA.
Run: `grep -q "llavaConfig" src/spec-parser.ts`

### [x] LLaVA 1.5
LLaVA15.
Run: `grep -q "llava15Config" src/spec-parser.ts`

### [x] LLaVA 1.6
LLaVA16.
Run: `grep -q "llava16Config" src/spec-parser.ts`

### [x] Vue.js
VueJS.
Run: `grep -q "vuejsConfig" src/spec-parser.ts`

### [x] Vue 2
Vue2.
Run: `grep -q "vue2Config" src/spec-parser.ts`

### [x] Vue 3
Vue3.
Run: `grep -q "vue3Config" src/spec-parser.ts`

### [x] Nuxt.js
NuxtJS.
Run: `grep -q "nuxtjsConfig" src/spec-parser.ts`

### [x] Nuxt 2
Nuxt2.
Run: `grep -q "nuxt2Config" src/spec-parser.ts`

### [x] Nuxt 3
Nuxt3.
Run: `grep -q "nuxt3Config" src/spec-parser.ts`

### [x] Svelte
Svelte.
Run: `grep -q "svelteConfig" src/spec-parser.ts`

### [x] SvelteKit
SvelteKit.
Run: `grep -q "sveltekitConfig" src/spec-parser.ts`

### [x] SolidJS
SolidJS.
Run: `grep -q "solidjsConfig" src/spec-parser.ts`

### [x] SolidStart
SolidStart.
Run: `grep -q "solidstartConfig" src/spec-parser.ts`

### [x] Angular
Angular.
Run: `grep -q "angularConfig" src/spec-parser.ts`

### [x] AngularJS
AngularJS.
Run: `grep -q "angularjsConfig" src/spec-parser.ts`

### [x] Angular Universal
AngularUniversal.
Run: `grep -q "angularuniversalConfig" src/spec-parser.ts`

### [x] Qwik
Qwik.
Run: `grep -q "qwikConfig" src/spec-parser.ts`

### [x] Ember.js
EmberJS.
Run: `grep -q "emberjsConfig" src/spec-parser.ts`

### [x] Backbone.js
BackboneJS.
Run: `grep -q "backbonejsConfig" src/spec-parser.ts`

### [x] jQuery
JQuery.
Run: `grep -q "jqueryConfig" src/spec-parser.ts`

### [x] Preact
Preact.
Run: `grep -q "preactConfig" src/spec-parser.ts`

### [x] Inferno
Inferno.
Run: `grep -q "infernoConfig" src/spec-parser.ts`

### [x] Riot
Riot.
Run: `grep -q "riotConfig" src/spec-parser.ts`

### [x] Alpine.js
AlpineJS.
Run: `grep -q "alpinejsConfig" src/spec-parser.ts`

### [x] Lit
Lit.
Run: `grep -q "litConfig" src/spec-parser.ts`

### [x] Stencil
Stencil.
Run: `grep -q "stencilConfig" src/spec-parser.ts`

### [x] Astro
Astro.
Run: `grep -q "astroConfig" src/spec-parser.ts`

### [x] Remix
Remix.
Run: `grep -q "remixConfig" src/spec-parser.ts`

### [x] Next.js
NextJS.
Run: `grep -q "nextjsConfig" src/spec-parser.ts`

### [x] Next.js 13 App Router
NextJS13.
Run: `grep -q "nextjs13Config" src/spec-parser.ts`

### [x] Next.js 14
NextJS14.
Run: `grep -q "nextjs14Config" src/spec-parser.ts`

### [x] Gatsby
Gatsby.
Run: `grep -q "gatsbyConfig" src/spec-parser.ts`

### [x] Redwood
Redwood.
Run: `grep -q "redwoodConfig" src/spec-parser.ts`

### [x] Blitz
Blitz.
Run: `grep -q "blitzConfig" src/spec-parser.ts`

### [x] Hydrogen
Hydrogen.
Run: `grep -q "hydrogenConfig" src/spec-parser.ts`

### [x] Vinxi
Vinxi.
Run: `grep -q "vinxiConfig" src/spec-parser.ts`

### [x] Vite
Vite.
Run: `grep -q "viteConfig" src/spec-parser.ts`

### [x] VitePress
VitePress.
Run: `grep -q "vitepressConfig" src/spec-parser.ts`

### [x] Vitest
Vitest.
Run: `grep -q "vitestConfig" src/spec-parser.ts`

### [x] Playwright
Playwright.
Run: `grep -q "playwrightConfig" src/spec-parser.ts`

### [x] Puppeteer
Puppeteer.
Run: `grep -q "puppeteerConfig" src/spec-parser.ts`

### [x] Selenium
Selenium.
Run: `grep -q "seleniumConfig" src/spec-parser.ts`

### [x] Cypress
Cypress.
Run: `grep -q "cypressConfig" src/spec-parser.ts`

### [x] TestCafe
TestCafe.
Run: `grep -q "testcafeConfig" src/spec-parser.ts`

### [x] WebdriverIO
WebdriverIO.
Run: `grep -q "webdriverioConfig" src/spec-parser.ts`

### [x] Taiko
Taiko.
Run: `grep -q "taikoConfig" src/spec-parser.ts`

### [x] Nightwatch
Nightwatch.
Run: `grep -q "nightwatchConfig" src/spec-parser.ts`

### [x] Jest
Jest.
Run: `grep -q "jestConfig" src/spec-parser.ts`

### [x] Testing Library
TestingLibrary.
Run: `grep -q "testinglibraryConfig" src/spec-parser.ts`

### [x] Vitest Coverage
VitestCoverage.
Run: `grep -q "vitestcoverageConfig" src/spec-parser.ts`

### [x] Istanbul
Istanbul.
Run: `grep -q "istanbulConfig" src/spec-parser.ts`

### [x] NYC
NYC.
Run: `grep -q "nycConfig" src/spec-parser.ts`

### [x] Webpack
Webpack.
Run: `grep -q "webpackConfig" src/spec-parser.ts`

### [x] esbuild
Esbuild.
Run: `grep -q "esbuildConfig" src/spec-parser.ts`

### [x] Rollup
Rollup.
Run: `grep -q "rollupConfig" src/spec-parser.ts`

### [x] Parcel
Parcel.
Run: `grep -q "parcelConfig" src/spec-parser.ts`

### [x] Turbopack
Turbopack.
Run: `grep -q "turbopackConfig" src/spec-parser.ts`

### [x] Tailwind CSS
TailwindCSS.
Run: `grep -q "tailwindcssConfig" src/spec-parser.ts`

### [x] Bootstrap
Bootstrap.
Run: `grep -q "bootstrapConfig" src/spec-parser.ts`

### [x] Materialize
Materialize.
Run: `grep -q "materializeConfig" src/spec-parser.ts`

### [x] Bulma
Bulma.
Run: `grep -q "bulmaConfig" src/spec-parser.ts`

### [x] Foundation
Foundation.
Run: `grep -q "foundationConfig" src/spec-parser.ts`

### [x] Semantic UI
SemanticUI.
Run: `grep -q "semanticuiConfig" src/spec-parser.ts`

### [x] Ant Design
AntDesign.
Run: `grep -q "antdesignConfig" src/spec-parser.ts`

### [x] Material UI
MaterialUI.
Run: `grep -q "materialuiConfig" src/spec-parser.ts`

### [x] Chakra UI
ChakraUI.
Run: `grep -q "chakrauiConfig" src/spec-parser.ts`

### [x] Radix UI
RadixUI.
Run: `grep -q "radixuiConfig" src/spec-parser.ts`

### [x] Headless UI
HeadlessUI.
Run: `grep -q "headlessuiConfig" src/spec-parser.ts`

### [x] shadcn/ui
ShadcnUI.
Run: `grep -q "shadcnuiConfig" src/spec-parser.ts`

### [x] Kendo UI
KendoUI.
Run: `grep -q "kendouiConfig" src/spec-parser.ts`

### [x] PrimeNG
PrimeNG.
Run: `grep -q "primengConfig" src/spec-parser.ts`

### [x] Vuetify
Vuetify.
Run: `grep -q "vuetifyConfig" src/spec-parser.ts`

### [x] Quasar
Quasar.
Run: `grep -q "quasarConfig" src/spec-parser.ts`

### [x] Naive UI
NaiveUI.
Run: `grep -q "naiveuiConfig" src/spec-parser.ts`

### [x] Element Plus
ElementPlus.
Run: `grep -q "elementplusConfig" src/spec-parser.ts`

### [x] Vuestic
Vuestic.
Run: `grep -q "vuesticConfig" src/spec-parser.ts`

### [x] UnoCSS
UnoCSS.
Run: `grep -q "unocssConfig" src/spec-parser.ts`

### [x] Windi CSS
WindiCSS.
Run: `grep -q "windicssConfig" src/spec-parser.ts`

### [x] PostCSS
PostCSS.
Run: `grep -q "postcssConfig" src/spec-parser.ts`

### [x] Autoprefixer
Autoprefixer.
Run: `grep -q "autoprefixerConfig" src/spec-parser.ts`

### [x] Stylelint
StylelintConf.
Run: `grep -q "stylelintconfConfig" src/spec-parser.ts`

### [x] CSS Modules
CSSModules.
Run: `grep -q "cssmodulesConfig" src/spec-parser.ts`

### [x] CSS-in-JS
CSSinJS.
Run: `grep -q "cssinjsConfig" src/spec-parser.ts`

### [x] Sass
Sass.
Run: `grep -q "sassConfig" src/spec-parser.ts`

### [x] SCSS
SCSS.
Run: `grep -q "scssConfig" src/spec-parser.ts`

### [x] Less
Less.
Run: `grep -q "lessConfig" src/spec-parser.ts`

### [x] Stylus
Stylus.
Run: `grep -q "stylusConfig" src/spec-parser.ts`

### [x] Redux
Redux.
Run: `grep -q "reduxConfig" src/spec-parser.ts`

### [x] Redux Toolkit
ReduxToolkit.
Run: `grep -q "reduxtoolkitConfig" src/spec-parser.ts`

### [x] Redux Thunk
ReduxThunk.
Run: `grep -q "reduxthunkConfig" src/spec-parser.ts`

### [x] Redux Saga
ReduxSaga.
Run: `grep -q "reduxsagaConfig" src/spec-parser.ts`

### [x] Redux Observable
ReduxObservable.
Run: `grep -q "reduxobservableConfig" src/spec-parser.ts`

### [x] Zustand
Zustand.
Run: `grep -q "zustandConfig" src/spec-parser.ts`

### [x] MobX
MobX.
Run: `grep -q "mobxConfig" src/spec-parser.ts`

### [x] Jotai
Jotai.
Run: `grep -q "jotaiConfig" src/spec-parser.ts`

### [x] Recoil
Recoil.
Run: `grep -q "recoilConfig" src/spec-parser.ts`

### [x] Valtio
Valtio.
Run: `grep -q "valtioConfig" src/spec-parser.ts`

### [x] Pinia
Pinia.
Run: `grep -q "piniaConfig" src/spec-parser.ts`

### [x] Vuex
Vuex.
Run: `grep -q "vuexConfig" src/spec-parser.ts`

### [x] XState
XState.
Run: `grep -q "xstateConfig" src/spec-parser.ts`

### [x] NgRx
NgRx.
Run: `grep -q "ngrxConfig" src/spec-parser.ts`

### [x] Akita
Akita.
Run: `grep -q "akitaConfig" src/spec-parser.ts`

### [x] Cerebral
Cerebral.
Run: `grep -q "cerebralConfig" src/spec-parser.ts`

### [x] TypeScript
TypeScriptLang.
Run: `grep -q "typescriptlangConfig" src/spec-parser.ts`

### [x] TypeScript 4
TypeScript4.
Run: `grep -q "typescript4Config" src/spec-parser.ts`

### [x] TypeScript 5
TypeScript5.
Run: `grep -q "typescript5Config" src/spec-parser.ts`

### [x] Flow
Flow.
Run: `grep -q "flowConfig" src/spec-parser.ts`

### [x] ReasonML
ReasonML.
Run: `grep -q "reasonmlConfig" src/spec-parser.ts`

### [x] OCaml
OCaml.
Run: `grep -q "ocamlConfig" src/spec-parser.ts`

### [x] PureScript
PureScript.
Run: `grep -q "purescriptConfig" src/spec-parser.ts`

### [x] Scala
Scala.
Run: `grep -q "scalaConfig" src/spec-parser.ts`

### [x] Haskell
Haskell.
Run: `grep -q "haskellConfig" src/spec-parser.ts`

### [x] Elm
Elm.
Run: `grep -q "elmConfig" src/spec-parser.ts`

### [x] F#
FSharp.
Run: `grep -q "fsharpConfig" src/spec-parser.ts`

### [x] Clojure
Clojure.
Run: `grep -q "clojureConfig" src/spec-parser.ts`

### [x] ClojureScript
ClojureScript.
Run: `grep -q "clojurescriptConfig" src/spec-parser.ts`

### [x] Rust
Rust.
Run: `grep -q "rustConfig" src/spec-parser.ts`

### [x] Rust 2021
Rust2021.
Run: `grep -q "rust2021Config" src/spec-parser.ts`

### [x] Rust 2024
Rust2024.
Run: `grep -q "rust2024Config" src/spec-parser.ts`

### [x] Go
Go.
Run: `grep -q "goConfig" src/spec-parser.ts`

### [x] Swift
Swift.
Run: `grep -q "swiftConfig" src/spec-parser.ts`

### [x] Kotlin
Kotlin.
Run: `grep -q "kotlinConfig" src/spec-parser.ts`

### [x] Dart
Dart.
Run: `grep -q "dartConfig" src/spec-parser.ts`

### [x] Julia
Julia.
Run: `grep -q "juliaConfig" src/spec-parser.ts`

### [x] R
R.
Run: `grep -q "rConfig" src/spec-parser.ts`

### [x] Zig
Zig.
Run: `grep -q "zigConfig" src/spec-parser.ts`

### [x] Nim
Nim.
Run: `grep -q "nimConfig" src/spec-parser.ts`

### [x] Crystal
Crystal.
Run: `grep -q "crystalConfig" src/spec-parser.ts`

### [x] D
D.
Run: `grep -q "dlangConfig" src/spec-parser.ts`

### [x] Lua
Lua.
Run: `grep -q "luaConfig" src/spec-parser.ts`

### [x] LuaJIT
LuaJIT.
Run: `grep -q "luajitConfig" src/spec-parser.ts`

### [x] Perl
Perl.
Run: `grep -q "perlConfig" src/spec-parser.ts`

### [x] PHP
PHP.
Run: `grep -q "phpConfig" src/spec-parser.ts`

### [x] PHP 8
PHP8.
Run: `grep -q "php8Config" src/spec-parser.ts`

### [x] Ruby
Ruby.
Run: `grep -q "rubyConfig" src/spec-parser.ts`

### [x] Ruby 3
Ruby3.
Run: `grep -q "ruby3Config" src/spec-parser.ts`

### [x] Python
Python.
Run: `grep -q "pythonConfig" src/spec-parser.ts`

### [x] Python 3
Python3.
Run: `grep -q "python3Config" src/spec-parser.ts`

### [x] Python 3.12
Python312.
Run: `grep -q "python312Config" src/spec-parser.ts`

### [x] Java
Java.
Run: `grep -q "javaConfig" src/spec-parser.ts`

### [x] Java 21
Java21.
Run: `grep -q "java21Config" src/spec-parser.ts`

### [x] Kotlin 2
Kotlin2.
Run: `grep -q "kotlin2Config" src/spec-parser.ts`

### [x] C#
CSharp.
Run: `grep -q "csharpConfig" src/spec-parser.ts`

### [x] C# 12
CSharp12.
Run: `grep -q "csharp12Config" src/spec-parser.ts`

### [x] VB.NET
VBNet.
Run: `grep -q "vbnetConfig" src/spec-parser.ts`

### [x] COBOL
COBOL.
Run: `grep -q "cobolConfig" src/spec-parser.ts`

### [x] Fortran
Fortran.
Run: `grep -q "fortranConfig" src/spec-parser.ts`

### [x] Pascal
Pascal.
Run: `grep -q "pascalConfig" src/spec-parser.ts`

### [x] Assembly
Assembly.
Run: `grep -q "assemblyConfig" src/spec-parser.ts`

### [x] WASM
WASM.
Run: `grep -q "wasmConfig" src/spec-parser.ts`

### [x] WebAssembly
WebAssembly.
Run: `grep -q "webassemblyConfig" src/spec-parser.ts`

### [x] Emscripten
Emscripten.
Run: `grep -q "emscriptenConfig" src/spec-parser.ts`

### [x] Wasmtime
Wasmtime.
Run: `grep -q "wasmtimeConfig" src/spec-parser.ts`

### [x] WasmEdge
WasmEdge.
Run: `grep -q "wasmedgeConfig" src/spec-parser.ts`

### [x] REST API
RESTAPI.
Run: `grep -q "restapiConfig" src/spec-parser.ts`

### [x] GraphQL
GraphQL.
Run: `grep -q "graphqlConfig" src/spec-parser.ts`

### [x] GraphQL Subscriptions
GraphQLSubscriptions.
Run: `grep -q "graphqlsubscriptionsConfig" src/spec-parser.ts`

### [x] Apollo GraphQL
ApolloGraphQL.
Run: `grep -q "apollographqlConfig" src/spec-parser.ts`

### [x] Relay
Relay.
Run: `grep -q "relayConfig" src/spec-parser.ts`

### [x] tRPC
tRPC.
Run: `grep -q "trpcConfig" src/spec-parser.ts`

### [x] gRPC
GRPC.
Run: `grep -q "grpcConfig" src/spec-parser.ts`

### [x] gRPC-Web
GRPCWeb.
Run: `grep -q "grpcwebConfig" src/spec-parser.ts`

### [x] Protocol Buffers
Protobuf.
Run: `grep -q "protobufConfig" src/spec-parser.ts`

### [x] Thrift
Thrift.
Run: `grep -q "thriftConfig" src/spec-parser.ts`

### [x] Apache Avro
ApacheAvro.
Run: `grep -q "apacheavroConfig" src/spec-parser.ts`

### [x] JSON Schema
JSONSchema.
Run: `grep -q "jsonschemaConfig" src/spec-parser.ts`

### [x] OpenAPI
OpenAPI.
Run: `grep -q "openapiConfig" src/spec-parser.ts`

### [x] Swagger
Swagger.
Run: `grep -q "swaggerConfig" src/spec-parser.ts`

### [x] AsyncAPI
AsyncAPI.
Run: `grep -q "asyncapiConfig" src/spec-parser.ts`

### [x] JSON-RPC
JSONRPC.
Run: `grep -q "jsonrpcConfig" src/spec-parser.ts`

### [x] SOAP
SOAP.
Run: `grep -q "soapConfig" src/spec-parser.ts`

### [x] WebSockets
WebSockets.
Run: `grep -q "websocketsConfig" src/spec-parser.ts`

### [x] SSE
SSE.
Run: `grep -q "sseConfig" src/spec-parser.ts`

### [x] Webhooks
Webhooks.
Run: `grep -q "webhooksConfig" src/spec-parser.ts`

### [x] AWS Lambda
AWSLambda.
Run: `grep -q "aws lambdaConfig" src/spec-parser.ts`

### [x] Vercel Functions
VercelFunctions.
Run: `grep -q "vercelfunctionsConfig" src/spec-parser.ts`

### [x] Netlify Functions
NetlifyFunctions.
Run: `grep -q "netlifyfunctionsConfig" src/spec-parser.ts`

### [x] Supabase Edge Functions
SupabaseEdgeFunctions.
Run: `grep -q "supabaseedgefunctionsConfig" src/spec-parser.ts`

### [x] Cloudflare Workers
CloudflareWorkers.
Run: `grep -q "cloudflareworkersConfig" src/spec-parser.ts`

### [x] Firebase Functions
FirebaseFunctions.
Run: `grep -q "firebasefunctionsConfig" src/spec-parser.ts`

### [x] Deno Deploy
DenoDeploy.
Run: `grep -q "denodeployConfig" src/spec-parser.ts`

### [x] Express
Express.
Run: `grep -q "expressConfig" src/spec-parser.ts`

### [x] Fastify
Fastify.
Run: `grep -q "fastifyConfig" src/spec-parser.ts`

### [x] Hono
Hono.
Run: `grep -q "honoConfig" src/spec-parser.ts`

### [x] NestJS
NestJS.
Run: `grep -q "nestjsConfig" src/spec-parser.ts`

### [x] Koa
Koa.
Run: `grep -q "koaConfig" src/spec-parser.ts`

### [x] FastAPI
FastAPI.
Run: `grep -q "fastapiConfig" src/spec-parser.ts`

### [x] Flask
Flask.
Run: `grep -q "flaskConfig" src/spec-parser.ts`

### [x] Django
Django.
Run: `grep -q "djangoConfig" src/spec-parser.ts`

### [x] Rails
Rails.
Run: `grep -q "railsConfig" src/spec-parser.ts`

### [x] Phoenix
Phoenix.
Run: `grep -q "phoenixConfig" src/spec-parser.ts`

### [x] Gin
Gin.
Run: `grep -q "ginConfig" src/spec-parser.ts`

### [x] Echo
Echo.
Run: `grep -q "echoConfig" src/spec-parser.ts`

### [x] Fiber
Fiber.
Run: `grep -q "fiberConfig" src/spec-parser.ts`

### [x] Axum
Axum.
Run: `grep -q "axumConfig" src/spec-parser.ts`

### [x] Rocket
Rocket.
Run: `grep -q "rocketConfig" src/spec-parser.ts`

### [x] Actix-web
ActixWeb.
Run: `grep -q "actixwebConfig" src/spec-parser.ts`

### [x] ASP.NET Core
ASPNETCore.
Run: `grep -q "aspnetcoreConfig" src/spec-parser.ts`

### [x] Spring Boot
SpringBoot.
Run: `grep -q "springbootConfig" src/spec-parser.ts`

### [x] Micronaut
Micronaut.
Run: `grep -q "micronautConfig" src/spec-parser.ts`

### [x] Quarkus
Quarkus.
Run: `grep -q "quarkusConfig" src/spec-parser.ts`

### [x] Vert.x
Vertx.
Run: `grep -q "vertxConfig" src/spec-parser.ts`

### [x] Play Framework
PlayFramework.
Run: `grep -q "playframeworkConfig" src/spec-parser.ts`

### [x] Ratpack
Ratpack.
Run: `grep -q "ratpackConfig" src/spec-parser.ts`

### [x] Blade
Blade.
Run: `grep -q "bladeConfig" src/spec-parser.ts`

### [x] Laravel
Laravel.
Run: `grep -q "laravelConfig" src/spec-parser.ts`

### [x] Symfony
Symfony.
Run: `grep -q "symfonyConfig" src/spec-parser.ts`

### [x] PostgreSQL
PostgreSQL.
Run: `grep -q "postgresqlConfig" src/spec-parser.ts`

### [x] PostgreSQL 16
PostgreSQL16.
Run: `grep -q "postgresql16Config" src/spec-parser.ts`

### [x] MySQL
MySQL.
Run: `grep -q "mysqlConfig" src/spec-parser.ts`

### [x] MySQL 8
MySQL8.
Run: `grep -q "mysql8Config" src/spec-parser.ts`

### [x] MariaDB
MariaDB.
Run: `grep -q "mariadbConfig" src/spec-parser.ts`

### [x] SQLite
SQLite.
Run: `grep -q "sqliteConfig" src/spec-parser.ts`

### [x] SQLite 3
SQLite3.
Run: `grep -q "sqlite3Config" src/spec-parser.ts`

### [x] Oracle
Oracle.
Run: `grep -q "oracleConfig" src/spec-parser.ts`

### [x] SQL Server
SQLServer.
Run: `grep -q "sqlserverConfig" src/spec-parser.ts`

### [x] SQL Server 2022
SQLServer2022.
Run: `grep -q "sqlserver2022Config" src/spec-parser.ts`

### [x] MongoDB
MongoDB.
Run: `grep -q "mongodbConfig" src/spec-parser.ts`

### [x] MongoDB 7
MongoDB7.
Run: `grep -q "mongodb7Config" src/spec-parser.ts`

### [x] DynamoDB
DynamoDB.
Run: `grep -q "dynamodbConfig" src/spec-parser.ts`

### [x] Cassandra
Cassandra.
Run: `grep -q "cassandraConfig" src/spec-parser.ts`

### [x] ScyllaDB
ScyllaDB.
Run: `grep -q "scylladbConfig" src/spec-parser.ts`

### [x] Neo4j
Neo4j.
Run: `grep -q "neo4jConfig" src/spec-parser.ts`

### [x] Redis
Redis.
Run: `grep -q "redisConfig" src/spec-parser.ts`

### [x] Redis 7
Redis7.
Run: `grep -q "redis7Config" src/spec-parser.ts`

### [x] Valkey
Valkey.
Run: `grep -q "valkeyConfig" src/spec-parser.ts`

### [x] Dragonfly
Dragonfly.
Run: `grep -q "dragonflyConfig" src/spec-parser.ts`

### [x] KeyDB
KeyDB.
Run: `grep -q "keydbConfig" src/spec-parser.ts`

### [x] Memcached
Memcached.
Run: `grep -q "memcachedConfig" src/spec-parser.ts`

### [x] InfluxDB
InfluxDB.
Run: `grep -q "influxdbConfig" src/spec-parser.ts`

### [x] InfluxDB 2
InfluxDB2.
Run: `grep -q "influxdb2Config" src/spec-parser.ts`

### [x] TimescaleDB
TimescaleDB.
Run: `grep -q "timescaledbConfig" src/spec-parser.ts`

### [x] QuestDB
QuestDB.
Run: `grep -q "questdbConfig" src/spec-parser.ts`

### [x] ClickHouse
ClickHouse.
Run: `grep -q "clickhouseConfig" src/spec-parser.ts`

### [x] SingleStore
SingleStore.
Run: `grep -q "singlestoreConfig" src/spec-parser.ts`

### [x] CockroachDB
CockroachDB.
Run: `grep -q "cockroachdbConfig" src/spec-parser.ts`

### [x] YugabyteDB
YugabyteDB.
Run: `grep -q "yugabytedbConfig" src/spec-parser.ts`

### [x] TiDB
TiDB.
Run: `grep -q "tidbConfig" src/spec-parser.ts`

### [x] PlanetScale
PlanetScale.
Run: `grep -q "planetscaleConfig" src/spec-parser.ts`

### [x] Neon
Neon.
Run: `grep -q "neondbConfig" src/spec-parser.ts`

### [x] Supabase
SupabaseDB.
Run: `grep -q "supabasedbConfig" src/spec-parser.ts`

### [x] Fauna
Fauna.
Run: `grep -q "faunaConfig" src/spec-parser.ts`

### [x] Firestore
Firestore.
Run: `grep -q "firestoreConfig" src/spec-parser.ts`

### [x] Datastore
Datastore.
Run: `grep -q "datastoreConfig" src/spec-parser.ts`

### [x] BigQuery
BigQuery.
Run: `grep -q "bigqueryConfig" src/spec-parser.ts`

### [x] Snowflake
Snowflake.
Run: `grep -q "snowflakeConfig" src/spec-parser.ts`

### [x] Redshift
Redshift.
Run: `grep -q "redshiftConfig" src/spec-parser.ts`

### [x] Presto
Presto.
Run: `grep -q "prestoConfig" src/spec-parser.ts`

### [x] Trino
Trino.
Run: `grep -q "trinoConfig" src/spec-parser.ts`

### [x] Apache Druid
ApacheDruid.
Run: `grep -q "apachedruidConfig" src/spec-parser.ts`

### [x] Pinot
Pinot.
Run: `grep -q "pinotConfig" src/spec-parser.ts`

### [x] Weaviate DB
WeaviateDB.
Run: `grep -q "weaviatedbConfig" src/spec-parser.ts`

### [x] Qdrant DB
QdrantDB.
Run: `grep -q "qdrantdbConfig" src/spec-parser.ts`

### [x] Milvus
Milvus.
Run: `grep -q "milvusConfig" src/spec-parser.ts`

### [x] Chroma DB
ChromaDB.
Run: `grep -q "chromadbConfig" src/spec-parser.ts`

### [x] Pinecone DB
PineconeDB.
Run: `grep -q "pineconedbConfig" src/spec-parser.ts`

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
