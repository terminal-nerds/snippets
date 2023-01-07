import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { validateString } from "./validate-string.js";

describe("validateString(value)", () => {
	it("Should return a value on string", () => {
		expect(validateString("")).toBe("");
		expect(validateString(String())).toBeTypeOf("string");
	});

	it("Should throw a ZodError a value on non string values", () => {
		expect(() => validateString(0)).toThrowError(ZodError);
		expect(() => validateString([""])).toThrowError(ZodError);
		expect(() => validateString({ string: "" })).toThrowError(ZodError);
		expect(() => validateString(/a/)).toThrowError(ZodError);
	});
});
