import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, it } from "vitest";
import { ZodError } from "zod";

import { isNumberFloat, validateNumberFloat } from "./float.ts";

const SAMPLE_INTEGER = 1337;
const SAMPLE_FLOAT = 1.234;

describe("validateNumberFloat(value)", () => {
	it(throws(ZodError).on(`sample integer number`).sample(SAMPLE_INTEGER), ({ expect }) => {
		expect(() => validateNumberFloat(SAMPLE_INTEGER)).toThrowError(ZodError);
	});

	it(throws(ZodError).on(`infinity values`).sample(`Infinity`), ({ expect }) => {
		expect(() => validateNumberFloat(Number.NEGATIVE_INFINITY)).toThrowError(ZodError);
		expect(() => validateNumberFloat(Number.POSITIVE_INFINITY)).toThrowError(ZodError);
	});

	it(returns().on(`sample float number`).sample(SAMPLE_FLOAT), ({ expect }) => {
		expect(() => validateNumberFloat(SAMPLE_FLOAT)).not.toThrowError(ZodError);
	});
});

describe("isNumberFloat(value)", () => {
	it(returns(false).on(`sample integer number`).sample(SAMPLE_INTEGER), ({ expect }) => {
		expect(isNumberFloat(SAMPLE_INTEGER)).toBe(false);
	});

	it(returns(false).on(`passed Infinity`).sample(`Infinity`), ({ expect }) => {
		expect(isNumberFloat(Number.NEGATIVE_INFINITY)).toBe(false);
		expect(isNumberFloat(Number.POSITIVE_INFINITY)).toBe(false);
	});

	it(returns(true).on(`sample float number`).sample(SAMPLE_FLOAT), ({ expect }) => {
		expect(isNumberFloat(SAMPLE_FLOAT)).toBe(true);
	});
});
