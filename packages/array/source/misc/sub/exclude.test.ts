import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { excludeArrayItems } from "./exclude.ts";

// eslint-disable-next-line sonarjs/no-duplicate-string
const SAMPLE_ARRAY = [1337, "terminal-nerds", "xeho91", "terminal-nerds", true, 0, -1] as const;

describe(`excludeArrayItems(array, items)`, () => {
	it(throws(ZodError).on(`passed array that is not an array`), () => {
		for (const sample of SAMPLE_PRIMITIVES) {
			// @ts-expect-error Testing
			expect(() => excludeArrayItems(sample, [0, -1])).toThrowError(ZodError);
		}
	});

	it(throws(ZodError).on(`passed keys that is not an array`), () => {
		for (const sample of SAMPLE_PRIMITIVES) {
			// @ts-expect-error Testing
			expect(() => excludeArrayItems([1, 2], sample)).toThrowError(ZodError);
		}
	});

	const expected = ["terminal-nerds", "xeho91", "terminal-nerds", true, 0] as const;
	const itemsToExclude = [1337, -1] as const;

	describe(
		returns(expected).on(`sample array`).samples(SAMPLE_ARRAY).and(`items to exclude: [${itemsToExclude}]`),
		() => {
			const excluded = excludeArrayItems(SAMPLE_ARRAY, itemsToExclude);

			it(`results: [${expected}]`, () => {
				expect(excluded).toStrictEqual(expected);
			});

			it(`does not contain excluded items`, () => {
				for (const item of itemsToExclude) {
					expect(excluded).not.toContain(item);
				}
			});
		},
	);
});
