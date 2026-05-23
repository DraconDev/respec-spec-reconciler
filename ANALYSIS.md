# respec Idea Analysis

## One-Line Thesis

respec makes Pi stop guessing whether coding work is done by turning a project spec plus a shell verifier into an external reconciliation loop.

## The Core Idea

Most agent workflows still end with the model deciding whether it satisfied the request. That works for small tasks, but it breaks down when a project has multiple durable requirements, because the agent can lose track, self-report success too early, or fix one thing while regressing another.

respec changes the control loop:

```text
SPEC.md states the contract.
verify-spec.sh judges the contract.
Pi performs one focused repair round.
respec records the result and advances only when the verifier says so.
```

The important move is not parsing code or inventing a planning system. The important move is making the shell the judge.

## Why This Is Worth Building

The idea is strong because it fits how serious software teams already work:

- Specs live in the repo.
- Tests and scripts are the source of truth.
- CI passes or fails independently of what a developer thinks.
- Progress is meaningful only when the verifier changes state.

Pi is a good host because extensions can register commands, tools, lifecycle hooks, UI status, widgets, custom entries, and follow-up messages. respec uses those primitives to become a controller around the agent instead of another prompt convention.

## Target User

The first user is a developer using Pi on a repo that has:

- more than one important invariant,
- a repeatable verification command,
- a desire to let the agent work autonomously for a while,
- low tolerance for "looks done" self-judgment.

This is especially useful for libraries, CLIs, backend services, language tools, test-heavy codebases, and any project where "done" can be checked by a command.

It is less useful for early product design, open-ended UI exploration, or tasks where the acceptance criteria are mostly subjective.

## Product Shape

The v0.1 product should feel like this:

1. The user runs `/spec-init`.
2. They edit `SPEC.md` and `scripts/verify-spec.sh`.
3. They run `/respec`.
4. Pi works on one failing invariant at a time.
5. The footer/widget shows the current target and progress.
6. If progress stalls, respec writes `BLOCKER.md` and stops.
7. The user remains in control through pause, resume, cancel, and normal input.

The extension should feel boring in the best way: visible, deterministic, resumable, and hard to confuse.

## What Makes The Design Good

The current spec has several high-quality choices:

- **External judge:** `verify-spec.sh` is the only completion signal.
- **Repo-native contract:** `SPEC.md` and verifier live with the code.
- **Pi-native implementation:** the loop is event-driven through Pi lifecycle hooks, not a blocking command.
- **Fail-closed scaffolding:** generated verifier scripts fail until edited.
- **Branch-local state:** session reconstruction uses custom entries from the current branch.
- **Derived reconciliation queue:** respec can show task-like progress and focus each round without rereading the whole spec or creating a second task source.
- **Focused spec:** continuation targets one branch-local spec, avoiding accidental multi-spec auto-runs.
- **Contract fingerprints:** edits to `SPEC.md` or the verifier force queue regeneration instead of stale work.
- **Spin guard:** no-progress loops pause or block instead of burning turns.
- **Small project config:** `.pi/respec.json` can hold queue, budget, and safety defaults without a full settings subsystem.
- **Escape valve:** repeated failure creates a clear blocker artifact instead of spinning forever.
- **Composable multi-spec story:** module specs compose through shell exit codes, not custom markdown include semantics.

## Main Risks

### 1. Verifier quality controls everything

If `verify-spec.sh` is weak, flaky, or too broad, respec will either miss real failures or waste time chasing noisy ones.

Mitigation: make the template and docs strongly teach structured invariant output, explicit PASS/FAIL lines, and stable commands.

### 2. Failing invariant extraction can be ambiguous

Shell output is messy. If respec targets the wrong invariant, the loop loses focus.

Mitigation: define a simple preferred output protocol and make unstructured fallback conservative.

### 3. Agent continuation can become annoying

If the loop continues when the user wanted control, it will feel unsafe.

Mitigation: user input, compaction, shutdown, budget exhaustion, and guardrail blocks all pause automatic continuation.

### 4. Contract-file protection is imperfect

Blocking writes to `SPEC.md` and the verifier is easy for direct write/edit tools, but shell mutation detection is best-effort.

Mitigation: treat guard rails as a safety feature, not a sandbox. The verifier and session audit remain the real protection.

### 5. UI can become noisy

A reconciler should not dominate the TUI.

Mitigation: keep footer text short, widget compact, and dashboard opt-in through `/spec-status`.

### 6. Queue drift would undermine the contract

A queue is useful only while it is derived state. If users edit queue items directly, the project now has two competing sources of truth.

Mitigation: never create a user-maintained TODO file. Regenerate the queue from `SPEC.md`, verifier output, and round history.

### 7. Queue display config can become a distraction

It is useful to configure whether the queue is hidden, compact, or full. It is not useful to build a full preferences system before the extension works.

Mitigation: v0.1 uses command flags and persisted respec state only: `--queue off|compact|full` and `--queue-limit`.

### 8. Multi-spec focus can become a goal pool

Focus is useful so `/respec resume` knows what to target, but it should not become a full goal manager.

Mitigation: store only one focused `specKey` per session branch. Listing specs is informational; respec does not add project task pools.

### 9. Spin guards can stop too early

A no-progress guard can be annoying if a round legitimately needed investigation only.

Mitigation: zero-tool rounds pause, while repeated weak-signal/no-delta rounds block. Weak investigation still gets one chance.

## v0.1 Scope

Build only the loop that proves the idea:

- `/spec-init`
- `/respec`
- `/respec pause`
- `/respec resume`
- `/respec cancel`
- `/spec-status`
- `respec_reconcile` tool with action-based API
- spec parser for `## Invariants` and numbered `###` sections
- verifier runner
- structured output parser
- derived reconciliation queue
- queue display config through command flags
- branch-local focused spec
- contract fingerprint reconciliation
- progress signals and spin guard
- project-local `.pi/respec.json`
- ask-before bash safety patterns
- state persistence with `pi.appendEntry`
- session reconstruction
- event-driven continuation
- footer status and compact widget
- stall escape valve and `BLOCKER.md`
- guard rails for direct edits to contract files

Do not build `--workspaces` in v0.1. Keep it documented as v0.2.

## Implementation Priority

The highest-risk code should be built first:

1. Minimal package scaffold that Pi can load.
2. Store and session persistence.
3. Spec parser with unit tests.
4. Verifier runner with output truncation.
5. Delta engine with structured and unstructured output fixtures.
6. `/spec-init` with fail-closed template.
7. Reconciliation queue builder.
8. Queue task rendering and update rules.
9. Focused spec and branch-local reconstruction.
10. Contract fingerprint reconciliation.
11. Progress signal/spin guard.
12. `/spec-status` plain text.
13. `/respec` start/resume/pause/cancel.
14. Agent lifecycle continuation.
15. UI widget/status.
16. Guard rails and ask-before gates.
17. Overlay dashboard.

This order avoids spending time on UI before the controller is trustworthy.

## Success Criteria

The idea is working when these are true:

- A fresh project can be initialized and does not falsely pass.
- A project with one failing invariant gets one focused repair prompt.
- A project with multiple failing invariants advances one invariant at a time.
- The generated queue matches `SPEC.md` plus verifier output and is never user-edited.
- The queue visibly updates after verifier runs, round starts, round ends, pause/resume, and status refresh.
- A passing verifier ends the loop immediately.
- The same invariant failing three rounds writes `BLOCKER.md` and stops.
- User input pauses continuation.
- Session switch/compaction does not lose state.
- Contract-file writes are blocked during active reconciliation.
- The UI always tells the user what respec is doing without getting in the way.

## Strategic Read

This is a high-quality extension idea because it is narrow, composable, and grounded in existing developer practice. It does not ask users to trust a new planning abstraction. It asks them to write down invariants and provide a verifier.

The sharpest product positioning is:

> respec is CI-style reconciliation inside Pi: the spec says what must be true, the verifier decides, and the agent keeps repairing until the contract passes or a blocker is recorded.

The main thing to protect is simplicity. If respec grows into a task manager, markdown preprocessor, test framework, or planning language, it loses the thing that makes it compelling.
