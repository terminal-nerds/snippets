import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { getArrayDifference, getArraysSymmetricDifference } from "./difference.ts";

const SAME_ARRAY = [1, 2, 3, 4, "xeho91", 4, 3, 2, 1, "terminal-nerds", true, false] as const;
const DIFF_ARRAY = ["terminal-nerds", true, "hello", 2, 9, 0, 1] as const;

describe("getArrayDifference(input, ...arrays)", () => {
	it(throws(ZodError).on(`non arrays passed as arguments`), () => {
		for (const sample of SAMPLE_PRIMITIVES) {
			// @ts-expect-error testing
			expect(() => getArrayDifference(sample, [])).toThrowError(ZodError);
			// @ts-expect-error testing
			expect(() => getArrayDifference([], sample)).toThrowError(ZodError);
		}
	});

	const difference = getArrayDifference(SAME_ARRAY, DIFF_ARRAY);
	const expected = [3, 4, "xeho91", 4, 3, false] as const;

	it(returns(expected).on(`input`).sample(SAME_ARRAY).and(`different array`).sample(DIFF_ARRAY), () => {
		expect(difference).toBeInstanceOf(Array);
	});

	it(`returns: [${expected}]`, () => {
		expect(difference).toEqual(expected);
	});
});

describe("getArraysSymmetricSymmetricDifference(input, ...arrays)", () => {
	it(throws(ZodError).on(`non arrays passed as arguments`), () => {
		for (const sample of SAMPLE_PRIMITIVES) {
			// @ts-expect-error testing
			expect(() => getArraysSymmetricDifference(sample, [])).toThrowError(ZodError);
			// @ts-expect-error testing
			expect(() => getArraysSymmetricDifference([], sample)).toThrowError(ZodError);
		}
	});

	const difference = getArraysSymmetricDifference(SAME_ARRAY, DIFF_ARRAY);
	const expected = [3, 4, "xeho91", 4, 3, false, "hello", 9, 0] as const;

	it(returns(expected).on(`input`).sample(SAME_ARRAY).and(`different array`).sample(DIFF_ARRAY), () => {
		expect(difference).toBeInstanceOf(Array);
	});

	it(`returns: [${expected}]`, () => {
		expect(difference).toEqual(expected);
	});
});
