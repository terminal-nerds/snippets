import { z } from "zod";

import {
	CHARS_LATIN,
	CHARS_LATIN_LOWER_CASE,
	CHARS_LATIN_UPPER_CASE,
	SCHEMA_CHAR_LATIN,
	SCHEMA_CHAR_LATIN_LOWER_CASE,
	SCHEMA_CHAR_LATIN_UPPER_CASE,
} from "./latin.ts";
import { CHARS_NUMBER, SCHEMA_CHAR_NUMBER } from "./number.ts";
import { type Char, validateChar } from "./single.ts";
import { CHARS_SPECIAL, SCHEMA_CHAR_SPECIAL } from "./special.ts";

/* prettier-ignore */
export const CHAR_TYPES = [
	"latin",
	"latinLowerCase",
	"latinUpperCase",
	"number",
	"special",
] as const;

export type CharType = (typeof CHAR_TYPES)[number];

export const CHAR_TYPE_SCHEMA = z.enum(CHAR_TYPES);

export function validateCharType(type: string): asserts type is CharType {
	CHAR_TYPE_SCHEMA.parse(type);
}

export function isValidCharType(type: string): type is CharType {
	return CHAR_TYPE_SCHEMA.safeParse(type).success;
}

/* c8 ignore start */
export const CHARS_BY_TYPE = {
	latin: CHARS_LATIN,
	latinLowerCase: CHARS_LATIN_LOWER_CASE,
	latinUpperCase: CHARS_LATIN_UPPER_CASE,
	number: CHARS_NUMBER,
	special: CHARS_SPECIAL,
} as const satisfies Record<CharType, unknown>;
/* c8 ignore stop */

export type CharsByType<T extends CharType> = (typeof CHARS_BY_TYPE)[T];
export type CharByType<T extends CharType> = CharsByType<T>[number];

/* c8 ignore start */
export const SCHEMAS_CHARS = {
	latin: SCHEMA_CHAR_LATIN,
	latinLowerCase: SCHEMA_CHAR_LATIN_LOWER_CASE,
	latinUpperCase: SCHEMA_CHAR_LATIN_UPPER_CASE,
	number: SCHEMA_CHAR_NUMBER,
	special: SCHEMA_CHAR_SPECIAL,
} as const satisfies Record<CharType, unknown>;
/* c8 ignore stop */

export function getCharType<C extends Char>(char: C): CharType {
	validateChar(char);

	for (const type of CHAR_TYPES) {
		if (new Set(CHARS_BY_TYPE[type]).has(char)) {
			return type;
		}
	}

	throw new TypeError(`Unrecognized char type for: "${char}"`);
}
