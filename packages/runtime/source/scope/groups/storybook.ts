import { z } from "zod";

export const STORYBOOK_ENVIRONMENT_VARIABLES = ["STORYBOOK"] as const;
export type StorybookEnvironmentVariable = (typeof STORYBOOK_ENVIRONMENT_VARIABLES)[number];
export const STORYBOOK_ENVIRONMENT_VARIABLE_SCHEMA = z.enum(STORYBOOK_ENVIRONMENT_VARIABLES);
