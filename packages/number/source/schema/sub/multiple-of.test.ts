import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, it } from "vitest";
import { ZodError } from "zod";

import { isNumberEven, isNumberMultipleOf, isNumberOdd } from "./multiple-of.ts";
import { isNumber } from "./number.ts";

const SAMPLE_NON_NUMBERS = SAMPLE_PRIMITIVES.filter((v) => !isNumber(v));
const SAMPLE_FLOATS = [-2.02, 6.6, -111.111] as const;
const SAMPLE_EVEN_INTEGERS = [0, 2, 4, 6, 8, -2, -4, -6] as const;
const SAMPLE_ODD_INTEGERS = [1, -1, 3, -3, 5, -5, 7, -7] as const;
const SAMPLE_MULTIPLES = [
	[0.5, 0.05],
	[4, 2],
	[-10, -5],
	[100, -10],
] as const;
const SAMPLE_NON_MULTIPLES = [
	[0.5, 0.015],
	[-5, -2],
	[10, 3],
	[100, -11],
] as const;

describe("isNumberEven(integer)", () => {
	it(throws(ZodError).on(`non-numbers`).samples(SAMPLE_NON_NUMBERS), ({ expect }) => {
		for (const nonNumberSample of SAMPLE_NON_NUMBERS) {
			// @ts-expect-error For testing
			expect(() => isNumberEven(nonNumberSample)).toThrowError(ZodError);
		}
	});

	it(throws(ZodError).on(`float numbers`).samples(SAMPLE_FLOATS), ({ expect }) => {
		for (const float of SAMPLE_FLOATS) {
			expect(() => isNumberEven(float)).toThrowError(ZodError);
		}
	});

	it(returns(false).on("odd integers").samples(SAMPLE_ODD_INTEGERS), ({ expect }) => {
		for (const sampleOdd of SAMPLE_ODD_INTEGERS) {
			expect(isNumberEven(sampleOdd)).toBe(false);
		}
	});

	it(returns(true).on("even integers").samples(SAMPLE_EVEN_INTEGERS), ({ expect }) => {
		for (const sampleEven of SAMPLE_EVEN_INTEGERS) {
			expect(isNumberEven(sampleEven)).toBe(true);
		}
	});
});

describe("isNumberOdd(integer)", () => {
	it(throws(ZodError).on(`non-numbers`).samples(SAMPLE_NON_NUMBERS), ({ expect }) => {
		for (const nonNumberSample of SAMPLE_NON_NUMBERS) {
			// @ts-expect-error For testing
			expect(() => isNumberOdd(nonNumberSample)).toThrowError(ZodError);
		}
	});

	it(throws(ZodError).on(`float numbers`).samples(SAMPLE_FLOATS), ({ expect }) => {
		for (const float of SAMPLE_FLOATS) {
			expect(() => isNumberOdd(float)).toThrowError(ZodError);
		}
	});

	it(returns(false).on("even integers").samples(SAMPLE_EVEN_INTEGERS), ({ expect }) => {
		for (const sampleEven of SAMPLE_EVEN_INTEGERS) {
			expect(isNumberOdd(sampleEven)).toBe(false);
		}
	});

	it(returns(true).on("odd integers").samples(SAMPLE_ODD_INTEGERS), ({ expect }) => {
		for (const sampleOdd of SAMPLE_ODD_INTEGERS) {
			expect(isNumberOdd(sampleOdd)).toBe(true);
		}
	});
});

describe("isNumberMultipleOf(value, multiplier)", () => {
	it(throws(ZodError).on("non-number values").samples(SAMPLE_NON_NUMBERS), ({ expect }) => {
		for (const nonNumber of SAMPLE_NON_NUMBERS) {
			// @ts-expect-error For testing
			expect(() => isNumberMultipleOf(nonNumber, 0)).toThrowError(ZodError);
		}
	});

	it(throws(ZodError).on("zero passed as multiplier"), ({ expect }) => {
		expect(() => isNumberMultipleOf(4, 0)).toThrowError(ZodError);
	});

	it(returns(false).on(`multiples`).samples(SAMPLE_NON_MULTIPLES), ({ expect }) => {
		for (const [number, multiplier] of SAMPLE_NON_MULTIPLES) {
			expect(isNumberMultipleOf(number, multiplier)).toBe(false);
		}
	});

	it(returns(true).on(`multiples`).samples(SAMPLE_MULTIPLES), ({ expect }) => {
		for (const [number, multiplier] of SAMPLE_MULTIPLES) {
			expect(isNumberMultipleOf(number, multiplier)).toBe(true);
		}
	});
});
