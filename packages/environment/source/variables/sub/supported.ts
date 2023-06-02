import { extractArrayItems } from "@terminal-nerds/snippets-array/misc/sub/extract";

import { getRuntimeName, RUNTIME_NAMES, type RuntimeName } from "../../runtime/sub/name.ts";

const SUPPORTED_RUNTIMES = extractArrayItems(RUNTIME_NAMES, ["bun", "deno", "node"]);
type SupportedRuntime = (typeof SUPPORTED_RUNTIMES)[number];

export function isSupportedRuntime(name: RuntimeName): name is SupportedRuntime {
	return new Set(SUPPORTED_RUNTIMES).has(name);
}

export function getSupportedRuntime(): SupportedRuntime {
	const runtimeName = getRuntimeName();

	if (isSupportedRuntime(runtimeName)) {
		return runtimeName;
	} else {
		throw new Error(`This snippet cannot be run in a runtime: ${runtimeName}!`);
	}
}
