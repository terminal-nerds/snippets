import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { getValueTypeEmoji, VALUE_TYPE_EMOJIS } from "./emoji.js";

describe("getValueTypeEmoji(value)", () => {
	const expected = VALUE_TYPE_EMOJIS.ZodError;

	it(`returns '${expected}' on custom object: ZodError`, () => {
		expect(getValueTypeEmoji(ZodError)).toBe(expected);
	});

	const expectedUnknown = VALUE_TYPE_EMOJIS.UNRECOGNIZED_TYPE_EMOJI;

	class Unknown {}

	it(`returns '${expectedUnknown}' on unrecognized type`, () => {
		expect(getValueTypeEmoji(Unknown)).toBe(expectedUnknown);
	});
});
