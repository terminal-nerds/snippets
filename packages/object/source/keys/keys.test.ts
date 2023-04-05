import { returns } from "@terminal-nerds/snippets-test/unit";
import { describe, it } from "vitest";

import { renameObjectKeys } from "./keys.ts";

const SAMPLE_OBJECT = {
	1: "one",
	two: 2,
	3: "threethree",
	four: "444444",
	5: 5,
} as const;

describe("renameObjectKeys(object, renamer)", () => {
	const expected = {
		"11": "one",
		"two1": 2,
		"31": "threethree",
		"four1": "444444",
		"51": 5,
	} as const;

	it(
		returns(expected).on(`passed sample object`).sample(SAMPLE_OBJECT).and(`with renamer appending 1 to each key`),
		({ expect }) => {
			expect(renameObjectKeys(SAMPLE_OBJECT, (key) => `${key}1` as const)).toEqual(expected);
		},
	);
});
