import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { BIGINT_ARRAY_TYPES, type BigIntArrays, isBigIntArray, validateBigIntArray } from "./bigint.ts";

const SAMPLE_BIGINT_ARRAYS: BigIntArrays = {
	// TODO: Needs inspection
	// eslint-disable-next-line compat/compat
	signed: new BigInt64Array(1),
	// eslint-disable-next-line compat/compat
	unsigned: new BigUint64Array(1),
};

describe(`validateBigIntArray(value)`, () => {
	for (const type of BIGINT_ARRAY_TYPES) {
		const options = { type };

		it(throws(ZodError).on(`non-array values`).samples(SAMPLE_PRIMITIVES).with(options), () => {
			for (const sample of SAMPLE_PRIMITIVES) {
				expect(() => validateBigIntArray(sample, options)).toThrowError(ZodError);
			}
		});

		const sample = SAMPLE_BIGINT_ARRAYS[type];

		it(returns().on(`sample ${type} bigint array`).sample(sample).with(options), () => {
			expect(() => validateBigIntArray(sample, options)).not.toThrowError(ZodError);
		});
	}
});

describe(`isBigIntArray(value)`, () => {
	for (const type of BIGINT_ARRAY_TYPES) {
		const options = { type };

		it(returns(false).on(`non-array values`).samples(SAMPLE_PRIMITIVES).with(options), () => {
			for (const sample of SAMPLE_PRIMITIVES) {
				expect(isBigIntArray(sample, options)).toBe(false);
			}
		});

		const sample = SAMPLE_BIGINT_ARRAYS[type];

		it(returns(true).on(`sample ${type} bigint array`).sample(sample).with(options), () => {
			expect(isBigIntArray(sample, options)).toBe(true);
		});
	}
});
