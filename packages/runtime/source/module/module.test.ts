import { returns } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";

import { hasModule } from "./module.ts";

describe(`hasModule(name)`, () => {
	const nonExistingModuleName = "terminal-nerdss";

	it(returns(false).on(`non-existing module`).sample(nonExistingModuleName), () => {
		expect(hasModule(nonExistingModuleName)).toBe(false);
	});

	const moduleName = "typescript";

	it(returns(true).on(`existing module`).sample(moduleName), () => {
		expect(hasModule(moduleName)).toBe(true);
	});
});
