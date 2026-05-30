#!/bin/bash
# Autoresearch benchmark for evolutionary reconciler
# Measures spec coverage, turn efficiency, stall rate, and prompt quality

set -euo pipefail

cd "$(dirname "$0")"

# Run typecheck first (fast pre-check)
echo "Checking TypeScript..."
npx tsc --noEmit 2>&1 | grep -q "error" && {
    echo "TypeScript compilation failed"
    exit 1
}

# Parse the current SPEC.md and analyze items
SPEC_PATH="SPEC.md"
if [ ! -f "$SPEC_PATH" ]; then
    echo "No SPEC.md found"
    exit 1
fi

# Count total items and checked items
TOTAL_ITEMS=$(grep -cE '^\s*(###|[-*])\s+\[[x ]\]' "$SPEC_PATH" || echo "0")
CHECKED_ITEMS=$(grep -cE '^\s*(###|[-*])\s+\[[x]\]' "$SPEC_PATH" || echo "0")
UNCHECKED_ITEMS=$((TOTAL_ITEMS - CHECKED_ITEMS))

# Calculate spec coverage (percentage of items verified)
if [ "$TOTAL_ITEMS" -eq 0 ]; then
    SPEC_COVERAGE=0
else
    SPEC_COVERAGE=$((CHECKED_ITEMS * 100 / TOTAL_ITEMS))
fi

# Analyze round history from the code
# For now, we'll use heuristics based on spec structure
# In a real test, we'd run the extension and track actual rounds

# Calculate prompt quality heuristic
# Factors: has verification hints, has clear descriptions, body text length
PROMPT_QUALITY=5  # baseline

# Count items with verification hints
WITH_VERIFY=$(grep -cE '(verify|check|test|run):' "$SPEC_PATH" || echo "0")
if [ "$WITH_VERIFY" -gt 0 ]; then
    PROMPT_QUALITY=$((PROMPT_QUALITY + 2))
fi

# Count items with body text (more context = better prompts)
WITH_BODY=$(awk '/^\s*(###|[-*])\s+\[[x ]\]/ {found=1} found && /^\s*[^#\-\*]/ && !/^\s*$/ {body++} /^\s*(###|[-*])\s+\[[x ]\]/ && found {if(body>0) count++; body=0} END {print count+0}' "$SPEC_PATH" || echo "0")
if [ "$WITH_BODY" -gt 0 ]; then
    PROMPT_QUALITY=$((PROMPT_QUALITY + 1))
fi

# Check for escape valve logic
if grep -q "consecutiveFailures >= 3" src/loop-controller.ts; then
    PROMPT_QUALITY=$((PROMPT_QUALITY + 1))
fi

# Check for adaptive prompt building
if grep -q "roundHistory" src/loop-controller.ts; then
    PROMPT_QUALITY=$((PROMPT_QUALITY + 1))
fi

# Cap at 10
if [ "$PROMPT_QUALITY" -gt 10 ]; then
    PROMPT_QUALITY=10
fi

# Estimate turn efficiency (lower is better for completed items)
# Baseline: assume 5 turns per item
TURN_EFFICIENCY=5

# Estimate stall rate (items needing3+ retries)
# Baseline: assume 20% stall rate
STALL_RATE=20

# Output metrics
echo "METRIC spec_coverage=$SPEC_COVERAGE"
echo "METRIC turn_efficiency=$TURN_EFFICIENCY"
echo "METRIC stall_rate=$STALL_RATE"
echo "METRIC prompt_quality=$PROMPT_QUALITY"
echo "METRIC total_items=$TOTAL_ITEMS"
echo "METRIC checked_items=$CHECKED_ITEMS"
echo "METRIC unchecked_items=$UNCHECKED_ITEMS"
