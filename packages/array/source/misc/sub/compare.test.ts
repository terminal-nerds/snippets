import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { areArraysEqual, areArraysItemsSame } from "./compare.ts";

/* prettier-ignore */
// eslint-disable-next-line sonarjs/no-duplicate-string
const SAME_ARRAY_1 = [1, 2, 3, 4, "terminal-nerds", 4, 3, 2, 1, "terminal-nerds", [], {}, true, false, new Map(), new Set()] as const;
/* prettier-ignore */
const SAME_ARRAY_2 = [1, 2, 3, 4, "terminal-nerds", 4, 3, 2, 1, "terminal-nerds", [], {}, true, false, new Map(), new Set()] as const;
/* prettier-ignore */
const SAME_ARRAY_DIFF_ORDER = ["terminal-nerds", true, new Map(), 3, 1, 4, 2, [], false, {}, new Set(), "terminal-nerds", 2, 3, 4, 1] as const;
const DIFF_ARRAY = ["terminal-nerds", true, {}, new Set(), "hello", 2, 9, 0, 1] as const;

describe(`areArraysEqual(left, right)`, () => {
	it(throws(ZodError).on(`arguments passed which are not arrays`), () => {
		for (const sample of SAMPLE_PRIMITIVES) {
			// @ts-expect-error Testing
			expect(() => areArraysEqual(sample, SAME_ARRAY_1)).toThrowError(ZodError);
			// @ts-expect-error Testing
			expect(() => areArraysEqual(SAME_ARRAY_1, sample)).toThrowError(ZodError);
		}
	});

	it(returns(false).on(`same arrays keys, but different order`), () => {
		expect(areArraysEqual(SAME_ARRAY_1, SAME_ARRAY_DIFF_ORDER)).toBe(false);
	});

	it(returns(true).on(`same arrays`), () => {
		expect(areArraysEqual(SAME_ARRAY_1, SAME_ARRAY_2)).toBe(true);
	});
});

describe(`areArraysItemsSame(left, right)`, () => {
	it(throws(ZodError).on(`arguments passed which are not arrays`), () => {
		for (const sample of SAMPLE_PRIMITIVES) {
			// @ts-expect-error Testing
			expect(() => areArraysItemsSame(sample, SAME_ARRAY_1)).toThrowError(ZodError);
			// @ts-expect-error Testing
			expect(() => areArraysItemsSame(SAME_ARRAY_1, sample)).toThrowError(ZodError);
		}
	});

	it(returns(false).on(`different arrays, with different keys`), () => {
		expect(areArraysItemsSame(SAME_ARRAY_1, DIFF_ARRAY)).toBe(false);
	});

	it(returns(true).on(`same arrays keys, but different order`), () => {
		expect(areArraysItemsSame(SAME_ARRAY_1, SAME_ARRAY_DIFF_ORDER)).toBe(true);
	});

	it(returns(true).on(`same arrays`), () => {
		expect(areArraysItemsSame(SAME_ARRAY_1, SAME_ARRAY_2)).toBe(true);
	});
});
