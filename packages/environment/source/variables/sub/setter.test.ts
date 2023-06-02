import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { afterEach, describe, it } from "vitest";

import { getEnvVar, hasEnvVar } from "./getter.ts";
import { deleteEnvVar, setEnvVar } from "./setter.ts";

const EXISTING_VARIABLE = "VITEST";
const FALSE_VARIABLE = "TEST_FALSE";
const NUMBER_VARIABLE = "TEST_NUMBER";
const NEW_VARIABLE = "TERMINAL_NERD_4_LIFE";

afterEach(() => {
	deleteEnvVar(NEW_VARIABLE);
	deleteEnvVar(FALSE_VARIABLE);
	deleteEnvVar(NUMBER_VARIABLE);
});

describe(`deleteEnvVar(name, options?)`, () => {
	const strictOptions = { strict: true };

	it(throws(Error).on(`deleting non-existing variable`).sample(NEW_VARIABLE).with(strictOptions), ({ expect }) => {
		expect(() => deleteEnvVar(NEW_VARIABLE, strictOptions)).toThrow(Error);
	});

	const nonStrictOptions = { strict: false };

	it(
		returns(void 0)
			.on(`deleting non-existing variable`)
			.sample(NEW_VARIABLE)
			.with(nonStrictOptions),
		({ expect }) => {
			expect(() => deleteEnvVar(NEW_VARIABLE, nonStrictOptions)).not.toThrow(Error);
			expect(deleteEnvVar(NEW_VARIABLE, nonStrictOptions)).toBeUndefined();
		},
	);

	it(
		returns(void 0)
			.on(`deleting existing variable`)
			.sample(EXISTING_VARIABLE)
			.with(nonStrictOptions)
			.and(`the deleted environment variable: "${EXISTING_VARIABLE}" - no longer exists`),
		({ expect }) => {
			expect(() => deleteEnvVar(EXISTING_VARIABLE, nonStrictOptions)).not.toThrow();
			expect(deleteEnvVar(EXISTING_VARIABLE, nonStrictOptions)).toBeUndefined();
			expect(hasEnvVar(EXISTING_VARIABLE)).toBe(false);
			expect(getEnvVar(EXISTING_VARIABLE)).toBeUndefined();
		},
	);
});

describe(`setEnvVar(name, value)`, () => {
	const variableString = "ENV_VAR_STRING";
	const valueString = "xeho91";

	it(
		returns(void 0)
			.on(`setting a variable - string`)
			.sample(variableString)
			.and(`the set environment variable: "${variableString}" - exists`)
			.and(`its value is: "${valueString}"`),
		({ expect }) => {
			expect(() => setEnvVar(variableString, valueString)).not.toThrow();
			expect(setEnvVar(variableString, valueString)).toBeUndefined();
			expect(hasEnvVar(variableString)).toBe(true);
			expect(getEnvVar(variableString)).toBe(valueString);
		},
	);

	const variableNumber = "ENV_VAR_NUMBER";
	const valueNumber = 91;

	it(
		returns(void 0)
			.on(`setting a variable - boolean`)
			.sample(variableNumber)
			.and(`the set environment variable: "${variableNumber}" - exists`)
			.and(`its value is: ${valueNumber}`),
		({ expect }) => {
			expect(() => setEnvVar(variableNumber, valueNumber)).not.toThrow();
			expect(setEnvVar(variableNumber, valueNumber)).toBeUndefined();
			expect(hasEnvVar(variableNumber)).toBe(true);
			expect(getEnvVar(variableNumber)).toBe(valueNumber);
		},
	);

	const variableBoolean = "ENV_VAR_NUMBER";
	const valueBoolean = false;

	it(
		returns(void 0)
			.on(`setting a variable - boolean`)
			.sample(variableBoolean)
			.and(`the set environment variable: "${variableBoolean}" - exists`)
			.and(`its value is: ${valueBoolean}`),
		({ expect }) => {
			expect(() => setEnvVar(variableBoolean, valueBoolean)).not.toThrow();
			expect(setEnvVar(variableBoolean, valueBoolean)).toBeUndefined();
			expect(hasEnvVar(variableBoolean)).toBe(true);
			expect(getEnvVar(variableBoolean)).toBe(valueBoolean);
		},
	);
});
