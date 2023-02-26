import { charIn, createRegExp, type RegExpOptions, setRegExpFlags } from "@terminal-nerds/snippets-regexp/creator";
import type { Join, PascalCase } from "type-fest";
import { z } from "zod";

import { validateString } from "../main.js";

export const CHAR_TYPES = ["latin", "number", "special"] as const;
export type CharType = (typeof CHAR_TYPES)[number];

/* prettier-ignore */
export const LOWER_CASED_LATIN_CHARS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "v", "w", "x", "y", "z"] as const;
export type LowerCaseLatinChar = (typeof LOWER_CASED_LATIN_CHARS)[number];

/* prettier-ignore */
export const UPPER_CASED_LATIN_CHARS = LOWER_CASED_LATIN_CHARS.map((char) => char.toUpperCase()) as ReadonlyArray<UpperCaseLatinChar>;
export type UpperCaseLatinChar = PascalCase<LowerCaseLatinChar>;

export const LATIN_CHARS = [...LOWER_CASED_LATIN_CHARS, ...UPPER_CASED_LATIN_CHARS] as const;
export type LatinChar = (typeof LATIN_CHARS)[number];

export const NUMBER_CHARS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;
export type NumberChar = (typeof NUMBER_CHARS)[number];

/* prettier-ignore */
export const SPECIAL_CHARS = ["~", "`", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "\\", "|", "]", "}", "[", "{", '"', "'", ";", ":", "/", "?", ".", ">", ",", "<"] as const;
export type SpecialChar = (typeof SPECIAL_CHARS)[number];

export const SINGLE_CHARS = [...LOWER_CASED_LATIN_CHARS, ...NUMBER_CHARS, ...SPECIAL_CHARS] as const;
export type SingleChar<T extends string = string> = T | LatinChar | NumberChar | SpecialChar;

/* c8 ignore start */
export const CHARS = {
	latin: LOWER_CASED_LATIN_CHARS,
	number: NUMBER_CHARS,
	special: SPECIAL_CHARS,
} as const;
/* c8 ignore stop */
export type Char<T extends CharType> = T extends "latin"
	? LatinChar
	: T extends "number"
	? NumberChar
	: T extends "special"
	? SpecialChar
	: never;

export const NON_LATIN_CHARS = [...NUMBER_CHARS, ...SPECIAL_CHARS] as const;
export const NON_NUMBER_CHARS = [...LATIN_CHARS, ...SPECIAL_CHARS] as const;
export const NON_SPECIAL_CHARS = [...LATIN_CHARS, ...NUMBER_CHARS] as const;

export const CHAR_SCHEMA = z.string().length(1, "This is supposed to be a single char");
export const CHAR_TYPE_SCHEMA = z.enum(CHAR_TYPES);

export const LATIN_CHAR_SCHEMA = z.enum(LOWER_CASED_LATIN_CHARS);
export const NUMBER_CHAR_SCHEMA = z.enum(NUMBER_CHARS);
export const SPECIAL_CHAR_SCHEMA = z.enum(SPECIAL_CHARS);

/* c8 ignore start */
export const CHARS_SCHEMAS = {
	latin: LATIN_CHAR_SCHEMA,
	number: NUMBER_CHAR_SCHEMA,
	special: SPECIAL_CHAR_SCHEMA,
} as const;
/* c8 ignore stop */

export function isSingleChar(input: string): input is SingleChar {
	validateString(input);

	return CHAR_SCHEMA.safeParse(input).success;
}

export function validateSingleChar(char: string): string {
	return CHAR_SCHEMA.parse(char);
}

export function getJoinedChars<T extends readonly string[]>(chars: T) {
	return chars.join("") as Join<T, "">;
}

export interface CharOptions<T extends CharType> extends RegExpOptions {
	type: T;
}

export function validateCharType(type: string): CharType {
	return CHAR_TYPE_SCHEMA.parse(type);
}

export function isValidCharType(type: string): type is CharType {
	validateString(type);

	return CHAR_TYPE_SCHEMA.safeParse(type).success;
}

/* prettier-ignore */
export function getCharType<T extends SingleChar>(
	char: T,
	/** @default `{ caseInsensitive: true }` */
	options: Pick<CharOptions<CharType>, "caseInsensitive"> = {},
): CharType {
	validateSingleChar(char);

	const { caseInsensitive = true } = options;

	for (const type of CHAR_TYPES) {
		if (new Set(CHARS[type]).has(
			// @ts-ignore Irrelevant
			caseInsensitive ? char.toLowerCase() : char)
		) return type;
	}

	throw new TypeError(`Unrecognized char type for: "${char}"`);
}

/* prettier-ignore */
export function isChar<T extends CharType>(
	char: string,
	/** @default `{ caseInsensitive: true }` */
	options: Pick<CharOptions<T>, "type" | "caseInsensitive">,
): char is Char<T> {
	const { type, caseInsensitive = true } = options;

	validateSingleChar(char);
	validateCharType(type);

	return CHARS_SCHEMAS[type].safeParse(type === "latin" && caseInsensitive ? char.toLowerCase() : char).success;
}

/* prettier-ignore */
export function hasChars<T extends CharType>(
	input: string,
	/** @default `{ caseInsensitive: true }` */
	options: CharOptions<T>,
): boolean {
	const { type, ...regExpOptions } = options;

	validateString(input);
	validateCharType(type);

	const joinedChars = getJoinedChars(CHARS[type]);
	const regExp = createRegExp(
		charIn(joinedChars),
		setRegExpFlags({
			caseInsensitive: true,
			...regExpOptions,
		}),
	);

	return regExp.test(input);
}

/* prettier-ignore */
export function getChars<T extends CharType>(
	input: string,
	/** @default `{ caseInsensitive: true, global: true, multiline: true }` */
	options: CharOptions<T>,
): Array<Char<T>> {
	const { type, ...regExpOptions } = options;

	validateString(input);
	validateCharType(type);

	const joinedChars = getJoinedChars(CHARS[type]);
	const regExp = createRegExp(
		charIn(joinedChars),
		setRegExpFlags({
			caseInsensitive: true,
			global: true,
			multiline: true,
			...regExpOptions,
		}),
	);
	const matches = input.matchAll(regExp);
	const results: Array<Char<T>> = [];

	for (const match of matches) results.push(match.at(0) as unknown as Char<T>);

	return results;
}
