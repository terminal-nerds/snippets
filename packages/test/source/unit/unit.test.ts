import { describe, expect, it } from "vitest";

import { returns, throws } from "./unit.js";

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
	const expectedBase = `🔙 returns 🔢 'Number' (0)`;

	it(`🔙 returns a string: "${expectedBase}"`, () => {
		expect(`${returns(0)}`).toStrictEqual(expectedBase);
	});

	describe(`returns(value).on(situation)`, () => {
		const situation = `sample situation description`;
		const expectedDescription = `${expectedBase} - on ${situation}`;

		it(`🔙 returns a string: "${expectedDescription}"`, () => {
			expect(returns(0).on(situation)).toStrictEqual(expectedDescription);
		});
	});
});
