import { returns } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import {
	EMPTY_STRING_VALUES,
	NON_EMPTY_STRING_VALUES,
	NON_STRING_VALUES,
	STRING_VALUES,
	testInvalidInput,
} from "../../tests/shared.js";
import { isString, isStringEmpty, validateString } from "./schema.js";

describe("isString(input)", () => {
	it(returns(true).on(`passed string inputs`).samples(STRING_VALUES), () => {
		for (const string of STRING_VALUES) {
			expect(isString(string)).toBe(true);
		}
	});

	it(returns(false).on(`passed non-string inputs`).samples(NON_STRING_VALUES), () => {
		for (const nonString of NON_STRING_VALUES) {
			expect(isString(nonString)).toBe(false);
		}
	});
});

describe("validateString(input)", () => {
	testInvalidInput(validateString);

	it(returns(true).on(`passed string inputs`).samples(STRING_VALUES), () => {
		for (const value of STRING_VALUES) {
			expect(() => validateString(value)).not.toThrowError(ZodError);
		}
	});
});

describe("isStringEmpty(input)", () => {
	testInvalidInput(isStringEmpty);

	it(returns(true).on(`passed empty string inputs`).samples(EMPTY_STRING_VALUES), () => {
		for (const emptyString of EMPTY_STRING_VALUES) {
			expect(isStringEmpty(emptyString)).toBe(true);
		}
	});

	it(returns(false).on(`passed empty non-string inputs`).samples(NON_EMPTY_STRING_VALUES), () => {
		for (const nonEmptyString of NON_EMPTY_STRING_VALUES) {
			expect(isStringEmpty(nonEmptyString)).toBe(false);
		}
	});
});
