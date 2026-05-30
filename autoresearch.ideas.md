# Future Improvements for respec

## Ideas to Try (Deferred)

### High Priority
- [x] **Rollback detection** — alert if a previously checked item regresses
- [x] **Spec diffing** — show what changed between SPEC.md versions
- [x] **Confidence scoring** — rate how confident the agent should be based on item type
- [x] **Multi-spec composition** — support for multiple SPEC.md files in different directories
- [ ] **Team sync** — share learned budgets across team members via git

### Medium Priority
- [x] **Checkpointing** — save progress mid-item for resume after crash
- [x] **Spec analytics** — track which item types take longest, common failure patterns
- [ ] **Team sync** — share learned budgets across team members via git
- [ ] **Interactive spec editing** — edit SPEC.md via natural language commands

### Low Priority
- [ ] **IDE integration** — VS Code extension for spec editing and status
- [ ] **CI/CD integration** — run /respec in CI to enforce spec compliance
- [ ] **Spec templates** — pre-built templates for common project types (API, library, CLI)
- [ ] **Markdown linting** — ensure spec items follow best practices

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
