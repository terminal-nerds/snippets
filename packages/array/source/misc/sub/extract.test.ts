import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { extractArrayItems } from "./extract.ts";

// eslint-disable-next-line sonarjs/no-duplicate-string
const SAMPLE_ARRAY = [1337, "terminal-nerds", "xeho91", "terminal-nerds", true, 0, -1] as const;

describe(`extractArrayItems(array, items)`, () => {
	it(throws(ZodError).on(`passed array that is not an array`), () => {
		for (const sample of SAMPLE_PRIMITIVES) {
			// @ts-expect-error Testing
			expect(() => extractArrayItems(sample, [1, 2])).toThrowError(ZodError);
		}
	});

	it(throws(ZodError).on(`passed keys that is not an array`), () => {
		for (const sample of SAMPLE_PRIMITIVES) {
			// @ts-expect-error Testing
			expect(() => extractArrayItems([1, 2], sample)).toThrowError(ZodError);
		}
	});

	const expected = ["terminal-nerds", "xeho91", "terminal-nerds", true] as const;
	const itemsToExtract = ["terminal-nerds", "xeho91", true] as const;

	describe(
		returns(expected).on(`sample array`).samples(SAMPLE_ARRAY).and(`items to extract: [${itemsToExtract}]`),
		() => {
			const extracted = extractArrayItems(SAMPLE_ARRAY, itemsToExtract);

			it(`results: [${expected}]`, () => {
				expect(extracted).toStrictEqual(expected);
			});

			it(`contains extracted items`, () => {
				for (const item of itemsToExtract) {
					expect(extracted).toContain(item);
				}
			});
		},
	);
});
