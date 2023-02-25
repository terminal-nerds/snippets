import { z } from "zod";

export const STRING_SCHEMA = z.string();

export type EmptyString = "";
export const EMPTY_STRING_SCHEMA = STRING_SCHEMA.length(0, "This is supposed to be an empty string.");

export function validateString(value: unknown): string {
	return STRING_SCHEMA.parse(value);
}

export function isString(value: unknown): value is string {
	return STRING_SCHEMA.safeParse(value).success;
}

export function isStringEmpty(value: string): value is EmptyString {
	validateString(value);

	return EMPTY_STRING_SCHEMA.safeParse(value).success;
}
