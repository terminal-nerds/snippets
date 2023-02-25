import { caseInsensitive, charIn, createRegExp, global, multiline } from "magic-regexp";

import { LATIN_CHARS, NUMBER_CHARS, SPECIAL_CHARS } from "../char/char.js";
import { validateString } from "../schema/schema.js";

export function hasLatinChars(input: string): boolean {
	validateString(input);

	return createRegExp(charIn(LATIN_CHARS.join("")), [caseInsensitive, global, multiline]).test(input);
}

export function hasNumberChars(input: string): boolean {
	validateString(input);

	return createRegExp(charIn(NUMBER_CHARS.join("")), [global, multiline]).test(input);
}

export function hasSpecialChars(input: string): boolean {
	validateString(input);

	return createRegExp(charIn(SPECIAL_CHARS.join("")), [global, multiline]).test(input);
}

export function reverseString(input: string): string {
	validateString(input);

	return [...input].reverse().join("");
}

/** Palindrome - {@link https://en.wikipedia.org/wiki/Palindrome} */
export function isPalindrome(input: string): boolean {
	return reverseString(input) === input;
}

export function isNumeric(input: string): boolean {
	validateString(input);

	return Number.isNaN(Number(input)) === false;
}
