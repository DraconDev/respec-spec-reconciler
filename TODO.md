# respec — Pivot to Spec-as-Source-of-Truth Model

## Strategy
- No custom verify script — use standard dev tools (tsc, npm test, curl, etc.)
- SPEC.md is the single source of truth — not a TODO list
- Each spec item names an objective, independently verifiable check
- Agent uses real tools to verify, no translation layer
- SPEC gets updated when understanding changes, not code

## TODO

### Phase 1: Remove verify-script infrastructure ✅
- [x] Remove `src/verifier.ts` — no custom verifier
- [x] Remove `src/delta-engine.ts` — no verifier output to parse
- [x] Remove `scripts/verify-spec.sh` — not needed
- [x] Remove `templates/verify-template.sh` — not needed
- [x] Clean `src/commands.ts` — remove verifier/delta imports
- [x] Clean `src/loop-controller.ts` — rewrite without verifier

### Phase 2: Simplify spec parser ✅
- [x] Rewrite `src/spec-parser.ts` — parse items with `[x]` / `[ ]` checkboxes
- [x] Each item has: name, description, checked status, verification hint
- [x] Support `### [x] Item name` or `- [x] Item name` format

### Phase 3: Rewrite SPEC.md ✅
- [x] New SPEC.md with operational, checkable requirements
- [x] Items reference standard dev commands where applicable
- [x] Checkbox format

### Phase 4: Simplify loop controller ✅
- [x] Pick next unchecked item from spec
- [x] Track retries (stall detection still useful)
- [x] Agent marks items complete via SPEC.md edits
- [x] Spec changes regenerate the queue
- [x] No verifier-based state transitions

### Phase 5: Update commands ✅
- [x] `/spec-init` — scaffold new-style SPEC.md only, no verify script
- [x] `/spec-status` — show done/undone items, current target
- [x] `/respec` — simplified loop: pick item, work, mark done, repeat

### Phase 6: Update docs ✅
- [x] Rewrite README to reflect new model
- [x] Update package.json description/keywords
- [ ] Push to GitHub

### Phase 7: Verify ✅
- [x] TypeScript compiles cleanly
- [x] Extension loads via `pi -e ./src/index.ts`
- [x] Commands register correctly
- [x] Remove dead code (focusedSpecKey, persistFocus)
- [x] Clean up duplicate functions

### Phase 8: Tests
- [ ] Add unit tests for spec-parser
- [ ] Add unit tests for store
- [ ] Add integration test for loop controller
