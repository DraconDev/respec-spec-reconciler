# respec Comparison And Scope Check

Research baseline: 2026-05-22.

## Bottom Line

respec is not missing a major v0.1 feature from the surrounding tool landscape. The useful pieces are already in the spec:

- a repo-native spec file,
- a shell verifier as the judge,
- one focused repair round at a time,
- Pi-native event continuation,
- session persistence,
- a derived reconciliation queue,
- task-like queue rendering with minimal config,
- focused spec state,
- contract fingerprints,
- spin guard,
- project-local config,
- optional ask-before safety,
- user preemption,
- compact UI state,
- fail-closed scaffolding,
- guard rails for contract files,
- and an escape valve.

The main thing to protect now is scope. The tools around us are either broader agent platforms, richer spec/planning systems, or single-session coding assistants with test loops. respec should stay smaller: a verifier-driven reconciliation controller for Pi.

## Comparison Matrix

| Tool / Pattern | What It Does Well | What respec Should Borrow | What respec Should Avoid |
|----------------|-------------------|---------------------------|--------------------------|
| **Aider lint/test loop** | Runs user-provided test commands and tries to fix non-zero failures. | Keep the simple shell contract: stdout/stderr plus non-zero exit means failure. | Do not become a general chat coding tool or per-file lint orchestrator. |
| **Claude Code hooks** | Lifecycle hooks can add context or block actions. | Keep Pi `tool_call` guard rails and lifecycle-driven state transitions. | Do not add a separate hook configuration language inside respec. Pi already has hooks. |
| **GitHub Spec Kit** | Strong spec-driven workflow for generating requirements, plans, tasks, and implementation artifacts. | Keep the repo-native spec philosophy. | Do not add planning artifacts, generated task files, presets, or spec methodology management in v0.1. |
| **Kiro Specs** | Rich requirements/design/tasks flow with task execution and dependency waves. | Keep visible task/progress feedback. | Do not add DAG execution, parallel tasks, or requirements/design generators. |
| **AGENTS.md / project instructions** | Gives agents stable repository guidance and conventions. | Coexist with it. Mention that `SPEC.md` is the contract and `AGENTS.md` is working guidance. | Do not parse, merge, or manage AGENTS.md. |
| **GitHub Copilot cloud agent** | Runs in an ephemeral GitHub Actions-backed environment, can test/lint and produce PRs. | Respect the idea that test/lint evidence matters. | Do not add cloud execution, PR creation, issue assignment, or GitHub workflow management. |
| **OpenAI Codex cloud** | Background coding tasks in isolated cloud environments, with environment setup and PR workflows. | Keep verifier output as evidence for what happened. | Do not become a cloud task runner or environment manager. |
| **Cursor Agent / background agents** | Autonomous IDE work and background coding sessions. | Keep user-visible progress and pause controls. | Do not compete as a full IDE agent mode. |
| **OpenHands / SWE-agent style agents** | General software engineering agents with broad command/code action spaces. | Keep the insight that executable feedback is essential. | Do not build an agent runtime, benchmark harness, or generalized issue-to-patch framework. |

## Feature Triage

### Keep In v0.1

These are genuinely useful and not bloat:

- `/spec-init` with fail-closed verifier template
- `/respec`, `pause`, `resume`, `cancel`
- `/spec-status`
- `respec_reconcile` tool with explicit `action`
- `SPEC.md` invariant parser
- preferred structured verifier output
- unstructured verifier fallback
- derived reconciliation queue from `SPEC.md` plus verifier output
- task-like queue updates in widget/status/prompt summaries
- `--queue off|compact|full` and `--queue-limit`
- branch-local focused spec
- contract fingerprint checks before resume/status/continuation
- progress signal tracking and spin guard
- `.pi/respec.json` for small project-local defaults
- optional ask-before patterns for risky bash commands
- event-driven continuation through Pi lifecycle hooks
- `pi.appendEntry` state persistence
- session start/switch/tree reconstruction
- compaction survival as paused state
- user input preemption
- budget per round
- max rounds
- three-strike stall detection
- `BLOCKER.md`
- contract-file guard rails
- footer status
- compact widget
- plain text status output

This is enough to prove the product.

### Add Only As Documentation

These are useful clarifications, but should not become new runtime features yet:

- Relationship to `AGENTS.md`: `AGENTS.md` tells the agent how to work; `SPEC.md` tells respec what must be true.
- Relationship to CI: `scripts/verify-spec.sh` should be CI-friendly and can call the same commands CI runs.
- Verifier authorship guidance: make checks deterministic, structured, and stable.
- Flaky tests: the verifier script owns retries or quarantine logic; respec should not.
- Queue authorship guidance: the queue is display/controller state, not a user-editable TODO list.
- Queue display guidance: compact by default, full only on demand.
- Focus guidance: one focused spec per session branch; no goal pool UI.
- Safety guidance: ask-before is pattern matching, not a sandbox.

### Defer To v0.2+

These may become useful later, but they are not needed to validate the idea:

- `--workspaces`
- JSON verifier protocol
- dashboard overlay polish
- custom message renderer
- CI/GitHub Action template
- richer status export
- optional `BLOCKER.md` templates
- module-level spec discovery

### Explicitly Avoid

These would dilute the idea:

- task boards
- user-maintained TODO files
- DAG planners
- generated requirements/design/task artifacts
- markdown includes
- spec inheritance
- PR creation
- cloud execution
- environment provisioning
- issue tracker integrations
- subagents
- parallel repair waves
- LLM-based completion judgment
- automatic rewrites of `SPEC.md` or the verifier

## Are We Missing Anything Useful?

After the Pi-loop audit, the useful v0.1 additions are now accounted for: focused spec, contract fingerprints, spin guard, project config, state-gated tool actions, and optional ask-before safety.

The remaining ideas from similar tools are either v0.2 polish or separate products.

## Differentiation

respec's differentiated position is:

> A Pi extension that turns a repo-local spec and verifier into a persistent repair loop, without becoming a planner, CI system, or cloud coding agent.

That is a clean wedge. The surrounding tools validate the direction, but they also show where the trap is: the moment respec grows into "all spec-driven development," it loses the advantage of being small and deterministic.

## Source Notes

- Pi extension APIs: `pi.registerCommand`, `pi.registerTool`, `pi.sendMessage`, `pi.appendEntry`, lifecycle hooks, and UI primitives.
- Pi goal/loop packages audited: `pi-until-done`, `@qhn/pi-goal`, `pi-goal-x`, `@plannotator/pi-extension`, and `pi-board`.
- Aider documents `/test`, `--test-cmd`, and `--auto-test` around non-zero test failures.
- Claude Code documents lifecycle hooks, including blocking decisions and context injection.
- GitHub Spec Kit emphasizes specs, refinement, plans, and implementation phases.
- Kiro Specs covers requirements/design/task workflows and dependency-based task execution.
- Codex documents AGENTS.md project guidance and cloud/background coding tasks.
- GitHub Copilot cloud agent documents ephemeral GitHub Actions-backed environments and PR-oriented workflows.
- OpenHands documents a broad CodeAct-style agent action space.
