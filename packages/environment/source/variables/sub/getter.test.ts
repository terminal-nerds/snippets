import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { afterEach, describe, it } from "vitest";

import { getEnvVar, getEnvVars, hasEnvVar } from "./getter.ts";
import { deleteEnvVar, setEnvVar } from "./setter.ts";

const EXISTING_VARIABLE = "VITEST";
const FALSE_VARIABLE = "TEST_FALSE";
const NUMBER_VARIABLE = "TEST_NUMBER";
const NEW_VARIABLE = "TERMINAL_NERD_4_LIFE";

const NUMBER_VARIABLE_VALUE = 1.234;

afterEach(() => {
	deleteEnvVar(NEW_VARIABLE);
	deleteEnvVar(FALSE_VARIABLE);
	deleteEnvVar(NUMBER_VARIABLE);
});

describe(`getEnvVars()`, () => {
	it(returns(Map) + ` and has property "VITEST" set to "true"`, ({ expect }) => {
		const variables = getEnvVars();

		expect(variables).toBeInstanceOf(Map);
		expect(variables.has("VITEST")).toBe(true);
		expect(variables.get("VITEST")).toBe("true");
	});
});

describe(`hasEnvVar(name)`, () => {
	it(returns(false).on(`made up variable`).sample(NEW_VARIABLE), ({ expect }) => {
		expect(hasEnvVar(NEW_VARIABLE)).toBe(false);
	});

	it(returns(true).on(`existing variable`).sample(EXISTING_VARIABLE), ({ expect }) => {
		expect(hasEnvVar(EXISTING_VARIABLE)).toBe(true);
	});
});

describe(`getEnvVar(name, options?)`, () => {
	const strictOptions = { strict: true } as const;

	it(throws(Error).on(`non-existing variable`).sample(NEW_VARIABLE).with(strictOptions), ({ expect }) => {
		expect(() => getEnvVar(NEW_VARIABLE, strictOptions)).toThrow(Error);
	});

	const nonStrictOptions = { strict: false } as const;

	it(returns().on(`non-existing variable`).sample(NEW_VARIABLE).with(nonStrictOptions), ({ expect }) => {
		expect(getEnvVar(NEW_VARIABLE, nonStrictOptions)).toBeUndefined();
	});

	it(returns(true).on(`existing variable which has Boolean value (true)`).sample(EXISTING_VARIABLE), ({ expect }) => {
		expect(getEnvVar(EXISTING_VARIABLE)).toBe(true);
	});

	it(
		returns(false).on(`existing variable which has 'Boolean' value (false)`).sample(FALSE_VARIABLE),
		({ expect }) => {
			setEnvVar("TEST_FALSE", false);
			expect(getEnvVar(FALSE_VARIABLE)).toBe(false);
		},
	);

	it(
		returns(NUMBER_VARIABLE_VALUE)
			.on(`existing variable which has 'Number' value (${NUMBER_VARIABLE_VALUE})`)
			.sample(NUMBER_VARIABLE),
		({ expect }) => {
			setEnvVar(NUMBER_VARIABLE, NUMBER_VARIABLE_VALUE);
			expect(getEnvVar(NUMBER_VARIABLE)).toBe(NUMBER_VARIABLE_VALUE);
		},
	);
});
