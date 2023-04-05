import {
	isAsyncFunction as nodeIsAsyncFunction,
	isGeneratorFunction as nodeIsGeneratorFunction,
} from "node:util/types";

import { IN_BROWSER } from "@terminal-nerds/snippets-runtime/environment";
import { AsyncFunction, AsyncGeneratorFunction, GeneratorFunction } from "@terminal-nerds/snippets-type/built-in";
import { isNonPrimitive, validateNonPrimitive } from "@terminal-nerds/snippets-type/non-primitive";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type AnyFunction = (..._args: any) => any;

export function validateFunction(value: unknown): asserts value is AnyFunction {
	validateNonPrimitive(value, "function");
}

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function} Function */
export function isFunction(value: unknown): value is AnyFunction {
	return isNonPrimitive(value, "function");
}

/**
 * Credits: https://github.com/inspect-js/is-arrow-function/blob/main/index.js
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions} Arrow function
 */
export function isArrowFunction(_function: AnyFunction): boolean {
	validateFunction(_function);

	const isSimpleFunctionRegex = /^\s*function/;
	const isWithParensRegex = /^\([^)]*\) *=>/;
	const isWithoutParensRegex = /^[^=]*=>/;
	const stringifiedFunction = _function.toString();

	return (
		stringifiedFunction.length > 0 &&
		!isSimpleFunctionRegex.test(stringifiedFunction) &&
		(isWithParensRegex.test(stringifiedFunction) || isWithoutParensRegex.test(stringifiedFunction))
	);
}

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions} Simple function */
export function isSimpleFunction(_function: AnyFunction): boolean {
	return !isArrowFunction(_function);
}

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function} Async function */
export function isAsyncFunction(_function: AnyFunction): _function is typeof AsyncFunction {
	validateFunction(_function);

	return IN_BROWSER ? _function instanceof AsyncFunction : nodeIsAsyncFunction(_function);
}

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function} Async generator function */
export function isAsyncGeneratorFunction(_function: AnyFunction): _function is typeof AsyncGeneratorFunction {
	validateFunction(_function);

	return IN_BROWSER
		? _function instanceof AsyncGeneratorFunction
		: isAsyncFunction(_function) && isGeneratorFunction(_function);
}

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function} Generator function */
export function isGeneratorFunction(_function: AnyFunction): _function is GeneratorFunction {
	validateFunction(_function);

	return IN_BROWSER ? _function instanceof GeneratorFunction : nodeIsGeneratorFunction(_function);
}

export type FunctionType =
	/** Arrow function `async () => {}` */
	| "arrow"
	/** Arrow and asynchronous function `async () => {}` */
	| "arrow-async"
	/** A classic, simple function `function name() {}` */
	| "simple"
	/** A classic, simple and asynchronous function `async function name() {}` */
	| "simple-async"
	/** A classic, simple, asynchronous and generator function `async function* name() {}` */
	| "simple-async-generator"
	/** A classic, simple and generator function `function* name() {}` */
	| "simple-generator";

function determineArrowFunctionType(_function: AnyFunction): Extract<FunctionType, "arrow" | "arrow-async"> {
	return isAsyncFunction(_function) ? "arrow-async" : "arrow";
}

function determineSimpleAsyncFunction(
	_function: AnyFunction,
): Extract<FunctionType, "simple-async-generator" | "simple-async"> {
	return isGeneratorFunction(_function) ? "simple-async-generator" : "simple-async";
}

function determineSimpleSyncFunction(_function: AnyFunction): Extract<FunctionType, "simple" | "simple-generator"> {
	return isGeneratorFunction(_function) ? "simple-generator" : "simple";
}

function determineSimpleFunctionType(
	_function: AnyFunction,
): Extract<FunctionType, "simple" | "simple-async" | "simple-async-generator" | "simple-generator"> {
	return isAsyncFunction(_function)
		? determineSimpleAsyncFunction(_function)
		: determineSimpleSyncFunction(_function);
}

/** @see {@link FunctionType} */
export function getFunctionType(_function: AnyFunction): FunctionType {
	return isArrowFunction(_function) ? determineArrowFunctionType(_function) : determineSimpleFunctionType(_function);
}
