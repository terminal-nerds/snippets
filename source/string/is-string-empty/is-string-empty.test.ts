import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { isStringEmpty } from "./is-string-empty.js";

describe("isStringEmpty(value)", () => {
	it("should return `true` for empty strings", () => {
		expect(isStringEmpty("")).toBe(true);
		expect(isStringEmpty(String())).toBe(true);
		expect(isStringEmpty(String(""))).toBe(true);
	});

	it("should return `false` for non strings", () => {
		const sample = "terminal-nerds";

		expect(isStringEmpty(sample)).toBe(false);
		expect(isStringEmpty(String(sample))).toBe(false);
		expect(isStringEmpty(String(0))).toBe(false);
		expect(isStringEmpty(String(1))).toBe(false);
	});

	it("Should throw `ZodError` on invalid values", () => {
		// @ts-expect-error Testing
		expect(() => isStringEmpty(0)).toThrowError(ZodError);
		// @ts-expect-error Testing
		expect(() => isStringEmpty({})).toThrowError(ZodError);
		// @ts-expect-error Testing
		expect(() => isStringEmpty(true)).toThrowError(ZodError);
		// @ts-expect-error Testing
		expect(() => isStringEmpty(1)).toThrowError(ZodError);
	});
});
