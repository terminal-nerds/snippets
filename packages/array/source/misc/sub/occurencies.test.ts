import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, it } from "vitest";
import { ZodError } from "zod";

import { getOccurenciesMap } from "./occurencies.ts";

// eslint-disable-next-line sonarjs/no-duplicate-string
const SAMPLE_ARRAY = [1337, "terminal-nerds", "xeho91", "terminal-nerds", 1337, 1337] as const;

describe(`getOccurenciesMap(array)`, () => {
	it(throws(ZodError).on(`passed parameter that is not an array`), ({ expect }) => {
		for (const sample of SAMPLE_PRIMITIVES) {
			// @ts-expect-error Testing
			expect(() => getOccurenciesMap(sample)).toThrowError(ZodError);
		}
	});

	it(returns(Map).on(`sample array`).sample(SAMPLE_ARRAY), ({ expect }) => {
		expect(getOccurenciesMap(SAMPLE_ARRAY)).toStrictEqual(
			new Map<1337 | "terminal-nerds" | "xeho91", number>([
				[1337, 3],
				["terminal-nerds", 2],
				["xeho91", 1],
			]),
		);
	});
});
