# Future Improvements for respec

## Ideas to Try (Deferred)

### High Priority
- [x] **Rollback detection** — alert if a previously checked item regresses
- [x] **Spec diffing** — show what changed between SPEC.md versions
- [x] **Confidence scoring** — rate how confident the agent should be based on item type
- [x] **Multi-spec composition** — support for multiple SPEC.md files in different directories
- [x] **Team sync** — share learned budgets across team members via git
- [x] **Interactive spec editing** — edit SPEC.md via natural language commands
- [x] **CI/CD integration** — run /respec in CI to enforce spec compliance
- [x] **Spec templates** — pre-built templates for common project types (API, library, CLI)
- [x] **Markdown linting** — ensure spec items follow best practices
- [x] **Dependency graph** — topological sort and cycle detection
- [x] **Suggestion engine** — pattern-based next item recommendations

### Medium Priority
- [x] **Checkpointing** — save progress mid-item for resume after crash
- [x] **Spec analytics** — track which item types take longest, common failure patterns
- [x] **Team sync** — share learned budgets across team members via git
- [x] **Interactive spec editing** — edit SPEC.md via natural language commands

### Low Priority
- [ ] **IDE integration** — VS Code extension for spec editing and status

## Abandoned Ideas

- Custom verify scripts (replaced by standard tool approach)
- Delta engine for parsing script output (too complex, not needed)
- Focus persistence across sessions (added complexity without value)


## What's Working Well

- Adaptive prompts with complexity scoring
- Failure pattern analysis in escape valve
- Learned turn budgets by category
- Batch mode for independent items
- Hierarchical spec support
- CI/CD integration with JSON output
- Interactive spec editing via natural language
- Team sync with conflict detection and merge strategies
- Spec templates library (API, Library, CLI, Web App)
- Markdown linting with severity levels
- Dependency graph with topological sort and cycle detection
- Suggestion engine with confidence-weighted recommendations

## Abandoned Ideas

- Custom verify scripts (replaced by standard tool approach)
- Delta engine for parsing script output (too complex, not needed)
- Focus persistence across sessions (added complexity without value)

## What's Working Well

- Adaptive prompts with complexity scoring
- Failure pattern analysis in escape valve
- Learned turn budgets by category
- Batch mode for independent items
- Hierarchical spec support
