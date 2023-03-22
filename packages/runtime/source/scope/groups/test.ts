import { z } from "zod";

export const TEST_ENVIRONMENT_VARIABLES = ["JEST", "VITEST"] as const;
export type TestEnvironmentVariable = (typeof TEST_ENVIRONMENT_VARIABLES)[number];
export const TEST_ENVIRONMENT_VARIABLE_SCHEMA = z.enum(TEST_ENVIRONMENT_VARIABLES);
