import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { isEmptyArray, validateEmptyArray } from "./empty.ts";

const EMPTY_ARRAY = [] as const;
const NON_EMPTY_ARRAY = ["hello", "terminal nerd"] as const;

describe(`validateEmptyArray(array)`, () => {
	it(throws(ZodError).on(`non-empty array`), () => {
		expect(() => validateEmptyArray(NON_EMPTY_ARRAY)).toThrowError(ZodError);
	});

	it(returns().on(`empty array`), () => {
		expect(() => validateEmptyArray(EMPTY_ARRAY)).not.toThrowError(ZodError);
	});
});

describe(`isEmptyArray(array)`, () => {
	it(throws(ZodError).on(`non-array values`).samples(SAMPLE_PRIMITIVES), () => {
		for (const sample of SAMPLE_PRIMITIVES) {
			// @ts-expect-error Testing
			expect(() => validateEmptyArray(sample)).toThrowError(ZodError);
		}
	});

	it(returns(false).on(`non-empty array`), () => {
		expect(isEmptyArray(NON_EMPTY_ARRAY)).toBe(false);
	});

	it(returns(true).on(`empty array`), () => {
		expect(isEmptyArray(EMPTY_ARRAY)).toBe(true);
	});
});
