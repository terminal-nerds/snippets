import { z } from "zod";

export type EmptyString = "";

export const SCHEMA_STRING_EMPTY = z.literal("");

export function isStringEmpty(value: string): value is EmptyString {
	return SCHEMA_STRING_EMPTY.safeParse(value).success;
}

export function validateStringEmpty(value: string): asserts value is EmptyString {
	SCHEMA_STRING_EMPTY.parse(value);
}
