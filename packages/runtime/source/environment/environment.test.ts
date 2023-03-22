import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { isValidRuntimeEnvironmentName, RUNTIME_ENVIRONMENTS, validateRuntimeEnvironmentName } from "./environment.ts";

describe("validateRuntimeEnvironmentName(input)", () => {
	const sample = "blazingly-fast";

	it(throws(ZodError).on(`invalid environment runtime name`).sample(sample), () => {
		expect(() => validateRuntimeEnvironmentName(sample)).toThrow(ZodError);
	});

	it(
		returns(void 0)
			.on(`valid environment runtime name`)
			.samples(RUNTIME_ENVIRONMENTS),
		() => {
			for (const runtimeName of RUNTIME_ENVIRONMENTS) {
				expect(() => validateRuntimeEnvironmentName(runtimeName)).not.toThrow();
			}
		},
	);
});

describe("isValidRuntimeName(input)", () => {
	const sample = "blazingly-fast";

	it(returns(false).on(`invalid environment runtime name`).sample(sample), () => {
		expect(isValidRuntimeEnvironmentName(sample)).toBe(false);
	});

	it(returns(true).on(`valid environment runtime names`).samples(RUNTIME_ENVIRONMENTS), () => {
		for (const name of RUNTIME_ENVIRONMENTS) {
			expect(isValidRuntimeEnvironmentName(name)).toBe(true);
		}
	});
});
