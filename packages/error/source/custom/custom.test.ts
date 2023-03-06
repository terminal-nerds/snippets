import { returns } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";

import { isRuntimeError, isValidationError, RuntimeError, ValidationError } from "./custom.js";

describe("isRuntimeError(error)", () => {
	it(returns(false).on(`Error`), () => {
		expect(isRuntimeError(Error)).toBe(false);
	});

	it(returns(false).on(`random value`).sample(""), () => {
		expect(isRuntimeError("")).toBe(false);
	});

	it(returns(true).on(`RuntimeError`), () => {
		expect(isRuntimeError(new RuntimeError("message"))).toBe(true);
	});
});

describe("isValidationError(error)", () => {
	it(returns(false).on(`Error`), () => {
		expect(isValidationError(new Error("message"))).toBe(false);
	});

	it(returns(false).on(`random value`).sample(""), () => {
		expect(isValidationError("")).toBe(false);
	});

	it(returns(true).on(`ValidationError`), () => {
		expect(isValidationError(new ValidationError([]))).toBe(true);
	});
});
