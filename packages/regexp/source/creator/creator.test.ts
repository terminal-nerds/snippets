import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import {
	type Flag,
	isValidRegExpFlag,
	REGEXP_FLAGS,
	type RegExpFlagName,
	type RegExpOptions,
	setRegExpFlags,
	validateRegExpFlag,
} from "./creator.ts";

const INVALID_FLAGS = [..."abcefhjklnoprtvwxz"];
const VALID_FLAGS = [..."isgdmuy"];

// TODO: Move to separate package for array
function stringifyArray(array: Array<unknown> | readonly unknown[]): string {
	return array.map((value) => `"${value}"`).join(", ");
}

describe("validatedRegExpFlag(flag)", () => {
	it(`💣 throws 'ZodError' on invalid RegExp flags: ${stringifyArray(INVALID_FLAGS)}`, () => {
		for (const invalidFlag of INVALID_FLAGS) {
			expect(() => validateRegExpFlag(invalidFlag)).toThrowError(ZodError);
		}
	});

	it(`🔙 returns a string on valid RegExp flags: ${stringifyArray(VALID_FLAGS)}`, () => {
		for (const name in REGEXP_FLAGS) {
			const flag = REGEXP_FLAGS[name as RegExpFlagName];

			expect(validateRegExpFlag(flag)).toStrictEqual(flag);
		}
	});
});

describe("isValidRegExpFlag(flag)", () => {
	it(`🔴 returns 'false' on invalid RegExp flags: ${stringifyArray(INVALID_FLAGS)}`, () => {
		for (const invalidFlag of INVALID_FLAGS) {
			expect(isValidRegExpFlag(invalidFlag)).toBe(false);
		}
	});

	it(`🟢 returns 'true' on valid RegExp flags: ${stringifyArray(VALID_FLAGS)}`, () => {
		for (const flag of VALID_FLAGS) {
			expect(isValidRegExpFlag(flag)).toBe(true);
		}
	});
});

describe("setRegExpFlags(options)", () => {
	it(`options - { finish: true } - 🔙 returns an empty array: [] - on invalid/unrecognized options`, () => {
		// @ts-expect-error Testing
		expect(setRegExpFlags({ finish: true })).toStrictEqual([]);
	});

	for (const name in REGEXP_FLAGS) {
		const flag = REGEXP_FLAGS[name as RegExpFlagName];

		it(`options - { ${name}: true } - 🔙 returns an array: ["${flag}"]`, () => {
			expect(setRegExpFlags({ [name]: true })).toStrictEqual([flag]);
		});
	}

	const flags: Array<Flag> = [];
	const options: RegExpOptions = {};

	for (const name in REGEXP_FLAGS) {
		const flag = REGEXP_FLAGS[name as RegExpFlagName];

		flags.push(flag);
		Object.assign(options, { [name]: true });
	}

	it(`options - ${JSON.stringify(options, undefined, 2)} - 🔙 returns an array: ${JSON.stringify(
		flags,
		undefined,
		1,
	)}`, () => {
		expect(setRegExpFlags(options)).toStrictEqual(flags);
	});
});
