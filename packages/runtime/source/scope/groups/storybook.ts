import { z } from "zod";

import { IN_BROWSER } from "../../environment/environment.ts";
import { RuntimeError } from "../../error/error.ts";
import { getEnvironmentVariable } from "../../variable/variable.ts";
import type { ScopeOptions } from "../shared.ts";

export const STORYBOOK_ENVIRONMENT_VARIABLES = ["STORYBOOK"] as const;
export type StorybookEnvironmentVariable = (typeof STORYBOOK_ENVIRONMENT_VARIABLES)[number];
export const STORYBOOK_ENVIRONMENT_VARIABLE_SCHEMA = z.enum(STORYBOOK_ENVIRONMENT_VARIABLES);

export function inStorybook(options: ScopeOptions = {}): boolean {
	const { strict = false } = options;

	if (IN_BROWSER) {
		if (strict) throw new RuntimeError(`You cannot use this snippet in the browser.`);
		else return false;
	} else {
		for (const variable of STORYBOOK_ENVIRONMENT_VARIABLES) {
			if (getEnvironmentVariable(variable)) return true;
		}

		return false;
	}
}
