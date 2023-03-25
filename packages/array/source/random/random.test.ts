import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { getRandomItem, getRandomItems } from "./random.ts";

const SAMPLE_ARRAY = [1337, "terminal-nerds", "xeho91", true, 0, -1] as const;

describe("getRandomItem(array)", async () => {
	it(throws(ZodError).on(`non-array values`).samples(SAMPLE_PRIMITIVES), () => {
		for (const sample of SAMPLE_PRIMITIVES) {
			// @ts-expect-error testing
			expect(() => getRandomItem(sample)).rejects.toThrowError(ZodError);
		}
	});

	const randomItem = await getRandomItem(SAMPLE_ARRAY);

	it(returns(randomItem).on(`an array of sample values`).sample(SAMPLE_ARRAY), () => {
		expect(SAMPLE_ARRAY).toContain(randomItem);
	});
});

describe("getRandomItems(array, options)", async () => {
	it(throws(ZodError).on(`passed option 'count' that is not a positive integer`), () => {
		expect(() => getRandomItems(SAMPLE_ARRAY, { count: -1 })).rejects.toThrowError(ZodError);
		expect(() => getRandomItems(SAMPLE_ARRAY, { count: Number.POSITIVE_INFINITY })).rejects.toThrowError(ZodError);
	});

	const count = 3;
	const randomItems = await getRandomItems(SAMPLE_ARRAY, { count });

	it(returns(randomItems).on(`an array of sample values`).sample(SAMPLE_ARRAY), () => {
		expect(randomItems).toHaveLength(count);

		for (const item of randomItems) {
			expect(SAMPLE_ARRAY).toContain(item);
		}
	});
});
