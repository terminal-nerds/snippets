import { ALL_SAMPLES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, it } from "vitest";
import { ZodError } from "zod";

import { splitStringByHalf } from "./split.ts";

const NON_STRING_VALUES = ALL_SAMPLES.filter((v) => typeof v !== "string");

describe(`splitStringByHalf(value)`, () => {
	it(throws(ZodError).on(`non-string values`).samples(NON_STRING_VALUES), ({ expect }) => {
		for (const sample of NON_STRING_VALUES) {
			// @ts-expect-error Testing
			expect(() => splitStringByHalf(sample)).toThrowError(ZodError);
		}
	});

	it(returns(Array), ({ expect }) => {
		expect(splitStringByHalf("xeho91")).toStrictEqual(["xeh", "o91"]);
	});

	it(`first value is higher than second on strings, whose length is an odd number`, ({ expect }) => {
		const string = "123456789";
		const [firstHalf, secondHalf] = splitStringByHalf(string);

		expect(firstHalf.length).toBeGreaterThan(secondHalf.length);
		expect(firstHalf).toBe("12345");
		expect(secondHalf).toBe("6789");
	});
});
