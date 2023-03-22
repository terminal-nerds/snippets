import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { isPrimitive, PRIMITIVE_NAMES, validatePrimitive } from "./primitive.ts";

const SAMPLE_PRIMITIVES = {
	bigint: 1n,
	boolean: true,
	number: 10,
	// eslint-disable-next-line unicorn/no-null
	null: null,
	string: "text",
	symbol: Symbol("sample"),
	undefined: undefined,
} as const;

describe("validatePrimitive(value, name)", () => {
	for (const testedPrimitiveName of PRIMITIVE_NAMES) {
		const restNames = PRIMITIVE_NAMES.filter((name) => name !== testedPrimitiveName);
		const value = SAMPLE_PRIMITIVES[testedPrimitiveName];

		it(`throws 'ZodError' - on value: (${String(value)}), and primitive names: ${JSON.stringify(
			restNames,
		)}`, () => {
			for (const name of restNames) {
				expect(() => validatePrimitive(value, name)).toThrow(ZodError);
			}
		});

		it(`returns 'undefined' - on value: (${String(value)}), and primitive name: ${testedPrimitiveName}`, () => {
			expect(() => validatePrimitive(value, testedPrimitiveName)).not.toThrowError();
		});
	}
});

describe("isPrimitive(value, name)", () => {
	for (const testedPrimitiveName of PRIMITIVE_NAMES) {
		const restNames = PRIMITIVE_NAMES.filter((name) => name !== testedPrimitiveName);
		const value = SAMPLE_PRIMITIVES[testedPrimitiveName];

		it(`returns 'false' - on value: (${String(value)}), and primitive names: ${JSON.stringify(restNames)}`, () => {
			for (const name of restNames) {
				expect(isPrimitive(value, name)).toBe(false);
			}
		});

		it(`returns 'true' - on value: (${String(value)}), and primitive name: ${testedPrimitiveName}`, () => {
			expect(isPrimitive(value, testedPrimitiveName)).toBe(true);
		});
	}
});
