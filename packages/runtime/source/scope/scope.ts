import { RuntimeError } from "@terminal-nerds/snippets-error/custom";
import { z } from "zod";

import { IN_BROWSER } from "../environment/environment.js";
import { getEnvironmentVariable } from "../variable/variable.js";

export const CI_CD_ENVIRONMENT_VARIABLES = ["CI", "CONTINUOUS_INTEGRATION"] as const;
export type CICDEnvironmentVariable = typeof CI_CD_ENVIRONMENT_VARIABLES[number];
export const CI_CD_ENVIRONMENT_VARIABLE_SCHEMA = z.enum(CI_CD_ENVIRONMENT_VARIABLES);

export const TEST_ENVIRONMENT_VARIABLES = ["JEST", "VITEST"] as const;
export type TestEnvironmentVariable = typeof TEST_ENVIRONMENT_VARIABLES[number];
export const TEST_ENVIRONMENT_VARIABLE_SCHEMA = z.enum(TEST_ENVIRONMENT_VARIABLES);

interface ScopeOptions {
	/**
	 * Checks if it's being run in the JavaScript environment where continuous integration can be run.
	 *
	 * @defaultValue `false`
	 */
	strict?: boolean;
}

export function inContinuousIntegration(options: ScopeOptions = {}): boolean {
	const { strict = false } = options;

	if (IN_BROWSER) {
		if (strict) throw new RuntimeError(`CI & CD cannot be run in browsers.`);
		else return false;
	} else {
		for (const variable of CI_CD_ENVIRONMENT_VARIABLES) {
			if (getEnvironmentVariable(variable)) return true;
		}

		return false;
	}
}

export function inTest(options: ScopeOptions = {}): boolean {
	const { strict = false } = options;

	if (IN_BROWSER) {
		if (strict) throw new RuntimeError(`Test frameworks cannot be run in browsers.`);
		else return false;
	} else {
		for (const variable of TEST_ENVIRONMENT_VARIABLES) {
			if (getEnvironmentVariable(variable)) return true;
		}

		return false;
	}
}
