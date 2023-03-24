import { SAMPLE_NANS } from "@terminal-nerds/snippets-test/sample/nan";
import { SAMPLE_NUMBERS } from "@terminal-nerds/snippets-test/sample/number";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { isNaN, validateNaN } from "./nan.ts";

const SAMPLE_NON_NANS = SAMPLE_NUMBERS.filter((n) => !Number.isNaN(n));

describe("validateNaN(value)", () => {
	it(throws(ZodError).on(`non-NaN`).samples(SAMPLE_NON_NANS), () => {
		for (const nonNaNSample of SAMPLE_NON_NANS) {
			expect(() => validateNaN(nonNaNSample)).toThrowError(ZodError);
		}
	});

	it(returns().on(`NaN`), () => {
		for (const nan of SAMPLE_NANS) {
			expect(() => validateNaN(nan)).not.toThrow();
		}
	});
});

describe("isNaN(value)", () => {
	it(returns(false).on(`non-NaN`).samples(SAMPLE_NON_NANS), () => {
		for (const nonNaNSample of SAMPLE_NON_NANS) {
			expect(isNaN(nonNaNSample)).toBe(false);
		}
	});

	it(returns(true).on(`NaN`).samples(SAMPLE_NANS), () => {
		for (const infinitySample of SAMPLE_NANS) {
			expect(isNaN(infinitySample)).toBe(true);
		}
	});
});
