import { IN_NODE } from "../environment/environment.ts";
import { RuntimeError } from "../error/error.ts";
import { getEnvironmentVariable } from "../variable/variable.ts";
import type { ScopeOptions } from "./shared.ts";

export * from "./groups/continuous-integration.ts";
export * from "./groups/storybook.ts";
export * from "./groups/test.ts";

export function inDevelopment(options: ScopeOptions = {}): boolean {
	return isNodeEnvironment("development", options);
}

export function inProduction(options: ScopeOptions = {}): boolean {
	return isNodeEnvironment("production", options);
}

export type NodeEnvironment = "development" | "production";

function isNodeEnvironment(value: NodeEnvironment, options: ScopeOptions = {}): boolean {
	const { strict = false } = options;

	if (IN_NODE) {
		const variable = getEnvironmentVariable("NODE_ENV");

		if (variable) {
			return variable === value;
		} else {
			throw new RuntimeError(`The environment variable "NODE_ENV" is not set!`);
		}
	} else {
		if (strict) throw new RuntimeError(`Currently you can check only inside the Node.js runtime environment.`);
		else return false;
	}
}
