import { RuntimeError } from "@terminal-nerds/snippets-error/custom";

import { getRuntimeEnvironmentName, type RuntimeEnvironment } from "../environment/environment.ts";

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
export function getEnvironmentVariable<ValueType extends EnvironmentVariableValue>(variable: string, options?: { strict?: false }): ValueType | undefined;
/* prettier-ignore */
export function getEnvironmentVariable<ValueType extends EnvironmentVariableValue>(variable: string, options: { strict: true }): ValueType;
export function getEnvironmentVariable<ValueType extends EnvironmentVariableValue>(
	variable: string,
	options: EnvironmentVariableOptions = {},
): ValueType | undefined {
	const { strict = false } = options;

	const value = toMap(getEnvironmentVariables()).get(variable);

	if (value) {
		return parseEnvironmentVariableValue(value) as ValueType;
	} else if (strict) {
		throw new RuntimeError(`The environment variable - "${variable}" - is not set. Getter aborted.`);
	}
}

type ParsedEnvVariableValue<Value extends string> = Value extends "true"
	? true
	: Value extends "false"
	? false
	: Value extends `${number}`
	? number
	: string;

function parseEnvironmentVariableValue<Value extends string>(value: Value): ParsedEnvVariableValue<Value> {
	if (value === "true") return true as ParsedEnvVariableValue<Value>;
	else if (value === "false") return false as ParsedEnvVariableValue<Value>;
	else {
		const asNumber = Number(value);

		return (Number.isNaN(asNumber) ? value : asNumber) as ParsedEnvVariableValue<Value>;
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
