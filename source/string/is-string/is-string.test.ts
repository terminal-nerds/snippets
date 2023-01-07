import { describe, expect, it } from "vitest";

import { isString } from "./is-string.js";

describe("isString(value)", () => {
	it("should return `true` for strings", () => {
		const sample = "terminal-nerds" as const;

		expect(isString("")).toBe(true);
		expect(isString(sample)).toBe(true);
		expect(isString(String())).toBe(true);
		expect(isString(String(""))).toBe(true);
		expect(isString(String(sample))).toBe(true);
		expect(isString("10")).toBe(true);
	});

	it("should return `false` for non strings", () => {
		// @ts-expect-error Testing
		expect(isString()).toBe(false);
		expect(isString(true)).toBe(false);
		expect(isString(Boolean())).toBe(false);
		expect(isString({})).toBe(false);
		expect(isString(10)).toBe(false);
	});
});
