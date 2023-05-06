import { returns } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";

import { deleteEnvironmentVariable, getEnvironmentVariable, setEnvironmentVariable } from "../variable/variable.ts";
import { isIn, type ScopeName } from "./name.ts";
import { CI_CD_ENVIRONMENT_VARIABLES } from "./scopes/continuous-integration.ts";
import { inDevelopment, inProduction } from "./scopes/node.ts";
import { STORYBOOK_ENVIRONMENT_VARIABLES } from "./scopes/storybook.ts";
import { TEST_ENVIRONMENT_VARIABLES } from "./scopes/test.ts";

describe(`isIn("continuousIntegration", options?)`, () => {
	const scopeName: ScopeName = "continuousIntegration";

	it(returns(false).on(`non-existing environment variables`).samples(CI_CD_ENVIRONMENT_VARIABLES), () => {
		// NOTE: This is for the CI & CD - test
		for (const variable of CI_CD_ENVIRONMENT_VARIABLES) {
			deleteEnvironmentVariable(variable);
		}

		expect(isIn(scopeName)).toBe(false);
	});

	it(returns(true).on(`existing environment variables`).samples(CI_CD_ENVIRONMENT_VARIABLES), () => {
		for (const variable of CI_CD_ENVIRONMENT_VARIABLES) {
			setEnvironmentVariable(variable, "true");
			expect(isIn(scopeName)).toBe(true);
			deleteEnvironmentVariable(variable);
		}
	});
});

describe("inStorybook()", () => {
	const scopeName: ScopeName = "storybook";

	it(returns(false).on(`non-existing environment variables`).samples(TEST_ENVIRONMENT_VARIABLES), () => {
		expect(isIn(scopeName)).toBe(false);
	});

	it(returns(true).on(`existing environment variables`).samples(STORYBOOK_ENVIRONMENT_VARIABLES), () => {
		for (const variable of STORYBOOK_ENVIRONMENT_VARIABLES) {
			setEnvironmentVariable(variable, "true");
			expect(isIn(scopeName)).toBe(true);
			deleteEnvironmentVariable(variable);
		}
	});
});

describe("inTest()", () => {
	const scopeName: ScopeName = "test";

	it(returns(false).on(`non-existing environment variables`).samples(TEST_ENVIRONMENT_VARIABLES), () => {
		// NOTE: This is for the test
		for (const variable of TEST_ENVIRONMENT_VARIABLES) {
			deleteEnvironmentVariable(variable);
		}
		expect(isIn(scopeName)).toBe(false);
	});

	it(returns(true).on(`existing environment variables`).samples(TEST_ENVIRONMENT_VARIABLES), () => {
		for (const variable of TEST_ENVIRONMENT_VARIABLES) {
			setEnvironmentVariable(variable, "true");
			expect(isIn(scopeName)).toBe(true);
			deleteEnvironmentVariable(variable);
		}
	});
});

describe("inDevelopment()", () => {
	const variable = "NODE_ENV";
	const production = "production";
	const development = "development";

	it(returns(true).on(`"${variable}" set to`).sample(development), () => {
		const cached = getEnvironmentVariable(variable);

		setEnvironmentVariable(variable, development);
		expect(inDevelopment()).toBe(true);
		setEnvironmentVariable(variable, cached ?? development);
	});

	it(returns(false).on(`"${variable}" set to`).sample(production), () => {
		const cached = getEnvironmentVariable(variable);

		setEnvironmentVariable(variable, production);
		expect(inDevelopment()).toBe(false);
		setEnvironmentVariable(variable, cached ?? development);
	});
});

describe("inProduction()", () => {
	const variable = "NODE_ENV";
	const production = "production";
	const development = "development";

	it(returns(true).on(`"${variable}" set to`).sample(production), () => {
		const cached = getEnvironmentVariable(variable);

		setEnvironmentVariable(variable, production);
		expect(inProduction()).toBe(true);
		setEnvironmentVariable(variable, cached ?? development);
	});

	it(returns(false).on(`"${variable}" set to`).sample(development), () => {
		const cached = getEnvironmentVariable(variable);

		setEnvironmentVariable(variable, development);
		expect(inProduction()).toBe(false);
		setEnvironmentVariable(variable, cached ?? development);
	});
});
