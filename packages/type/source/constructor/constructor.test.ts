import { describe, expect, it } from "vitest";

import { getConstructorName } from "./constructor.ts";

describe("getConstructorName(value)", () => {
	it(`returns 'null' on 'null'`, () => {
		// eslint-disable-next-line unicorn/no-null
		expect(getConstructorName(null)).toBe("null");
	});

	it(`returns 'undefined' on 'undefined'`, () => {
		// eslint-disable-next-line unicorn/no-useless-undefined
		expect(getConstructorName(undefined)).toBe("undefined");
	});

	it(`returns 'Array' on an array sample: []`, () => {
		expect(getConstructorName([])).toStrictEqual("Array");
	});

	it(`returns 'Object' on an object sample: {}`, () => {
		expect(getConstructorName({})).toStrictEqual("Object");
	});

	const sampleString = "terminal-nerds";

	it(`returns 'String' .on a string sample: "${sampleString}"`, () => {
		expect(getConstructorName("string")).toStrictEqual("String");
	});

	const sampleRegExp = /nerds/;

	it(`returns 'RegExp' on a regexp sample: ${sampleRegExp.toString()}`, () => {
		expect(getConstructorName(sampleRegExp)).toStrictEqual("RegExp");
	});
});
