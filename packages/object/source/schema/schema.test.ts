import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, it } from "vitest";
import { ZodError } from "zod";

import { isObject, validateObject } from "./schema.ts";

const VALID_OBJECTS = [{}, { a: 1 }] as const;
const INVALID_OBJECTS = SAMPLE_PRIMITIVES;

describe("validateObject(value)", () => {
	it(throws(ZodError).on("invalid objects").samples(INVALID_OBJECTS), ({ expect }) => {
		for (const object of INVALID_OBJECTS) {
			expect(() => validateObject(object)).toThrowError(ZodError);
		}
	});

	it(returns().on("valid objects").samples(VALID_OBJECTS), ({ expect }) => {
		for (const object of VALID_OBJECTS) {
			expect(() => validateObject(object)).not.toThrowError();
		}
	});
});

describe("isObject(value)", () => {
	it(returns(false).on("invalid objects").samples(INVALID_OBJECTS), ({ expect }) => {
		for (const object of INVALID_OBJECTS) {
			expect(isObject(object)).toBe(false);
		}
	});

	it(returns(true).on("valid objects").samples(VALID_OBJECTS), ({ expect }) => {
		for (const object of VALID_OBJECTS) {
			expect(isObject(object)).toBe(true);
		}
	});
});
