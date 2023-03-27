import { RuntimeError } from "@terminal-nerds/snippets-error/custom";

import { IN_NODE } from "../../environment/environment.ts";
import { getEnvironmentVariable } from "../../variable/variable.ts";
import type { ScopeOptions } from "../shared.ts";

export function inDevelopment(options: ScopeOptions = {}): boolean {
	return isNodeEnvironment("development", options);
}

export function inProduction(options: ScopeOptions = {}): boolean {
	return isNodeEnvironment("production", options);
}

export type NodeEnvironment = "development" | "production";

export function isNodeEnvironment(value: NodeEnvironment, options: ScopeOptions = {}): boolean {
	const { strict = false } = options;

	/* prettier-ignore */
	return IN_NODE
        ? getEnvironmentVariable("NODE_ENV", { strict: true }) === value
        : handleNonNodeRuntime(strict);
}

function handleNonNodeRuntime(strict: boolean) {
	if (strict) throw new RuntimeError(`Currently you can check only inside the Node.js runtime environment.`);
	else return false;
}
