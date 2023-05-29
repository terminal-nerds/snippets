import { FALSY_STRINGS, NUMERIC_STRINGS, SAMPLE_STRING } from "@terminal-nerds/snippets-test/sample/string";
import { returns } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";

import { isStringNumeric } from "./numeric.ts";

const EMPTY_STRING_VALUES = FALSY_STRINGS;

describe("isNumeric(input)", () => {
	it(returns(false).on(`input`).sample(SAMPLE_STRING), () => {
		expect(isStringNumeric(SAMPLE_STRING)).toBe(false);
	});

	it(returns(false).on(`not a number string`).sample("NaN"), () => {
		expect(isStringNumeric("NaN")).toBe(false);
	});

	// eslint-disable-next-line unicorn/no-null
	it(returns(false).on(`nullish string`).sample("null"), () => {
		expect(isStringNumeric("null")).toBe(false);
	});

	it(returns(true).on(`empty string`).sample(""), () => {
		for (const emptyString of EMPTY_STRING_VALUES) {
			expect(isStringNumeric(emptyString)).toBe(true);
		}
	});

	it(returns(true).on(`sample numeric strings inputs`).samples(NUMERIC_STRINGS), () => {
		for (const numericString of NUMERIC_STRINGS) {
			expect(isStringNumeric(numericString)).toBe(true);
		}
	});
});
