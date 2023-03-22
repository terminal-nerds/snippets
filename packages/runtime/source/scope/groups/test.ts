import { z } from "zod";

import { IN_BROWSER } from "../../environment/environment.ts";
import { RuntimeError } from "../../error/error.ts";
import { getEnvironmentVariable } from "../../variable/variable.ts";
import type { ScopeOptions } from "../shared.ts";

export const TEST_ENVIRONMENT_VARIABLES = ["JEST", "VITEST"] as const;
export type TestEnvironmentVariable = (typeof TEST_ENVIRONMENT_VARIABLES)[number];
export const TEST_ENVIRONMENT_VARIABLE_SCHEMA = z.enum(TEST_ENVIRONMENT_VARIABLES);

export function inTest(options: ScopeOptions = {}): boolean {
	const { strict = false } = options;

	if (IN_BROWSER) {
		if (strict)
			throw new RuntimeError(
				`Checking for current execution being run in any testing framework cannot be done in browsers.`,
			);
		else return false;
	} else {
		for (const variable of TEST_ENVIRONMENT_VARIABLES) {
			if (getEnvironmentVariable(variable)) return true;
		}

		return false;
	}
}
