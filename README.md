# respec — Pi Extension for Spec-Driven Reconciliation

**A Pi extension that reads SPEC.md, runs a shell verifier, and loops until all invariants pass.**

```
SPEC.md + scripts/verify-spec.sh → /respec → ✅ All invariants satisfied
```

## What It Does

Most agent loops are **prompt-driven** — they ask the model to decide if work is done. respec is **verifier-driven**:

```
while verify-spec.sh exits non-zero:
  extract next failing invariant
  derive focused fix prompt
  feed the prompt to Pi as the next agent turn
  log result
```

The spec is the single source of truth. The agent never judges its own completion — the shell is the only judge.

## Installation

```bash
# From local directory
pi install /path/to/respec

# Or temporarily without modifying settings
pi -e ./src/index.ts
```

## Quick Start

```bash
# 1. Initialize a spec in your project
/spec-init

# 2. Edit SPEC.md — add your invariants
# 3. Edit scripts/verify-spec.sh — add your checks

# 4. Start reconciliation
/respec

# 5. Watch it loop until all invariants pass
```

## Commands

| Command | Description |
|---------|-------------|
| `/spec-init` | Scaffold SPEC.md and scripts/verify-spec.sh |
| `/spec-status` | Show current reconciliation state |
| `/respec` | Start or resume spec-driven reconciliation |
| `/respec resume` | Resume after pause |
| `/respec cancel` | Cancel active reconciliation |
| `/respec pause` | Pause the loop |

## SPEC.md Format

```markdown
## Invariants

### 1. Project Compiles
The codebase must pass TypeScript type checking.
```
[check] npx tsc --noEmit
```

### 2. Tests Pass
All unit tests must pass.
```
[check] npm test
```
```

## How It Works

1. **Parse SPEC.md** — extract `### N. Name` sections and their `[check]` lines
2. **Run verify-spec.sh** — the verifier reports pass/fail per invariant
3. **Choose target** — select the first failing invariant as the repair target
4. **Send focused prompt** — tell the agent exactly what to fix and how to verify
5. **Verify again** — after the agent's turn, run the verifier
6. **Loop or complete** — continue until all invariants pass or an escape valve triggers

## Escape Valve

If the same invariant fails 3 consecutive rounds, respec writes a `BLOCKER.md` and stops. This prevents infinite loops when:
- The invariant is impossible as written
- The verify script has a false negative
- The spec has drifted from the intended behavior

## State Machine

```
idle → setup → active → done (all pass)
                  └→ blocked (3 strikes or max rounds)
                  └→ paused (budget exhausted or user interrupt)
```

## Project Structure

```
respec/
├── src/
│   ├── index.ts          # Extension entry point
│   ├── commands.ts       # /spec-init, /spec-status, /respec
│   ├── loop-controller.ts # State machine + agent_end hook
│   ├── verifier.ts       # Run verify-spec.sh, parse exit code
│   ├── spec-parser.ts    # Parse SPEC.md invariants
│   ├── store.ts          # In-memory state + appendEntry persistence
│   ├── delta-engine.ts   # Build repair queue from verifier output
│   └── types.ts          # TypeScript types
├── templates/
│   ├── SPEC-template.md
│   └── verify-template.sh
├── scripts/
│   └── verify-spec.sh    # Your verification checks
└── SPEC.md               # This spec (self-referential)
```

## Requirements

- [Pi](https://github.com/earendil-works/pi-coding-agent) coding agent
- Node.js with ESM support
- Bash (for verify-spec.sh)

## License

MIT