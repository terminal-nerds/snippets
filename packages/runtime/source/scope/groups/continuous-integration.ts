import { z } from "zod";

import { IN_BROWSER } from "../../environment/environment.ts";
import { RuntimeError } from "../../error/error.ts";
import { getEnvironmentVariable } from "../../variable/variable.ts";
import type { ScopeOptions } from "../shared.ts";

export const CI_CD_ENVIRONMENT_VARIABLES = ["CI", "CONTINUOUS_INTEGRATION"] as const;
export type CICDEnvironmentVariable = (typeof CI_CD_ENVIRONMENT_VARIABLES)[number];
export const CI_CD_ENVIRONMENT_VARIABLE_SCHEMA = z.enum(CI_CD_ENVIRONMENT_VARIABLES);

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
