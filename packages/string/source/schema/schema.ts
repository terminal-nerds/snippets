import { isPrimitive, validatePrimitive } from "@terminal-nerds/snippets-type/primitive";
import { z } from "zod";

export function validateString(value: unknown): asserts value is string {
	return validatePrimitive(value, "string");
}

export function isString(value: unknown): value is string {
	return isPrimitive(value, "string");
}

export type EmptyString = "";
export const EMPTY_STRING_SCHEMA = z.literal("");

export function isStringEmpty(value: string): value is EmptyString {
	validateString(value);

	return EMPTY_STRING_SCHEMA.safeParse(value).success;
}
