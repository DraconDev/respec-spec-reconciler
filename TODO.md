# respec — Pivot to Spec-as-Source-of-Truth Model

## Strategy
- No custom verify script — use standard dev tools (tsc, npm test, curl, etc.)
- SPEC.md is the single source of truth — not a TODO list
- Each spec item names an objective, independently verifiable check
- Agent uses real tools to verify, no translation layer
- SPEC gets updated when understanding changes, not code

## TODO

### Phase 1: Remove verify-script infrastructure
- [ ] Remove `src/verifier.ts` — no custom verifier
- [ ] Remove `src/delta-engine.ts` — no verifier output to parse
- [ ] Remove `scripts/verify-spec.sh` — not needed
- [ ] Remove `templates/verify-template.sh` — not needed
- [ ] Clean `src/index.ts` — remove verifier/delta imports

### Phase 2: Simplify spec parser
- [ ] Rewrite `src/spec-parser.ts` — parse items with `[x]` / `[ ]` checkboxes
- [ ] Each item has: name, description, checked status, verification hint
- [ ] Support `### [x] Item name` or `- [x] Item name` format

### Phase 3: Rewrite SPEC.md
- [ ] New SPEC.md with operational, checkable requirements
- [ ] Items reference standard dev commands where applicable
- [ ] Show example of what "done" looks like

### Phase 4: Simplify loop controller
- [ ] Pick next unchecked item from spec
- [ ] Track retries (stall detection still useful)
- [ ] Agent marks items complete
- [ ] Spec changes regenerate the queue
- [ ] No verifier-based state transitions

### Phase 5: Update commands
- [ ] `/spec-init` — scaffold new-style SPEC.md only, no verify script
- [ ] `/spec-status` — show done/undone items, current target
- [ ] `/respec` — simplified loop: pick item, work, mark done, repeat

### Phase 6: Update docs
- [ ] Rewrite README to reflect new model
- [ ] Update package.json description/keywords
- [ ] Update SPEC.md architecture section if applicable

### Phase 7: Verify
- [ ] TypeScript compiles cleanly
- [ ] Extension loads via `pi -e ./src/index.ts`
- [ ] Commands register correctly
