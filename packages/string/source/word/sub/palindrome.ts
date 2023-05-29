import { reverseString } from "./reverse.ts";

/** @see {@link https://en.wikipedia.org/wiki/Palindrome} Palindrome */
export function isPalindrome(input: string): boolean {
	return reverseString(input) === input;
}
