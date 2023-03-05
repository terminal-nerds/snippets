import { describe, expect, it } from "vitest";

import {
	isError,
	isEvalError,
	isRangeError,
	isReferenceError,
	isSyntaxError,
	isTypeError,
	isURIError,
} from "./built-in.js";

describe("isError(error)", () => {
	it(`🔙 returns a boolean 🟢 'true' - on Error`, () => {
		expect(isError(new Error("message"))).toBe(true);
	});

	it(`🔙 returns a boolean 🔴 'false' - on random value`, () => {
		expect(isError("")).toBe(false);
	});
});

describe("isEvalError(error)", () => {
	it(`🔙 returns a boolean 🔴 'false' - on Error`, () => {
		expect(isRangeError(Error)).toBe(false);
	});

	it(`🔙 returns a boolean 🔴 'false' - on random value`, () => {
		expect(isEvalError("")).toBe(false);
	});

	it(`🔙 returns a boolean 🟢 'true' - on EvalError`, () => {
		expect(isEvalError(new EvalError("message"))).toBe(true);
	});
});

describe("isRangeError(error)", () => {
	it(`🔙 returns a boolean 🔴 'false' - on Error`, () => {
		expect(isRangeError(Error)).toBe(false);
	});

	it(`🔙 returns a boolean 🔴 'false' - on random value`, () => {
		expect(isRangeError("")).toBe(false);
	});

	it(`🔙 returns a boolean 🟢 'true' - on RangeError`, () => {
		expect(isRangeError(new RangeError("message"))).toBe(true);
	});
});

describe("isReferenceError(error)", () => {
	it(`🔙 returns a boolean 🔴 'false' - on Error`, () => {
		expect(isRangeError(Error)).toBe(false);
	});

	it(`🔙 returns a boolean 🔴 'false' - on random value`, () => {
		expect(isReferenceError("")).toBe(false);
	});

	it(`🔙 returns a boolean 🟢 'true' - on ReferenceError`, () => {
		expect(isReferenceError(new ReferenceError("message"))).toBe(true);
	});
});

describe("isSyntaxError(error)", () => {
	it(`🔙 returns a boolean 🔴 'false' - on Error`, () => {
		expect(isRangeError(Error)).toBe(false);
	});

	it(`🔙 returns a boolean 🔴 'false' - on random value`, () => {
		expect(isSyntaxError("")).toBe(false);
	});

	it(`🔙 returns a boolean 🟢 'true' - on SyntaxError`, () => {
		expect(isSyntaxError(new SyntaxError("message"))).toBe(true);
	});
});

describe("isTypeError(error)", () => {
	it(`🔙 returns a boolean 🔴 'false' - on Error`, () => {
		expect(isRangeError(Error)).toBe(false);
	});

	it(`🔙 returns a boolean 🔴 'false' - on random value`, () => {
		expect(isTypeError("")).toBe(false);
	});

	it(`🔙 returns a boolean 🟢 'true' - on TypeError`, () => {
		expect(isTypeError(new TypeError("message"))).toBe(true);
	});
});

describe("isURIError(error)", () => {
	it(`🔙 returns a boolean 🔴 'false' - on Error`, () => {
		expect(isRangeError(Error)).toBe(false);
	});

	it(`🔙 returns a boolean 🔴 'false' - on random value`, () => {
		expect(isURIError("")).toBe(false);
	});

	it(`🔙 returns a boolean 🟢 'true' - on URIError`, () => {
		expect(isURIError(new URIError("message"))).toBe(true);
	});
});
