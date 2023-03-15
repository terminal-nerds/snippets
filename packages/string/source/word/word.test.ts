import { ALL_SAMPLES } from "@terminal-nerds/snippets-test/sample";
import { FALSY_STRINGS, NUMERIC_STRINGS, SAMPLE_STRING } from "@terminal-nerds/snippets-test/sample/string";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { SINGLE_CHARS } from "../char/char.js";
import { isNumeric, isPalindrome, reverseString } from "./word.js";

const EMPTY_STRING_VALUES = FALSY_STRINGS;
const NON_STRING_VALUES = ALL_SAMPLES.filter((v) => typeof v !== "string");

/* eslint-disable @typescript-eslint/no-explicit-any */
function testInvalidInput(method: (input: any, options?: any) => void, options?: any): void {
	it(throws(ZodError).on(`passed non-string input`), () => {
		for (const nonString of NON_STRING_VALUES) {
			expect(() => method(nonString, options)).toThrowError(ZodError);
		}
	});
}

describe("reverseString(input)", () => {
	testInvalidInput(reverseString);

	const reversedSampleString = `3202@VED.sdren-lanimret`;

	it(returns(reversedSampleString).on(`sample input`).sample(SAMPLE_STRING), () => {
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
	testInvalidInput(isPalindrome);

	it(returns(false).on(`sample input`).sample(SAMPLE_STRING), () => {
		expect(isPalindrome(SAMPLE_STRING)).toBe(false);
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

describe("isNumeric(input)", () => {
	testInvalidInput(isNumeric);

	it(returns(false).on(`input`).sample(SAMPLE_STRING), () => {
		expect(isNumeric(SAMPLE_STRING)).toBe(false);
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

	it(returns(true).on(`sample numeric strings inputs`).samples(NUMERIC_STRINGS), () => {
		for (const numericString of NUMERIC_STRINGS) {
			expect(isNumeric(numericString)).toBe(true);
		}
	});
});
