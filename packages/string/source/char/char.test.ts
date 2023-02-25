import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { EMPTY_STRING_VALUES, SAMPLE_STRING, stringifyArray, testInvalidInput } from "../../tests/shared.js";
import {
	hasLatinChars,
	hasNumberChars,
	hasSpecialChars,
	isLatinChar,
	isNumberChar,
	isSingleChar,
	isSpecialChar,
	LATIN_CHARS,
	NUMBER_CHARS,
	SPECIAL_CHARS,
} from "./char.js";

const UPPERCASED_LATIN_CHARS = LATIN_CHARS.map((char) => char.toUpperCase());
const SINGLE_CHARS = [...LATIN_CHARS, ...UPPERCASED_LATIN_CHARS, ...NUMBER_CHARS, ...SPECIAL_CHARS];
const NON_LATIN_CHARS = [...NUMBER_CHARS, ...SPECIAL_CHARS];
const NON_NUMBER_CHARS = [...LATIN_CHARS, ...UPPERCASED_LATIN_CHARS, ...SPECIAL_CHARS];
const NON_SPECIAL_CHARS = [...LATIN_CHARS, ...UPPERCASED_LATIN_CHARS, ...NUMBER_CHARS];

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
});

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
