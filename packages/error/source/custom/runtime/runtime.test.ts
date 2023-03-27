import { returns } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";

import { isRuntimeError, RuntimeError } from "./runtime.ts";

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
