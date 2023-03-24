import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { isNumber } from "../schema/groups/number/number.ts";
import { isHappyNumber } from "./misc.ts";

const SAMPLE_NON_NUMBERS = SAMPLE_PRIMITIVES.filter((v) => !isNumber(v));
const HAPPY_NUMBERS = [1, 7, 10, 13, 19, 23, 28, 31, 32, 44, 49, 68, 70, 79, 82, 86, 91, 94, 97, 100] as const;
const UNHAPPY_NUMBERS = [4, 16, 20, 37, 42, 58, 89, 145] as const;

describe("isHappyNumber(number)", () => {
	it(throws(ZodError).on(`non-number values`).samples(SAMPLE_NON_NUMBERS), () => {
		for (const nonNumber of SAMPLE_NON_NUMBERS) {
			// @ts-expect-error testing
			expect(() => isHappyNumber(nonNumber)).toThrowError(ZodError);
		}
	});

	it(returns(false).on(`unhappy numbers`).samples(UNHAPPY_NUMBERS), () => {
		for (const unhappy of UNHAPPY_NUMBERS) {
			expect(isHappyNumber(unhappy)).toBe(false);
		}
	});

	it(returns(true).on(`happy numbers`).samples(HAPPY_NUMBERS), () => {
		for (const happy of HAPPY_NUMBERS) {
			expect(isHappyNumber(happy)).toBe(true);
		}
	});
});
