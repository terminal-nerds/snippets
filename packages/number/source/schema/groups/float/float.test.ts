import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, it } from "vitest";
import { ZodError } from "zod";

import { isFloatNumber, validateFloatNumber } from "./float.ts";

const SAMPLE_INTEGER = 1337;
const SAMPLE_FLOAT = 1.234;

describe("validateFloatNumber(value)", () => {
	it(throws(ZodError).on(`sample integer number`).sample(SAMPLE_INTEGER), ({ expect }) => {
		expect(() => validateFloatNumber(SAMPLE_INTEGER)).toThrowError(ZodError);
	});

	it(throws(ZodError).on(`infinity values`).sample(`Infinity`), ({ expect }) => {
		expect(() => validateFloatNumber(Number.NEGATIVE_INFINITY)).toThrowError(ZodError);
		expect(() => validateFloatNumber(Number.POSITIVE_INFINITY)).toThrowError(ZodError);
	});

	it(returns().on(`sample float number`).sample(SAMPLE_FLOAT), ({ expect }) => {
		expect(() => validateFloatNumber(SAMPLE_FLOAT)).not.toThrowError(ZodError);
	});
});

describe("isFloatNumber(value)", () => {
	it(returns(false).on(`sample integer number`).sample(SAMPLE_INTEGER), ({ expect }) => {
		expect(isFloatNumber(SAMPLE_INTEGER)).toBe(false);
	});

	it(returns(false).on(`passed Infinity`).sample(`Infinity`), ({ expect }) => {
		expect(isFloatNumber(Number.NEGATIVE_INFINITY)).toBe(false);
		expect(isFloatNumber(Number.POSITIVE_INFINITY)).toBe(false);
	});

	it(returns(true).on(`sample float number`).sample(SAMPLE_FLOAT), ({ expect }) => {
		expect(isFloatNumber(SAMPLE_FLOAT)).toBe(true);
	});
});
