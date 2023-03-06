import { returns } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";

import { EMPTY_STRING_VALUES, SAMPLE_INPUT, testInvalidInput } from "../../tests/shared.js";
import { SINGLE_CHARS } from "../char/char.js";
import { isNumeric, isPalindrome, reverseString } from "./word.js";

describe("reverseString(input)", () => {
	testInvalidInput(reverseString);

	const reversedSampleString = `sdren-lanimret@19OHEX`;

	it(returns(reversedSampleString).on(`sample input`).sample(SAMPLE_INPUT), () => {
		expect(reverseString(SAMPLE_INPUT)).toStrictEqual(reversedSampleString);
	});
});

/* prettier-ignore */
const PALINDROME_SAMPLES = [
	"terminal-nerdsdren-lanimret",
	"tattarrattat",
	"saippuakivikauppias",
] as const;

describe("isPalindrome(input)", () => {
	testInvalidInput(isPalindrome);

	it(returns(false).on(`sample input`).sample(SAMPLE_INPUT), () => {
		expect(isPalindrome(SAMPLE_INPUT)).toBe(false);
	});

	it(returns(true).on(`empty string inputs`).samples(EMPTY_STRING_VALUES), () => {
		for (const emptyString of EMPTY_STRING_VALUES) {
			expect(isPalindrome(emptyString)).toBe(true);
		}
	});

	it(returns(true).on(`single characters inputs`).samples(SINGLE_CHARS), () => {
		for (const char of SINGLE_CHARS) {
			expect(isPalindrome(char)).toBe(true);
		}
	});

	it(returns(true).on(`sample palindrome inputs`).sample(PALINDROME_SAMPLES), () => {
		for (const palindrome of PALINDROME_SAMPLES) {
			expect(isPalindrome(palindrome)).toBe(true);
		}
	});
});

/* prettier-ignore */
const NUMERIC_STRING_SAMPLES = [
	"123456789",
	"-123456789",
	"123.456789",
	"-123.456789",
	" 123.456789 ",
	" -123.456789 ",
	"0b11111111", // 255
	"0o377", // 255
	"0xFF", // 255
	"10e1000",
	"Infinity",
	"-Infinity",
] as const;

describe("isNumeric(input)", () => {
	testInvalidInput(isNumeric);

	it(returns(false).on(`input`).sample(SAMPLE_INPUT), () => {
		expect(isNumeric(SAMPLE_INPUT)).toBe(false);
	});

	it(returns(false).on(`not a number string`).sample("NaN"), () => {
		expect(isNumeric("NaN")).toBe(false);
	});

	// eslint-disable-next-line unicorn/no-null
	it(returns(false).on(`nullish string`).sample("null"), () => {
		expect(isNumeric("null")).toBe(false);
	});

	it(returns(true).on(`empty string`).sample(""), () => {
		for (const emptyString of EMPTY_STRING_VALUES) {
			expect(isNumeric(emptyString)).toBe(true);
		}
	});

	it(returns(true).on(`sample numeric strings inputs`).samples(NUMERIC_STRING_SAMPLES), () => {
		for (const numericString of NUMERIC_STRING_SAMPLES) {
			expect(isNumeric(numericString)).toBe(true);
		}
	});
});
