import { describe, expect, it } from "vitest";

import { VALUE_TYPE_EMOJIS } from "../emoji/emoji.ts";
import { returns, throws } from "./unit.ts";

describe("throws(value)", () => {
	const expectedBase = `💥 throws 📛 'Error'`;

	it(`🔙 returns a string: "${expectedBase}"`, () => {
		expect(`${throws(Error)}`).toStrictEqual(expectedBase);
	});

	describe(`throws(value).on(situation)`, () => {
		const situation = `sample situation description`;
		const expectedDescription = `${expectedBase} - on ${situation}`;

		it(`🔙 returns a string: "${expectedDescription}"`, () => {
			expect(throws(Error).on(situation)).toStrictEqual(expectedDescription);
		});
	});
});

describe("returns(value)", () => {
	const expectedNumberBase = `🔙 returns ${VALUE_TYPE_EMOJIS.number} 'Number' (0)`;

	it(`🔙 returns a string: "${expectedNumberBase}"`, () => {
		expect(`${returns(0)}`).toStrictEqual(expectedNumberBase);
	});

	const expectedStringBase = `🔙 returns ${VALUE_TYPE_EMOJIS.string} 'String' ("")`;

	it(`🔙 returns a string: "${expectedStringBase}"`, () => {
		expect(`${returns("")}`).toStrictEqual(expectedStringBase);
	});

	describe(`returns(value).on(situation)`, () => {
		const situation = `sample situation description`;
		const expectedDescription = `${expectedNumberBase} - on ${situation}`;

		it(`🔙 returns a string: "${expectedDescription}"`, () => {
			expect(returns(0).on(situation)).toStrictEqual(expectedDescription);
		});
	});
});
