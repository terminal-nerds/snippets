import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { INTEGER_ARRAY_BITS, INTEGER_ARRAY_TYPES, isIntegerArray, validateIntegerArray } from "./integer.ts";

const SAMPLE_INTEGER_ARRAYS = {
	signed: {
		8: new Int8Array(8),
		16: new Int16Array(16),
		32: new Int32Array(32),
	},
	unsigned: {
		8: new Uint8Array(8),
		16: new Uint16Array(16),
		32: new Uint32Array(32),
	},
} as const;

describe(`validateIntegerArray(value)`, () => {
	for (const type of INTEGER_ARRAY_TYPES) {
		for (const bit of INTEGER_ARRAY_BITS) {
			const options = { type, bit };

			it(throws(ZodError).on(`non-array values`).samples(SAMPLE_PRIMITIVES).with(options), () => {
				for (const sample of SAMPLE_PRIMITIVES) {
					expect(() => validateIntegerArray(sample, options)).toThrowError(ZodError);
				}
			});

			const sample = SAMPLE_INTEGER_ARRAYS[type][bit];

			it(returns().on(`sample ${type} ${bit} integer array`).sample(sample).with(options), () => {
				expect(() => validateIntegerArray(sample, options)).not.toThrowError(ZodError);
			});
		}
	}
});

describe(`isIntegerArray(value)`, () => {
	for (const type of INTEGER_ARRAY_TYPES) {
		for (const bit of INTEGER_ARRAY_BITS) {
			const options = { type, bit };

			it(returns(false).on(`non-array values`).samples(SAMPLE_PRIMITIVES).with(options), () => {
				for (const sample of SAMPLE_PRIMITIVES) {
					expect(isIntegerArray(sample, options)).toBe(false);
				}
			});

			const sample = SAMPLE_INTEGER_ARRAYS[type][bit];

			it(returns(true).on(`sample ${type} ${bit} integer array`).sample(sample).with(options), () => {
				expect(isIntegerArray(sample, options)).toBe(true);
			});
		}
	}
});
