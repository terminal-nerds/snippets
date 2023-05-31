import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, it } from "vitest";
import { ZodError } from "zod";

import { isNumber } from "../../schema/sub/number.ts";
import { isNumberHappy } from "./happy.ts";

const SAMPLE_NON_NUMBERS = SAMPLE_PRIMITIVES.filter((v) => !isNumber(v));
const HAPPY_NUMBERS = [1, 7, 10, 13, 19, 23, 28, 31, 32, 44, 49, 68, 70, 79, 82, 86, 91, 94, 97, 100] as const;
const UNHAPPY_NUMBERS = [4, 16, 20, 37, 42, 58, 89, 145] as const;

describe("isNumberHappy(number)", () => {
	it(throws(ZodError).on(`non-number values`).samples(SAMPLE_NON_NUMBERS), ({ expect }) => {
		for (const nonNumber of SAMPLE_NON_NUMBERS) {
			// @ts-expect-error testing
			expect(() => isNumberHappy(nonNumber)).toThrowError(ZodError);
		}
	});

	it(returns(false).on(`unhappy numbers`).samples(UNHAPPY_NUMBERS), ({ expect }) => {
		for (const unhappy of UNHAPPY_NUMBERS) {
			expect(isNumberHappy(unhappy)).toBe(false);
		}
	});

	it(returns(true).on(`happy numbers`).samples(HAPPY_NUMBERS), ({ expect }) => {
		for (const happy of HAPPY_NUMBERS) {
			expect(isNumberHappy(happy)).toBe(true);
		}
	});
});
