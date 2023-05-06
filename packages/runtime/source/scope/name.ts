/* import { RuntimeError } from "@terminal-nerds/snippets-error/custom"; */

import { IN_BROWSER } from "../environment/environment.ts";
import { getEnvironmentVariable } from "../variable/variable.ts";
import { CI_CD_ENVIRONMENT_VARIABLES } from "./scopes/continuous-integration.ts";
import { STORYBOOK_ENVIRONMENT_VARIABLES } from "./scopes/storybook.ts";
import { TEST_ENVIRONMENT_VARIABLES } from "./scopes/test.ts";
import type { ScopeOptions } from "./shared.ts";

export const SCOPE_NAMES = ["continuousIntegration", "storybook", "test"] as const;
export type ScopeName = (typeof SCOPE_NAMES)[number];
export const SCOPE_VARIABLES = {
	continuousIntegration: CI_CD_ENVIRONMENT_VARIABLES,
	storybook: STORYBOOK_ENVIRONMENT_VARIABLES,
	test: TEST_ENVIRONMENT_VARIABLES,
} as const;

export function isIn(scopeName: ScopeName, options: ScopeOptions = {}): boolean {
	const { strict = false } = options;

	return IN_BROWSER ? handleBrowserRuntime(strict) : isAnyVariableDefined(SCOPE_VARIABLES[scopeName]);
}

function handleBrowserRuntime(strict: boolean): boolean {
	if (strict) throw new Error(`You cannot use this snippet in the browser.`);
	else return false;
}

function isAnyVariableDefined(names: readonly string[]): boolean {
	for (const variable of names) {
		if (getEnvironmentVariable(variable)) return true;
	}

	return false;
}
