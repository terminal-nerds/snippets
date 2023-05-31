import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { isNumberInteger, validateNumberInteger } from "./integer.ts";

const SAMPLE_INTEGERS = [0, -0, Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, 1337] as const;
const SAMPLE_NON_INTEGERS = [-0.1, Number.EPSILON, Math.PI] as const;

describe("validateNumberInteger(value)", () => {
	it(throws(ZodError).on(`non-infinities`).samples(SAMPLE_NON_INTEGERS), () => {
		for (const nonIntegerSample of SAMPLE_NON_INTEGERS) {
			expect(() => validateNumberInteger(nonIntegerSample)).toThrowError(ZodError);
		}
	});

	it(returns().on(`integers`).samples(SAMPLE_INTEGERS), () => {
		for (const infinitySample of SAMPLE_INTEGERS) {
			expect(() => validateNumberInteger(infinitySample)).not.toThrow();
		}
	});
});

describe("isNumberInteger(value)", () => {
	it(returns(false).on(`infinities`).samples(SAMPLE_NON_INTEGERS), () => {
		for (const nonIntegerSample of SAMPLE_NON_INTEGERS) {
			expect(isNumberInteger(nonIntegerSample)).toBe(false);
		}
	});

	it(returns(true).on(`infinities`).samples(SAMPLE_INTEGERS), () => {
		for (const infinitySample of SAMPLE_INTEGERS) {
			expect(isNumberInteger(infinitySample)).toBe(true);
		}
	});
});
