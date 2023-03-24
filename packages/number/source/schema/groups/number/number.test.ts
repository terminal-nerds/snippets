import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { SAMPLE_NUMBERS as ALL_SAMPLE_NUMBERS } from "@terminal-nerds/snippets-test/sample/number";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { isNumber, validateNumber } from "./number.ts";

const SAMPLE_NON_NUMBERS = SAMPLE_PRIMITIVES.filter((v) => !isNumber(v));
const SAMPLE_NUMBERS = ALL_SAMPLE_NUMBERS.filter((n) => !Number.isNaN(n));

describe("validateNumber(value)", () => {
	it(throws(ZodError).on(`non-numbers`).samples(SAMPLE_NON_NUMBERS), () => {
		for (const nonNumberSample of SAMPLE_NON_NUMBERS) {
			expect(() => validateNumber(nonNumberSample)).toThrowError(ZodError);
		}
	});

	it(returns().on(`numbers`).samples(SAMPLE_NUMBERS), () => {
		for (const numberSample of SAMPLE_NUMBERS) {
			expect(() => validateNumber(numberSample)).not.toThrow();
		}
	});
});

describe("isNumber(value)", () => {
	it(returns(false).on(`non-numbers`).samples(SAMPLE_NON_NUMBERS), () => {
		for (const nonNumberSample of SAMPLE_NON_NUMBERS) {
			expect(isNumber(nonNumberSample)).toBe(false);
		}
	});

	it(returns(true).on(`numbers`).samples(SAMPLE_NUMBERS), () => {
		for (const numberSample of SAMPLE_NUMBERS) {
			expect(isNumber(numberSample)).toBe(true);
		}
	});
});
