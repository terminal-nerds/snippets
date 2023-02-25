import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { EMPTY_STRING_VALUES, SAMPLE_STRING, stringifyArray, testInvalidInput } from "../../tests/shared.js";
import {
	isLatinChar,
	isNumberChar,
	isSingleChar,
	isSpecialChar,
	LATIN_CHARS,
	NON_LATIN_CHARS,
	NON_NUMBER_CHARS,
	NON_SPECIAL_CHARS,
	NUMBER_CHARS,
	SINGLE_CHARS,
	SPECIAL_CHARS,
	UPPERCASED_LATIN_CHARS,
} from "./char.js";

describe("isSingleChar(input)", () => {
	testInvalidInput(isSingleChar);

	it(`returns 'false' on empty string`, () => {
		expect(isSingleChar("")).toBe(false);
	});

	it(`returns 'false' on string longer than 1 char: "${SAMPLE_STRING}"`, () => {
		expect(isSingleChar(SAMPLE_STRING)).toBe(false);
	});

	it(`returns 'true' on single chars: ${stringifyArray(SINGLE_CHARS)}`, () => {
		for (const char of SINGLE_CHARS) {
			expect(isSingleChar(char)).toBe(true);
		}
	});
});

function testNonSingleChars(method: (input: string) => void): void {
	it(`throws 'ZodError' on string longer than 1 char: ${SAMPLE_STRING}`, () => {
		expect(() => method(SAMPLE_STRING)).toThrowError(ZodError);
	});

	it(`throws 'ZodError' on empty string`, () => {
		for (const emptyString of EMPTY_STRING_VALUES) {
			expect(() => method(emptyString)).toThrowError(ZodError);
		}
	});
}

describe("isLatinChar(char)", () => {
	testInvalidInput(isLatinChar);
	testNonSingleChars(isLatinChar);

	it(`returns 'false' on non-latin chars: ${stringifyArray(NON_LATIN_CHARS)}`, () => {
		for (const char of NON_LATIN_CHARS) {
			expect(isLatinChar(char)).toBe(false);
		}
	});

	it(`returns 'true' on latin chars: ${stringifyArray(LATIN_CHARS)}`, () => {
		for (const char of LATIN_CHARS) {
			expect(isLatinChar(char)).toBe(true);
		}
	});

	it(`returns 'true' on uppercased latin chars: ${stringifyArray(UPPERCASED_LATIN_CHARS)}`, () => {
		for (const char of UPPERCASED_LATIN_CHARS) {
			expect(isLatinChar(char)).toBe(true);
		}
	});
});

describe("isNumberChar(char)", () => {
	testInvalidInput(isNumberChar);
	testNonSingleChars(isNumberChar);

	it(`returns 'false' on non-number chars: ${stringifyArray(NON_NUMBER_CHARS)}`, () => {
		for (const char of NON_NUMBER_CHARS) {
			expect(isNumberChar(char)).toBe(false);
		}
	});

	it(`returns 'true' on number chars: ${stringifyArray(NUMBER_CHARS)}`, () => {
		for (const char of NUMBER_CHARS) {
			expect(isNumberChar(char)).toBe(true);
		}
	});
});

describe("isSpecialChar(char)", () => {
	testInvalidInput(isSpecialChar);
	testNonSingleChars(isSpecialChar);

	it(`returns 'false' on non-special chars: ${stringifyArray(NON_SPECIAL_CHARS)}`, () => {
		for (const char of NON_SPECIAL_CHARS) {
			expect(isSpecialChar(char)).toBe(false);
		}
	});

	it(`returns 'true' on special chars: ${stringifyArray(SPECIAL_CHARS)}`, () => {
		for (const char of SPECIAL_CHARS) {
			expect(isSpecialChar(char)).toBe(true);
		}
	});
});
