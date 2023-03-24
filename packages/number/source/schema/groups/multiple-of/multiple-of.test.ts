import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { isNumber } from "../number/number.ts";
import { isEven, isMultipleOf, isOdd } from "./multiple-of.ts";

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

describe("isEven(integer)", () => {
	it(throws(ZodError).on(`non-numbers`).samples(SAMPLE_NON_NUMBERS), () => {
		for (const nonNumberSample of SAMPLE_NON_NUMBERS) {
			// @ts-expect-error For testing
			expect(() => isEven(nonNumberSample)).toThrowError(ZodError);
		}
	});

	it(throws(ZodError).on(`float numbers`).samples(SAMPLE_FLOATS), () => {
		for (const float of SAMPLE_FLOATS) {
			expect(() => isEven(float)).toThrowError(ZodError);
		}
	});

	it(returns(false).on("odd integers").samples(SAMPLE_ODD_INTEGERS), () => {
		for (const sampleOdd of SAMPLE_ODD_INTEGERS) {
			expect(isEven(sampleOdd)).toBe(false);
		}
	});

	it(returns(true).on("even integers").samples(SAMPLE_EVEN_INTEGERS), () => {
		for (const sampleEven of SAMPLE_EVEN_INTEGERS) {
			expect(isEven(sampleEven)).toBe(true);
		}
	});
});

describe("isOdd(integer)", () => {
	it(throws(ZodError).on(`non-numbers`).samples(SAMPLE_NON_NUMBERS), () => {
		for (const nonNumberSample of SAMPLE_NON_NUMBERS) {
			// @ts-expect-error For testing
			expect(() => isOdd(nonNumberSample)).toThrowError(ZodError);
		}
	});

	it(throws(ZodError).on(`float numbers`).samples(SAMPLE_FLOATS), () => {
		for (const float of SAMPLE_FLOATS) {
			expect(() => isOdd(float)).toThrowError(ZodError);
		}
	});

	it(returns(false).on("even integers").samples(SAMPLE_EVEN_INTEGERS), () => {
		for (const sampleEven of SAMPLE_EVEN_INTEGERS) {
			expect(isOdd(sampleEven)).toBe(false);
		}
	});

	it(returns(true).on("odd integers").samples(SAMPLE_ODD_INTEGERS), () => {
		for (const sampleOdd of SAMPLE_ODD_INTEGERS) {
			expect(isOdd(sampleOdd)).toBe(true);
		}
	});
});

describe("isMultipleOf(value, multiplier)", () => {
	it(throws(ZodError).on("non-number values").samples(SAMPLE_NON_NUMBERS), () => {
		for (const nonNumber of SAMPLE_NON_NUMBERS) {
			// @ts-expect-error For testing
			expect(() => isMultipleOf(nonNumber, 0)).toThrowError(ZodError);
		}
	});

	it(throws(ZodError).on("zero passed as multiplier"), () => {
		expect(() => isMultipleOf(4, 0)).toThrowError(ZodError);
	});

	it(returns(false).on(`multiples`).samples(SAMPLE_NON_MULTIPLES), () => {
		for (const [number, multiplier] of SAMPLE_NON_MULTIPLES) {
			expect(isMultipleOf(number, multiplier)).toBe(false);
		}
	});

	it(returns(true).on(`multiples`).samples(SAMPLE_MULTIPLES), () => {
		for (const [number, multiplier] of SAMPLE_MULTIPLES) {
			expect(isMultipleOf(number, multiplier)).toBe(true);
		}
	});
});
