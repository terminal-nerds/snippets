import { charIn, createRegExp, type RegExpOptions, setRegExpFlags } from "@terminal-nerds/snippets-regexp/creator";

import { validateString } from "../../schema/sub/string.ts";
import { getJoinedChars } from "./join.ts";
import { CHARS_LATIN } from "./latin.ts";
import { CHARS_NUMBER } from "./number.ts";
import { type Char } from "./single.ts";
import { CHARS_SPECIAL } from "./special.ts";
import { type CharByType, CHARS_BY_TYPE, type CharType, validateCharType } from "./type.ts";

export const CHARS_NON_LATIN = [...CHARS_NUMBER, ...CHARS_SPECIAL] as const;
export const CHARS_NON_NUMBER = [...CHARS_LATIN, ...CHARS_SPECIAL] as const;
export const CHARS_NON_SPECIAL = [...CHARS_LATIN, ...CHARS_NUMBER] as const;

/* prettier-ignore */
export function hasChars<const I extends string, T extends CharType>(
	input: I,
	type: T,
	options?: RegExpOptions,
): boolean {
	validateString(input);
	validateCharType(type);

	const joinedChars = getJoinedChars<readonly CharByType<T>[]>(CHARS_BY_TYPE[type]);
	const regex = createRegExp(
		charIn(joinedChars),
		setRegExpFlags({
			caseInsensitive: true,
			global: true,
			multiline: true,
			...options,
		}),
	);

	return regex.test(input);
}

export function getChars<T extends CharType>(input: string, type: T, options?: RegExpOptions): CharByType<T>[];
export function getChars(input: string, type?: undefined, options?: RegExpOptions): Char[];
export function getChars<T extends CharType>(input: string, type?: T, options?: RegExpOptions) {
	validateString(input);

	if (type) {
		validateCharType(type);

		const joinedChars = getJoinedChars<ReadonlyArray<CharByType<T>>>(CHARS_BY_TYPE[type]);
		const regExp = createRegExp(
			charIn(joinedChars),
			setRegExpFlags({
				caseInsensitive: true,
				global: true,
				multiline: true,
				...options,
			}),
		);
		const matches = input.matchAll(regExp);
		const results: CharByType<T>[] = [];

		for (const match of matches) results.push(match.at(0) as CharByType<T>);

		return results;
	} else {
		return [...input] as Char[];
	}
}
