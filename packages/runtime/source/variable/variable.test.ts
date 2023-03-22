import { RuntimeError } from "@terminal-nerds/snippets-error/custom";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { afterEach, describe, expect, it } from "vitest";

import {
	deleteEnvironmentVariable,
	getEnvironmentVariable,
	getEnvironmentVariables,
	hasEnvironmentVariable,
	setEnvironmentVariable,
} from "./variable.ts";

const EXISTING_VARIABLE = "VITEST";
const FALSE_VARIABLE = "TEST_FALSE";
const NUMBER_VARIABLE = "TEST_NUMBER";
const NEW_VARIABLE = "TERMINAL_NERD_4_LIFE";

const NUMBER_VARIABLE_VALUE = 1.234;

afterEach(() => {
	deleteEnvironmentVariable(NEW_VARIABLE);
	deleteEnvironmentVariable(FALSE_VARIABLE);
	deleteEnvironmentVariable(NUMBER_VARIABLE);
});

describe(`getEnvironmentVariables()`, () => {
	it(returns(Object) + ` and has property "VITEST" set to "true"`, () => {
		const variables = getEnvironmentVariables();

		expect(variables).toBeInstanceOf(Object);
		expect(variables).toHaveProperty("VITEST", "true");
	});
});

describe(`hasEnvironmentVariable(name)`, () => {
	it(returns(false).on(`made up variable`).sample(NEW_VARIABLE), () => {
		expect(hasEnvironmentVariable(NEW_VARIABLE)).toBe(false);
	});

	it(returns(true).on(`existing variable`).sample(EXISTING_VARIABLE), () => {
		expect(hasEnvironmentVariable(EXISTING_VARIABLE)).toBe(true);
	});
});

describe(`getEnvironmentVariable(name, options?)`, () => {
	const strictOptions = { strict: true } as const;

	it(throws(RuntimeError).on(`non-existing variable`).sample(NEW_VARIABLE).with(strictOptions), () => {
		expect(() => getEnvironmentVariable(NEW_VARIABLE, strictOptions)).toThrow(RuntimeError);
	});

	const nonStrictOptions = { strict: false } as const;

	it(returns().on(`non-existing variable`).sample(NEW_VARIABLE).with(nonStrictOptions), () => {
		expect(getEnvironmentVariable(NEW_VARIABLE, nonStrictOptions)).toBeUndefined();
	});

	it(returns(true).on(`existing variable which has Boolean value (true)`).sample(EXISTING_VARIABLE), () => {
		expect(getEnvironmentVariable(EXISTING_VARIABLE)).toBe(true);
	});

	it(returns(false).on(`existing variable which has 'Boolean' value (false)`).sample(FALSE_VARIABLE), () => {
		setEnvironmentVariable("TEST_FALSE", false);
		expect(getEnvironmentVariable(FALSE_VARIABLE)).toBe(false);
	});

	it(
		returns(NUMBER_VARIABLE_VALUE)
			.on(`existing variable which has 'Number' value (${NUMBER_VARIABLE_VALUE})`)
			.sample(NUMBER_VARIABLE),
		() => {
			setEnvironmentVariable(NUMBER_VARIABLE, NUMBER_VARIABLE_VALUE);
			expect(getEnvironmentVariable(NUMBER_VARIABLE)).toBe(NUMBER_VARIABLE_VALUE);
		},
	);
});

describe(`setEnvironmentVariable(name, value)`, () => {
	const value = "xeho91";

	it(
		returns()
			.on(`setting a variable`)
			.sample(NEW_VARIABLE)
			.and(`the set environment variable: "${NEW_VARIABLE}" - exists`)
			.and(`its value is: "${value}"`),
		() => {
			expect(() => setEnvironmentVariable(NEW_VARIABLE, value)).not.toThrow();
			expect(setEnvironmentVariable(NEW_VARIABLE, value)).toBeUndefined();
			expect(hasEnvironmentVariable(NEW_VARIABLE)).toBe(true);
			expect(getEnvironmentVariable(NEW_VARIABLE)).toBe(value);
		},
	);
});

describe(`deleteEnvironmentVariable(name, options?)`, () => {
	const strictOptions = { strict: true };

	it(throws(RuntimeError).on(`deleting non-existing variable`).sample(NEW_VARIABLE).with(strictOptions), () => {
		expect(() => deleteEnvironmentVariable(NEW_VARIABLE, strictOptions)).toThrow(RuntimeError);
	});

	const nonStrictOptions = { strict: false };

	it(returns().on(`deleting non-existing variable`).sample(NEW_VARIABLE).with(nonStrictOptions), () => {
		expect(() => deleteEnvironmentVariable(NEW_VARIABLE, nonStrictOptions)).not.toThrow(RuntimeError);
		expect(deleteEnvironmentVariable(NEW_VARIABLE, nonStrictOptions)).toBeUndefined();
	});

	it(
		returns()
			.on(`deleting existing variable`)
			.sample(EXISTING_VARIABLE)
			.with(nonStrictOptions)
			.and(`the deleted environment variable: "${EXISTING_VARIABLE}" - no longer exists`),
		() => {
			expect(() => deleteEnvironmentVariable(EXISTING_VARIABLE, nonStrictOptions)).not.toThrow();
			expect(deleteEnvironmentVariable(EXISTING_VARIABLE, nonStrictOptions)).toBeUndefined();
			expect(hasEnvironmentVariable(EXISTING_VARIABLE)).toBe(false);
			expect(getEnvironmentVariable(EXISTING_VARIABLE)).toBe(undefined);
		},
	);
});
