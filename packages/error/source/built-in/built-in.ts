import { z } from "zod";

export const ERROR_SCHEMA = z.instanceof(Error);

export function isError(error: unknown): error is Error {
	return ERROR_SCHEMA.safeParse(error).success;
}

export const EVAL_ERROR_SCHEMA = z.instanceof(EvalError);

export function isEvalError(error: unknown): error is EvalError {
	return EVAL_ERROR_SCHEMA.safeParse(error).success;
}

export const RANGE_ERROR_SCHEMA = z.instanceof(RangeError);

export function isRangeError(error: unknown): error is RangeError {
	return RANGE_ERROR_SCHEMA.safeParse(error).success;
}

export const REFERENCE_ERROR_SCHEMA = z.instanceof(ReferenceError);

export function isReferenceError(error: unknown): error is ReferenceError {
	return REFERENCE_ERROR_SCHEMA.safeParse(error).success;
}

export const SYNTAX_ERROR_SCHEMA = z.instanceof(SyntaxError);

export function isSyntaxError(error: unknown): error is SyntaxError {
	return SYNTAX_ERROR_SCHEMA.safeParse(error).success;
}

export const TYPE_ERROR_SCHEMA = z.instanceof(TypeError);

export function isTypeError(error: unknown): error is TypeError {
	return TYPE_ERROR_SCHEMA.safeParse(error).success;
}

export const URI_ERROR_SCHEMA = z.instanceof(URIError);

export function isURIError(error: unknown): error is URIError {
	return URI_ERROR_SCHEMA.safeParse(error).success;
}
