import { z } from "zod";

import { IN_NODE } from "../../runtime/sub/check.ts";
import { getEnvVar } from "../../variables/sub/getter.ts";

export type NodeEnv = "development" | "production" | "test";

export const ENV_VARS_NODE = ["development", "production", "test"] as const;

export const SCHEMA_ENV_VAR_NODE = z.enum(ENV_VARS_NODE);

export function getNodeEnv(): NodeEnv | string {
	if (IN_NODE) {
		return getEnvVar("NODE_ENV", { strict: true });
	} else {
		throw new Error(`Currently you can check only inside the Node.js runtime environment.`);
	}
}

export function isNodeEnv(value: string): value is NodeEnv {
	return SCHEMA_ENV_VAR_NODE.safeParse(value).success;
}

export function validateNodeEnv(value: string): asserts value is NodeEnv {
	SCHEMA_ENV_VAR_NODE.parse(value);
}

export const IN_DEVELOPMENT = getNodeEnv() === "development";
export const IN_PRODUCTION = getNodeEnv() === "production";
export const IN_TEST = getNodeEnv() === "test";
