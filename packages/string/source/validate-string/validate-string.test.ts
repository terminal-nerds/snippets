import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { NON_STRING_VALUES, STRING_VALUES } from "../../tests/shared.js";
import { validateString } from "./validate-string.js";

describe("validateString(value)", () => {
	it("returns a string value on passed string parameters", () => {
		for (const string of STRING_VALUES) {
			const validated = validateString(string);

			expect(validated).toBe(string);
			expect(validated).toBeTypeOf("string");
		}
	});

	it("throws `ZodError` on passed non-string parameters", () => {
		for (const nonString of NON_STRING_VALUES) {
			expect(() => validateString(nonString)).toThrowError(ZodError);
		}
	});
});
