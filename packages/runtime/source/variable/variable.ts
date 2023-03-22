import { getRuntimeEnvironmentName, type RuntimeEnvironment } from "../environment/environment.ts";
import { RuntimeError } from "../error/error.ts";

const SUPPORTED_RUNTIMES = ["bun", "deno", "node"] as const;
type SupportedRuntime = Extract<RuntimeEnvironment, (typeof SUPPORTED_RUNTIMES)[number]>;

function isSupportedRuntime(name: RuntimeEnvironment): name is SupportedRuntime {
	return new Set(SUPPORTED_RUNTIMES).has(name);
}

function getSupportedRuntime(): SupportedRuntime {
	const runtimeName = getRuntimeEnvironmentName();

	if (isSupportedRuntime(runtimeName)) {
		return runtimeName;
	} else {
		throw new RuntimeError(`This snippet cannot be run in a runtime: ${runtimeName}!`);
	}
}

export function getEnvironmentVariables() {
	/* prettier-ignore */
	switch (getSupportedRuntime()) {
		/* eslint-disable unicorn/switch-case-braces */
		case "bun": return Bun.env;
		case "deno": return Deno.env.toObject();
		case "node": return process.env;
		/* eslint-enable unicorn/switch-case-braces */
	}
}

const toMap = (v: Record<string, string | undefined>) => new Map<string, string | undefined>(Object.entries(v));

export interface EnvironmentVariableOptions {
	/**
	 * Strict checking. Will throw error if the variable name is non-existent.
	 *
	 * @defaultValue `false`
	 */
	strict?: boolean;
}

/** Possible value types of the environment variable */
export type EnvironmentVariableValue = boolean | number | string;

export function hasEnvironmentVariable(variable: string): boolean {
	return toMap(getEnvironmentVariables()).has(variable);
}

/* prettier-ignore */
export function getEnvironmentVariable( variable: string, options?: { strict?: false }): EnvironmentVariableValue | undefined;
export function getEnvironmentVariable(variable: string, options: { strict: true }): EnvironmentVariableValue;
export function getEnvironmentVariable(
	variable: string,
	options: EnvironmentVariableOptions = {},
): EnvironmentVariableValue | undefined {
	const { strict = false } = options;

	const environmentVariable = toMap(getEnvironmentVariables()).get(variable);

	if (environmentVariable) {
		if (environmentVariable === "true") return true;
		else if (environmentVariable === "false") return false;
		else {
			const asNumber = Number(environmentVariable);

			return Number.isNaN(asNumber) ? environmentVariable : asNumber;
		}
	} else if (strict) {
		throw new RuntimeError(`The environment variable - "${variable}" - is not set. Getter aborted.`);
	}
}

export function setEnvironmentVariable(name: string, value: EnvironmentVariableValue): void {
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

export function deleteEnvironmentVariable(name: string, options: EnvironmentVariableOptions = {}): void {
	const { strict = false } = options;

	if (hasEnvironmentVariable(name)) {
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
		throw new RuntimeError(`The environment variable name: "${name}" does not exist. Deletion aborted.`);
	}
}
