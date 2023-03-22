import type { Join, Split } from "type-fest";

import { validateString } from "../schema/schema.ts";

export type ReversedTuple<T> = T extends [infer Head, ...infer Rest] ? [...ReversedTuple<Rest>, Head] : [];
export type ReversedString<T extends string> = Join<ReversedTuple<Split<T, "">>, "">;

export function reverseString<T extends string>(input: T): ReversedString<T> {
	validateString(input);

	return [...input].reverse().join("") as ReversedString<T>;
}

/** @see {@link https://en.wikipedia.org/wiki/Palindrome} Palindrome */
export function isPalindrome(input: string): boolean {
	return reverseString(input) === input;
}

export function isNumeric(input: string): boolean {
	validateString(input);

	return Number.isNaN(Number(input)) === false;
}
