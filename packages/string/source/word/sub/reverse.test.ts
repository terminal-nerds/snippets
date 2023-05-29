import { ALL_SAMPLES } from "@terminal-nerds/snippets-test/sample";
import { SAMPLE_STRING } from "@terminal-nerds/snippets-test/sample/string";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { reverseString } from "./reverse.ts";

const NON_STRING_VALUES = ALL_SAMPLES.filter((v) => typeof v !== "string");

describe("reverseString(input)", () => {
	it(throws(ZodError).on(`passed non-string input`), () => {
		for (const nonString of NON_STRING_VALUES) {
			// @ts-expect-error Testing
			expect(() => reverseString(nonString)).toThrowError(ZodError);
		}
	});

	const reversedSampleString = `3202@VED.sdren-lanimret`;

	it(returns(reversedSampleString).on(`sample input`).sample(SAMPLE_STRING), () => {
		expect(reverseString(SAMPLE_STRING)).toStrictEqual(reversedSampleString);
	});
});
