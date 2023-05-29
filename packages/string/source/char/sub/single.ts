import { STRING_SCHEMA } from "@terminal-nerds/snippets-type/primitive";

import { CHARS_LATIN_LOWER_CASE, CHARS_LATIN_UPPER_CASE } from "./latin.ts";
import { CHARS_NUMBER } from "./number.ts";
import { CHARS_SPECIAL } from "./special.ts";

/* prettier-ignore */
export const CHARS = [
	...CHARS_LATIN_LOWER_CASE,
	...CHARS_LATIN_UPPER_CASE,
	...CHARS_NUMBER,
	...CHARS_SPECIAL,
] as const;

export type Char<T extends string = string> = T | (typeof CHARS)[number];

export const SCHEMA_CHAR = STRING_SCHEMA.length(1, "This is supposed to be a single character.");

export function isChar(input: string): input is Char {
	return SCHEMA_CHAR.safeParse(input).success;
}

export function validateChar(input: string): asserts input is Char {
	SCHEMA_CHAR.parse(input);
}
