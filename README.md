# respec — Spec Reconciler for AI Coding Agents

**Read SPEC.md, work through requirements, learn, update the spec. The spec is the source of truth.**

```
SPEC.md (requirements) → /respec → agent works → checks off → loop
```

## What It Does

**respec** keeps your codebase reconciled against a `SPEC.md` that defines what should be true. No custom verifier scripts — the agent works through requirements using the tools it already has (compiler, test runner, curl, etc.).

```
1. SPEC.md has requirements with [x]/[ ] checkboxes
2. /respec picks the first unchecked item
3. Agent works on it, verifies with real tools
4. Checks it off in SPEC.md → goes to next
5. When understanding changes, update SPEC.md
6. Loop continues — the spec evolves with the project
```

## Why Not Verify Scripts?

Verify scripts require translating English requirements into shell code. That's the same impossible translation problem every agent faces. Instead, each spec item simply **names** an objective verifiable check — `npm test`, `tsc --noEmit`, `curl localhost:3000/health`. The agent already knows how to use those tools.

## Installation

```bash
pi install /path/to/respec
```

## Quick Start

```bash
# 1. Initialize a spec in your project
/spec-init

# 2. Edit SPEC.md — add your requirements with [x]/[ ]
# 3. Run reconciliation
/respec

# 4. Watch the agent work through items
# 5. Update SPEC.md when you learn something new
```

## SPEC.md Format

```markdown
# Project Spec

## Requirements

### [x] Project compiles
Run: `npm run build`

### [ ] Tests pass
Run: `npm test`

### [ ] API returns valid JSON
Run: `curl -s localhost:3000/ | jq .`

### [ ] Has input validation
Verify: all endpoints reject invalid data with 4xx

- [x] README exists
- [ ] Types exported from index
```

Each item should be **one verifiable thing**. Include how to verify when helpful.

## Commands

| Command | Description |
|---------|-------------|
| `/spec-init` | Scaffold SPEC.md with example requirements |
| `/spec-status` | Show current reconciliation state, done/undone items |
| `/respec` | Start reconciliation — pick next unchecked item |
| `/respec resume` | Resume after pause |
| `/respec cancel` | Cancel active reconciliation |
| `/respec pause` | Pause the loop |

## How It Works

1. **Parse SPEC.md** — extract items with `[x]` / `[ ]` checkboxes
2. **Find next unchecked item** — first undone requirement
3. **Send focused prompt** — tell the agent what to work on and how to verify
4. **Agent works** — uses standard tools, checks off when done
5. **Loop or pause** — continue to next item or pause for manual input
6. **Spec evolves** — update SPEC.md when understanding changes

## Escape Valve

If the same item fails 3 consecutive rounds, respec writes a `BLOCKER.md` and stops. This prevents infinite loops when:
- The requirement is impossible as written
- The requirement needs to be clarified in SPEC.md
- Something else is wrong

## State Machine

```
idle → active → done (all checked)
           └→ blocked (3 strikes or max rounds)
           └→ paused (user interrupt or after each round)
```

## Why This Model?

- **No crystal ball** — don't try to list everything upfront. Add items as you learn.
- **No translation layer** — spec items reference real checks, not custom scripts
- **Spec evolves** — the spec changes when understanding changes, not the code
- **Source of truth** — SPEC.md is the single source, no duplicate in shell

## Requirements

- [Pi](https://github.com/earendil-works/pi-coding-agent) coding agent
- Node.js with ESM support

## License

MIT
