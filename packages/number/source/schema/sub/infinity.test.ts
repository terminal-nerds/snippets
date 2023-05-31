import { SAMPLE_INFINITIES } from "@terminal-nerds/snippets-test/sample/infinity";
import { SAMPLE_NUMBERS } from "@terminal-nerds/snippets-test/sample/number";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { isInfinity, validateInfinity } from "./infinity.ts";

const SAMPLE_NON_INFINITIES = SAMPLE_NUMBERS.filter((n) => Number.isFinite(n));

describe("validateInfinity(value)", () => {
	it(throws(ZodError).on(`non-infinities`).samples(SAMPLE_NON_INFINITIES), () => {
		for (const nonInfinitySample of SAMPLE_NON_INFINITIES) {
			expect(() => validateInfinity(nonInfinitySample)).toThrowError(ZodError);
		}
	});

	it(returns().on(`infinities`).samples(SAMPLE_INFINITIES), () => {
		for (const infinitySample of SAMPLE_INFINITIES) {
			expect(() => validateInfinity(infinitySample)).not.toThrow();
		}
	});
});

describe("isInfinity(value)", () => {
	it(returns(false).on(`non-infinities`).samples(SAMPLE_NON_INFINITIES), () => {
		for (const nonInfinitySample of SAMPLE_NON_INFINITIES) {
			expect(isInfinity(nonInfinitySample)).toBe(false);
		}
	});

	it(returns(true).on(`infinities`).samples(SAMPLE_INFINITIES), () => {
		for (const infinitySample of SAMPLE_INFINITIES) {
			expect(isInfinity(infinitySample)).toBe(true);
		}
	});
});
