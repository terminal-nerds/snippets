import { FALSY_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";

import { createMergedConfig } from "./merge.js";

const SAMPLE_CONFIG_1 = {
	array: ["one"],
	object: {
		nestedArray: [1],
		key: 1,
	},
} as const;

const SAMPLE_CONFIG_2 = {
	array: ["two"],
	object: {
		nestedArray: [2],
		key: 2,
	},
} as const;

describe("createMergedConfig(configs)", () => {
	const expected = {
		array: ["one", "two"],
		object: {
			nestedArray: [1, 2],
			key: 2,
		},
	};

	it(returns(expected).on("merging two configs").samples([SAMPLE_CONFIG_1, SAMPLE_CONFIG_2]), () => {
		expect(createMergedConfig([SAMPLE_CONFIG_1, SAMPLE_CONFIG_2])).toStrictEqual(expected);
	});

	it(
		returns(expected)
			.on("merging array of configs, where falsy values are present")
			.samples([SAMPLE_CONFIG_1, ...FALSY_PRIMITIVES, SAMPLE_CONFIG_2]),
		() => {
			expect(createMergedConfig([SAMPLE_CONFIG_1, SAMPLE_CONFIG_2])).toStrictEqual(expected);
		},
	);
});
