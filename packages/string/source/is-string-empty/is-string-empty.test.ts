import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { EMPTY_STRING_VALUES, NON_EMPTY_STRING_VALUES, NON_STRING_VALUES } from "../../tests/shared.js";
import { isStringEmpty } from "./is-string-empty.js";

describe("isStringEmpty(value)", () => {
	it("returns `true` for empty string values", () => {
		for (const emptyString of EMPTY_STRING_VALUES) {
			expect(isStringEmpty(emptyString)).toBe(true);
		}
	});

	it("returns `false` for non-empty string values", () => {
		for (const nonEmptyString of NON_EMPTY_STRING_VALUES) {
			expect(isStringEmpty(nonEmptyString)).toBe(false);
		}
	});

	it("throws `ZodError` on invalid values", () => {
		for (const emptyString of NON_STRING_VALUES) {
			// @ts-expect-error Testing
			expect(() => isStringEmpty(emptyString)).toThrowError(ZodError);
		}
	});
});
