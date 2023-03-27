import { returns } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";

import { isValidationError, ValidationError } from "./validation.ts";

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
