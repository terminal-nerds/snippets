import { describe, expect, it } from "vitest";

import { isRuntimeError, isValidationError, RuntimeError, ValidationError } from "./custom.js";

describe("isRuntimeError(error)", () => {
	it(`🔙 returns a boolean 🔴 'false' - on Error`, () => {
		expect(isRuntimeError(Error)).toBe(false);
	});

	it(`🔙 returns a boolean 🔴 'false' - on random value`, () => {
		expect(isRuntimeError("")).toBe(false);
	});

	it(`🔙 returns a boolean 🟢 'true' - on RuntimeError`, () => {
		expect(isRuntimeError(new RuntimeError("message"))).toBe(true);
	});
});

describe("isValidationError(error)", () => {
	it(`🔙 returns a boolean 🔴 'false' - on Error`, () => {
		expect(isValidationError(Error)).toBe(false);
	});

	it(`🔙 returns a boolean 🔴 'false' - on random value`, () => {
		expect(isValidationError("")).toBe(false);
	});

	it(`🔙 returns a boolean 🟢 'true' - on ValidationError`, () => {
		expect(isValidationError(new ValidationError([]))).toBe(true);
	});
});
