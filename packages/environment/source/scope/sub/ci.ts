import { z } from "zod";

import { getEnvVar } from "../../variables/sub/getter.ts";

export const ENV_VARS_CI = ["CI", "CONTINUOUS_INTEGRATION"] as const;

export type EnvVarCI = (typeof ENV_VARS_CI)[number];

export const SCHEMA_ENV_VAR_CI = z.enum(ENV_VARS_CI);

export const IN_CI = getEnvVar("CI") !== undefined || getEnvVar("CONTINUOUS_INTEGRATION") !== undefined;
