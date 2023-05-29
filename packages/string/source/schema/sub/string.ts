import { z } from "zod";

export const SCHEMA_STRING = z.string();

export function isString(value: unknown): value is string {
	return SCHEMA_STRING.safeParse(value).success;
}

export function validateString(value: unknown): asserts value is string {
	SCHEMA_STRING.parse(value);
}
