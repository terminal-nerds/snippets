import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, it } from "vitest";
import { ZodError } from "zod";

import { mergeDeepObjects } from "./merge.ts";

const SAMPLE_OBJECT1 = { a: [1] } as const;
const SAMPLE_OBJECT2 = { a: [2, 3], b: false } as const;
const SAMPLE_OBJECT3 = { a: [4, 5], b: true, c: "terminal nerds" } as const;

describe(`deepMergeObjects(objects)`, () => {
	it(throws(ZodError).on(`invalid object values`).samples(SAMPLE_PRIMITIVES), ({ expect }) => {
		// @ts-expect-error Testing
		expect(() => mergeDeepObjects(SAMPLE_PRIMITIVES)).toThrowError(ZodError);
	});

	const expected = { a: [1, 2, 3, 4, 5], b: true, c: "terminal nerds" } as const;

	it(returns(expected).on(`sample objects`), ({ expect }) => {
		expect(mergeDeepObjects([SAMPLE_OBJECT1, SAMPLE_OBJECT2, SAMPLE_OBJECT3])).toEqual(expected);
	});
});
