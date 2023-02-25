import { describe, expect, it } from "vitest";

import { EMPTY_STRING_VALUES, SAMPLE_STRING, stringifyArray, testInvalidInput } from "../../tests/shared.js";
import { NON_LATIN_CHARS, NON_NUMBER_CHARS, NON_SPECIAL_CHARS, NUMBER_CHARS, SINGLE_CHARS } from "../char/char.js";
import { hasLatinChars, hasNumberChars, hasSpecialChars, isNumeric, isPalindrome, reverseString } from "./word.js";

describe("hasLatinChars(input)", () => {
	testInvalidInput(hasLatinChars);

	const inputWithoutLatinChars = NON_LATIN_CHARS.join("");

	it(`returns 'false' on input without latin chars: ${inputWithoutLatinChars}`, () => {
		expect(hasLatinChars(inputWithoutLatinChars)).toBe(false);
	});

	const inputWithLatinChars = SINGLE_CHARS.join("");

	it(`returns 'true' on input with latin chars: ${inputWithLatinChars}`, () => {
		expect(hasLatinChars(inputWithLatinChars)).toBe(true);
	});
});

describe("hasNumberChars(input)", () => {
	testInvalidInput(hasNumberChars);

	const inputWithoutNumberChars = NON_NUMBER_CHARS.join("");

	it(`returns 'false' on input without number chars: ${inputWithoutNumberChars}`, () => {
		expect(hasNumberChars(inputWithoutNumberChars)).toBe(false);
	});

	const inputWithNumberChars = SINGLE_CHARS.join("");

	it(`returns 'true' on input with number chars: ${inputWithNumberChars}`, () => {
		expect(hasNumberChars(inputWithNumberChars)).toBe(true);
	});
});

describe("hasSpecialChars(input)", () => {
	testInvalidInput(hasSpecialChars);

	const inputWithoutSpecialChars = NON_SPECIAL_CHARS.join("");

	it(`returns 'false' on input without special chars: ${inputWithoutSpecialChars}`, () => {
		expect(hasSpecialChars(inputWithoutSpecialChars)).toBe(false);
	});

	const inputWithSpecialChars = SINGLE_CHARS.join("");

	it(`returns 'true' on input with special chars: ${inputWithSpecialChars}`, () => {
		expect(hasSpecialChars(inputWithSpecialChars)).toBe(true);
	});
});

describe("reverseString(input)", () => {
	testInvalidInput(hasSpecialChars);

	const reversedSampleString = `sdren-lanimret`;

	it(`returns reversed string from: '${SAMPLE_STRING}' to: '${reversedSampleString}'`, () => {
		expect(reverseString(SAMPLE_STRING)).toStrictEqual(reversedSampleString);
	});
});

/* prettier-ignore */
const PALINDROME_SAMPLES = [
	"terminal-nerdsdren-lanimret",
	"tattarrattat",
	"saippuakivikauppias",
] as const;

describe("isPalindrome(input)", () => {
	testInvalidInput(hasSpecialChars);

	it(`returns 'false' on: '${SAMPLE_STRING}'`, () => {
		expect(isPalindrome(SAMPLE_STRING)).toBe(false);
	});

	it(`returns 'true' on empty string`, () => {
		for (const emptyString of EMPTY_STRING_VALUES) {
			expect(isPalindrome(emptyString)).toBe(true);
		}
	});

	it(`returns 'true' on single characters: ${stringifyArray(SINGLE_CHARS)}`, () => {
		for (const char of SINGLE_CHARS) {
			expect(isPalindrome(char)).toBe(true);
		}
	});

	it(`returns 'true' on sample palindromes: ${stringifyArray(PALINDROME_SAMPLES)}`, () => {
		for (const palindrome of PALINDROME_SAMPLES) {
			expect(isPalindrome(palindrome)).toBe(true);
		}
	});
});

/* prettier-ignore */
const NUMERIC_STRING_SAMPLES = [
	"123",
	"-123",
	"12.3",
	"-12.3",
	" 12.3 ",
	" -12.3 ",
	"0b11111111", // 255
	"0o377", // 255
	"0xFF", // 255
	"10e1000",
	"Infinity",
	"-Infinity",
] as const;

describe("isNumeric(input)", () => {
	testInvalidInput(hasSpecialChars);

	it(`returns 'false' on: '${SAMPLE_STRING}'`, () => {
		expect(isNumeric(SAMPLE_STRING)).toBe(false);
	});

	it(`returns 'false' on: 'NaN'`, () => {
		expect(isNumeric("NaN")).toBe(false);
	});

	it(`returns 'false' on: 'null'`, () => {
		expect(isNumeric("null")).toBe(false);
	});

	it(`returns 'true' on empty string`, () => {
		for (const emptyString of EMPTY_STRING_VALUES) {
			expect(isNumeric(emptyString)).toBe(true);
		}
	});

	it(`returns 'true' on single numbers: ${stringifyArray(NUMBER_CHARS)}`, () => {
		for (const char of NUMBER_CHARS) {
			expect(isNumeric(char)).toBe(true);
		}
	});

	it(`returns 'true' on sample numeric strings: ${stringifyArray(NUMERIC_STRING_SAMPLES)}`, () => {
		for (const numericString of NUMERIC_STRING_SAMPLES) {
			expect(isNumeric(numericString)).toBe(true);
		}
	});
});
