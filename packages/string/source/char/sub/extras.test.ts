import { ALL_SAMPLES } from "@terminal-nerds/snippets-test/sample";
import { SAMPLE_STRING } from "@terminal-nerds/snippets-test/sample/string";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { CHARS_NON_LATIN, CHARS_NON_NUMBER, CHARS_NON_SPECIAL, getChars, hasChars } from "./extras.ts";
import { getJoinedChars } from "./join.ts";
import type { CharLatin } from "./latin.ts";
import type { CharNumber } from "./number.ts";
import { type Char, CHARS } from "./single.ts";
import type { CharSpecial } from "./special.ts";

const NON_STRING_VALUES = ALL_SAMPLES.filter((v) => typeof v !== "string");

const INPUT_WITH_ALL_CHARS = getJoinedChars<readonly Char[]>(CHARS);
const INPUT_WITHOUT_LATIN_CHARS = getJoinedChars<readonly (CharNumber | CharSpecial)[]>(CHARS_NON_LATIN);
const INPUT_WITHOUT_NUMBER_CHARS = getJoinedChars<readonly (CharLatin | CharSpecial)[]>(CHARS_NON_NUMBER);
const INPUT_WITHOUT_SPECIAL_CHARS = getJoinedChars<readonly (CharLatin | CharNumber)[]>(CHARS_NON_SPECIAL);

describe("hasChars(input, type, options?)", () => {
	it(throws(ZodError).on(`passed non-string input`), () => {
		for (const nonString of NON_STRING_VALUES) {
			// @ts-expect-error Testing
			expect(() => hasChars(nonString, "latin")).toThrowError(ZodError);
		}
	});

	it(returns(false).on(`input without latin chars, with type: "latin"`).sample(INPUT_WITHOUT_LATIN_CHARS), () => {
		expect(hasChars(INPUT_WITHOUT_LATIN_CHARS, "latin")).toBe(false);
	});

	it(returns(true).on(`input with latin chars, with type: "latin"`).sample(INPUT_WITH_ALL_CHARS), () => {
		expect(hasChars(INPUT_WITH_ALL_CHARS, "latin")).toBe(true);
	});

	it(returns(false).on(`input without number chars, with type: "number"`).sample(INPUT_WITHOUT_NUMBER_CHARS), () => {
		expect(hasChars(INPUT_WITHOUT_NUMBER_CHARS, "number")).toBe(false);
	});

	it(returns(true).on(`input with number chars, with type: "number"`).sample(INPUT_WITH_ALL_CHARS), () => {
		expect(hasChars(INPUT_WITH_ALL_CHARS, "number")).toBe(true);
	});

	it(
		returns(false).on(`input without special chars, with type: "special"`).sample(INPUT_WITHOUT_SPECIAL_CHARS),
		() => {
			expect(hasChars(INPUT_WITHOUT_SPECIAL_CHARS, "special")).toBe(false);
		},
	);

	it(returns(true).on(`input with special chars, with type: "special"`).sample(INPUT_WITH_ALL_CHARS), () => {
		expect(hasChars(INPUT_WITH_ALL_CHARS, "special")).toBe(true);
	});
});

describe("getChars(input, type?, options?)", () => {
	it(throws(ZodError).on(`passed non-string input`), () => {
		for (const nonString of NON_STRING_VALUES) {
			// @ts-expect-error Testing
			expect(() => getChars(nonString, "latin")).toThrowError(ZodError);
		}
	});

	/* prettier-ignore */
	const expectedLatinChars = ["t", "e", "r", "m", "i", "n", "a", "l", "n", "e", "r", "d", "s", "D", "E", "V"] as const;

	it(returns(expectedLatinChars).on(`sample input`).sample(SAMPLE_STRING), () => {
		expect(getChars(SAMPLE_STRING)).toStrictEqual([...SAMPLE_STRING]);
	});

	it(returns(expectedLatinChars).on(`sample input, with type: "latin"`).sample(SAMPLE_STRING), () => {
		expect(getChars(SAMPLE_STRING, "latin")).toStrictEqual(expectedLatinChars);
	});

	const expectedNumberChars = ["2", "0", "2", "3"] as const;

	it(returns(expectedNumberChars).on(`sample input, with type: "number"`).sample(SAMPLE_STRING), () => {
		expect(getChars(SAMPLE_STRING, "number")).toStrictEqual(expectedNumberChars);
	});

	const expectedSpecialChars = ["-", ".", "@"] as const;

	it(returns(expectedSpecialChars).on(`sample input, with type: "special"`).sample(SAMPLE_STRING), () => {
		expect(getChars(SAMPLE_STRING, "special")).toStrictEqual(expectedSpecialChars);
	});
});
