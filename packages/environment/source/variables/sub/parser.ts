import { z } from "zod";

/**
 * Possible value types of the environment variable. NOTE: **They're always a string, but we're doing coercion during
 * parsing.**
 */
export type EnvVarValue = boolean | number | string;

export const SCHEMA_ENV_VAR = z.string().or(z.number()).or(z.boolean());

export type ParsedEnvVarValue<Value extends string> = Value extends "true"
	? true
	: Value extends "false"
	? false
	: Value extends `${number}`
	? number
	: string;

export function parseEnvVarValue<T extends string>(value: T): ParsedEnvVarValue<T> {
	if (value === "false") return false as ParsedEnvVarValue<T>;
	else if (value === "true") return true as ParsedEnvVarValue<T>;
	else {
		const numeric = Number(value);

		return Number.isNaN(numeric) ? (value as unknown as ParsedEnvVarValue<T>) : (numeric as ParsedEnvVarValue<T>);
	}
}
