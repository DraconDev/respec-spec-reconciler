# respec — Spec Reconciler Plugin

## Pivot: v0.2 — Spec-as-Source-of-Truth Model

### Context
Complete rewrite away from verifier-driven model. The old model required a custom `verify-spec.sh` that translated English spec items into shell checks — the same impossible translation problem every agent faces. The new model keeps SPEC.md as the single source of truth and lets the agent verify using standard developer tools.

### What Changed

**Removed:**
- `src/verifier.ts` — custom verifier execution
- `src/delta-engine.ts` — verifier output parsing and queue building
- `scripts/verify-spec.sh` — custom shell verifier
- `templates/verify-template.sh` — verifier template

**Rewritten:**
- `src/types.ts` — SpecItem model with `[x]`/`[ ]` checkboxes
- `src/spec-parser.ts` — parses checkbox items, not invariants
- `src/loop-controller.ts` — picks next unchecked item, simpler state machine
- `src/commands.ts` — no verify script, cleaner flow
- `src/store.ts` — updated types
- `SPEC.md` — checkbox format, operational requirements
- `README.md` — reflects new model and philosophy

**Unchanged:**
- `src/index.ts` — same entry point, same registration

### New Architecture

```
SPEC.md (requirements with [x]/[ ] checkboxes)
    ↓
/respec parse → find next unchecked item
    ↓
Agent works on it, verifies with real tools (tsc, npm test, curl...)
    ↓
Agent or user checks it off in SPEC.md
    ↓
Loop to next item
```

### Key Insights
1. **No verify script** — agent uses standard tools it already knows
2. **SPEC is the source of truth** — no second copy in shell
3. **SPEC evolves** — update when understanding changes, not the code
4. **No crystal ball** — don't list everything upfront, add as you learn

### Phase 1: Remove verify-script infrastructure ✅
- [x] Remove `src/verifier.ts`
- [x] Remove `src/delta-engine.ts`
- [x] Remove `scripts/verify-spec.sh`
- [x] Remove `templates/verify-template.sh`

### Phase 2: Rewrite core modules ✅
- [x] `src/types.ts` — checkbox-based SpecItem model
- [x] `src/spec-parser.ts` — parse [x]/[ ] items
- [x] `src/store.ts` — updated for new types
- [x] `src/loop-controller.ts` — simplified, no verifier
- [x] `src/commands.ts` — spec-init only, no verify script

### Phase 3: Update docs ✅
- [x] SPEC.md — checkbox format for project itself
- [x] README.md — reflects new model
- [x] TODO.md — pivot tracking

### Phase 4: Verify ✅
- [x] TypeScript compiles cleanly
- [x] Deleted files gone from git tracking
- [x] All changes committed and pushed

### Current State
- Repo: `DraconDev/respec-spec-reconciler`
- Auto-committed to origin/main via 5 commits
- Extension loads clean with `pi -e ./src/index.ts`
- SPEC.md has 14 items (10 checked, 4 to go)

### Remaining
- [ ] Test loop controller with a real session (items 11-14 in SPEC.md)
- [ ] Verify escape valve triggers on 3 consecutive failures
- [ ] Test spec-init scaffolds correctly
