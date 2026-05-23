# Project Spec

Write a brief description of your project here.

## Invariants

Add your invariants below using the format:

### 1. Example Invariant Name
Description of what must be true and under what conditions.

```
[check] Description of the verification check
```

The `[check]` line describes how to verify this invariant.
The verification script (`scripts/verify-spec.sh`) will use this as a guide.

---

### 2. Add More Invariants
Continue adding invariants following the same `### N. Name` pattern.

For each invariant:
1. Give it a descriptive name
2. Explain the requirement in prose
3. Provide a `[check]` line describing the verification

## Notes

- Invariants are checked in order (top to bottom)
- The first failing invariant is the repair target
- An invariant passes when the verifier script exits 0
- Run `/spec-status` to see current reconciliation state
- Run `/respec` to start or resume reconciliation