import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { FLOAT_ARRAY_BITS, type FloatArrays, isFloatArray, validateFloatArray } from "./float.ts";

const SAMPLE_FLOAT_ARRAYS: FloatArrays = {
	32: new Float32Array(32),
	64: new Float64Array(64),
};

describe(`validateFloatArray(value)`, () => {
	for (const bit of FLOAT_ARRAY_BITS) {
		const options = { bit };

		it(throws(ZodError).on(`non-array values`).samples(SAMPLE_PRIMITIVES).with(options), () => {
			for (const sample of SAMPLE_PRIMITIVES) {
				expect(() => validateFloatArray(sample, options)).toThrowError(ZodError);
			}
		});

		const sample = SAMPLE_FLOAT_ARRAYS[bit];

		it(returns().on(`sample ${bit} float array`).sample(sample).with(options), () => {
			expect(() => validateFloatArray(sample, options)).not.toThrowError(ZodError);
		});
	}
});

describe(`isFloatArray(value)`, () => {
	for (const bit of FLOAT_ARRAY_BITS) {
		const options = { bit };

		it(returns(false).on(`non-array values`).samples(SAMPLE_PRIMITIVES).with(options), () => {
			for (const sample of SAMPLE_PRIMITIVES) {
				expect(isFloatArray(sample, options)).toBe(false);
			}
		});

		const sample = SAMPLE_FLOAT_ARRAYS[bit];

		it(returns(true).on(`sample ${bit} float array`).sample(sample).with(options), () => {
			expect(isFloatArray(sample, options)).toBe(true);
		});
	}
});
