import { describe, expect, it } from "vitest";

import {
	EMPTY_STRING_VALUES,
	NON_EMPTY_STRING_VALUES,
	NON_STRING_VALUES,
	STRING_VALUES,
	testInvalidInput,
} from "../../tests/shared.js";
import { stringifyArray } from "../shared.js";
import { isString, isStringEmpty, validateString } from "./schema.js";

describe("isString(input)", () => {
	it(`🟢 returns 'true' for string inputs: ${stringifyArray(STRING_VALUES)}`, () => {
		for (const string of STRING_VALUES) {
			expect(isString(string)).toBe(true);
		}
	});

	it(`🔴 returns 'false' for non-string inputs: ${stringifyArray(NON_STRING_VALUES)}`, () => {
		for (const nonString of NON_STRING_VALUES) {
			expect(isString(nonString)).toBe(false);
		}
	});
});

describe("validateString(input)", () => {
	testInvalidInput(validateString);

	it(`🔙 returns a string value on passed string inputs: ${stringifyArray(STRING_VALUES)}`, () => {
		for (const string of STRING_VALUES) {
			const validated = validateString(string);

			expect(validated).toBe(string);
			expect(validated).toBeTypeOf("string");
		}
	});
});

describe("isStringEmpty(input)", () => {
	testInvalidInput(isStringEmpty);

	it(`🟢 returns 'true' for empty string inputs: ${stringifyArray(EMPTY_STRING_VALUES)}`, () => {
		for (const emptyString of EMPTY_STRING_VALUES) {
			expect(isStringEmpty(emptyString)).toBe(true);
		}
	});

	it(`🔴 returns 'false' for non-empty string inputs: ${stringifyArray(NON_EMPTY_STRING_VALUES)}`, () => {
		for (const nonEmptyString of NON_EMPTY_STRING_VALUES) {
			expect(isStringEmpty(nonEmptyString)).toBe(false);
		}
	});
});
