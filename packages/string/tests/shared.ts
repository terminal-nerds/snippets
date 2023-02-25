/* eslint-disable jest/no-export */

import { expect, it } from "vitest";
import { ZodError } from "zod";

export const SAMPLE_STRING = "terminal-nerds";

/* prettier-ignore */
export const EMPTY_STRING_VALUES = [
	"",
	String(),
	String(""),
];

/* prettier-ignore */
export const NON_EMPTY_STRING_VALUES = [
	SAMPLE_STRING,
	String(SAMPLE_STRING),
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

export function stringifyArray(array: Array<unknown> | readonly unknown[]): string {
	return array.map((value) => `"${value}"`).join(", ");
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function testInvalidInput(method: (input: any) => void): void {
	it(`throws 'ZodError' on passed non-string arguments`, () => {
		for (const nonString of NON_STRING_VALUES) {
			expect(() => method(nonString)).toThrowError(ZodError);
		}
	});
}
