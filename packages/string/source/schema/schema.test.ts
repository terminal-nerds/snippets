import { ALL_SAMPLES, FALSY_STRINGS, SAMPLE_STRINGS, TRUTHY_STRINGS } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { isString, isStringEmpty, validateString } from "./schema.js";

const EMPTY_STRINGS = FALSY_STRINGS;
const NON_EMPTY_STRINGS = TRUTHY_STRINGS;
const NON_STRING_VALUES = ALL_SAMPLES.filter((v) => typeof v !== "string");

/* eslint-disable @typescript-eslint/no-explicit-any */
function testInvalidInput(method: (input: any, options?: any) => void, options?: any): void {
	it(throws(ZodError).on(`passed non-string input`), () => {
		for (const nonString of NON_STRING_VALUES) {
			expect(() => method(nonString, options)).toThrowError(ZodError);
		}
	});
}

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
	testInvalidInput(validateString);

	it(returns(true).on(`passed string inputs`).samples(SAMPLE_STRINGS), () => {
		for (const value of SAMPLE_STRINGS) {
			expect(() => validateString(value)).not.toThrowError(ZodError);
		}
	});
});

describe("isStringEmpty(input)", () => {
	testInvalidInput(isStringEmpty);

	it(returns(true).on(`passed empty string inputs`).samples(EMPTY_STRINGS), () => {
		for (const emptyString of EMPTY_STRINGS) {
			expect(isStringEmpty(emptyString)).toBe(true);
		}
	});

	it(returns(false).on(`passed empty non-string inputs`).samples(NON_EMPTY_STRINGS), () => {
		for (const nonEmptyString of NON_EMPTY_STRINGS) {
			expect(isStringEmpty(nonEmptyString)).toBe(false);
		}
	});
});
