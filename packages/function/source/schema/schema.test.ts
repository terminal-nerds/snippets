import { SAMPLE_NON_PRIMITIVES, SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import {
	SAMPLE_ARROW_FUNCTIONS,
	SAMPLE_ASYNC_FUNCTIONS,
	SAMPLE_BUILT_IN_METHODS,
	SAMPLE_FUNCTIONS,
	SAMPLE_GENERATOR_FUNCTIONS,
	SAMPLE_NON_GENERATOR_FUNCTIONS,
	SAMPLE_SIMPLE_ASYNC_GENERATOR_FUNCTION,
	SAMPLE_SIMPLE_FUNCTIONS,
	SAMPLE_SIMPLE_GENERATOR_FUNCTION,
	SAMPLE_SYNC_FUNCTIONS,
} from "@terminal-nerds/snippets-test/sample/function";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import {
	isArrowFunction,
	isAsyncFunction,
	isAsyncGeneratorFunction,
	isFunction,
	isGeneratorFunction,
	isSimpleFunction,
	validateFunction,
} from "./schema.ts";

const NON_PRIMITIVES_WITHOUT_A_FUNCTION = SAMPLE_NON_PRIMITIVES.filter((v) => typeof v !== "function");
const NON_FUNCTION_VALUES = [...SAMPLE_PRIMITIVES, NON_PRIMITIVES_WITHOUT_A_FUNCTION];

function testNonFunctionValues(): void {
	it(throws(ZodError).on(`values which is not a function`).samples(NON_FUNCTION_VALUES), () => {
		for (const nonFunction of NON_FUNCTION_VALUES) {
			expect(() => validateFunction(nonFunction)).toThrowError(ZodError);
		}
	});
}

describe(`validateFunction(value)`, () => {
	testNonFunctionValues();

	it(returns().on(`sample function`).samples(SAMPLE_FUNCTIONS), () => {
		for (const _function of SAMPLE_FUNCTIONS) {
			expect(() => validateFunction(_function)).not.toThrowError();
		}
	});
});

describe(`isFunction(value)`, () => {
	testNonFunctionValues();

	it(returns(false).on(`values which is not a function`).samples(NON_FUNCTION_VALUES), () => {
		for (const _function of NON_FUNCTION_VALUES) {
			expect(isFunction(_function)).toBe(false);
		}
	});

	it(returns(true).on(`values which is a function`).samples(SAMPLE_FUNCTIONS), () => {
		for (const _function of SAMPLE_FUNCTIONS) {
			expect(isFunction(_function)).toBe(true);
		}
	});
});

describe(`isArrowFunction(function)`, () => {
	testNonFunctionValues();

	it(returns(false).on(`simple (classic) functions`).samples(SAMPLE_SIMPLE_FUNCTIONS), () => {
		for (const simpleFunction of SAMPLE_SIMPLE_FUNCTIONS) {
			expect(isArrowFunction(simpleFunction)).toBe(false);
		}
	});

	it(returns(false).on(`built-in methods`).samples(SAMPLE_BUILT_IN_METHODS), () => {
		for (const builtInMethod of SAMPLE_BUILT_IN_METHODS) {
			expect(isArrowFunction(builtInMethod)).toBe(false);
		}
	});

	it(returns(true).on(`arrow functions`).samples(SAMPLE_ARROW_FUNCTIONS), () => {
		for (const arrowFunction of SAMPLE_ARROW_FUNCTIONS) {
			expect(isArrowFunction(arrowFunction)).toBe(true);
		}
	});
});

describe(`isSimpleFunction(function)`, () => {
	testNonFunctionValues();

	it(returns(false).on(`arrow functions`).samples(SAMPLE_ARROW_FUNCTIONS), () => {
		for (const arrowFunction of SAMPLE_ARROW_FUNCTIONS) {
			expect(isSimpleFunction(arrowFunction)).toBe(false);
		}
	});

	it(returns(true).on(`built-in methods`).samples(SAMPLE_BUILT_IN_METHODS), () => {
		for (const builtInMethod of SAMPLE_BUILT_IN_METHODS) {
			expect(isSimpleFunction(builtInMethod)).toBe(true);
		}
	});

	it(returns(true).on(`simple (classic) functions`).samples(SAMPLE_SIMPLE_FUNCTIONS), () => {
		for (const simpleFunction of SAMPLE_SIMPLE_FUNCTIONS) {
			expect(isSimpleFunction(simpleFunction)).toBe(true);
		}
	});
});

describe(`isAsyncFunction(function)`, () => {
	testNonFunctionValues();

	it(returns(false).on(`synchronous functions`).samples(SAMPLE_SYNC_FUNCTIONS), () => {
		for (const syncFunction of SAMPLE_SYNC_FUNCTIONS) {
			expect(isAsyncFunction(syncFunction)).toBe(false);
		}
	});

	it(returns(true).on(`Asynchronous functions`).samples(SAMPLE_ASYNC_FUNCTIONS), () => {
		for (const asyncFunction of SAMPLE_ASYNC_FUNCTIONS) {
			expect(isAsyncFunction(asyncFunction)).toBe(true);
		}
	});
});

describe(`isAsyncGeneratorFunction(function)`, () => {
	testNonFunctionValues();

	it(returns(false).on(`sync generator function`).sample(SAMPLE_SIMPLE_GENERATOR_FUNCTION), () => {
		expect(isAsyncGeneratorFunction(SAMPLE_SIMPLE_GENERATOR_FUNCTION)).toBe(false);
	});

	it(returns(false).on(`arrow functions`).samples(SAMPLE_ARROW_FUNCTIONS), () => {
		for (const arrowFunction of SAMPLE_ARROW_FUNCTIONS) {
			expect(isAsyncGeneratorFunction(arrowFunction)).toBe(false);
		}
	});

	it(returns(true).on(`Async generator function`).sample(SAMPLE_SIMPLE_ASYNC_GENERATOR_FUNCTION), () => {
		expect(isAsyncGeneratorFunction(SAMPLE_SIMPLE_ASYNC_GENERATOR_FUNCTION)).toBe(true);
	});
});

describe(`isGeneratorFunction(function)`, () => {
	testNonFunctionValues();

	it(returns(false).on(`non-generator functions`).samples(SAMPLE_NON_GENERATOR_FUNCTIONS), () => {
		for (const nonGeneratorFunction of SAMPLE_NON_GENERATOR_FUNCTIONS) {
			expect(isGeneratorFunction(nonGeneratorFunction)).toBe(false);
		}
	});

	it(returns(true).on(`generator functions`).samples(SAMPLE_GENERATOR_FUNCTIONS), () => {
		for (const generatorFunction of SAMPLE_GENERATOR_FUNCTIONS) {
			expect(isGeneratorFunction(generatorFunction)).toBe(true);
		}
	});
});
