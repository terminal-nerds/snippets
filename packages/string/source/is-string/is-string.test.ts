import { describe, expect, it } from "vitest";

import { NON_STRING_VALUES, STRING_VALUES } from "../../tests/shared.js";
import { isString } from "./is-string.js";

describe("isString(value)", () => {
	it("returns `true` for passed string parameters", () => {
		for (const string of STRING_VALUES) {
			expect(isString(string)).toBe(true);
		}
	});

	it("returns `false` for passed non-string parameters", () => {
		for (const nonString of NON_STRING_VALUES) {
			expect(isString(nonString)).toBe(false);
		}
	});
});
