# respec — Evolutionary Spec Reconciler for AI Coding Agents

**Read SPEC.md, work through requirements, learn, update the spec. The spec is the source of truth.**

```
SPEC.md (requirements) → /respec → agent works → checks off → loop
```

## What It Does

**respec** is an *evolutionary* spec-driven reconciliation system that keeps your codebase synchronized with a `SPEC.md` that defines what should be true. It learns from past rounds, adapts strategies based on item complexity, and provides intelligent guidance to the agent.

```
1. SPEC.md has requirements with [x]/[ ] checkboxes
2. /respec analyzes items — complexity, dependencies, history
3. Agent works on prioritized items with contextual hints
4. System learns from successes and failures
5. Checks items off in SPEC.md → goes to next
6. Loop continues — the spec evolves with the project
```

## Key Features

### 🧠 Adaptive Intelligence
- **Complexity scoring** — estimates how hard each item is based on keywords
- **Learned turn budgets** — tracks average turns per item category (compile, test, api, etc.)
- **Failure pattern analysis** — distinguishes high-turn, quick-fail, and diminishing-returns patterns

### 🔗 Dependency Awareness
- **Smart item ordering** — infers which items depend on others (compiles → test → api)
- **Parallel batching** — process independent items together via `/respec batch`

### 🛡️ Reliability
- **Rollback detection** — warns when previously checked items get unchecked
- **Spec history tracking** — remembers checked state across sessions
- **Regression alerts** — immediate notification if items regress
- **Failure hints** — "Previous attempt used 12 turns, consider breaking this down"
- **Complexity guidance** — "This looks complex, work incrementally"
- **Verification suggestions** — auto-suggests commands based on item patterns

### 📋 Multi-Spec Support
- **Multiple spec files** — track SPEC.md across the entire project tree
- **Multi-spec mode** — `/respec multi` to enable cross-directory reconciliation
- **Aggregated progress** — shows completion across all spec files
- Progress bars, success rates, average turns per item
- Hierarchical spec display with nesting
- Batch mode indicators

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

### Hierarchical Specs

respec supports nested requirements:

```markdown
## Requirements

### Core Infrastructure
- [ ] Project compiles
- [ ] Tests pass

### API Features
- [ ] Health endpoint works
- [ ] User CRUD endpoints
```

## Commands

| Command | Description |
|---------|-------------|
| `/spec-init` | Scaffold SPEC.md with example requirements |
| `/spec-status` | Show current reconciliation state |
| `/respec` | Start reconciliation — pick next unchecked item |
| `/respec resume` | Resume after pause |
| `/respec cancel` | Cancel active reconciliation |
| `/respec pause` | Pause the loop |
| `/respec batch` | Toggle batch mode for parallel items |
| `/respec batch <N>` | Set batch size (2-5) |
| `/respec checkpoint` | Save checkpoint for resume after crash |
| `/respec multi` | Toggle multi-spec mode for multiple SPEC.md files |

## How It Works

1. **Parse SPEC.md** — extract items with `[x]` / `[ ]` checkboxes, track hierarchy
2. **Analyze items** — complexity scoring, dependency inference, learned budgets
3. **Find next target** — prioritize easiest ready items (dependencies satisfied)
4. **Send contextual prompt** — include complexity hints, failure history, verification
5. **Agent works** — uses standard tools, checks off when done
6. **Learn & adapt** — update turn budgets, adjust strategies
7. **Loop or pause** — continue to next item or pause for manual input

## Escape Valve

If the same item fails 3 consecutive rounds, respec writes a `BLOCKER.md` with:
- **Failure pattern analysis** — what's likely wrong
- **Actionable suggestions** — how to unblock
- **Recent round history** — what was tried

## State Machine

```
idle → active → done (all checked)
           └→ blocked (3 strikes or max rounds)
           └→ paused (user interrupt or after each round)
```

## Requirements

- [Pi](https://github.com/earendil-works/pi-coding-agent) coding agent
- Node.js with ESM support

## License

MIT
