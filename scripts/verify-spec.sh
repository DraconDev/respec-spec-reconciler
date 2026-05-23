#!/usr/bin/env bash
# Verification script for respec spec-driven reconciliation
# Exit 0 when all invariants are satisfied.
# Exit non-zero with descriptive output when any check fails.

set -u
set -o pipefail

echo "=== Running spec verification ==="
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SPEC_DIR="$(dirname "$SCRIPT_DIR")"

failures=0
passed=0

# --- Invariant checks below ---

echo "--- Invariant 1: Source files exist ---"
required_files=(
  "src/index.ts"
  "src/commands.ts"
  "src/loop-controller.ts"
  "src/delta-engine.ts"
  "src/verifier.ts"
  "src/spec-parser.ts"
  "src/store.ts"
  "src/types.ts"
)
all_exist=true
for f in "${required_files[@]}"; do
  if [ ! -f "$SPEC_DIR/$f" ]; then
    echo "FAIL: Missing $f"
    all_exist=false
  fi
done
if $all_exist; then
  echo "PASS: All source files present"
  passed=$((passed + 1))
else
  failures=$((failures + 1))
fi
echo ""

echo "--- Invariant 2: Package.json has required scripts ---"
if grep -q '"dev"' "$SPEC_DIR/package.json" && \
   grep -q '"build"' "$SPEC_DIR/package.json"; then
  echo "PASS: package.json has scripts"
  passed=$((passed + 1))
else
  echo "FAIL: package.json missing scripts"
  failures=$((failures + 1))
fi
echo ""

echo "--- Invariant 3: Pi CLI available ---"
if pi --version > /dev/null 2>&1; then
  echo "PASS: Pi CLI available"
  passed=$((passed + 1))
else
  echo "FAIL: pi CLI not available"
  failures=$((failures + 1))
fi
echo ""

echo "--- Invariant 4: TypeScript compiles ---"
if npx tsc --noEmit 2>&1 | grep -q "error"; then
  echo "FAIL: TypeScript has type errors"
  failures=$((failures + 1))
else
  echo "PASS: TypeScript compiles cleanly"
  passed=$((passed + 1))
fi
echo ""

echo "--- Invariant 5: Extension entry point exports default ---"
if grep -q "export default function" "$SPEC_DIR/src/index.ts"; then
  echo "PASS: Extension exports default function"
  passed=$((passed + 1))
else
  echo "FAIL: src/index.ts missing default export"
  failures=$((failures + 1))
fi
echo ""

echo "--- Invariant 6: Store has required exports ---"
if grep -q "export function initStore" "$SPEC_DIR/src/store.ts" && \
   grep -q "export function getStore" "$SPEC_DIR/src/store.ts"; then
  echo "PASS: Store exports initStore and getStore"
  passed=$((passed + 1))
else
  echo "FAIL: store.ts missing required exports"
  failures=$((failures + 1))
fi
echo ""

# --- End of invariant checks ---

echo "=== Verification complete ==="
echo "Passed: $passed"
echo "Failed: $failures"

if [ "$failures" -eq 0 ]; then
  echo ""
  echo "=== All invariants satisfied ==="
  exit 0
else
  echo ""
  echo "=== $failures invariant(s) failing ==="
  exit 1
fi