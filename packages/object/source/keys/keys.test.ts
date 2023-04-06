import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, it } from "vitest";
import { ZodError } from "zod";

import { renameObjectKeys } from "./keys.ts";

const SAMPLE_OBJECT = {
	one: "one",
	two: 2,
	three: "threethree",
	four: "444444",
	five: 5,
} as const;

describe("renameObjectKeys(object, renamer)", () => {
	it(throws(ZodError).on(`passed non-object`).samples(SAMPLE_PRIMITIVES), ({ expect }) => {
		for (const sample of SAMPLE_PRIMITIVES) {
			// @ts-ignore Testing
			expect(() => renameObjectKeys(sample, (key) => key)).toThrowError(ZodError);
		}
	});

	it(
		throws(ZodError)
			.on(`passed sample object`)
			.sample(SAMPLE_OBJECT)
			.and(`with renamer returning non-string value`),
		({ expect }) => {
			// @ts-ignore Testing
			expect(() => renameObjectKeys(SAMPLE_OBJECT, () => void 0)).toThrowError(ZodError);
		},
	);

	const expected = {
		one1: "one",
		two2: 2,
		three3: "threethree",
		four4: "444444",
		five5: 5,
	} as const;

	it(
		returns(expected)
			.on(`passed sample object`)
			.sample(SAMPLE_OBJECT)
			.and(`with renamer appending {index + 1} to each key`),
		({ expect }) => {
			expect(renameObjectKeys(SAMPLE_OBJECT, (key, index) => `${key}${index + 1}` as const)).toEqual(expected);
		},
	);
});
