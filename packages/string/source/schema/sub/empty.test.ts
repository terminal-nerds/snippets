import { FALSY_STRINGS, TRUTHY_STRINGS } from "@terminal-nerds/snippets-test/sample/string";
import { returns } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";

import { isStringEmpty } from "./empty.ts";

const EMPTY_STRINGS = FALSY_STRINGS;
const NON_EMPTY_STRINGS = TRUTHY_STRINGS;

describe("isStringEmpty(input)", () => {
	it(returns(true).on(`passed empty string inputs`).samples(EMPTY_STRINGS), () => {
		for (const emptyString of EMPTY_STRINGS) {
			expect(isStringEmpty(emptyString)).toBe(true);
		}
	});

	it(returns(false).on(`passed empty non-string inputs`).samples(NON_EMPTY_STRINGS), () => {
		for (const nonEmptyString of NON_EMPTY_STRINGS) {
			expect(isStringEmpty(nonEmptyString)).toBe(false);
		}
	});
});
