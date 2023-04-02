import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, it } from "vitest";
import { ZodError } from "zod";

import { type ObjectKey, omitObjectKeys, pickObjectKeys, renameObjectKeys } from "./keys.ts";

const SAMPLE_OBJECT = {
	one: "one",
	two: 2,
	three: "threethree",
	four: "444444",
	five: 5,
} as const;

const SAMPLE_RENAMER = (key: ObjectKey, index: number) => `${index + 1}-${key.toString()}`;

describe("renameObjectKeys(object, renamer)", () => {
	it(throws(ZodError).on(`non-object values`).samples(SAMPLE_PRIMITIVES), ({ expect }) => {
		for (const sample of SAMPLE_PRIMITIVES) {
			// @ts-expect-error For testing
			expect(() => renameObjectKeys(sample)).toThrowError(ZodError);
		}
	});

	const expected = {
		"1-one": "one",
		"2-two": 2,
		"3-three": "threethree",
		"4-four": "444444",
		"5-five": 5,
	} as const;

	it(
		returns(expected)
			.on(`passed sample object`)
			.sample(SAMPLE_OBJECT)
			.and(`with renamer prepending '{index + 1}-'  to each to each key`),
		({ expect }) => {
			expect(renameObjectKeys(SAMPLE_OBJECT, SAMPLE_RENAMER)).toEqual(expected);
		},
	);
});

describe("pickObjectKeys(object, picker)", () => {
	it(throws(ZodError).on(`non-object values`).samples(SAMPLE_PRIMITIVES), ({ expect }) => {
		for (const sample of SAMPLE_PRIMITIVES) {
			// @ts-expect-error For testing
			expect(() => pickObjectKeys(sample)).toThrowError(ZodError);
		}
	});

	const expectedWithFunctionPicker = {
		one: "one",
		three: "threethree",
		five: 5,
	} as const;

	it(
		returns(expectedWithFunctionPicker)
			.on(`passed sample object`)
			.sample(SAMPLE_OBJECT)
			.and(`with picker function selecting keys containing 'e'`),
		({ expect }) => {
			expect(pickObjectKeys(SAMPLE_OBJECT, (key) => typeof key === "string" && key.includes("e"))).toEqual(
				expectedWithFunctionPicker,
			);
		},
	);

	const expectedWithArrayPicker = {
		three: "threethree",
		four: "444444",
	} as const;
	const pickerArray = ["three", "four"] as const;

	it(
		returns(expectedWithArrayPicker)
			.on(`passed sample object`)
			.sample(SAMPLE_OBJECT)
			.and(`with picker array`)
			.sample(pickerArray),
		({ expect }) => {
			expect(pickObjectKeys(SAMPLE_OBJECT, pickerArray)).toEqual(expectedWithArrayPicker);
		},
	);

	const expectedWithSetPicker = {
		one: "one",
		five: 5,
	} as const;
	const pickerSet = new Set(["one", "five"] as const);

	it(
		returns(expectedWithSetPicker)
			.on(`passed sample object`)
			.sample(SAMPLE_OBJECT)
			.and(`with picker set`)
			.sample(pickerSet),
		({ expect }) => {
			expect(pickObjectKeys(SAMPLE_OBJECT, pickerSet)).toEqual(expectedWithSetPicker);
		},
	);
});

describe("omitObjectKeys(object, omitter)", () => {
	it(throws(ZodError).on(`non-object values`).samples(SAMPLE_PRIMITIVES), ({ expect }) => {
		for (const sample of SAMPLE_PRIMITIVES) {
			// @ts-expect-error For testing
			expect(() => omitObjectKeys(sample)).toThrowError(ZodError);
		}
	});

	const expectedWithFunctionOmitter = {
		two: 2,
		four: "444444",
	} as const;

	it(
		returns(expectedWithFunctionOmitter)
			.on(`passed sample object`)
			.sample(SAMPLE_OBJECT)
			.and(`with omitter function omitting keys containing 'e'`),
		({ expect }) => {
			expect(omitObjectKeys(SAMPLE_OBJECT, (key) => typeof key === "string" && !key.includes("e"))).toEqual(
				expectedWithFunctionOmitter,
			);
		},
	);

	const expectedWithArrayOmitter = {
		one: "one",
		two: 2,
		five: 5,
	} as const;
	const omitterArray = ["three", "four"] as const;

	it(
		returns(expectedWithArrayOmitter)
			.on(`passed sample object`)
			.sample(SAMPLE_OBJECT)
			.and(`with omitter array`)
			.sample(omitterArray),
		({ expect }) => {
			expect(omitObjectKeys(SAMPLE_OBJECT, omitterArray)).toEqual(expectedWithArrayOmitter);
		},
	);

	const expectedWithSetOmitter = {
		two: 2,
		three: "threethree",
		four: "444444",
	} as const;
	const omitterSet = new Set(["one", "five"] as const);

	it(
		returns(expectedWithSetOmitter)
			.on(`passed sample object`)
			.sample(SAMPLE_OBJECT)
			.and(`with omitter set`)
			.sample(omitterSet),
		({ expect }) => {
			expect(omitObjectKeys(SAMPLE_OBJECT, omitterSet)).toEqual(expectedWithSetOmitter);
		},
	);
});
