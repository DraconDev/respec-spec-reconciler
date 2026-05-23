// Run verify-spec.sh and parse output

import { exec } from "child_process";
import { accessSync, chmodSync } from "fs";
import { promisify } from "util";
import type { VerifierOutput, InvariantResult } from "./types.js";
import { parseVerifierOutput, type InvariantInfo } from "./spec-parser.js";

const execAsync = promisify(exec);

export function ensureExecutable(scriptPath: string): boolean {
	try {
		accessSync(scriptPath, 0o755);
		return true;
	} catch {
		try {
			chmodSync(scriptPath, 0o755);
			return true;
		} catch {
			return false;
		}
	}
}

export async function runVerifier(
	specPath: string,
	invariantInfos: InvariantInfo[]
): Promise<VerifierOutput> {
	// Derive verify script path from SPEC.md location
	// e.g., /project/SPEC.md -> /project/scripts/verify-spec.sh
	// or /project/src/SPEC.md -> /project/src/scripts/verify-spec.sh
	const verifyPath = deriveVerifyPath(specPath);

	// Try to ensure it's executable
	ensureExecutable(verifyPath);

	try {
		const { stdout, stderr } = await execAsync(`bash "${verifyPath}"`, {
			cwd: specPath.replace(/\/[^/]*$/, ""),
			timeout: 120000,
		});

		return {
			exitCode: 0,
			stdout: stdout.trim(),
			stderr: stderr.trim(),
			results: parseVerifierOutput(stdout.trim(), invariantInfos),
		};
	} catch (error) {
		// exec callback error has exitCode as 'code' property
		const execError = error as { code?: number; stdout?: string; stderr?: string };
		const exitCode = execError.code ?? 1;
		const stdout = execError.stdout?.trim() ?? "";
		const stderr = execError.stderr?.trim() ?? "";

		return {
			exitCode,
			stdout,
			stderr,
			results: parseVerifierOutput(stdout, invariantInfos),
		};
	}
}

function deriveVerifyPath(specPath: string): string {
	// Try scripts/verify-spec.sh relative to SPEC.md directory
	const baseDir = specPath.replace(/\/[^/]*$/, "");
	return `${baseDir}/scripts/verify-spec.sh`;
}

// Check if verify script exists, return null if not
export function verifyScriptExists(specPath: string): boolean {
	const verifyPath = deriveVerifyPath(specPath);
	try {
		accessSync(verifyPath, 0o755);
		return true;
	} catch {
		try {
			accessSync(verifyPath, 0o644);
			return true; // Exists, just not executable (will chmod on run)
		} catch {
			return false;
		}
	}
}

// Scaffold a fail-closed verify script
export function scaffoldVerifyScript(specPath: string): string {
	const verifyPath = deriveVerifyPath(specPath);
	const baseDir = specPath.replace(/\/[^/]*$/, "");

	return `#!/usr/bin/env bash
# Reconcile script for respec
# Exit 0 when all invariants are satisfied.
# Exit non-zero with descriptive output when any check fails.

set -u
set -o pipefail

echo "=== Running spec verification ==="

failures=0

# Add your invariant checks below

# Example:
# echo "--- Invariant 1: Project compiles ---"
# if ! npm run build --quiet 2>/dev/null; then
#   echo "FAIL: npm run build failed"
#   failures=$((failures + 1))
# else
#   echo "PASS: Project compiles"
# fi

# --- Add more checks above this line ---

if [ "$failures" -eq 0 ]; then
  echo ""
  echo "=== All invariants satisfied ==="
else
  echo ""
  echo "=== $failures invariant(s) failing ==="
fi

exit "$failures"
`;
}

// Format a single invariant result for the verifier output format
export function formatInvariantResult(result: InvariantResult): string {
	const status = result.passed ? "PASS" : "FAIL";
	return `--- Invariant ${result.index}: ${result.name} ---
${status}: ${result.output ?? ""}`;
}