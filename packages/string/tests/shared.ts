/* eslint-disable jest/no-export */

import { throws } from "@terminal-nerds/snippets-test/unit";
import { expect, it } from "vitest";
import { ZodError } from "zod";

export const SAMPLE_INPUT = "XEHO91@terminal-nerds";

/* prettier-ignore */
export const EMPTY_STRING_VALUES = [
	"",
	String(),
	String(""),
];

/* prettier-ignore */
export const NON_EMPTY_STRING_VALUES = [
	SAMPLE_INPUT,
	String(SAMPLE_INPUT),
	"10",
];

/* prettier-ignore */
export const STRING_VALUES = [
	...EMPTY_STRING_VALUES,
	...NON_EMPTY_STRING_VALUES,
];

/* prettier-ignore */
export const NON_STRING_VALUES = [
	undefined,
	// eslint-disable-next-line unicorn/no-null
	null,
	true,
	Boolean(),
	{},
	[],
	{ string: "" },
	[""],
	10,
	/a/,
	// eslint-disable-next-line prefer-regex-literals
	new RegExp(""),
	Number.POSITIVE_INFINITY,
	Number.NEGATIVE_INFINITY,
	Number.NaN,
];

/* eslint-disable @typescript-eslint/no-explicit-any */
export function testInvalidInput(method: (input: any, options?: any) => void, options?: any): void {
	it(throws(ZodError).on(`passed non-string input`), () => {
		for (const nonString of NON_STRING_VALUES) {
			expect(() => method(nonString, options)).toThrowError(ZodError);
		}
	});
}
