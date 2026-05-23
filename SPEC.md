# respec — Spec Reconciler for Pi

**respec** is a Pi package containing a TypeScript extension for continuous spec-driven reconciliation. It reads a declarative `SPEC.md`, runs a machine-checkable `scripts/verify-spec.sh`, and advances through failing invariants until the verifier passes, a budget is exhausted, or an escape valve blocks the run.

Most agent loops are prompt-driven: they ask the model to decide whether the work is done. respec implements a verifier-driven reconciler:

```
while verify-spec.sh exits non-zero:
  extract next failing invariant
  derive focused fix prompt
  feed the prompt to Pi as the next agent turn
  log result
```

The spec is the single source of truth. The agent never judges its own completion — the shell is the only judge.

---

## 1. Architecture Overview

```
respec/
├── src/
│   ├── index.ts                 # Pi extension entry point; registers commands, tools, hooks
│   ├── store.ts                 # In-memory state + appendEntry snapshots
│   ├── types.ts                 # TypeScript types for all state shapes
│   ├── constants.ts             # Custom type strings, default values
│   ├── config.ts                # Built-in defaults + .pi/respec.json + CLI overrides
│   ├── loop-controller.ts       # Event-driven reconciler state transitions
│   ├── spec-parser.ts           # Parses SPEC.md invariants
│   ├── verifier.ts              # Runs verify-spec.sh and normalizes output
│   ├── delta-engine.ts          # Extracts pass/fail deltas from verifier output
│   ├── contract.ts              # Path normalization, fingerprints, disk reconciliation
│   ├── escape-valve.ts          # Stall detection, guard rails, BLOCKER.md
│   ├── progress.ts              # Tool progress signals and spin guard
│   ├── commands/
│   │   ├── respec.ts            # /respec command handler
│   │   ├── spec-init.ts         # /spec-init command handler
│   │   └── spec-status.ts       # /spec-status command handler
│   ├── tools/
│   │   └── reconcile.ts         # respec_reconcile tool (programmatic access)
│   ├── hooks/
│   │   ├── session.ts           # session_start, session_switch, session_tree, compaction
│   │   ├── agent.ts             # before_agent_start, turn_end, agent_end
│   │   ├── input.ts             # user input preemption
│   │   └── guardrail.ts         # blocks contract-file mutations during active rounds
│   ├── ui/
│   │   ├── status-line.ts       # Footer status (ctx.ui.setStatus)
│   │   ├── widget.ts            # Live progress dashboard (ctx.ui.setWidget)
│   │   ├── dashboard.ts         # /spec-status interactive overlay component
│   │   └── notifications.ts     # Notification string helpers
│   └── strings/
│       ├── prompts.ts           # Continuation prompt templates
│       ├── dialogs.ts           # User-facing messages
│       └── help.ts              # Help text for /respec
├── templates/
│   ├── SPEC-template.md         # Scaffolded SPEC.md template
│   └── verify-template.sh       # Scaffolded verify-spec.sh template
├── package.json
├── tsconfig.json
└── SPEC.md                      # This file (self-referential spec)
```

### Design Principles

1. **Thin composition root** — `index.ts` only wires modules together. Reconciliation logic lives in focused modules.
2. **Every file ≤300 LOC** — modules are small and focused.
3. **Store pattern** — in-memory `Store` holds all mutable state; `pi.appendEntry()` persists snapshots and round events.
4. **Reconstruct from session** — on `session_start`, `session_switch`, and `session_tree`, replay custom entries from `ctx.sessionManager.getBranch()`.
5. **Composable hooks** — every handler returns `undefined` when it has no opinion, so other extensions coexist.
6. **No self-judging** — respec never calls a goal "done." Only `verify-spec.sh` exit code 0 signals completion.
7. **Event-driven loop** — no long-running blocking `while` inside a command handler. Commands start or resume state; Pi lifecycle events advance it.
8. **User control wins** — typed user input, pause, cancel, or compaction can stop automatic continuation without losing state.
9. **Derived queue, not task source** — the reconciliation queue is regenerated from `SPEC.md` and verifier output. Users edit the spec and verifier, not queue items.
10. **Focused spec** — a session branch has at most one focused spec for continuation; multiple specs are allowed, but only one auto-continues.
11. **Disk state wins** — before resuming or continuing, re-read contract fingerprints so edits to `SPEC.md` or the verifier cannot be ignored.

### Pi API Contract

respec targets Pi's package and extension model:

- `src/index.ts` exports `default function respec(pi: ExtensionAPI): void`.
- Slash commands are registered without the leading slash: `pi.registerCommand("respec", ...)`.
- LLM-callable tools are registered with `pi.registerTool()` and TypeBox schemas (Pi bundles the `typebox` package as a dependency).
- Extension state is persisted with `pi.appendEntry(customType, data)`. These custom entries do not enter LLM context.
- Runtime state is reconstructed from `ctx.sessionManager.getBranch()` so forks and tree navigation get branch-local state.
- Agent continuation uses `pi.sendMessage(..., { triggerTurn: true, deliverAs: "followUp" })` for extension-authored custom messages. `pi.sendUserMessage()` is reserved for messages that must appear as actual user input.
- System/context injection uses `before_agent_start` and returns additive `message` and/or `systemPrompt` fields. respec never replaces another extension's prompt content.
- User input preemption checks the `input` event and ignores `event.source === "extension"` so respec does not interrupt itself.

### Relationship to AGENTS.md and CI

`AGENTS.md` is operational guidance for coding agents: conventions, commands, style, and repo-specific workflow.
`SPEC.md` is the contract respec reconciles against.
`scripts/verify-spec.sh` is the executable judge and should be usable locally and in CI.

respec does not parse or manage `AGENTS.md`, and it does not replace CI. It runs the same kind of checks earlier, inside the Pi session.

---

## 2. State Machine

```
┌──────────┐
│  idle    │  No reconciliation running
└────┬─────┘
     │ /respec
     ▼
┌──────────┐
│  setup   │  Reading SPEC.md, checking verify-spec.sh exists, initializing state
└────┬─────┘
     │ setup complete
     ▼
┌──────────┐
│  active  │  Loop running: verify → extract → fix → verify → ...
└────┬─────┘
     │
     ├── verify-spec.sh exits 0 ──────────────────────────►  ┌──────────┐
     │                                                       │  done    │  All invariants satisfied
     │                                                       └──────────┘
     ├── 3 consecutive failures on same invariant ────────►  ┌──────────┐
     │                                                       │ blocked  │  BLOCKER.md written, loop stopped
     │                                                       └──────────┘
     ├── maxRounds reached ───────────────────────────────►  ┌──────────┐
     │                                                       │ blocked  │  Remaining failures reported
     │                                                       └──────────┘
     ├── /respec pause, budget exhausted, or user input ──►  ┌──────────┐
     │                                                       │ paused   │  State preserved, can resume
     │                                                       └──────────┘
     └── /respec cancel ──────────────────────────────────►  ┌──────────┐
                                                            │ idle     │  State cleared
                                                            └──────────┘
```

### State Types

```typescript
type RespecStatus = "idle" | "setup" | "active" | "paused" | "blocked" | "done";

interface SpecInvariant {
  index: number;
  name: string;             // Human-readable name from SPEC.md
  check: string;            // First [check] line under the invariant
  body: string;             // Section body, truncated before persistence if needed
}

interface InvariantStatus {
  index: number;
  name: string;
  check: string;
  passed: boolean | null;   // null = unknown, before verifier has reported it
  reason?: string;          // Normalized reason snippet from verify output
  output?: string;          // Per-invariant verify output when available
  attemptedCount: number;
  lastAttemptedAt?: number;
}

type QueueItemStatus = "passed" | "failing" | "unknown" | "current" | "blocked";
type QueueDisplayMode = "off" | "compact" | "full";

interface ReconciliationQueueItem {
  index: number;
  name: string;
  check: string;
  status: QueueItemStatus;
  reason?: string;
  attempts: number;
}

interface QueueConfig {
  displayMode: QueueDisplayMode; // Default: "compact"
  widgetMaxItems: number;        // Default: 5
  promptMaxItems: number;        // Default: 8
  statusMaxItems: number;        // Default: 25
}

interface SafetyConfig {
  protectContracts: boolean;     // Default: true
  askBefore: string[];           // Bash substring/regex patterns requiring confirmation
}

interface RespecConfig {
  defaults: {
    maxRounds: number;           // Default: 25
    budgetPerRound: number;      // Default: 120
    verifyPath?: string;
  };
  queue: QueueConfig;
  safety: SafetyConfig;
}

interface ContractFingerprint {
  path: string;
  exists: boolean;
  size?: number;
  mtimeMs?: number;
  sha256?: string;               // Hash file contents when cheap enough; stat fallback is allowed
}

interface ProgressSignals {
  readOps: number;
  searchOps: number;
  bashOps: number;
  editOps: number;
  writeOps: number;
  score: number;                 // read/search=1, bash=2, edit/write=3
}

interface ReconcileRound {
  round: number;
  invariantIndex: number;
  invariantTarget: string;  // Which invariant we tried to fix
  prompt: string;           // Prompt sent to Pi
  passed: boolean;          // Did verify-spec.sh pass after this round?
  failuresBefore: number;   // Count of failing checks before this round
  failuresAfter: number;    // Count of failing checks after this round
  output: string;           // verify-spec.sh output (truncated, last 20 lines)
  turns: number;            // Pi turn_end count during this round
  progress: ProgressSignals;
  startedAt: number;
  endedAt: number;
}

interface VerifyResult {
  exitCode: number;
  output: string;           // stdout + stderr, tail-truncated
  truncated: boolean;
  invariantStatuses: InvariantStatus[];
  firstFailure?: {
    index?: number;
    name: string;
    reason: string;
  };
}

interface RespecState {
  status: RespecStatus;
  specKey: string;           // Absolute normalized spec path
  focusedSpecKey?: string;   // Branch-local focused spec for commands without an explicit path
  specPath: string;         // Default: "SPEC.md"
  specRoot: string;         // Directory containing specPath
  verifyPath: string;       // Resolved from --verify, root default, or spec-local default
  specFingerprint?: ContractFingerprint;
  verifyFingerprint?: ContractFingerprint;
  lastContractReadAt?: number;
  
  invariants: InvariantStatus[];
  queue: ReconciliationQueueItem[];
  config: RespecConfig;
  queueConfig: QueueConfig;
  roundHistory: ReconcileRound[];
  currentRound: number;
  maxRounds: number;        // Default: 25
  budgetPerRound: number;   // Default: 120 turns
  turnsThisRound: number;
  currentTarget?: {
    index?: number;
    name: string;
    check: string;
    reason: string;
  };
  lastVerify?: VerifyResult;
  userInterrupted: boolean;
  pendingContinuation: boolean;
  budgetExceeded: boolean;
  contractChangedDuringRound: boolean;
  noProgressRounds: number;
  progressThisRound: ProgressSignals;
  allowContractEditsForCurrentTurn: boolean;
  
  escapeValve?: {
    type: "stall" | "guardrail" | "max-rounds" | "spin-guard";
    invariant: string;
    detail: string;
    blockedAt: number;
  };
  
  startedAt: number;
  lastRoundAt: number;
}
```

---

## 3. Commands

Pi command names are registered without the leading slash. These user-facing names map to `pi.registerCommand("respec", ...)`, `pi.registerCommand("spec-init", ...)`, and `pi.registerCommand("spec-status", ...)`.

### 3.1 `/respec [spec-path] [options]`

Start or resume continuous reconciliation.

**Parameters:**
- `spec-path` (optional) — Path to SPEC.md. Default: `SPEC.md` in project root.
- `--budget <N>` (optional) — Pi turns per round. Default: 120.
- `--max-rounds <N>` (optional) — Max reconciliation rounds. Default: 25.
- `--verify <path>` (optional) — Path to verify script.
- `--queue <off|compact|full>` (optional) — How much of the derived task queue to show. Default: `compact`.
- `--queue-limit <N>` (optional) — Max queue items in the widget/prompt summary. Default: 5 for widget, 8 for prompts.
- `--ask-before <pattern>` (optional, repeatable) — Bash command patterns requiring confirmation during active reconciliation.

**Default verify path resolution:**
1. If `--verify` is provided, resolve it relative to `ctx.cwd`.
2. If `spec-path` is the root `SPEC.md`, default to `scripts/verify-spec.sh`.
3. Otherwise default to `verify-spec.sh` beside the provided `SPEC.md`.

**Subcommands:**
- `/respec pause` — set status to `paused`; no automatic continuation.
- `/respec resume` — continue from `paused` or `blocked` after the user has edited the project.
- `/respec focus [spec-path]` — focus a spec for commands that omit a path.
- `/respec list` — list specs with persisted state in the current branch.
- `/respec cancel` — clear active state and UI, but keep historical custom entries in the session.
- `/respec status` — same display as `/spec-status`.

**Start behavior:**
1. Parse args and normalize paths with `path.resolve(ctx.cwd, ...)`.
2. Load config from built-in defaults, `.pi/respec.json`, and CLI flags.
3. Focus the normalized `specKey` for the current session branch.
4. Read SPEC.md, compute contract fingerprints, and parse invariants.
5. Generate the initial task queue with all parsed invariants as `unknown`.
6. Validate verifier path.
7. If verifier is missing, scaffold the fail-closed template, `chmod +x`, notify the user, and stop with status `paused`.
8. If verifier exists but is not executable, `chmod +x` and continue.
9. Initialize state, persist `respec-focus` and `respec-state`, update UI, and run the verifier once.
10. Regenerate the task queue from verifier output.
11. If verifier exits 0, mark `done`.
12. If verifier fails, choose the first failing invariant, persist a round-start snapshot, and enqueue the focused prompt with `pi.sendMessage(..., { triggerTurn: true, deliverAs: "followUp" })`.

**Event-driven continuation:**

Commands do not block while the agent works. The controller advances in lifecycle hooks:

```
/respec
  setup state
  verify
  if failing: enqueue focused prompt

agent works normally

agent_end
  verify again
  record round
  if done: complete
  else if blocked/maxed/userInterrupted: stop
  else enqueue next focused prompt
```

**Focused prompt template:**

```
[respec] Invariant failing: {invariant name}

SPEC.md requires:
{invariant check description}

Verifier output:
{reason snippet}

Queue summary:
{compact task queue according to queueConfig.promptMaxItems}

Run `{verifyPath}` to reproduce the failure.
Make the minimal code change that satisfies this invariant.

Do not modify SPEC.md or the verify script unless the user explicitly asked you to repair the spec or verifier.
Do not add unrelated features.
Run `{verifyPath}` before finishing.
```

**Edge cases:**
- No SPEC.md found → error: "No SPEC.md found. Run `/spec-init` first."
- No invariants parsed → pause with "No invariants found. Add a ## Invariants section."
- Verifier missing → scaffold fail-closed verifier and pause; never declare success from a generated verifier.
- Budget exhausted → verify once, record the round, then pause with a resumable state.
- User input during active loop → pause after the current agent turn completes.
- Contract file changed during active loop → verify once, regenerate queue, then pause for explicit resume.
- No tool calls in a failing round → pause with `spin-guard` guidance.
- Existing active run → `/respec` without subcommand shows current status and suggests `resume`, `pause`, or `cancel`.

### 3.2 `/spec-init [target-dir]`

Scaffold a new `SPEC.md` and verifier.

**Parameters:**
- `target-dir` (optional) — Directory to initialize. Default: `ctx.cwd`.

**Behavior:**
1. Create `SPEC.md` from `templates/SPEC-template.md` if absent.
2. Create `scripts/verify-spec.sh` from `templates/verify-template.sh` if absent.
3. `mkdir -p scripts/` if it does not exist.
4. `chmod +x scripts/verify-spec.sh`.
5. Print:
   ```
   Scaffolded:
     SPEC.md — Add invariants as ###-level sections
     scripts/verify-spec.sh — Add shell checks; current template exits non-zero until edited

   Next: edit both files, then run /respec
   ```
6. Do not create `.pi/respec.json` by default. Config is optional.
7. Idempotent: existing files are skipped and never overwritten unless a future `--force` option is added.

### 3.3 `/spec-status [options]`

Show current reconciliation state and run the verifier for fresh status.

**Options:**
- `--queue <off|compact|full>` — Override queue rendering for this status view.
- `--queue-limit <N>` — Override max queue items for this status view.
- `--json` — Return structured JSON instead of opening the overlay or printing text.

**Behavior:**
1. Reconstruct latest state from the current branch before rendering.
2. If a verifier exists, run it and merge fresh pass/fail status.
3. Regenerate and show the reconciliation queue.
4. Show round history and escape-valve state.
5. In interactive mode, open the dashboard overlay; in print/JSON mode, emit plain text.

Plain-text fallback:

```
Status: active (round 3/25, budget 15/120)
Spec: SPEC.md
Focused: yes
Verifier: scripts/verify-spec.sh
Invariants: 4/8 passing

Current target:
3. DSL parser matches SPEC

Queue:
[x]  1. Project compiles
[x]  2. Tests pass
[>]  3. DSL parser matches SPEC
[!]  4. Webhook validates HMAC signature
[?]  5. CLI flags match README

Round History:
Round 3: "DSL parser matches SPEC" -> failed (5 failures -> 5 failures, 12 turns)
Round 2: "Project compiles" -> passed (6 failures -> 5 failures, 3 turns)
Round 1: "Tests pass" -> passed (7 failures -> 6 failures, 8 turns)

Escape Valve: none
BLOCKER.md: not present
```

### 3.4 Project Configuration

Optional project-local config lives at `.pi/respec.json`.

Config precedence:

1. built-in defaults,
2. `.pi/respec.json`,
3. command flags.

v0.1 does not use a global respec config. Project-local config is enough and keeps behavior visible in the repository.

Example:

```json
{
  "defaults": {
    "maxRounds": 25,
    "budgetPerRound": 120,
    "verifyPath": "scripts/verify-spec.sh"
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

If the config file is malformed, `/respec` fails closed with a clear parse error and leaves existing reconciliation state untouched.

---

## 4. Tools

### 4.1 `respec_reconcile`

Programmatic access for the agent and other extensions. The tool is intentionally action-based so an LLM does not accidentally start a long-running loop while only asking for status.

**Parameters:**
```typescript
{
  action: "start" | "resume" | "pause" | "cancel" | "status";
  specPath?: string;
  maxRounds?: number;
  budgetPerRound?: number;
  verifyPath?: string;
  queue?: "off" | "compact" | "full";
  queueLimit?: number;
}
```

**Behavior:**
- `status` returns structured state and optionally fresh verifier results.
- `start` and `resume` perform the same config load, focus, contract reconciliation, and first verifier pass as `/respec`.
- `pause` and `cancel` mutate state only; they do not call the agent.
- Actions are state-gated: `start` is rejected while active, `resume` requires paused/blocked state, `pause` requires active state, and `cancel` requires active/paused/blocked state.
- Tool output is truncated using Pi's truncation utilities before returning to the model.

**Returns:**
```typescript
{
  status: "idle" | "active" | "done" | "blocked" | "paused";
  totalRounds: number;
  invariantsTotal: number;
  invariantsPassed: number;
  currentTarget?: string;
  escapeValve?: { type: string; invariant: string; detail: string };
  summary: string;
}
```

---

## 5. Hooks (Lifecycle Events)

### 5.1 `session_start`

On every session start, resume, reload, or fork:
1. Reconstruct state and focused spec from custom entries in `ctx.sessionManager.getBranch()`.
2. If restored status is `active`, convert it to `paused` and persist a safety snapshot.
3. Re-read contract fingerprints for the focused spec; if they changed, mark queue stale until `/spec-status` or `/respec resume` refreshes it.
4. Do not auto-continue. The user must run `/respec resume`.
5. Update footer status and widget.

### 5.2 `session_switch` and `session_tree`

On session or tree navigation:
1. Reconstruct branch-local state and focused spec from `ctx.sessionManager.getBranch()`.
2. Clear stale UI from the previous branch.
3. If the focused spec no longer exists, clear focus but do not auto-focus another spec when multiple states exist.
4. Update footer status and widget for the selected branch.

### 5.3 `session_before_compact`

Before compaction:
1. If status is `active` or `paused`, append a compact `respec-state` snapshot.
2. Store a short in-memory `pendingCompactState` for `session_compact`.
3. Return `undefined` unless Pi exposes a mergeable compaction-summary API; respec must not replace another extension's compaction behavior.

### 5.4 `session_compact`

After compaction:
1. Append a post-compaction state snapshot if `pendingCompactState` exists.
2. If the saved state was `active`, restore it as `paused`.
3. Notify: "respec was paused during compaction. Run /respec resume to continue."

### 5.5 `before_agent_start`

When `status === "active"` and `currentTarget` is set:
1. Return an additive hidden message:
   ```
   [RESPEC ACTIVE]
   Round: {currentRound}/{maxRounds}
   Target invariant: {name}
   Failing checks: {failCount}/{totalCount}
   Verifier: {verifyPath}

   Focus on the target invariant. Run the verifier before finishing.
   Do not modify SPEC.md or the verify script unless the user explicitly instructed you to repair them.
   ```
2. Optionally append a short system prompt block by returning `{ systemPrompt: event.systemPrompt + block }`.
3. Never remove or rewrite messages from other extensions here.

### 5.6 `turn_end`

During an active round:
1. Increment `turnsThisRound`.
2. Persist a lightweight progress snapshot every turn.
3. Update `progressThisRound` from tool events collected during the turn.
4. If `turnsThisRound >= budgetPerRound`, set `budgetExceeded = true`; if safe, call `ctx.abort()` after the current turn so `agent_end` can verify and pause.
5. Update footer status and widget.

### 5.7 `agent_end`

When Pi finishes processing the queued respec prompt:
1. If no active target exists, return `undefined`.
2. Re-read contract fingerprints; if `SPEC.md` or the verifier changed, set `contractChangedDuringRound = true`.
3. Run the verifier.
4. Regenerate the queue.
5. Record a `respec-round` with before/after failure counts, turns used, progress signals, and verifier output.
6. If verifier exits 0, mark `done`, persist, update UI, notify success.
7. If user input preempted the loop, the budget was exceeded, or the contract changed during the round, mark `paused`.
8. If the spin guard triggers, mark `blocked` with `type: "spin-guard"`.
9. If the escape valve triggers, mark `blocked` and write `BLOCKER.md`.
10. If max rounds is reached, mark `blocked` with `type: "max-rounds"`.
11. Otherwise choose the next failing invariant and enqueue the next prompt with `triggerTurn: true`.

### 5.8 `input`

On user input:
1. Ignore `event.source === "extension"` so respec does not pause itself.
2. If status is `active`, set `userInterrupted = true`.
3. Let the input continue normally; respec pauses after the current agent turn so the user can take control.

### 5.9 `tool_call`

During an active round:
1. If the tool is `write` or `edit`, normalize its path input and compare it to `state.specPath` and `state.verifyPath`.
2. Block contract-file mutations unless `allowContractEditsForCurrentTurn` is true.
3. For `bash`, block obvious contract-file mutations and commands matching `config.safety.askBefore` unless the user confirms.
4. If `ctx.hasUI` is false and a command matches `askBefore`, block with instructions instead of silently allowing it.
5. Record progress signals for `read`, `grep`, `find`, `ls`, `bash`, `edit`, and `write`.
6. Return `{ block: true, reason }` for blocked calls so Pi renders the normal blocked-tool result.
7. After a blocked mutation attempt, pause automatic continuation. The user should decide whether the spec or verifier needs repair.

### 5.10 `session_shutdown`

On graceful shutdown:
1. If status is `active` or `paused`, append a final `respec-state` snapshot.
2. Clear `ctx.ui.setStatus("respec", undefined)`, `ctx.ui.setWidget("respec", undefined)`, and the working message.
3. Do not enqueue continuation messages.

---

## 6. Spec Parser

### 6.1 SPEC.md Format

````markdown
# Project Name

Brief description.

## Invariants

### 1. Invariant Name
Human-readable description of what must be true.
```
[check] Human-readable description of the check
```

### 2. Next Invariant
Description.
```
[check] Description of the check
```
````

### 6.2 Parsing Rules

1. Parse Markdown by lines with a small heading/code-fence aware parser.
2. Find the first `## Invariants` heading, allowing trailing text such as `## Invariants (v1)`.
3. Under it, collect `### N. Name` sections until the next `##` heading.
4. Ignore headings that appear inside fenced code blocks.
5. Extract:
   - `index` from `N`
   - `name` from the heading text after `N.`
   - `body` from all lines until the next invariant heading
   - `check` from the first line whose trimmed text starts with `[check]`
6. Include an invariant with `check = ""` when the section has no `[check]`, but surface a warning.
7. Return `SpecInvariant[]` sorted by numeric `index`; preserve original order when indexes are duplicated.

**Edge Cases:**
- No `## Invariants` heading → return empty array and warn "No Invariants section found in SPEC.md".
- Duplicate invariant indexes → keep both but warn; verifier matching by name becomes more important.
- Invariant with no `[check]` line → include it with `check = ""` and warn.
- Multiple `## Invariants` headings → only parse the first one.
- Code blocks inside invariant sections → preserve in `body`; do not parse headings inside them.
- Non-numbered `###` headings under `## Invariants` → warn and skip for v0.1.

---

## 7. Delta Engine

### 7.1 Verify Output Parsing

The verifier runner executes the configured verify script with:
- `cwd = ctx.cwd`
- `shell = false` where possible (`spawn(verifyPath, [], ...)`)
- `AbortSignal` support for cancellation
- stdout and stderr merged in arrival order when possible

It captures:
- Exit code (0 = all pass, non-zero = at least one failure)
- Stdout + stderr combined
- Truncation metadata
- A tail-truncated output string for persistence
- A fuller bounded output string for the current prompt

Implementation note: prefer Pi's `pi.exec(command, args, { signal, timeout })` for verifier execution so cancellation and captured output follow Pi runtime behavior. Fall back to `node:child_process` only if `pi.exec` cannot satisfy a required execution mode.

Use Pi's exported truncation utilities where available. Default limits:
- Persisted state: last 50 lines or 16 KB
- Prompt snippet: last 120 lines or 32 KB
- Tool return: Pi default truncation limits

### 7.2 Failing Invariant Extraction

Preferred verifier output format:

```text
=== Running spec verification ===
--- Invariant 1: Project compiles ---
PASS: npm run typecheck
--- Invariant 2: Tests pass ---
FAIL: npm test failed
...
```

Extraction rules:
1. Look for section headers matching `^---\s*Invariant\s+(\d+):\s*(.+?)\s*---$`.
2. Within a section, mark pass on `PASS`, `OK`, or `✓` at line start.
3. Within a section, mark failure on `FAIL`, `ERROR`, `✗`, or `❌` at line start.
4. If the script exits non-zero while a section is open and no explicit status was found, mark that current section as failed and use its output as the reason.
5. If no structured header exists, match verifier output to invariant names by substring.
6. If still unmatched, return a synthetic failure named `Unstructured verifier failure` with the first useful error line and the output tail.
7. The first failing invariant in SPEC order is the next target, not necessarily the first line printed by the verifier.

### 7.3 Contract Fingerprints And Focus

respec tracks the contract files that generate the queue:

- `SPEC.md`
- the configured verifier script

For each file, store `path`, `exists`, `size`, `mtimeMs`, and `sha256` when hashing is cheap enough. Stat-only fingerprints are acceptable for large files, but `SPEC.md` and ordinary verifier scripts should be hashed.

Reconciliation rules:

1. Compute fingerprints on `/respec start`, `/respec resume`, `/spec-status`, and before `agent_end` continuation.
2. If `SPEC.md` changed, reparse invariants and regenerate the queue.
3. If the verifier changed, rerun it before selecting the next target.
4. If either file changed during an active round, finish the verifier pass, persist state, then pause. The user must explicitly resume.
5. A focused spec is branch-local session state stored as `respec-focus`; it is not written into `SPEC.md`.
6. Commands without an explicit spec path use the focused spec. If multiple specs exist and none is focused, respec asks the user to choose or errors in non-interactive mode.

This keeps the live task queue honest while still making `SPEC.md` and the verifier the only editable contract files.

### 7.4 Round History

Each round records the target invariant, prompt, turns used, failure count before/after, and verifier output tail. Round entries are an audit log; the latest `respec-state` snapshot remains authoritative for reconstruction.

Round success means either:
- verifier exit code is 0, or
- the target invariant no longer appears in the failing set even though later invariants still fail.

Overall completion only means verifier exit code 0.

### 7.5 Reconciliation Queue

respec keeps a derived reconciliation queue so the agent and UI do not need to reread the full `SPEC.md` every round. The queue renders as task-like items, but it is not a user-editable task list.

The queue is not a second source of truth. It is regenerated from:

1. parsed `SPEC.md` invariants,
2. latest verifier output,
3. round history attempt counts,
4. current active target.

Queue item states:

| State | Meaning |
|-------|---------|
| `passed` | Verifier output indicates this invariant passes. |
| `failing` | Verifier output indicates this invariant fails. |
| `unknown` | The verifier did not report enough information for this invariant. |
| `current` | The item is the active repair target. It is also failing unless the verifier has become stale. |
| `blocked` | Escape valve stopped on this invariant. |

Selection rules:

1. If the verifier exits 0, the queue is all `passed`.
2. Otherwise, choose the first `failing` item in SPEC order.
3. If no structured `failing` item exists, choose the synthetic unstructured failure.
4. Preserve attempt counts from round history.
5. Never add queue items that are not tied to SPEC invariants, except the synthetic unstructured verifier failure fallback.

The focused prompt receives only:

- the current queue item,
- its `[check]`,
- a bounded excerpt of its SPEC body,
- relevant verifier output,
- a compact queue summary with other pass/fail/unknown items.

This improves context efficiency without introducing a user-maintained TODO list. If the queue and `SPEC.md` disagree, `SPEC.md` wins and the queue is regenerated.

### 7.6 Queue Rendering And Updates

Task-like queue rendering:

| Marker | Queue State | Meaning |
|--------|-------------|---------|
| `[x]` | `passed` | Verifier says this invariant passes. |
| `[>]` | `current` | Active repair target. |
| `[!]` | `failing` | Verifier says this invariant fails. |
| `[?]` | `unknown` | Verifier did not report enough information. |
| `[blocked]` | `blocked` | Escape valve stopped on this invariant. |

Compact rendering shows:

```text
Queue: 2 pass, 3 fail, 1 unknown
[>] 3. DSL parser matches SPEC
[!] 4. Webhook validates HMAC signature
[?] 5. CLI flags match README
```

Full rendering shows every queue item up to the configured limit.

Update rules:

1. After SPEC parsing, create queue items for every invariant with status `unknown`.
2. After every verifier run, regenerate pass/fail/unknown states.
3. When a round starts, mark the chosen item as `current`.
4. On `turn_end`, update attempt/turn counters in the widget without changing verifier-derived pass/fail state.
5. On `agent_end`, rerun the verifier, regenerate the queue, then choose the next current item or complete.
6. On pause/resume/cancel/block/done, update the queue display immediately.
7. On `session_start`, `session_switch`, `session_tree`, and compaction restore, rebuild the queue from persisted state and refresh it with the verifier when `/spec-status` or `/respec resume` runs.

Configuration:

| Setting | Source | Default | Meaning |
|---------|--------|---------|---------|
| `queue.displayMode` | `/respec --queue`, `/spec-status --queue` | `compact` | `off`, `compact`, or `full`. |
| `queue.widgetMaxItems` | `/respec --queue-limit` | `5` | Max task rows shown in the widget. |
| `queue.promptMaxItems` | `/respec --queue-limit` | `8` | Max task rows included in focused prompts. |
| `queue.statusMaxItems` | `/spec-status --queue-limit` | `25` | Max task rows shown in status output. |

v0.1 uses project-local `.pi/respec.json`, command flags, and persisted respec state for this config. It should not depend on an undocumented Pi extension settings API.

### 7.7 Progress Signals And Spin Guard

respec tracks whether an active round did meaningful work. This is a loop-safety guard, not a completion judge.

Progress scoring:

| Tool Event | Score | Meaning |
|------------|-------|---------|
| `read`, `grep`, `find`, `ls` | 1 | Investigation/search. |
| `bash` | 2 | Verification or command execution. |
| `edit`, `write` | 3 | Workspace mutation. |

Rules:

1. Record progress signals from `tool_call` and/or tool execution events during active rounds.
2. If a round ends with zero tool calls and the verifier still fails, pause with `spin-guard` guidance.
3. If two consecutive rounds have only weak signals and no verifier delta, block with `escapeValve.type = "spin-guard"`.
4. Any verifier improvement resets `noProgressRounds`.
5. The guard never marks work complete; only verifier exit code 0 does that.

Spin-guard message:

```text
respec paused: no meaningful progress was detected this round.
Run /respec resume to continue, or inspect the failing invariant and verifier output.
```

---

## 8. Escape Valve

### 8.1 Stall Detection

Trigger condition: Same invariant fails 3 consecutive rounds.

```typescript
function checkStall(state: RespecState): boolean {
  if (state.roundHistory.length < 3) return false;
  
  const last3 = state.roundHistory.slice(-3);
  if (last3.length < 3) return false;
  
  const sameInvariant = last3.every(
    r => r.invariantTarget === last3[0].invariantTarget
  );
  const allFailed = last3.every(r => !r.passed);
  
  return sameInvariant && allFailed;
}
```

On stall trigger:
1. Set state.escapeValve = { type: "stall", invariant, detail, blockedAt: Date.now() }
2. Write BLOCKER.md:
   ````markdown
   # Blocker: {invariant name}
   
   Failed 3 consecutive times after {state.currentRound} rounds.
   
   Last verify output:
   ```
   {truncated output}
   ```
   
   Possible causes:
   - Invariant is impossible (code cannot satisfy it as written)
   - verify-spec.sh has a false negative (test is wrong)
   - Spec drift (SPEC.md no longer matches intended behavior)
   - Budget per round too low (current: {budgetPerRound})
   
   To resolve:
   1. Fix the invariant in SPEC.md
   2. Fix verify-spec.sh
   3. Increase budget with `--budget <N>`
   4. Then run `/respec` again
   ````
3. Set status = "blocked"
4. Print notification: "⚠️ Blocked: {invariant} failed 3 times. See BLOCKER.md"
5. Stop the loop

### 8.2 Guard Rails

During an active round, respec should protect the contract files:

- Block `write` and `edit` tool calls whose normalized target path equals the active `specPath` or `verifyPath`.
- For `bash`, perform best-effort detection of obvious mutations such as `sed -i SPEC.md`, `cat > scripts/verify-spec.sh`, or `chmod` outside the verifier permission fix path. Do not attempt to build a complete shell parser.
- For `bash`, also check `config.safety.askBefore`; matching commands require `ctx.ui.confirm` before execution.
- If no UI is available for an ask-before command, block and tell the user which pattern matched.
- If a guard rail blocks a tool call, return a normal Pi `tool_call` block reason and mark the run as paused with `escapeValve.type = "guardrail"` only if the agent repeatedly attempts the blocked mutation.
- Allow contract edits only when the user explicitly requested spec/verifier repair in the current turn by setting `allowContractEditsForCurrentTurn = true`; respec should not auto-continue afterward.

### 8.3 Spec Drift Detection

v0.1 implements defensive contract drift detection through fingerprints:

- If `SPEC.md` changes, reparse and regenerate the queue.
- If the verifier changes, rerun it before continuing.
- If either changes during an active round, pause after the round's verifier pass.

This handles legitimate user edits and catches failed/bypassed guard rails without turning respec into a file watcher.

---

## 9. State Persistence

### 9.1 Session Entry Format

```typescript
const STATE_CUSTOM_TYPE = "respec-state";
const ROUND_CUSTOM_TYPE = "respec-round";
const FOCUS_CUSTOM_TYPE = "respec-focus";

interface StateEntry {
  schemaVersion: 1;
  action: "start" | "pause" | "resume" | "cancel" | "progress" | "complete" | "block" | "compact-save";
  specKey: string;      // Absolute normalized spec path
  state: RespecState;   // Full snapshot, already output-truncated
  timestamp: number;
}

interface RoundEntry {
  schemaVersion: 1;
  action: "round";
  specKey: string;
  round: ReconcileRound;
  timestamp: number;
}

interface FocusEntry {
  schemaVersion: 1;
  action: "focus" | "clear-focus";
  specKey?: string;
  timestamp: number;
}
```

### 9.2 Reconstruction

On `session_start`, `session_switch`, or `session_tree`:
1. Iterate `ctx.sessionManager.getBranch()` entries in order.
2. Ignore custom entries with unknown `schemaVersion`.
3. Group entries by `specKey`.
4. For each spec, the latest `respec-state` snapshot is authoritative.
5. `respec-round` entries are used for display/audit only when a compatible state snapshot is missing history.
6. The latest compatible `respec-focus` entry determines the branch-local focused spec.
7. If the restored state is `active`, convert to `paused` before UI update and persist that pause snapshot.
8. If no state entry exists, keep `initialState()`.

### 9.3 Compaction Survival

Compaction must preserve enough state to avoid losing a paused reconciliation:

1. Before compaction, append a compact `respec-state` snapshot when status is `active` or `paused`.
2. Snapshot includes: status, spec path, verify path, current target, pass/fail counts, current round, max rounds, budget, and recent round history.
3. Include the derived reconciliation queue only as a compact display cache; it must be regenerated from `SPEC.md` and verifier output after restore.
4. After compaction, append a post-compaction snapshot if possible.
5. Any active state restored after compaction becomes `paused`.
6. The loop never auto-continues after compaction.

---

## 10. Error Handling

| Condition | Behavior |
|-----------|----------|
| No SPEC.md found | `/respec` errors: "No SPEC.md found. Run `/spec-init` first." |
| verify-spec.sh not executable | Auto `chmod +x`; print "Fixed permissions on {verifyPath}" |
| verify-spec.sh not found | Auto-scaffold fail-closed template, chmod, pause, and warn |
| 3 consecutive failures on same invariant | Escape valve triggers, writes BLOCKER.md, stops loop |
| Max rounds exhausted | Mark blocked with `type: "max-rounds"` and print remaining failures |
| Session compaction mid-loop | State preserved; loop does NOT auto-continue (safety) |
| User types during active loop | Current turn finishes, then state becomes paused |
| Contract file changes during active loop | Rerun verifier, regenerate queue, then pause for explicit resume |
| Command omits path with no focused spec | Ask user to choose when interactive; otherwise require explicit spec path |
| No tool calls during failing round | Pause with `spin-guard` guidance |
| Two weak/no-delta rounds | Block with `escapeValve.type = "spin-guard"` |
| `.pi/respec.json` malformed | Fail closed with parse error; do not mutate current state |
| SPEC.md parse error (no Invariants section) | Warn: "No invariants found in SPEC.md. Add a ## Invariants section." |
| verify-spec.sh exits 0 immediately | Print "✅ All invariants already satisfied. Nothing to reconcile." and exit |
| verify-spec.sh always exits non-zero with no parseable output | Fall back: send full output to agent as context |
| Agent tries to edit SPEC.md or verify script | Block tool call unless user explicitly requested contract repair |
| Bash matches ask-before pattern | Confirm with user; block when no UI is available |

---

## 11. Packaging

### 11.1 package.json

```json
{
  "name": "respec",
  "version": "0.1.0",
  "type": "module",
  "description": "Continuous spec reconciliation for Pi — read SPEC.md, run verify-spec.sh, loop until all invariants pass",
  "keywords": ["pi-package", "pi-extension", "reconciler", "spec-driven"],
  "license": "MIT",
  "peerDependencies": {
    "@earendil-works/pi-coding-agent": "*",
    "@earendil-works/pi-tui": "*",
    "typebox": "*"
  },
  "devDependencies": {
    "@earendil-works/pi-coding-agent": "*",
    "@earendil-works/pi-tui": "*",
    "@earendil-works/pi-ai": "*",
    "typebox": "*",
    "typescript": "^5.0.0"
  },
  "pi": {
    "extensions": ["./src/index.ts"]
  },
  "files": ["src", "templates"],
  "scripts": {
    "build": "tsc --noEmit",
    "typecheck": "tsc --noEmit"
  }
}
```

### 11.2 tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

### 11.3 Installation

```bash
# From a local package directory
pi install /path/to/respec

# Temporary local test without modifying settings
pi -e /path/to/respec/src/index.ts

# From npm (future)
pi install npm:respec
```

Pi also supports project-local package settings with `pi install -l ./relative/path/to/package`, which writes to `.pi/settings.json`.

---

## 12. Visuals & UI

respec provides three layers of visual feedback using Pi's documented UI primitives and example-extension patterns.

### 12.1 Footer Status (`ctx.ui.setStatus`)

Persistent status shown in the footer bar. Updated on every state transition.

| State | Status Text | Theme Usage |
|-------|-------------|----------|
| idle (no recon) | `(not set)` — clears status | — |
| setup | `theme.fg("warning", "● respec: reading SPEC.md")` | warning |
| active | `theme.fg("accent", "◉ {targetName} ({currentRound}/{maxRounds})")` | accent |
| paused | `theme.fg("muted", "⏸ respec paused")` | muted |
| blocked | `theme.fg("error", "⚠️ blocked: {targetName}")` | error |
| done | `theme.fg("success", "✅ spec satisfied ({rounds} rounds)")` | success |

Implementation (from status-line.ts pattern):

```typescript
function updateFooterStatus(state: RespecState, ctx: ExtensionContext): void {
  const t = ctx.ui.theme;
  const target = state.currentTarget?.name ?? state.escapeValve?.invariant ?? "respec";
  switch (state.status) {
    case "active":
      ctx.ui.setStatus("respec",
        t.fg("accent", `◉ ${truncateToWidth(target, 30)} (${state.currentRound}/${state.maxRounds})`));
      break;
    case "paused":
      ctx.ui.setStatus("respec", t.fg("muted", "⏸ respec paused"));
      break;
    case "blocked":
      ctx.ui.setStatus("respec", t.fg("error", `⚠️ ${truncateToWidth(target, 30)}`));
      break;
    case "done":
      ctx.ui.setStatus("respec", t.fg("success", "✅ all invariants satisfied"));
      break;
    default:
      ctx.ui.setStatus("respec", undefined);
  }
}
```

### 12.2 Widget (Progress Dashboard Above Editor)

Shows a live progress dashboard above the editor area. Updated after each round. Inspired by plan-mode's todo widget.

**Active state:**
```
┌─ respec ──────────────────────────┐
│ Round 3/25  •  Budget 15/120      │
│ Invariants:  ■■■■□□□□  4/8        │
│ Target: DSL parser matches SPEC   │
│ Queue: 2 pass • 3 fail • 1 unknown│
│ [>] 3. DSL parser matches SPEC    │
│ [!] 4. Webhook validates HMAC     │
│ Time: 2m34s                       │
└───────────────────────────────────┘
```

**Done state:**
```
┌─ respec ──────────────────────────┐
│ ✅ 8/8 invariants satisfied       │
│    in 12 rounds • 15m22s         │
└───────────────────────────────────┘
```

**Blocked state:**
```
┌─ respec ──────────────────────────┐
│ ⚠️  Blocked at round 7            │
│    "DSL parser matches SPEC"     │
│    Failed 3x consecutively        │
│    See BLOCKER.md                 │
└───────────────────────────────────┘
```

Implementation:

```typescript
function buildWidget(state: RespecState, t: Theme): string[] {
  const lines: string[] = [];
  
  // Border header
  const title = t.fg("accent", " respec ");
  const border = t.fg("borderMuted", "─".repeat(3));
  lines.push(`${border}${title}`);
  
  if (state.status === "active") {
    // Progress bar
    const pass = state.invariants.filter(i => i.passed === true).length;
    const total = state.invariants.length;
    const fail = state.queue.filter(i => i.status === "failing" || i.status === "current").length;
    const unknown = state.queue.filter(i => i.status === "unknown").length;
    const visibleQueue = state.queue
      .filter(i => i.status === "current" || i.status === "failing" || i.status === "unknown")
      .slice(0, state.queueConfig.widgetMaxItems);
    const bar = fillBar(pass, total, 8, t);
    lines.push(`  Round ${state.currentRound}/${state.maxRounds}  •  Budget ${state.turnsThisRound}/${state.budgetPerRound}`);
    lines.push(`  Invariants: ${bar}  ${pass}/${total}`);
    lines.push(`  Target: ${t.fg("accent", state.currentTarget?.name ?? "unknown")}`);
    lines.push(`  Queue: ${pass} pass • ${fail} fail • ${unknown} unknown`);
    if (state.queueConfig.displayMode !== "off") {
      for (const item of visibleQueue) {
        lines.push(`  ${queueMarker(item.status)} ${item.index}. ${truncateToWidth(item.name, 28)}`);
      }
    }
  } else if (state.status === "done") {
    lines.push(t.fg("success", `  ✅ ${state.invariants.length}/${state.invariants.length} invariants satisfied`));
    lines.push(`     in ${state.currentRound} rounds`);
  } else if (state.status === "blocked") {
    lines.push(t.fg("error", `  ⚠️  Blocked at round ${state.currentRound}`));
    lines.push(`     "${state.escapeValve?.invariant}"`);
    lines.push(t.fg("warning", "     Failed 3x consecutively  —  See BLOCKER.md"));
  }
  
  return lines;
}

// Unicode progress bar
function fillBar(value: number, max: number, width: number, t: Theme): string {
  const filled = max === 0 ? 0 : Math.round((value / max) * width);
  const empty = width - filled;
  return t.fg("success", "■".repeat(filled)) + t.fg("dim", "□".repeat(empty));
}

function queueMarker(status: QueueItemStatus): string {
  switch (status) {
    case "passed": return "[x]";
    case "current": return "[>]";
    case "failing": return "[!]";
    case "blocked": return "[blocked]";
    default: return "[?]";
  }
}
```

### 12.3 Overlay: Full Spec Dashboard (`/spec-status`)

When the user runs `/spec-status` (or clicks a widget shortcut), opens an interactive overlay showing full reconciliation state.

Inspired by Pi's `ctx.ui.custom(..., { overlay: true })` pattern and plan-mode's interactive follow-up flow.

```
┌─────────────── Spec Status ─────────────────────────────┐
│                                                         │
│  Status: ◉ Active  (round 3/25, budget 15/120)        │
│                                                         │
│  Invariants:                                            │
│  ✅  1. Project compiles (tsc --noEmit)                │
│  ✅  2. Tests pass (cargo test)                         │
│  ◉  3. DSL parser matches SPEC  [current target]       │
│  ❌  4. Webhook validates HMAC signature                │
│  □   5. CLI flags match README                         │
│                                                         │
│  Round history:                                         │
│  #3  DSL parser        →  still failing  (12 turns)    │
│  #2  Project compiles  →  ✅ fixed       (3 turns)     │
│  #1  Tests pass        →  ✅ fixed       (8 turns)     │
│                                                         │
│  [p] Pause  [r] Resume  [c] Cancel  [q] Close          │
└─────────────────────────────────────────────────────────┘
```

Implementation approach (using `ctx.ui.custom` with overlay):

```typescript
pi.registerCommand("spec-status", {
  description: "Show full reconciliation status",
  handler: async (_args, ctx) => {
    await ctx.ui.custom<string | null>(
      (tui, theme, _kb, done) => {
        const container = new Container();
        
        // Build dashboard content
        container.addChild(buildDashboard(store, theme));
        
        // Create component with keyboard nav
        return {
          render: (w) => container.render(w),
          invalidate: () => container.invalidate(),
          handleInput: (data) => {
            if (matchesKey(data, "p")) { done("pause"); }
            else if (matchesKey(data, "r")) { done("resume"); }
            else if (matchesKey(data, "c")) { done("cancel"); }
            else if (matchesKey(data, "escape") || matchesKey(data, "q")) { done(null); }
            tui.requestRender();
          },
        };
      },
      { overlay: true }
    );
  }
});
```

### 12.4 Notifications (`ctx.ui.notify`)

| Event | Notification | Theme |
|-------|-------------|-------|
| /respec started | `"🔄 Reconciling: {failCount} failing invariants"` | info |
| Round complete (pass) | `"✅ Round {N}: {invariantName} fixed"` | info |
| Round complete (fail) | `"❌ Round {N}: {invariantName} still failing"` | warning |
| All invariants pass | `"✅ All {totalCount} invariants satisfied in {rounds} rounds"` | info |
| Escape valve triggered | `"⚠️ Blocked: {invariantName} failed 3x. See BLOCKER.md"` | error |
| Max rounds exhausted | `"⚠️ Reached {maxRounds} rounds. {remainingFailures} still failing."` | warning |
| verify-spec.sh not found | `"📄 Scaffolded fail-closed verify script; edit it before resuming"` | warning |

### 12.5 Working Message (During Active Loop)

When the loop is active and the agent is working on a round, show a custom working indicator:

```typescript
ctx.ui.setWorkingMessage(`[respec] Fixing: ${state.currentTarget?.name ?? "invariant"}`);
```

Cleared with `ctx.ui.setWorkingMessage()` when the round completes or the loop stops.

### 12.6 Visual Inspiration Sources

| Package | Pattern Used | File/Reference |
|---------|-------------|---------------|
| plan-mode | Widget with todo checklist + progress | `examples/extensions/plan-mode/index.ts` — setWidget with checkboxes |
| plan-mode | Session persistence for UI state | `examples/extensions/plan-mode/index.ts` — pi.appendEntry("plan-mode", ...) |
| status-line.ts | `ctx.ui.setStatus` with themed strings | `examples/extensions/status-line.ts` |
| widget-placement | Widget above/below editor placement | `examples/extensions/widget-placement.ts` |
| overlay-qa-tests | Overlay positioning options | `examples/extensions/overlay-qa-tests.ts` — anchors, margins, responsive |
| message-renderer.ts | Compact custom message rendering | `examples/extensions/message-renderer.ts` — registerMessageRenderer |

---

## 13. Templates

### 13.1 SPEC-template.md

````markdown
# {Project Name}

## Invariants

### 1. Example Invariant
Description of what must be true.
```
[check] verify-spec.sh prints whether this invariant passes
```

### 2. Add more invariants below
...
````

### 13.2 verify-template.sh

```bash
#!/usr/bin/env bash
# Reconcile script for respec
# Exit 0 when all invariants are satisfied.
# Exit non-zero with descriptive output when any check fails.

set -u
set -o pipefail

echo "=== Running spec verification ==="

failures=0

# Invariant 1: Example Invariant
echo "--- Invariant 1: Example Invariant ---"
echo "FAIL: replace this placeholder with a real check"
failures=$((failures + 1))

# --- Add more checks above this line ---

if [ "$failures" -eq 0 ]; then
  echo ""
  echo "=== All invariants satisfied ==="
else
  echo ""
  echo "=== $failures invariant(s) failing ==="
fi

exit "$failures"
```

---

## 14. Non-Goals

- respec does NOT parse or understand code — it only runs verify-spec.sh and reads its exit code
- respec does NOT modify SPEC.md — only the user evolves the spec
- respec does NOT modify scripts/verify-spec.sh — only the user evolves the verify script
- respec does NOT implement kanban boards or user-maintained TODO lists; the reconciliation queue is derived runtime state
- respec does NOT self-judge completion — the shell is the only judge
- respec does NOT require internet access
- respec does NOT implement DAG dependencies between invariants (they run in order)
- respec does NOT have a "replan" mechanism — if the spec is wrong, the user edits it and re-runs

---

## 15. Multi-Spec & Composition

### 15.1 The Problem

A single `SPEC.md` works for small projects. As a project grows (or when modules deserve standalone contracts), a single file becomes a bottleneck:

```
project/
├── SPEC.md           ← 30 invariants. Auth, core, DSL all mixed.
├── src/
│   ├── core/
│   ├── auth/         ← Could be extracted to its own repo
│   └── dsl/
```

Extracting `auth/` later means:
- Manually finding and removing auth invariants from the root SPEC.md
- Figuring out what belongs where — the boundary was never explicit
- The auth invariants carry root-level assumptions (paths, dependencies)

### 15.2 The Solution: Composition via Shell Exit Codes

**A spec lives with the code it governs. They compose via shell exit codes, not markdown includes.**

There is no "subspec" concept in respec. There are only specs. A root spec delegates to smaller specs by running their `verify-spec.sh`.

#### Example: Three Specs, One Root

**`src/auth/SPEC.md`** — autonomous, self-contained:
````markdown
# Auth Module SPEC

## Invariants

### 1. HMAC signing matches API contract
```
[check] Tests pass for HMAC signing
```

### 2. Token refresh flow works
```
[check] Integration test for token refresh passes
```
````

**`src/auth/verify-spec.sh`** — self-contained:
```bash
#!/bin/bash
set -e
echo "--- Invariant 1: HMAC signing ---"
cargo test --test hmac_signing --quiet
echo "PASS: HMAC signing tests"
echo "--- Invariant 2: Token refresh ---"
cargo test --test token_refresh --quiet
echo "PASS: token refresh tests"
```

**`SPEC.md`** (root) — references the module by its exit code, not by including its text:
````markdown
# Project Root SPEC

## Invariants

### 1. Core module is sound
```
[check] src/core/verify-spec.sh exits 0
```

### 2. Auth module enforces its contract
```
[check] src/auth/verify-spec.sh exits 0
```

### 3. DSL round-trips correctly
```
[check] cargo test --test dsl_roundtrip --quiet
```
````

**`scripts/verify-spec.sh`** (root) — orchestrates by delegation:
```bash
#!/bin/bash
set -e
echo "=== Root spec ==="
echo "--- Invariant 1: Core module ---"
src/core/verify-spec.sh
echo "PASS: core module spec"
echo "--- Invariant 2: Auth module ---"
src/auth/verify-spec.sh
echo "PASS: auth module spec"
echo "--- Invariant 3: DSL round-trip ---"
cargo test --test dsl_roundtrip --quiet
echo "PASS: DSL round-trip"
echo ""
echo "=== All invariants satisfied ==="
exit 0
```

### 15.3 How respec Handles This

**1. `/respec <path>`** — reconcile against any SPEC.md, not just the root:
```text
# Reconcile just the auth module
/respec src/auth/SPEC.md

# Reconcile the whole project
/respec
```

Each invocation is fully independent — its own state, round history, escape valve, and budget.

**2. `/respec --workspaces`** (v0.2, optional) — discover and reconcile all `SPEC.md` files in the project tree:
```text
/respec --workspaces
```
Discovery:
- Find every `SPEC.md` in the project tree (respecting `.gitignore`)
- Order by depth (root first, then modules)
- Reconcile each independently
- Report summary: "3 specs reconciled: root ✅, core ✅, auth ⚠️ (blocked)"

Without `--workspaces`, only the explicitly given path is reconciled. The root spec may still delegate to child verify scripts — that's just shell scripting, not respec feature.

### 15.4 What This Means for Extraction

When `auth/` is ready to become its own repo:

| Step | Action |
|------|--------|
| 1 | Move `src/auth/SPEC.md` and `src/auth/verify-spec.sh` to new repo |
| 2 | Delete the `src/auth/verify-spec.sh exits 0` line from root `SPEC.md` |
| 3 | Delete the `src/auth/` delegation from root `scripts/verify-spec.sh` |
| 4 | `respec` on new repo works immediately — auth spec was always self-contained |

Zero refactoring of the auth spec. The boundary was always explicit.

### 15.5 What We Avoid

| Approach | Why Not |
|----------|---------|
| **Markdown includes** (`#include "auth/SPEC.md"`) | Now respec needs a preprocessor. Over-engineering for a problem that shell already solves. |
| **Nested state** (parent tracks children) | Circular complexity. Child fails → parent retries → child fails again. Each spec is an independent contract. |
| **Spec inheritance** (child overrides parent) | Specs are contracts, not classes. No override semantics. |
| **One monolithic spec** | Extraction is painful. No modularity. This is what we're avoiding. |

### 15.6 How to Decide Which Folders Need a Spec

**The rule: A folder gets its own `SPEC.md` when the root `SPEC.md` would contain more than 1 invariant about that folder's behavior.**

That's it. One concrete heuristic.

#### Example: Auth Module

**Don't do this (4 auth invariants in root):**
````markdown
### 3. Auth handles login correctly
```
[check] Login flow passes
```

### 4. Auth handles token refresh correctly
```
[check] Token refresh passes
```

### 5. Auth handles HMAC signing correctly
```
[check] HMAC signing passes
```

### 6. Auth rate-limits correctly
```
[check] Rate limiting passes
```
````

**Do this (1 root invariant delegates to auth's spec):**
````markdown
### 3. Auth module satisfies its contract
```
[check] src/auth/verify-spec.sh exits 0
```
````

And `src/auth/SPEC.md` has the 4 detailed invariants.

#### The 1-Invariant Threshold

| Root has this many invariants about folder X | Decision |
|-----------------------------------------------|----------|
| 0 | No spec needed. Folder is internal detail. |
| 1 | Keep it in root. Not worth its own file. |
| 2+ | Extract. Each extra invariant is a sign the folder has independent behavior worth documenting. |

#### Practical Signals That Trigger Extraction

When writing or reviewing `SPEC.md`, ask:

1. **Could this folder be extracted to its own repo?** If yes, it needs its own spec. If no, keep it in root.
2. **Does this folder have a public API other modules depend on?** If yes, the contract belongs in that folder. Other modules shouldn't need to read root SPEC.md to understand auth's contract.
3. **Am I about to write a 3rd invariant for this folder?** Stop. Create `folder/SPEC.md` and collapse root to one delegation line.
4. **Would this folder's verify-script be useful outside this project?** If yes, it should be self-contained. Give it its own spec.

#### What Never Gets a Spec

| Folder | Why |
|--------|-----|
| `src/utils/` with `formatDate`, `capitalize` | Utility functions are too fine-grained. One root invariant: "Utility functions pass tests." |
| `src/types/` with pure type definitions | No runtime behavior to verify. |
| `src/constants/` | Static values, no contract beyond "they match the API." |
| `src/config/` | Config loading is usually one invariant: "Config loads and validates." Keep in root. |
| Generated queue files like `TODO.md` | The reconciliation queue is derived state, not an editable project artifact. |

#### When in Doubt: 1 Invariant in Root

If you're unsure whether a folder needs its own spec, write one invariant in the root spec:

````markdown
### 5. Email service sends correctly
```
[check] npm test -- --testPathPattern=email
```
````

If that grows to 2+ invariants later, extract. Don't pre-split. The 1-invariant threshold is the decision rule.

### 15.7 Summary

> A spec lives with the code it governs. The root spec governs integration. Module specs govern modules. They compose via shell exit codes.

**The decision rule for when a folder needs its own spec: 2+ invariants about that folder in the root → extract.**

respec doesn't need subspecs. It just needs a `<path>` argument and optional future `--workspaces` discovery. The composition layer is already there — it's called `verify-spec.sh` calling other `verify-spec.sh` files.

---

## 16. Research & Inspiration

### 16.1 Verified Pi Sources

Research baseline: 2026-05-22.

| Source | Relevant API/Pattern |
|--------|----------------------|
| Pi Extensions docs: `https://pi.dev/docs/latest/extensions` | Extension exports, `pi.registerCommand`, `pi.registerTool`, lifecycle events, `ctx.ui`, `ctx.sessionManager`, `ctx.isIdle`, `ctx.abort`, `pi.sendMessage`, `pi.sendUserMessage`, `pi.appendEntry`, `pi.exec`, `registerFlag` |
| Pi Packages docs: `https://pi.dev/docs/latest/packages` | `pi install`, `pi -e`, `pi` manifest, `peerDependencies` for bundled Pi packages, local/project package behavior |
| Pi `pi-until-done` package | progress signals, spin guard, ask-before safety, turn budgets, no hidden state |
| Pi `@qhn/pi-goal` package | setup-first safety rules, evidence before done, no-work stop, session-local state |
| Pi `pi-goal-x` package | branch-local focus, state-gated tools, disk reconciliation, schema gates |
| Pi `@plannotator/pi-extension` package | project-local config, checklist widget, progress display, appendEntry persistence |
| Pi `pi-board` package | useful anti-pattern boundary: task boards/databases are a separate product |
| Pi `plan-mode` example: `packages/coding-agent/examples/extensions/plan-mode/index.ts` | `setActiveTools`, `setStatus`, `setWidget`, `appendEntry`, `before_agent_start`, `turn_end`, `agent_end`, user interaction after agent completion |
| Pi `send-user-message` example: `packages/coding-agent/examples/extensions/send-user-message.ts` | Difference between extension custom messages and actual user messages; delivery modes while streaming |
| Pi `status-line` and `message-renderer` examples | Footer status, theme usage, and custom rendering patterns |

### 16.2 Adopted Patterns

| Pattern | How respec Uses It |
|---------|-------------------|
| Extension package manifest | `package.json` declares `pi.extensions = ["./src/index.ts"]` |
| Command registration | `/respec`, `/spec-init`, and `/spec-status` map to `pi.registerCommand()` names without slashes |
| Stateful extension | `Store` is in memory; `pi.appendEntry()` writes snapshots and round audit entries |
| Branch-safe restore | `ctx.sessionManager.getBranch()` reconstructs branch-local state and focused spec on start/switch |
| Event-driven continuation | `pi.sendMessage(..., { triggerTurn: true, deliverAs: "followUp" })` queues the next focused round |
| Focused spec | One branch-local focused `specKey` controls continuation when commands omit a path |
| Disk reconciliation | Contract fingerprints force queue regeneration when `SPEC.md` or the verifier changes |
| Spin guard | Tool progress signals prevent silent no-work loops |
| Project config | `.pi/respec.json` stores queue, budget, and safety defaults |
| Prompt context | `before_agent_start` adds hidden round context without deleting other extension messages |
| User preemption | `input` marks active reconciliation as user-interrupted unless the source is `extension` |
| UI feedback | `ctx.ui.setStatus`, `ctx.ui.setWidget`, `ctx.ui.custom({ overlay: true })`, and `ctx.ui.setWorkingMessage` |
| Tool safety | `tool_call` blocks writes/edits to contract files during active reconciliation |
| Output hygiene | Verifier/tool outputs are tail-truncated before entering state or prompts |

### 16.3 Design Position

respec is not a task manager and not an LLM judge. It is a Pi-native controller that repeatedly:

1. runs a shell verifier,
2. extracts the next failing invariant,
3. feeds one focused repair prompt to Pi,
4. records what changed,
5. stops only when the verifier, the user, or an explicit escape valve says to stop.

The important distinction is that completion is external and deterministic: `verify-spec.sh` exit code 0.

## 17. Verification

To verify respec itself:
1. `tsc --noEmit` compiles without errors
2. `pi -e ./src/index.ts` loads without errors
3. `pi install ./` loads the package manifest and extension from a local path
4. `/spec-init` creates `SPEC.md` and fail-closed `scripts/verify-spec.sh`
5. `/respec` pauses when the generated verifier has not been edited
6. `/respec` on a project with a SPEC.md and verify script runs one round, persists state, and enqueues the focused prompt
7. The reconciliation queue is regenerated from `SPEC.md`, verifier output, and round history
8. `/spec-status` shows fresh verifier state, queue state, and branch-local round history
9. User input during active reconciliation pauses automatic continuation after the current turn
10. Session switch reconstructs the selected branch state and clears stale UI
11. Session compaction preserves reconciliation state and resumes as paused
12. Escape valve triggers after 3 consecutive same-invariant failed rounds
13. Tool-call guard rails block edits to SPEC.md and the verifier during active reconciliation
14. Focused spec is branch-local and commands without a path target the focused spec
15. Contract fingerprints detect spec/verifier edits and force queue regeneration or pause
16. Spin guard pauses or blocks no-progress loops
17. `.pi/respec.json` defaults merge correctly with command flags
18. Ask-before safety patterns confirm or block matching bash commands
19. Integration tests use a real Pi runtime/faux provider instead of only hand-rolled `ExtensionAPI` mocks
20. `/respec` with all invariants already passing exits with "✅ All invariants satisfied"
