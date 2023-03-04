import { describe, expect, it } from "vitest";

import { isError, isRuntimeError, isValidationError, RuntimeError, ValidationError } from "./custom.js";

describe("isError(error)", () => {
	it(`🔙 returns a boolean 🟢 'true' - on Error`, () => {
		expect(isError(new Error("message"))).toBe(true);
	});

	it(`🔙 returns a boolean 🔴 'false' - on random value`, () => {
		expect(isError("")).toBe(false);
	});
});

describe("isRuntimeError(error)", () => {
	it(`🔙 returns a boolean 🟢 'true' - on RuntimeError`, () => {
		expect(isRuntimeError(new RuntimeError("message"))).toBe(true);
	});

	it(`🔙 returns a boolean 🔴 'false' - on Error`, () => {
		expect(isRuntimeError(new Error("message"))).toBe(false);
	});
});

describe("isValidationError(error)", () => {
	it(`🔙 returns a boolean 🟢 'true' - on ValidationError`, () => {
		expect(isValidationError(new ValidationError([]))).toBe(true);
	});

	it(`🔙 returns a boolean 🔴 'false' - on Error`, () => {
		expect(isValidationError(new Error("message"))).toBe(false);
	});
});
