import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { isNumberSafe, validateNumberSafe } from "./safe.ts";

// eslint-disable-next-line unicorn/no-zero-fractions
const SAMPLE_SAFE_NUMBERS = [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER] as const;
const SAMPLE_UNSAFE_NUMBERS = [Number.MAX_VALUE, Number.POSITIVE_INFINITY] as const;

describe("validateNumberSafe(value)", () => {
	it(throws(ZodError).on(`unsafe numbers`).samples(SAMPLE_UNSAFE_NUMBERS), () => {
		for (const unsafeNumber of SAMPLE_UNSAFE_NUMBERS) {
			expect(() => validateNumberSafe(unsafeNumber)).toThrowError(ZodError);
		}
	});

	it(returns().on(`safe numbers`).samples(SAMPLE_SAFE_NUMBERS), () => {
		for (const safeNumber of SAMPLE_SAFE_NUMBERS) {
			expect(() => validateNumberSafe(safeNumber)).not.toThrow();
		}
	});
});

describe("isNumberSafe(value)", () => {
	it(returns(false).on(`unsafe numbers`).samples(SAMPLE_UNSAFE_NUMBERS), () => {
		for (const unsafeNumber of SAMPLE_UNSAFE_NUMBERS) {
			expect(isNumberSafe(unsafeNumber)).toBe(false);
		}
	});

	it(returns(true).on(`safe numbers`).samples(SAMPLE_SAFE_NUMBERS), () => {
		for (const safeNumber of SAMPLE_SAFE_NUMBERS) {
			expect(isNumberSafe(safeNumber)).toBe(true);
		}
	});
});
