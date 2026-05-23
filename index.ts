// respec - Continuous spec-driven reconciliation for Pi

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { registerCommands } from "./commands.js";
import { registerHooks } from "./commands.js";

export default function respecExtension(pi: ExtensionAPI): void {
	// Register commands
	registerCommands(pi);

	// Register lifecycle hooks
	registerHooks(pi);

	// Register CLI flag for respec behavior
	pi.registerFlag("respec", {
		description: "Enable respec extension",
		type: "boolean",
		default: true,
	});
}