import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { isArrayEmpty, validateArrayEmpty } from "./empty.ts";

const ARRAY_EMPTY = [] as const;
const ARRAY_NON_EMPTY = ["hello", "terminal nerd"] as const;

describe(`validateEmptyArray(array)`, () => {
	it(throws(ZodError).on(`non-empty array`), () => {
		expect(() => validateArrayEmpty(ARRAY_NON_EMPTY)).toThrowError(ZodError);
	});

	it(returns().on(`empty array`), () => {
		expect(() => validateArrayEmpty(ARRAY_EMPTY)).not.toThrowError(ZodError);
	});
});

describe(`isEmptyArray(array)`, () => {
	it(throws(ZodError).on(`non-array values`).samples(SAMPLE_PRIMITIVES), () => {
		for (const sample of SAMPLE_PRIMITIVES) {
			// @ts-expect-error Testing
			expect(() => validateArrayEmpty(sample)).toThrowError(ZodError);
		}
	});

	it(returns(false).on(`non-empty array`), () => {
		expect(isArrayEmpty(ARRAY_NON_EMPTY)).toBe(false);
	});

	it(returns(true).on(`empty array`), () => {
		expect(isArrayEmpty(ARRAY_EMPTY)).toBe(true);
	});
});
