import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { isNumber } from "../schema/groups/number/number.ts";
import { roundDownNumber, roundUpNumber } from "./round.ts";

const SAMPLE_NON_NUMBERS = SAMPLE_PRIMITIVES.filter((v) => !isNumber(v));
const SAMPLE_FLOAT_NUMBERS = [1.234_567_89, -9.876_543_21, 0.005, -100.123_456_789] as const;

describe(`roundUpNumber(value, options?)`, () => {
	it(throws(ZodError).on(`values which is not a number`), () => {
		for (const value of SAMPLE_NON_NUMBERS) {
			// @ts-expect-error Testing
			expect(() => roundUpNumber(value)).toThrowError(ZodError);
		}
	});

	const expectedDoubles = [1.23, -9.88, 0.01, -100.12] as const;

	for (const [index, sampleFloat] of SAMPLE_FLOAT_NUMBERS.entries()) {
		it(returns(expectedDoubles.at(index)).on(`sample float number`).sample(sampleFloat), () => {
			expect(roundUpNumber(sampleFloat)).toEqual(expectedDoubles.at(index));
		});
	}

	const expectedToThreeDecimals = [1.235, -9.877, 0.005, -100.123] as const;

	for (const [index, sampleFloat] of SAMPLE_FLOAT_NUMBERS.entries()) {
		it(
			returns(expectedToThreeDecimals.at(index))
				.on(`sample float number`)
				.sample(sampleFloat)
				.and(`decimals set to: 3`),
			() => {
				expect(roundUpNumber(sampleFloat, { decimals: 3 })).toEqual(expectedToThreeDecimals.at(index));
			},
		);
	}
});

describe(`roundDownNumber(value, options?)`, () => {
	it(throws(ZodError).on(`values which is not a number`), () => {
		for (const value of SAMPLE_NON_NUMBERS) {
			// @ts-expect-error Testing
			expect(() => roundDownNumber(value)).toThrowError(ZodError);
		}
	});

	const expectedDoubles = [1.23, -9.88, 0, -100.13] as const;

	for (const [index, sampleFloat] of SAMPLE_FLOAT_NUMBERS.entries()) {
		it(returns(expectedDoubles.at(index)).on(`sample float number`).sample(sampleFloat), () => {
			expect(roundDownNumber(sampleFloat)).toEqual(expectedDoubles.at(index));
		});
	}

	const expectedToThreeDecimals = [1.234, -9.877, 0.005, -100.124] as const;

	for (const [index, sampleFloat] of SAMPLE_FLOAT_NUMBERS.entries()) {
		it(
			returns(expectedToThreeDecimals.at(index))
				.on(`sample float number`)
				.sample(sampleFloat)
				.and(`decimals set to: 3`),
			() => {
				expect(roundDownNumber(sampleFloat, { decimals: 3 })).toEqual(expectedToThreeDecimals.at(index));
			},
		);
	}
});
