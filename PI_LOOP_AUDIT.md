# Pi Loop And Goal Extension Audit

Research baseline: 2026-05-22.

## Scope

This audit compares respec against similar Pi extensions and loop/goal products in the Pi package ecosystem. The goal is not to copy their product scope. The goal is to identify small mechanics that make autonomous reconciliation safer, clearer, and easier to resume.

Audited sources:

- Pi extension API docs
- `pi-until-done`
- `@qhn/pi-goal`
- `pi-goal-x`
- `@plannotator/pi-extension`
- `pi-board`

## Executive Read

respec should stay smaller than the goal/task tools around it.

The best additions are:

1. focused spec state,
2. contract fingerprints and disk reconciliation,
3. no-progress / spin guard,
4. project-local config,
5. optional ask-before safety gates,
6. state-gated tool actions,
7. real Pi runtime tests.

The major things to avoid are:

1. editable task databases,
2. kanban/sprint concepts,
3. generated task YAML as an input,
4. independent LLM auditors,
5. goal drafting interviews,
6. replan operations,
7. PR/cloud/CI automation.

## Source Patterns

| Source | Pattern | Audit Read |
|--------|---------|------------|
| Pi extension docs | Events, `pi.appendEntry`, `tool_call`, UI widgets/status, `pi.exec`, flags, shortcuts, active tools | Core API basis for respec. Use directly. |
| `pi-until-done` | Progress signal scoring and spin guard | Useful. respec should detect no-tool/no-change loops. |
| `pi-until-done` | Ask-before boundaries for dangerous bash commands | Useful as optional safety config. |
| `pi-until-done` | Live `.until-done/tasks.yaml` | Do not copy for v0.1. It risks becoming a second task source. |
| `pi-until-done` | Clean-end reminder when tasks are done but completion tool not called | Mostly unnecessary. respec runs the verifier itself. |
| `pi-until-done` | Distilled PRD after completion | Bloat for v0.1. |
| `@qhn/pi-goal` | Setup-first user confirmation | Not needed. `SPEC.md` plus verifier is already the contract. |
| `@qhn/pi-goal` | Evidence before done | Already covered by verifier exit code and captured output. |
| `@qhn/pi-goal` | No-work stop | Useful. Same as spin guard. |
| `pi-goal-x` | Multiple open goals, session-local focus | Useful. respec can have multiple specs but only one focused spec per session. |
| `pi-goal-x` | Lifecycle-shaped tools | Useful. Tool actions should be state-gated. |
| `pi-goal-x` | Disk reconciliation before acting | Very useful. Re-read `SPEC.md` and verifier fingerprints before resume/status/round transitions. |
| `pi-goal-x` | Independent auditor agent | Not needed. Shell verifier is the judge. |
| `@plannotator/pi-extension` | Project/global config files | Useful in smaller form. Use project-local `.pi/respec.json` plus flags. |
| `@plannotator/pi-extension` | Progress checklist widget | Already adopted via derived reconciliation queue. |
| `@plannotator/pi-extension` | Re-read plan from disk each turn | Useful analogue: re-read contract fingerprints before acting. |
| `pi-board` | Full task/sprint manager with web UI and database | Explicitly avoid. It validates that editable task management is a separate product. |

## Accepted Changes

### 1. Focused Spec

Problem: Once respec supports arbitrary `SPEC.md` paths, commands like `/respec resume` and `/spec-status` need a clear target.

Decision: Add branch-local focused spec state.

Rules:

- `/respec <path>` focuses that spec for the current session branch.
- `/spec-status` with no path shows the focused spec.
- `/respec resume` with no path resumes the focused spec.
- If multiple specs exist and no focus is set, ask the user to choose or require an explicit path.
- Focus is stored in session custom entries, not in `SPEC.md`.

This borrows the good part of `pi-goal-x` focus without adding a goal pool UI.

### 2. Contract Fingerprints

Problem: The user may edit `SPEC.md` or the verifier between turns. The derived queue can become stale.

Decision: Track file fingerprints.

State should include:

- `specFingerprint`
- `verifyFingerprint`
- `lastContractReadAt`

Before start/resume/status/agent_end continuation, respec should re-stat/hash the contract files:

- If `SPEC.md` changed, reparse invariants and regenerate queue.
- If verifier changed, rerun verifier before selecting the next target.
- If either changed during an active round, pause after the current verification pass and ask the user to resume.

This keeps derived state honest without creating a separate task source.

### 3. Progress Signals And Spin Guard

Problem: Autonomous loops can continue even when the agent did no useful work.

Decision: Track per-round progress signals from tool events.

Suggested scoring:

- `read`, `grep`, `find`, `ls`: weak signal, score 1
- `bash`: medium signal, score 2
- `edit`, `write`: strong signal, score 3

Guard:

- If a round ends with zero tool calls and the verifier still fails, pause with reason `no-progress`.
- If two consecutive rounds have only weak signals and no verifier delta, block with reason `spin-guard`.

This is not completion judgment. It is loop safety.

### 4. Project-Local Config

Problem: Queue display, budgets, and safety patterns should not require flags every time.

Decision: Add optional project-local config at `.pi/respec.json`.

Precedence:

1. built-in defaults,
2. `.pi/respec.json`,
3. command flags.

Keep the config small:

```json
{
  "defaults": {
    "maxRounds": 25,
    "budgetPerRound": 120
  },
  "queue": {
    "displayMode": "compact",
    "widgetMaxItems": 5,
    "promptMaxItems": 8,
    "statusMaxItems": 25
  },
  "safety": {
    "protectContracts": true,
    "askBefore": ["git push", "rm -rf", "terraform apply", "kubectl delete"]
  }
}
```

Do not add global config in v0.1. Project-local config is enough.

### 5. Ask-Before Safety Gates

Problem: Autonomous repair rounds may attempt destructive shell commands.

Decision: Add optional ask-before patterns in config.

Rules:

- Applies to `bash` tool calls during active reconciliation.
- If command text matches a configured pattern, show `ctx.ui.confirm`.
- If no UI is available, block and ask the user to rerun with explicit approval or remove the pattern.
- This is separate from contract-file guard rails, which remain always on by default.

### 6. State-Gated Tool Actions

Problem: An LLM-callable `respec_reconcile` tool should not allow nonsensical transitions.

Decision: Validate tool actions by current state.

Examples:

- `start` rejected when active unless `replace: true` is supported later.
- `resume` allowed only from `paused` or `blocked`.
- `pause` allowed only from `active`.
- `cancel` allowed from `active`, `paused`, or `blocked`.
- `status` always allowed.

This borrows the "schema beats prompt walls" lesson without adding more tools.

### 7. Real Runtime Tests

Problem: Hand-rolled mocks often miss Pi extension lifecycle behavior.

Decision: Verification should include real Pi runtime/integration tests once implementation exists.

Minimum test set:

- extension loads and registers commands/tools,
- `/spec-init` writes fail-closed files in a temp cwd,
- parser fixtures,
- verifier output fixtures,
- start -> prompt enqueue -> agent_end -> verifier rerun,
- user input preempts continuation,
- session switch restores focused spec,
- compaction restores as paused,
- guard rails block contract-file edits,
- spin guard pauses or blocks correctly.

## Rejected Features

| Feature | Reason |
|---------|--------|
| Generated editable task file | Creates a second source of truth. |
| Live task YAML as input | Same drift problem as TODO files. |
| Kanban board or sprint manager | Separate product category. |
| Replan operations | respec queue is derived; users edit `SPEC.md` and verifier instead. |
| Independent LLM auditor | Shell verifier is the auditor. |
| Goal drafting interview | `SPEC.md` is explicit user-authored intent. |
| Completion tool | Completion is verifier exit code 0. |
| Distilled PRD/summary artifact | Nice later, not needed for the loop. |
| Multi-agent/subagent execution | Too much surface for v0.1. |
| CI/PR automation | respec should run before CI, not replace repo workflow. |
| Full web UI | Widget/status/dashboard are enough. |

## v0.1 Delta From Current Spec

Add to `SPEC.md`:

1. `focusedSpecKey`
2. contract fingerprints
3. progress signal tracking
4. project-local `.pi/respec.json`
5. ask-before safety config
6. state-gated tool action rules
7. runtime integration test expectations

Do not add:

1. editable task files,
2. replan tools,
3. auditor agents,
4. task database,
5. web UI.

## Strategic Decision

The derived queue was the right move. The audit confirms it should be visible and task-like, but still generated. The queue gives respec enough operational surface to be usable without crossing into task-manager territory.

The next strongest additions are not more UI. They are correctness controls: focus, fingerprints, no-progress guard, config, and state-gated transitions.
