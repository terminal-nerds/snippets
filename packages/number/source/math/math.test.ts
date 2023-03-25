import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { fibonacci } from "./math.ts";

const FIBONACCI_NUMBERS = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55] as const;
const INVALID_INPUTS = [0, -1, 1.5] as const;

describe("fibonacci(number)", () => {
	it(throws(ZodError).on(`invalid number inputs`).samples(INVALID_INPUTS), () => {
		for (const invalid of INVALID_INPUTS) {
			expect(() => fibonacci(invalid)).toThrowError(ZodError);
		}
	});

	it(returns({ what: "Number", value: "<value>" }).on(`valid inputs - positive integers`), () => {
		for (const [index, expected] of FIBONACCI_NUMBERS.entries()) {
			expect(fibonacci(index + 1)).toBe(expected);
		}
	});
});
