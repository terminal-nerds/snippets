import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, it } from "vitest";
import { ZodError } from "zod";

import { shuffleArray } from "./shuffle.ts";

const SAMPLE_ARRAY = [1, 2, 3, 4, 5];

describe("shuffleArray(array)", async () => {
	it(throws(ZodError).on(`input which is not an array`).samples(SAMPLE_PRIMITIVES), ({ expect }) => {
		for (const sample of SAMPLE_PRIMITIVES) {
			// @ts-expect-error Testing
			expect(() => shuffleArray(sample)).rejects.toThrowError(ZodError);
		}
	});

	const shuffled = await shuffleArray(SAMPLE_ARRAY);

	it(returns(shuffled).on(`array input`).sample(SAMPLE_ARRAY), ({ expect }) => {
		expect(shuffled).not.toEqual(SAMPLE_ARRAY);
	});

	it(`items are not in the same order: [${shuffled}]`, ({ expect }) => {
		expect(shuffled.sort()).toEqual(SAMPLE_ARRAY.sort());
	});

	it(returns([]).on(`empty array input`), async ({ expect }) => {
		expect(await shuffleArray([])).toEqual([]);
	});
});
