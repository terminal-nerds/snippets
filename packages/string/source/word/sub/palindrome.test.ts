import { ALL_SAMPLES } from "@terminal-nerds/snippets-test/sample";
import { FALSY_STRINGS, SAMPLE_STRING } from "@terminal-nerds/snippets-test/sample/string";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { CHARS } from "../../char/sub/single.ts";
import { isPalindrome } from "./palindrome.ts";

const EMPTY_STRING_VALUES = FALSY_STRINGS;
const NON_STRING_VALUES = ALL_SAMPLES.filter((v) => typeof v !== "string");

/* prettier-ignore */
const PALINDROME_SAMPLES = [
	"terminal-nerdsdren-lanimret",
	"tattarrattat",
	"saippuakivikauppias",
] as const;

describe("isPalindrome(input)", () => {
	it(throws(ZodError).on(`passed non-string input`), () => {
		for (const nonString of NON_STRING_VALUES) {
			// @ts-expect-error Testing
			expect(() => isPalindrome(nonString)).toThrowError(ZodError);
		}
	});

	it(returns(false).on(`sample input`).sample(SAMPLE_STRING), () => {
		expect(isPalindrome(SAMPLE_STRING)).toBe(false);
	});

	it(returns(true).on(`empty string inputs`).samples(EMPTY_STRING_VALUES), () => {
		for (const emptyString of EMPTY_STRING_VALUES) {
			expect(isPalindrome(emptyString)).toBe(true);
		}
	});

	it(returns(true).on(`single characters inputs`).samples(CHARS), () => {
		for (const char of CHARS) {
			expect(isPalindrome(char)).toBe(true);
		}
	});

	it(returns(true).on(`sample palindrome inputs`).sample(PALINDROME_SAMPLES), () => {
		for (const palindrome of PALINDROME_SAMPLES) {
			expect(isPalindrome(palindrome)).toBe(true);
		}
	});
});
