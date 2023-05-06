/* import { RuntimeError } from "@terminal-nerds/snippets-error/custom"; */
import { z } from "zod";

/* prettier-ignore */
export const RUNTIME_ENVIRONMENTS = [
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
export type RuntimeEnvironment = (typeof RUNTIME_ENVIRONMENTS)[number];
export const RUNTIME_ENVIRONMENT_SCHEMA = z.enum(RUNTIME_ENVIRONMENTS);

/**
 * @see {@link https://bun.sh/docs/api/globals}
 */
export const IN_BUN = globalThis.Bun !== undefined && Bun.version !== undefined;

/**
 * @see {@link https://deno.land/manual@v1.31.1/runtime#deno-global}
 */
export const IN_DENO = globalThis.Deno !== undefined && Deno.version !== undefined && Deno.version.deno !== undefined;

/**
 * Detects if the DOM is available.
 */
export const IN_DOM =
	globalThis.window !== undefined &&
	!globalThis.navigator !== undefined &&
	// @ts-ignore FIXME: Find a way to make it typed?
	window.document !== undefined;

/**
 * @see {@link https://edge-runtime.vercel.app/features/available-apis#addressing-the-runtime}
 */
// @ts-ignore FIXME: Find a way to make it typed?
export const IN_EDGE = globalThis.EdgeRuntime !== undefined;

/**
 * @see {@link https://github.com/jsdom/jsdom}
 */
export const IN_JSDOM = IN_DOM && navigator.userAgent.includes("jsdom");

/**
 * @see {@link https://github.com/capricorn86/happy-dom/discussions/481}
 */
// @ts-ignore FIXME: Find a way to make it typed?
export const IN_HAPPY_DOM = IN_DOM && window.happyDOM !== undefined;

/**
 * @see {@link https://nodejs.org/dist/latest-v18.x/docs/api/process.html#process}
 */
export const IN_NODE = globalThis.process !== undefined && process.version !== undefined;

/**
 * Detect if is running in browser, and is not in a browser emulator (e.g. jsdom or Happy DOM)
 */
export const IN_BROWSER = IN_DOM && !IN_HAPPY_DOM && !IN_JSDOM;

/**
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers}
 */
export const IN_WEB_WORKER =
	typeof self === "object" && self.constructor && self.constructor.name === "DedicatedWorkerGlobalScope";

/**
 * Receive the name _(in lowercase)_ of the currently running JavaScript environment.
 */
export function getRuntimeEnvironmentName(): RuntimeEnvironment {
	/**
	 * NOTE: Order matters!
	 */
	const conditions = {
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

	for (const [name, isTrue] of Object.entries(conditions)) {
		if (isTrue) return name as RuntimeEnvironment;
	}

	throw new Error(`Unrecognized JavaScript runtime environment!`);
}

export function validateRuntimeEnvironmentName(name: string): asserts name is RuntimeEnvironment {
	RUNTIME_ENVIRONMENT_SCHEMA.parse(name);
}

export function isValidRuntimeEnvironmentName(name: string): name is RuntimeEnvironment {
	return RUNTIME_ENVIRONMENT_SCHEMA.safeParse(name).success;
}
