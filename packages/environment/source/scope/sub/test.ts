import { z } from "zod";

import { getEnvVar } from "../../variables/sub/getter.ts";

export const ENV_VARS_TEST = ["JEST", "VITEST"] as const;

export type EnvVarTest = (typeof ENV_VARS_TEST)[number];

export const SCHEMA_ENV_VAR_TEST = z.enum(ENV_VARS_TEST);

export const IN_JEST = getEnvVar("JEST") !== undefined;

export const IN_VITEST = getEnvVar("JEST") !== undefined;
