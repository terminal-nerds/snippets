import { returns } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";

import { isInteger } from "../schema/groups/integer/integer.ts";
import { getRandomIntNumber, getRandomNumber } from "./random.ts";

describe(`getRandomIntNumber(options?)`, () => {
	it(returns(1337).on(`a call without passing options`), async () => {
		expect(await getRandomIntNumber()).toBeTypeOf("number");
	});

	it(`every new generated integer number is not same as the previous one (on a max - default - range)`, async () => {
		let cachedRandom = 0;

		for (let index = 0; index < 1000; index++) {
			const newRandom = await getRandomIntNumber();

			expect(isInteger(newRandom)).toBe(true);
			expect(newRandom).not.toEqual(cachedRandom);
			cachedRandom = newRandom;
		}
	});

	it(`returns a random integer number in range of 1-10 with options - min: 1, max: 10`, async () => {
		for (let index = 0; index < 100; index++) {
			const randomNumber = await getRandomIntNumber({ min: 1, max: 10 });

			expect(randomNumber).toBeLessThanOrEqual(10);
			expect(randomNumber).toBeGreaterThanOrEqual(1);
		}
	});
});

describe(`getRandomNumber(options?)`, () => {
	it(returns(1337).on(`a call without passing options`), async () => {
		expect(await getRandomNumber()).toBeTypeOf("number");
	});

	it(`every new generated number is not same as the previous one (on a max - default - range)`, async () => {
		let cachedRandom = 0;

		for (let index = 0; index < 1000; index++) {
			const newRandom = await getRandomNumber();

			expect(newRandom).not.toEqual(cachedRandom);
			cachedRandom = newRandom;
		}
	});

	it(`returns a random number (could be double) in range of 1-10 with options - min: 1, max: 10`, async () => {
		for (let index = 0; index < 100; index++) {
			const randomNumber = await getRandomNumber({ min: 1, max: 10 });

			expect(randomNumber).toBeLessThanOrEqual(10);
			expect(randomNumber).toBeGreaterThanOrEqual(1);
		}
	});
});
