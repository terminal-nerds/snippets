import { z } from "zod";

/** @see {@link ERROR_BUILT_IN_OBJECTS} */
export const ERROR_BUILT_IN_OBJECTS_NAMES = [
	"Error",
	"AggregateError",
	"EvalError",
	"RangeError",
	"ReferenceError",
	"SyntaxError",
	"TypeError",
	"URIError",
] as const;

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#error_objects} */
export const ERROR_BUILT_IN_OBJECTS = {
	Error: Error,
	AggregateError: AggregateError,
	EvalError: EvalError,
	RangeError: RangeError,
	ReferenceError: ReferenceError,
	SyntaxError: SyntaxError,
	TypeError: TypeError,
	URIError: URIError,
} as const;

export type ErrorBuiltInObjectName = keyof typeof ERROR_BUILT_IN_OBJECTS;
export type ErrorBuiltInObject = (typeof ERROR_BUILT_IN_OBJECTS)[ErrorBuiltInObjectName];

export const ERROR_BUILT_IN_OBJECT_NAMES_SCHEMA = z.enum(ERROR_BUILT_IN_OBJECTS_NAMES);

export const ERROR_BUILT_IN_OBJECTS_SCHEMAS = {
	Error: z.instanceof(Error),
	AggregateError: z.instanceof(AggregateError),
	EvalError: z.instanceof(EvalError),
	RangeError: z.instanceof(RangeError),
	ReferenceError: z.instanceof(ReferenceError),
	SyntaxError: z.instanceof(SyntaxError),
	TypeError: z.instanceof(TypeError),
	URIError: z.instanceof(URIError),
} as const;
