import { z } from "zod";

export const CI_CD_ENVIRONMENT_VARIABLES = ["CI", "CONTINUOUS_INTEGRATION"] as const;
export type CICDEnvironmentVariable = (typeof CI_CD_ENVIRONMENT_VARIABLES)[number];
export const CI_CD_ENVIRONMENT_VARIABLE_SCHEMA = z.enum(CI_CD_ENVIRONMENT_VARIABLES);
