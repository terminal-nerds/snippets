import { type EnvVarValue, parseEnvVarValue } from "./parser.ts";
import { getSupportedRuntime } from "./supported.ts";

export function getEnvVars() {
	/* prettier-ignore */
	switch (getSupportedRuntime()) {
		/* eslint-disable unicorn/switch-case-braces */
		case "bun": return new Map(Object.entries(Bun.env));
		case "deno": return Deno.env;
		case "node": return new Map(Object.entries(process.env));
		/* eslint-enable unicorn/switch-case-braces */
	}
}

export interface EnvVarsOptions {
	/**
	 * Strict checking. Will throw error if the variable name is non-existent.
	 * @defaultValue `false`
	 */
	strict?: boolean;
}

export function hasEnvVar(variable: string): boolean {
	return getEnvVars().has(variable);
}

/* prettier-ignore */
export function getEnvVar<T extends EnvVarValue>(variable: string, options?: { strict?: false }): T | undefined;
export function getEnvVar<T extends EnvVarValue>(variable: string, options: { strict: true }): T;
export function getEnvVar<T extends EnvVarValue>(variable: string, options: EnvVarsOptions = {}): T | undefined {
	const { strict = false } = options;

	const value = getEnvVars().get(variable);

	if (value) {
		return parseEnvVarValue(value) as T;
	} else if (strict) {
		throw new Error(`The environment variable - "${variable}" - is not set. Getter aborted.`);
	}
}
