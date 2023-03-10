import { returns } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";

import { deleteEnvironmentVariable, setEnvironmentVariable } from "../variable/variable.js";
import { CI_CD_ENVIRONMENT_VARIABLES, inContinuousIntegration, inTest, TEST_ENVIRONMENT_VARIABLES } from "./scope.js";

describe("inContinuousIntegration()", () => {
	it(returns(false).on(`non-existing environment variables`).samples(CI_CD_ENVIRONMENT_VARIABLES), () => {
		// NOTE: This is for the CI & CD - test
		for (const variable of CI_CD_ENVIRONMENT_VARIABLES) {
			deleteEnvironmentVariable(variable);
		}

		expect(inContinuousIntegration()).toBe(false);
	});

	it(returns(true).on(`existing environment variables`).samples(CI_CD_ENVIRONMENT_VARIABLES), () => {
		for (const variable of CI_CD_ENVIRONMENT_VARIABLES) {
			setEnvironmentVariable(variable, "true");
			expect(inContinuousIntegration()).toBe(true);
			deleteEnvironmentVariable(variable);
		}
	});
});

describe("inTest()", () => {
	it(returns(false).on(`non-existing environment variables`).samples(TEST_ENVIRONMENT_VARIABLES), () => {
		// NOTE: This is for the test
		for (const variable of TEST_ENVIRONMENT_VARIABLES) {
			deleteEnvironmentVariable(variable);
		}
		expect(inTest()).toBe(false);
	});

	it(returns(true).on(`existing environment variables`).samples(TEST_ENVIRONMENT_VARIABLES), () => {
		for (const variable of TEST_ENVIRONMENT_VARIABLES) {
			setEnvironmentVariable(variable, "true");
			expect(inTest()).toBe(true);
			deleteEnvironmentVariable(variable);
		}
	});
});
