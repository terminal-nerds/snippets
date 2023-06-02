import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, it } from "vitest";
import { ZodError } from "zod";

import { isValidRuntimeName, RUNTIME_NAMES, validateRuntimeEnvironmentName } from "./name.ts";

describe("validateRuntimeName(input)", () => {
	const sample = "blazingly-fast";

	it(throws(ZodError).on(`invalid environment runtime name`).sample(sample), ({ expect }) => {
		expect(() => validateRuntimeEnvironmentName(sample)).toThrow(ZodError);
	});

	it(
		returns(void 0)
			.on(`valid environment runtime name`)
			.samples(RUNTIME_NAMES),
		({ expect }) => {
			for (const runtimeName of RUNTIME_NAMES) {
				expect(() => validateRuntimeEnvironmentName(runtimeName)).not.toThrow();
			}
		},
	);
});

describe("isValidRuntimeName(input)", () => {
	const sample = "blazingly-fast";

	it(returns(false).on(`invalid environment runtime name`).sample(sample), ({ expect }) => {
		expect(isValidRuntimeName(sample)).toBe(false);
	});

	it(returns(true).on(`valid environment runtime names`).samples(RUNTIME_NAMES), ({ expect }) => {
		for (const name of RUNTIME_NAMES) {
			expect(isValidRuntimeName(name)).toBe(true);
		}
	});
});
