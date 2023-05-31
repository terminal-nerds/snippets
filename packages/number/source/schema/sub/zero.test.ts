import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, it } from "vitest";
import { ZodError } from "zod";

import { isZero, validateZero } from "./zero.ts";

// eslint-disable-next-line unicorn/no-zero-fractions
const SAMPLE_ZEROES = [-0, 0, 0.0] as const;
const SAMPLE_NON_ZEROES = [1337, Number.MAX_VALUE, Number.MIN_VALUE] as const;

describe("validateZero(value)", () => {
	it(throws(ZodError).on(`non-zero`).samples(SAMPLE_NON_ZEROES), ({ expect }) => {
		for (const nonZeroSample of SAMPLE_NON_ZEROES) {
			expect(() => validateZero(nonZeroSample)).toThrowError(ZodError);
		}
	});

	it(returns().on(`zero`), ({ expect }) => {
		for (const nan of SAMPLE_ZEROES) {
			expect(() => validateZero(nan)).not.toThrow();
		}
	});
});

describe("isZero(value)", () => {
	it(returns(false).on(`non-zero`).samples(SAMPLE_NON_ZEROES), ({ expect }) => {
		for (const nonZeroSample of SAMPLE_NON_ZEROES) {
			expect(isZero(nonZeroSample)).toBe(false);
		}
	});

	it(returns(true).on(`zero`).samples(SAMPLE_ZEROES), ({ expect }) => {
		for (const infinitySample of SAMPLE_ZEROES) {
			expect(isZero(infinitySample)).toBe(true);
		}
	});
});
