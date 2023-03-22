import { returns } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";

import {
	isError,
	isEvalError,
	isRangeError,
	isReferenceError,
	isSyntaxError,
	isTypeError,
	isURIError,
} from "./built-in.ts";

describe("isError(error)", () => {
	it(returns(true).on(`Error`), () => {
		expect(isError(new Error("message"))).toBe(true);
	});

	it(returns(false).on(`random value`).sample(""), () => {
		expect(isError("")).toBe(false);
	});
});

describe("isEvalError(error)", () => {
	it(returns(false).on(`Error`), () => {
		expect(isRangeError(Error)).toBe(false);
	});

	it(returns(false).on(`random value`).sample(""), () => {
		expect(isEvalError("")).toBe(false);
	});

	it(returns(true).on(`EvalError`), () => {
		expect(isEvalError(new EvalError("message"))).toBe(true);
	});
});

describe("isRangeError(error)", () => {
	it(returns(false).on(`Error`), () => {
		expect(isRangeError(Error)).toBe(false);
	});

	it(returns(false).on(`random value`), () => {
		expect(isRangeError("")).toBe(false);
	});

	it(returns(true).on(`RangeError`), () => {
		expect(isRangeError(new RangeError("message"))).toBe(true);
	});
});

describe("isReferenceError(error)", () => {
	it(returns(false).on(`Error`), () => {
		expect(isRangeError(Error)).toBe(false);
	});

	it(returns(false).on(`random value`).sample(""), () => {
		expect(isReferenceError("")).toBe(false);
	});

	it(returns(true).on(`ReferenceError`), () => {
		expect(isReferenceError(new ReferenceError("message"))).toBe(true);
	});
});

describe("isSyntaxError(error)", () => {
	it(returns(false).on(`Error`), () => {
		expect(isRangeError(Error)).toBe(false);
	});

	it(returns(false).on(`random value`).sample(""), () => {
		expect(isSyntaxError("")).toBe(false);
	});

	it(returns(true).on(`SyntaxError`), () => {
		expect(isSyntaxError(new SyntaxError("message"))).toBe(true);
	});
});

describe("isTypeError(error)", () => {
	it(returns(false).on(`Error`), () => {
		expect(isRangeError(Error)).toBe(false);
	});

	it(returns(false).on(`random value`).sample(""), () => {
		expect(isTypeError("")).toBe(false);
	});

	it(returns(true).on(`TypeError`), () => {
		expect(isTypeError(new TypeError("message"))).toBe(true);
	});
});

describe("isURIError(error)", () => {
	it(returns(false).on(`Error`), () => {
		expect(isRangeError(Error)).toBe(false);
	});

	it(returns(false).on(`random value`).sample(""), () => {
		expect(isURIError("")).toBe(false);
	});

	it(returns(true).on(`URIError`), () => {
		expect(isURIError(new URIError("message"))).toBe(true);
	});
});
