import { ALL_SAMPLES } from "@terminal-nerds/snippets-test/sample";
import { SAMPLE_STRINGS } from "@terminal-nerds/snippets-test/sample/string";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { isString, validateString } from "./string.ts";

const NON_STRING_VALUES = ALL_SAMPLES.filter((v) => typeof v !== "string");

describe("isString(input)", () => {
	it(returns(false).on(`passed non-string inputs`).samples(NON_STRING_VALUES), () => {
		for (const nonString of NON_STRING_VALUES) {
			expect(isString(nonString)).toBe(false);
		}
	});

	it(returns(true).on(`passed string inputs`).samples(SAMPLE_STRINGS), () => {
		for (const string of SAMPLE_STRINGS) {
			expect(isString(string)).toBe(true);
		}
	});
});

describe("validateString(input)", () => {
	it(throws(ZodError).on(`passed non-string input`), () => {
		for (const nonString of NON_STRING_VALUES) {
			expect(() => validateString(nonString)).toThrowError(ZodError);
		}
	});

	it(returns(true).on(`passed string inputs`).samples(SAMPLE_STRINGS), () => {
		for (const value of SAMPLE_STRINGS) {
			expect(() => validateString(value)).not.toThrowError(ZodError);
		}
	});
});
