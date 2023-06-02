import { hasEnvVar } from "./getter.ts";
import type { EnvVarValue } from "./parser.ts";
import { getSupportedRuntime } from "./supported.ts";

export interface EnvVarOptions {
	/**
	 * Strict checking. Will throw error if the variable name is non-existent.
	 * @defaultValue `false`
	 */
	strict?: boolean;
}

export function deleteEnvVar(name: string, options: EnvVarOptions = {}): void {
	const { strict = false } = options;

	if (hasEnvVar(name)) {
		switch (getSupportedRuntime()) {
			case "bun": {
				delete Bun.env[name];
				break;
			}
			case "deno": {
				Deno.env.delete(name);
				break;
			}
			case "node": {
				delete globalThis.process.env[name];
				break;
			}
		}
	} else if (strict) {
		throw new Error(`The environment variable name: "${name}" does not exist. Deletion aborted.`);
	}
}

export function setEnvVar(name: string, value: EnvVarValue): void {
	switch (getSupportedRuntime()) {
		case "bun": {
			Bun.env[name] = String(value);
			break;
		}
		case "deno": {
			Deno.env.set(name, String(value));
			break;
		}
		case "node": {
			globalThis.process.env[name] = String(value);
			break;
		}
	}
}
