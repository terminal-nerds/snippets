import { SAMPLE_STRING } from "@terminal-nerds/snippets-test/sample/string";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { CHARS, isChar, validateChar } from "./single.ts";

describe("isChar(input)", () => {
	it(returns(false).on(`empty string input`), () => {
		expect(isChar("")).toBe(false);
	});

	it(returns(false).on(`input longer than 1 char`).sample(SAMPLE_STRING), () => {
		expect(isChar(SAMPLE_STRING)).toBe(false);
	});

	it(returns(true).on(`single chars input`).samples(CHARS), () => {
		for (const char of CHARS) {
			expect(isChar(char)).toBe(true);
		}
	});
});

describe("validateChar(char)", () => {
	it(throws(ZodError).on(`passed non-single char input`), () => {
		expect(() => validateChar(SAMPLE_STRING)).toThrowError(ZodError);
	});

	it(returns().on(`passed single chars`).samples(CHARS), () => {
		for (const singleChar of CHARS) {
			expect(() => validateChar(singleChar)).not.toThrowError();
		}
	});
});
