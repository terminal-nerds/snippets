import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, it } from "vitest";
import { ZodError } from "zod";

import { filterByObjectValues } from "./values.ts";

const SAMPLE_OBJECT = {
	a: 1,
	b: true,
	c: "hello",
	d: false,
	e: "world",
	f: 2,
} as const;

describe(`filterByObjectValues(target, filter)`, () => {
	it(throws(ZodError).on(`non-object values`), ({ expect }) => {
		for (const sample of SAMPLE_PRIMITIVES) {
			// @ts-expect-error For testing
			expect(() => filterByObjectValues(sample, ["hello"])).toThrowError(ZodError);
		}
	});

	const expectedWithFunctionFilter = {
		b: true,
		c: "hello",
		d: false,
		e: "world",
	} as const;

	it(
		returns(expectedWithFunctionFilter)
			.on(`sample object`)
			.sample(SAMPLE_OBJECT)
			.and(`filtering by values which are not numbers - function passed as filter`),
		({ expect }) => {
			expect(filterByObjectValues(SAMPLE_OBJECT, (value) => typeof value !== "number")).toEqual(
				expectedWithFunctionFilter,
			);
		},
	);

	const expectedWithArrayFilter = {
		c: "hello",
		e: "world",
	} as const;
	const arrayFilter = ["hello", "world"] as const;

	it(
		returns(expectedWithArrayFilter)
			.on(`sample object`)
			.sample(SAMPLE_OBJECT)
			.and(`filtering by values which are in the array passed as filter`)
			.sample(arrayFilter),
		({ expect }) => {
			expect(filterByObjectValues(SAMPLE_OBJECT, arrayFilter)).toEqual(expectedWithArrayFilter);
		},
	);

	const expectedWithSetFilter = {
		a: 1,
		f: 2,
	} as const;
	const setFilter = new Set([1, 2] as const);

	it(
		returns(expectedWithSetFilter)
			.on(`sample object`)
			.sample(SAMPLE_OBJECT)
			.and(`filtering by values which are in the set passed as filter`)
			.sample(setFilter),
		({ expect }) => {
			expect(filterByObjectValues(SAMPLE_OBJECT, setFilter)).toEqual(expectedWithSetFilter);
		},
	);
});
