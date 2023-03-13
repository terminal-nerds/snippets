import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { isNonPrimitive, NON_PRIMITIVE_NAMES, validateNonPrimitive } from "./non-primitive.js";

const SAMPLE_NON_PRIMITIVES = {
	function: () => void 0,
	object: {},
} as const;

describe("validateNonPrimitive(value, name)", () => {
	for (const testedNonPrimitiveName of NON_PRIMITIVE_NAMES) {
		const restNames = NON_PRIMITIVE_NAMES.filter((name) => name !== testedNonPrimitiveName);
		const value = SAMPLE_NON_PRIMITIVES[testedNonPrimitiveName];

		it(`throws 'ZodError' - on value: (${String(value)}), and primitive names: ${JSON.stringify(
			restNames,
		)}`, () => {
			for (const name of restNames) {
				expect(() => validateNonPrimitive(value, name)).toThrow(ZodError);
			}
		});

		it(`returns 'undefined' - on value: (${String(
			value,
		)}), and non-primitive name: ${testedNonPrimitiveName}`, () => {
			expect(() => validateNonPrimitive(value, testedNonPrimitiveName)).not.toThrowError();
		});
	}
});

describe("isNonPrimitive(value, name)", () => {
	for (const testedNonPrimitiveName of NON_PRIMITIVE_NAMES) {
		const restNames = NON_PRIMITIVE_NAMES.filter((name) => name !== testedNonPrimitiveName);
		const value = SAMPLE_NON_PRIMITIVES[testedNonPrimitiveName];

		it(`returns 'false' - on value: (${String(value)}), and primitive names: ${JSON.stringify(restNames)}`, () => {
			for (const name of restNames) {
				expect(isNonPrimitive(value, name)).toBe(false);
			}
		});

		it(`returns 'true' - on value: (${String(value)}), and primitive name: ${testedNonPrimitiveName}`, () => {
			expect(isNonPrimitive(value, testedNonPrimitiveName)).toBe(true);
		});
	}
});
