import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { EMPTY_STRING_VALUES, SAMPLE_INPUT, testInvalidInput } from "../../tests/shared.js";
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

	it(throws(ZodError).on(`input longer than 1 char`).sample(SAMPLE_INPUT), () => {
		expect(() => method(SAMPLE_INPUT, { type: "latin" })).toThrowError(ZodError);
	});

	it(throws(ZodError).on(`empty string input`), () => {
		for (const emptyString of EMPTY_STRING_VALUES) {
			expect(() => method(emptyString, { type: "latin" })).toThrowError(ZodError);
		}
	});
}

function testInvalidCharTypeOption(method: (input: string, options: CharOptions<CharType>) => void): void {
	const options = { type: "wrong" };

	it(throws(ZodError).on(`passed unrecognized char type option`).with(options), () => {
		// @ts-expect-error Testing
		expect(() => method(SAMPLE_INPUT, options)).toThrowError(ZodError);
	});
}

describe("isSingleChar(input)", () => {
	testInvalidInput(isSingleChar);

	it(returns(false).on(`empty string input`), () => {
		expect(isSingleChar("")).toBe(false);
	});

	it(returns(false).on(`input longer than 1 char`).sample(SAMPLE_INPUT), () => {
		expect(isSingleChar(SAMPLE_INPUT)).toBe(false);
	});

	it(returns(true).on(`single chars input`).samples(SINGLE_CHARS), () => {
		for (const char of SINGLE_CHARS) {
			expect(isSingleChar(char)).toBe(true);
		}
	});
});

describe("validateSingleChar(char)", () => {
	testInvalidCharInput(validateSingleChar);

	it(returns({ what: "String", value: "<single char>" }).on(`passed single chars`).samples(SINGLE_CHARS), () => {
		for (const singleChar of SINGLE_CHARS) {
			const validatedChar = validateSingleChar(singleChar);

			expect(validatedChar).toStrictEqual(singleChar);
			expect(validatedChar).toBeTypeOf("string");
		}
	});
});

describe("validateCharType(type)", () => {
	const sample = "wrong";

	it(throws(ZodError).on(`invalid char type`).sample(sample), () => {
		expect(() => validateCharType(sample)).toThrowError(ZodError);
	});

	it(returns({ what: "String", value: "<valid char type>" }).on(`valid char types`).samples(CHAR_TYPES), () => {
		for (const type of CHAR_TYPES) {
			const validatedCharType = validateCharType(type);

			expect(validatedCharType).toBeTypeOf("string");
			expect(validatedCharType).toStrictEqual(type);
		}
	});
});

describe("isValidCharType(type)", () => {
	testInvalidInput(isValidCharType);

	const sampleInvalid = "alien";

	it(returns(false).on(`invalid char type`).sample(sampleInvalid), () => {
		expect(isValidCharType(sampleInvalid)).toBe(false);
	});

	it(returns(true).on(`valid char types`).samples(CHAR_TYPES), () => {
		for (const type of CHAR_TYPES) {
			expect(isValidCharType(type)).toBe(true);
		}
	});
});

describe("getCharType(char, options?)", () => {
	testInvalidCharInput(getCharType);

	const optionsInsentitive = { caseInsensitive: false };
	const optionsSentitive = { caseInsensitive: true };

	it(throws(ZodError).on(`upper cased latin chars`).samples(UPPER_CASED_LATIN_CHARS).with(optionsInsentitive), () => {
		for (const upperCasedLatinChar of UPPER_CASED_LATIN_CHARS) {
			expect(() => getCharType(upperCasedLatinChar, optionsInsentitive)).toThrowError(TypeError);
		}
	});

	it(returns("latin").on(`lower cased latin chars`).samples(LOWER_CASED_LATIN_CHARS).with(optionsSentitive), () => {
		for (const upperCasedLatinChar of LOWER_CASED_LATIN_CHARS) {
			expect(getCharType(upperCasedLatinChar, optionsSentitive)).toStrictEqual("latin");
		}
	});

	it(returns("latin").on(`upper cased latin chars`).samples(UPPER_CASED_LATIN_CHARS).with(optionsSentitive), () => {
		for (const upperCasedLatinChar of UPPER_CASED_LATIN_CHARS) {
			expect(getCharType(upperCasedLatinChar, optionsSentitive)).toStrictEqual("latin");
		}
	});

	it(returns("latin").on(`latin characters`).samples(LATIN_CHARS), () => {
		for (const latinChar of LATIN_CHARS) {
			expect(getCharType(latinChar)).toStrictEqual("latin");
		}
	});

	it(returns("latin").on(`lower cased latin chars`).samples(LOWER_CASED_LATIN_CHARS).with(optionsInsentitive), () => {
		for (const lowerCasedLatinChar of LOWER_CASED_LATIN_CHARS) {
			expect(getCharType(lowerCasedLatinChar, optionsInsentitive)).toStrictEqual("latin");
		}
	});

	it(returns("number").on(`number characters`).samples(NUMBER_CHARS), () => {
		for (const numberChar of NUMBER_CHARS) {
			expect(getCharType(numberChar)).toStrictEqual("number");
		}
	});

	it(returns("special").on(`specials characters`).samples(SPECIAL_CHARS), () => {
		for (const specialChar of SPECIAL_CHARS) {
			expect(getCharType(specialChar)).toStrictEqual("special");
		}
	});
});

describe("isChar(char, options?)", () => {
	testInvalidCharInput(isChar);
	testInvalidCharTypeOption(isChar);

	const latinOptions = { type: "latin" } as const;

	it(returns(false).on(`non-latin chars`).samples(NON_LATIN_CHARS).with(latinOptions), () => {
		for (const char of NON_LATIN_CHARS) {
			expect(isChar(char, latinOptions)).toBe(false);
		}
	});

	it(returns(true).on(`latin chars`).samples(LATIN_CHARS).with(latinOptions), () => {
		for (const char of LATIN_CHARS) {
			expect(isChar(char, latinOptions)).toBe(true);
		}
	});

	const numberOptions = { type: "number" } as const;

	it(returns(false).on(`non-number chars`).samples(NON_NUMBER_CHARS).with(numberOptions), () => {
		for (const char of NON_NUMBER_CHARS) {
			expect(isChar(char, numberOptions)).toBe(false);
		}
	});

	it(returns(true).on(`number chars`).samples(NUMBER_CHARS).with(numberOptions), () => {
		for (const char of NUMBER_CHARS) {
			expect(isChar(char, numberOptions)).toBe(true);
		}
	});

	const specialOptions = { type: "special" } as const;

	it(returns(false).on(`non-special chars`).samples(NON_SPECIAL_CHARS).with(specialOptions), () => {
		for (const char of NON_SPECIAL_CHARS) {
			expect(isChar(char, specialOptions)).toBe(false);
		}
	});

	it(returns(true).on(`special chars`).samples(SPECIAL_CHARS).with(specialOptions), () => {
		for (const char of SPECIAL_CHARS) {
			expect(isChar(char, specialOptions)).toBe(true);
		}
	});
});

describe("hasChars(input, options?)", () => {
	testInvalidStringInput(hasChars);
	testInvalidCharTypeOption(hasChars);

	const latinOptions = { type: "latin" } as const;

	it(returns(false).on(`input without latin chars`).sample(INPUT_WITHOUT_LATIN_CHARS).with(latinOptions), () => {
		expect(hasChars(INPUT_WITHOUT_LATIN_CHARS, latinOptions)).toBe(false);
	});

	it(returns(true).on(`input with latin chars`).sample(INPUT_WITH_ALL_CHARS), () => {
		expect(hasChars(INPUT_WITH_ALL_CHARS, latinOptions)).toBe(true);
	});

	const latinInsentitiveOptions = { ...latinOptions, caseInsensitive: false } as const;

	it(
		returns(false)
			.on(`input with uppercased latin chars`)
			.sample(INPUT_WITH_UPPER_CASED_LATIN_CHARS)
			.with(latinInsentitiveOptions),
		() => {
			expect(hasChars(INPUT_WITH_UPPER_CASED_LATIN_CHARS, latinInsentitiveOptions)).toBe(false);
		},
	);

	it(
		returns(true)
			.on(`input with uppercased latin chars`)
			.sample(INPUT_WITH_UPPER_CASED_LATIN_CHARS)
			.with(latinInsentitiveOptions),
		() => {
			expect(hasChars(INPUT_WITH_UPPER_CASED_LATIN_CHARS, latinInsentitiveOptions)).toBe(false);
		},
	);

	const latinSentitiveOptions = { ...latinOptions, caseInsensitive: true } as const;

	it(returns(true).on(`input with uppercased latin chars`).sample(INPUT_WITH_UPPER_CASED_LATIN_CHARS), () => {
		expect(hasChars(INPUT_WITH_UPPER_CASED_LATIN_CHARS, latinSentitiveOptions)).toBe(true);
	});

	const numberOptions = { type: "number" } as const;

	it(returns(false).on(`input without number chars`).sample(INPUT_WITHOUT_NUMBER_CHARS), () => {
		expect(hasChars(INPUT_WITHOUT_NUMBER_CHARS, numberOptions)).toBe(false);
	});

	it(returns(true).on(`input with number chars`).sample(INPUT_WITH_ALL_CHARS), () => {
		expect(hasChars(INPUT_WITH_ALL_CHARS, numberOptions)).toBe(true);
	});

	const specialOptions = { type: "special" } as const;

	it(returns(false).on(`input without special chars`).sample(INPUT_WITHOUT_SPECIAL_CHARS), () => {
		expect(hasChars(INPUT_WITHOUT_SPECIAL_CHARS, specialOptions)).toBe(false);
	});

	it(returns(true).on(`input with special chars`).sample(INPUT_WITH_ALL_CHARS), () => {
		expect(hasChars(INPUT_WITH_ALL_CHARS, specialOptions)).toBe(true);
	});
});

describe("getChars(input, options?)", () => {
	testInvalidStringInput(getChars);
	testInvalidCharTypeOption(getChars);

	const latinOptions = { type: "latin" } as const;
	/* prettier-ignore */
	const expectedLatinChars = ["X", "E", "H", "O", "t", "e", "r", "m", "i", "n", "a", "l", "n", "e", "r", "d", "s"] as const;

	it(returns(expectedLatinChars).on(`sample input`).sample(SAMPLE_INPUT).with(latinOptions), () => {
		expect(getChars(SAMPLE_INPUT, latinOptions)).toStrictEqual(expectedLatinChars);
	});

	const latinInsentitiveOptions = { type: "latin", caseInsensitive: false } as const;
	const expectedLowerCasedLatinChars = ["t", "e", "r", "m", "i", "n", "a", "l", "n", "e", "r", "d", "s"] as const;

	it(
		returns(expectedLowerCasedLatinChars).on(`sample input`).sample(SAMPLE_INPUT).with(latinInsentitiveOptions),
		() => {
			expect(getChars(SAMPLE_INPUT, latinInsentitiveOptions)).toStrictEqual(expectedLowerCasedLatinChars);
		},
	);

	const numberOptions = { type: "number" } as const;
	const expectedNumberChars = ["9", "1"] as const;

	it(returns(expectedNumberChars).on(`sample input`).sample(SAMPLE_INPUT).with(numberOptions), () => {
		expect(getChars(SAMPLE_INPUT, numberOptions)).toStrictEqual(expectedNumberChars);
	});

	const specialOptions = { type: "special" } as const;
	const expectedSpecialChars = ["@", "-"] as const;

	it(returns(expectedSpecialChars).on(`sample input`).sample(SAMPLE_INPUT).with(specialOptions), () => {
		expect(getChars(SAMPLE_INPUT, specialOptions)).toStrictEqual(expectedSpecialChars);
	});
});
