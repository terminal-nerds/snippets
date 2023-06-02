import { z } from "zod";

import {
	IN_BROWSER,
	IN_BUN,
	IN_DENO,
	IN_DOM,
	IN_EDGE,
	IN_HAPPY_DOM,
	IN_JSDOM,
	IN_NODE,
	IN_WEB_WORKER,
} from "./check.ts";

/* prettier-ignore */
export const RUNTIME_NAMES = [
	"browser",
	"bun",
	"deno",
	"dom",
	"edge",
	"happy-dom",
	"jsdom",
	"node",
	"web-worker",
] as const;

export type RuntimeName = (typeof RUNTIME_NAMES)[number];

export const SCHEMA_RUNTIME_NAME = z.enum(RUNTIME_NAMES);

export function isValidRuntimeName(name: string): name is RuntimeName {
	return SCHEMA_RUNTIME_NAME.safeParse(name).success;
}

export function validateRuntimeEnvironmentName(name: string): asserts name is RuntimeName {
	SCHEMA_RUNTIME_NAME.parse(name);
}

/** Receive the name of the currently running JavaScript environment, where the code was executed. */
export function getRuntimeName(): RuntimeName {
	/** NOTE: Order matters! */
	const checks = {
		"edge": IN_EDGE,
		"bun": IN_BUN,
		"happy-dom": IN_HAPPY_DOM,
		"jsdom": IN_JSDOM,
		"deno": IN_DENO,
		"browser": IN_BROWSER,
		"node": IN_NODE,
		"web-worker": IN_WEB_WORKER,
		"dom": IN_DOM,
	} as const;

	for (const [name, isTrue] of Object.entries(checks)) {
		if (isTrue) return name as RuntimeName;
	}

	throw new Error(`Unrecognized JavaScript runtime environment!`);
}
