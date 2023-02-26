import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { EMPTY_STRING_VALUES, SAMPLE_INPUT, testInvalidInput } from "../../tests/shared.js";
import { stringifyArray } from "../shared.js";
import {
	CHAR_TYPES,
	type CharOptions,
	type CharType,
	getChars,
	getCharType,
	getJoinedChars,
	hasChars,
	isChar,
	isSingleChar,
	isValidCharType,
	LATIN_CHARS,
	LOWER_CASED_LATIN_CHARS,
	NON_LATIN_CHARS,
	NON_NUMBER_CHARS,
	NON_SPECIAL_CHARS,
	NUMBER_CHARS,
	SINGLE_CHARS,
	SPECIAL_CHARS,
	UPPER_CASED_LATIN_CHARS,
	validateCharType,
	validateSingleChar,
} from "./char.js";

const INPUT_WITH_ALL_CHARS = getJoinedChars(SINGLE_CHARS);
const INPUT_WITH_UPPER_CASED_LATIN_CHARS = getJoinedChars(UPPER_CASED_LATIN_CHARS);
const INPUT_WITH_LOWER_CASED_LATIN_CHARS = getJoinedChars(LOWER_CASED_LATIN_CHARS);

const INPUT_WITHOUT_LATIN_CHARS = getJoinedChars(NON_LATIN_CHARS);
const INPUT_WITHOUT_NUMBER_CHARS = getJoinedChars(NON_NUMBER_CHARS);
const INPUT_WITHOUT_SPECIAL_CHARS = getJoinedChars(NON_SPECIAL_CHARS);

function testInvalidStringInput(method: Parameters<typeof testInvalidInput>[0]): void {
	testInvalidInput(method, { type: "latin" });
}

function testInvalidCharInput(method: Parameters<typeof testInvalidInput>[0]): void {
	testInvalidStringInput(method);

	it(`💣 throws 'ZodError' on input longer than 1 char: ${SAMPLE_INPUT}`, () => {
		expect(() => method(SAMPLE_INPUT, { type: "latin" })).toThrowError(ZodError);
	});

	it(`💣 throws 'ZodError' on empty string input`, () => {
		for (const emptyString of EMPTY_STRING_VALUES) {
			expect(() => method(emptyString, { type: "latin" })).toThrowError(ZodError);
		}
	});
}

function testInvalidCharTypeOption(method: (input: string, options: CharOptions<CharType>) => void): void {
	it(`options: { type: "wrong" } - 💣 throws 'TypeError' on passed unrecognized char type option`, () => {
		// @ts-expect-error Testing
		expect(() => method(SAMPLE_INPUT, { type: "wrong" })).toThrowError(ZodError);
	});
}

describe("isSingleChar(input)", () => {
	testInvalidInput(isSingleChar);

	it(`🔴 returns 'false' on empty string input`, () => {
		expect(isSingleChar("")).toBe(false);
	});

	it(`🔴 returns 'false' on input longer than 1 char: "${SAMPLE_INPUT}"`, () => {
		expect(isSingleChar(SAMPLE_INPUT)).toBe(false);
	});

	it(`🟢 returns 'true' on single chars input: ${stringifyArray(SINGLE_CHARS)}`, () => {
		for (const char of SINGLE_CHARS) {
			expect(isSingleChar(char)).toBe(true);
		}
	});
});

describe("validateSingleChar(char)", () => {
	testInvalidCharInput(validateSingleChar);

	it(`🔙 returns a string on passed single chars: ${stringifyArray(SINGLE_CHARS)}`, () => {
		for (const singleChar of SINGLE_CHARS) {
			const validatedChar = validateSingleChar(singleChar);

			expect(validatedChar).toStrictEqual(singleChar);
			expect(validatedChar).toBeTypeOf("string");
		}
	});
});

describe("validateCharType(type)", () => {
	it(`💣 throws 'ZodError' on invalid char type: ${"wrong"}`, () => {
		expect(() => validateCharType("wrong")).toThrowError(ZodError);
	});

	it(`🔙 returns a string on valid char types: ${stringifyArray(CHAR_TYPES)}`, () => {
		for (const type of CHAR_TYPES) {
			const validatedCharType = validateCharType(type);

			expect(validatedCharType).toBeTypeOf("string");
			expect(validatedCharType).toStrictEqual(type);
		}
	});
});

describe("isValidCharType(type)", () => {
	testInvalidInput(isValidCharType);

	it(`🔴 returns 'false' on invalid char type: ${"wrong"}`, () => {
		expect(isValidCharType("wrong")).toBe(false);
	});

	it(`🟢 returns 'true' on valid char types: ${stringifyArray(CHAR_TYPES)}`, () => {
		for (const type of CHAR_TYPES) {
			expect(isValidCharType(type)).toBe(true);
		}
	});
});

describe("getCharType(char, options?)", () => {
	testInvalidCharInput(getCharType);

	it(`options: { caseInsensitive: false } - 💣 throws 'TypeError' on upper cased latin chars: ${stringifyArray(
		UPPER_CASED_LATIN_CHARS,
	)}`, () => {
		for (const upperCasedLatinChar of UPPER_CASED_LATIN_CHARS) {
			expect(() => getCharType(upperCasedLatinChar, { caseInsensitive: false })).toThrowError(TypeError);
		}
	});

	it(`🔙 returns a string 'latin' on latin characters: ${stringifyArray(LATIN_CHARS)}`, () => {
		for (const latinChar of LATIN_CHARS) {
			expect(getCharType(latinChar)).toStrictEqual("latin");
		}
	});

	it(`options: { caseInsensitive: false } - 🔙  returns a string 'latin' on lower cased latin chars: ${stringifyArray(
		LOWER_CASED_LATIN_CHARS,
	)}`, () => {
		for (const lowerCasedLatinChar of LOWER_CASED_LATIN_CHARS) {
			expect(getCharType(lowerCasedLatinChar, { caseInsensitive: false })).toStrictEqual("latin");
		}
	});

	it(`🔙 returns a string 'number' on number characters: ${stringifyArray(NUMBER_CHARS)}`, () => {
		for (const numberChar of NUMBER_CHARS) {
			expect(getCharType(numberChar)).toStrictEqual("number");
		}
	});

	it(`🔙 returns a string 'special' on specials characters: ${stringifyArray(LATIN_CHARS)}`, () => {
		for (const specialChar of SPECIAL_CHARS) {
			expect(getCharType(specialChar)).toStrictEqual("special");
		}
	});
});

describe("isChar(char, options)", () => {
	testInvalidCharInput(isChar);
	testInvalidCharTypeOption(isChar);

	it(`options: { type: "latin" } - 🔴 returns 'false' on non-latin char: ${stringifyArray(NON_LATIN_CHARS)}`, () => {
		for (const char of NON_LATIN_CHARS) {
			expect(isChar(char, { type: "latin" })).toBe(false);
		}
	});

	it(`options: { type: "latin" } - 🟢 returns 'true' on latin char: ${stringifyArray(LATIN_CHARS)}`, () => {
		for (const char of LATIN_CHARS) {
			expect(isChar(char, { type: "latin" })).toBe(true);
		}
	});

	it(`options: { type: "number" } - 🔴 returns 'false' on non-number char: ${stringifyArray(
		NON_NUMBER_CHARS,
	)}`, () => {
		for (const char of NON_NUMBER_CHARS) {
			expect(isChar(char, { type: "number" })).toBe(false);
		}
	});

	it(`options: { type: "number" } - 🟢 returns 'true' on number char: ${stringifyArray(NUMBER_CHARS)}`, () => {
		for (const char of NUMBER_CHARS) {
			expect(isChar(char, { type: "number" })).toBe(true);
		}
	});

	it(`options: { type: "special" } - 🔴 returns 'false' on non-special char: ${stringifyArray(
		NON_SPECIAL_CHARS,
	)}`, () => {
		for (const char of NON_SPECIAL_CHARS) {
			expect(isChar(char, { type: "special" })).toBe(false);
		}
	});

	it(`options: { type: "special" } - 🟢 returns 'true' on special char: ${stringifyArray(SPECIAL_CHARS)}`, () => {
		for (const char of SPECIAL_CHARS) {
			expect(isChar(char, { type: "special" })).toBe(true);
		}
	});
});

describe("hasChars(input, options)", () => {
	testInvalidStringInput(hasChars);
	testInvalidCharTypeOption(hasChars);

	it(`options: { type: "latin" } - 🔴 returns 'false' on input without latin chars: ${INPUT_WITHOUT_LATIN_CHARS}`, () => {
		expect(hasChars(INPUT_WITHOUT_LATIN_CHARS, { type: "latin" })).toBe(false);
	});

	it(`options: { type: "latin" } - 🟢 returns 'true' on input with latin chars: ${INPUT_WITH_ALL_CHARS}`, () => {
		expect(hasChars(INPUT_WITH_ALL_CHARS, { type: "latin" })).toBe(true);
	});

	it(`options: { type: "latin", caseInsensitive: false } - 🔴 returns 'false' on input with uppercased latin chars: ${INPUT_WITH_UPPER_CASED_LATIN_CHARS}`, () => {
		expect(hasChars(INPUT_WITH_UPPER_CASED_LATIN_CHARS, { type: "latin", caseInsensitive: false })).toBe(false);
	});

	it(`options: { type: "latin", caseInsensitive: false } - 🟢 returns 'true' on input with lowercased latin chars: ${INPUT_WITH_LOWER_CASED_LATIN_CHARS}`, () => {
		expect(hasChars(INPUT_WITH_LOWER_CASED_LATIN_CHARS, { type: "latin", caseInsensitive: false })).toBe(true);
	});

	it(`options: { type: "latin", caseInsensitive: true } - 🟢 returns 'true' on input with uppercased latin chars: ${INPUT_WITH_UPPER_CASED_LATIN_CHARS}`, () => {
		expect(hasChars(INPUT_WITH_UPPER_CASED_LATIN_CHARS, { type: "latin", caseInsensitive: true })).toBe(true);
	});

	it(`options: { type: "number" } - 🔴 returns 'false' on input without number chars: ${INPUT_WITHOUT_NUMBER_CHARS}`, () => {
		expect(hasChars(INPUT_WITHOUT_NUMBER_CHARS, { type: "number" })).toBe(false);
	});

	it(`options: { type: "number" } - 🟢 returns 'true' on input with number chars: ${INPUT_WITH_ALL_CHARS}`, () => {
		expect(hasChars(INPUT_WITH_ALL_CHARS, { type: "number" })).toBe(true);
	});

	it(`options: { type: "special" } - 🔴 returns 'false' on input without special chars: ${INPUT_WITHOUT_SPECIAL_CHARS}`, () => {
		expect(hasChars(INPUT_WITHOUT_SPECIAL_CHARS, { type: "special" })).toBe(false);
	});

	it(`options: { type: "special" } - 🟢 returns 'true' on input with special chars: ${INPUT_WITH_ALL_CHARS}`, () => {
		expect(hasChars(INPUT_WITH_ALL_CHARS, { type: "special" })).toBe(true);
	});
});

describe("getChars(input, options)", () => {
	testInvalidStringInput(getChars);
	testInvalidCharTypeOption(getChars);

	/* prettier-ignore */
	const expectedLatinChars = ["X", "E", "H", "O", "t", "e", "r", "m", "i", "n", "a", "l", "n", "e", "r", "d", "s"] as const;

	it(`options: { type: "latin" } - 🔙 returns an array: ${JSON.stringify(
		expectedLatinChars,
	)} - on sample input: ${SAMPLE_INPUT}`, () => {
		expect(getChars(SAMPLE_INPUT, { type: "latin" })).toStrictEqual(expectedLatinChars);
	});

	const expectedLowerCasedLatinChars = ["t", "e", "r", "m", "i", "n", "a", "l", "n", "e", "r", "d", "s"] as const;

	it(`options: { type: "latin", caseInsensitive: false } - 🔙 returns an array: ${JSON.stringify(
		expectedLowerCasedLatinChars,
	)} - on sample input: ${SAMPLE_INPUT}`, () => {
		expect(getChars(SAMPLE_INPUT, { type: "latin", caseInsensitive: false })).toStrictEqual(
			expectedLowerCasedLatinChars,
		);
	});

	const expectedNumberChars = ["9", "1"] as const;

	it(`options: { type: "number" } - 🔙 returns an array: ${JSON.stringify(
		expectedNumberChars,
	)} - on sample input: ${SAMPLE_INPUT}`, () => {
		expect(getChars(SAMPLE_INPUT, { type: "number" })).toStrictEqual(expectedNumberChars);
	});

	const expectedSpecialChars = ["@", "-"] as const;

	it(`options: { type: "special" } - 🔙 returns an array: ${JSON.stringify(
		expectedSpecialChars,
	)} - on sample input: ${SAMPLE_INPUT}`, () => {
		expect(getChars(SAMPLE_INPUT, { type: "special" })).toStrictEqual(expectedSpecialChars);
	});
});
