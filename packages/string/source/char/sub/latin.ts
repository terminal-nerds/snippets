import { z } from "zod";

export const CHARS_LATIN_LOWER_CASE = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
] as const;
export type CharLatinLowerCase = (typeof CHARS_LATIN_LOWER_CASE)[number];

export const SCHEMA_CHAR_LATIN_LOWER_CASE = z.enum(CHARS_LATIN_LOWER_CASE);

export function isCharLowerCase(input: string): asserts input is CharLatinLowerCase {
	SCHEMA_CHAR_LATIN_LOWER_CASE.parse(input);
}

export const CHARS_LATIN_UPPER_CASE = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
] as const;
export type CharLatinUpperCase = (typeof CHARS_LATIN_UPPER_CASE)[number];

export const SCHEMA_CHAR_LATIN_UPPER_CASE = z.enum(CHARS_LATIN_UPPER_CASE);

export function isCharUpperCase(input: string): input is CharLatinUpperCase {
	return SCHEMA_CHAR_LATIN_UPPER_CASE.safeParse(input).success;
}

export function validateCharUpperCase(input: string): asserts input is CharLatinUpperCase {
	SCHEMA_CHAR_LATIN_UPPER_CASE.parse(input);
}

/* prettier-ignore */
export const CHARS_LATIN = [
	...CHARS_LATIN_LOWER_CASE,
	...CHARS_LATIN_UPPER_CASE,
] as const;
export type CharLatin = (typeof CHARS_LATIN)[number];

export const SCHEMA_CHAR_LATIN = z.enum(CHARS_LATIN);

export function isCharLatin(input: string): input is CharLatin {
	return SCHEMA_CHAR_LATIN.safeParse(input).success;
}

export function validateCharLatin(input: string): asserts input is CharLatin {
	SCHEMA_CHAR_LATIN.parse(input);
}
