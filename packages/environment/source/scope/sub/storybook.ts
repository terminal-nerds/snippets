import { z } from "zod";

import { getEnvVar } from "../../variables/sub/getter.ts";

export const ENV_VARS_STORYBOOK = ["STORYBOOK"] as const;

export type EnvVarStorybook = (typeof ENV_VARS_STORYBOOK)[number];

export const SCHEMA_ENV_VAR_STORYBOOK = z.enum(ENV_VARS_STORYBOOK);

export const IN_STORYBOOK = getEnvVar("STORYBOOK") === "true";
