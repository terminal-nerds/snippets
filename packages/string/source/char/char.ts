import { z } from "zod";

import { validateString } from "../main.js";

export const CHAR_SCHEMA = z.string().length(1, "This is supposed to be a single char");

export function isSingleChar(input: string): boolean {
	validateString(input);
	return CHAR_SCHEMA.safeParse(input).success;
}

export function validateSingleChar(char: string): string {
	return CHAR_SCHEMA.parse(char);
}

/* prettier-ignore */
export const LATIN_CHARS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "v", "w", "x", "y", "z"] as const;
export type LatinChar = (typeof LATIN_CHARS)[number];
export const LATIN_CHAR_SCHEMA = z.enum(LATIN_CHARS);
export const UPPERCASED_LATIN_CHARS = LATIN_CHARS.map((char) => char.toUpperCase());

export function isLatinChar(char: string): char is LatinChar {
	validateSingleChar(char);

	return LATIN_CHAR_SCHEMA.safeParse(char.toLowerCase()).success;
}
export const NUMBER_CHARS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;
export type NumberChar = (typeof NUMBER_CHARS)[number];
export const NUMBER_CHAR_SCHEMA = z.enum(NUMBER_CHARS);

export function isNumberChar(char: string): char is NumberChar {
	validateSingleChar(char);

	return NUMBER_CHAR_SCHEMA.safeParse(char).success;
}

/* prettier-ignore */
export const SPECIAL_CHARS = ["~", "`", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "\\", "|", "]", "}", "[", "{", '"', "'", ";", ":", "/", "?", ".", ">", ",", "<"] as const;
export type SpecialChar = (typeof SPECIAL_CHARS)[number];
export const SPECIAL_CHAR_SCHEMA = z.enum(SPECIAL_CHARS);

export function isSpecialChar(char: string): char is SpecialChar {
	validateSingleChar(char);

	return SPECIAL_CHAR_SCHEMA.safeParse(char).success;
}

export const NON_LATIN_CHARS = [...NUMBER_CHARS, ...SPECIAL_CHARS];
export const NON_NUMBER_CHARS = [...LATIN_CHARS, ...UPPERCASED_LATIN_CHARS, ...SPECIAL_CHARS];
export const NON_SPECIAL_CHARS = [...LATIN_CHARS, ...UPPERCASED_LATIN_CHARS, ...NUMBER_CHARS];
export const SINGLE_CHARS = [...LATIN_CHARS, ...UPPERCASED_LATIN_CHARS, ...NUMBER_CHARS, ...SPECIAL_CHARS];
