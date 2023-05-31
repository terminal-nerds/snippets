import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, it } from "vitest";
import { ZodError } from "zod";

import { getFibonacciNumber } from "./fibonacci.ts";

const FIBONACCI_NUMBERS = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55] as const;
const INVALID_INPUTS = [0, -1, 1.5] as const;

describe("getFibonacciNumber(number)", () => {
	it(throws(ZodError).on(`invalid number inputs`).samples(INVALID_INPUTS), ({ expect }) => {
		for (const invalid of INVALID_INPUTS) {
			expect(() => getFibonacciNumber(invalid)).toThrowError(ZodError);
		}
	});

	it(returns({ what: "Number", value: "<value>" }).on(`valid inputs - positive integers`), ({ expect }) => {
		for (const [index, expected] of FIBONACCI_NUMBERS.entries()) {
			expect(getFibonacciNumber(index + 1)).toBe(expected);
		}
	});
});
