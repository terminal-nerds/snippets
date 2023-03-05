import { z } from "zod";

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error} */
export const ERROR_SCHEMA = z.instanceof(Error);
/** @see {@link ERROR_SCHEMA} */
export function isError(error: unknown): error is Error {
	return ERROR_SCHEMA.safeParse(error).success;
}

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/EvalError} */
export const EVAL_ERROR_SCHEMA = z.instanceof(EvalError);
/** @see {@link EVAL_ERROR_SCHEMA} */
export function isEvalError(error: unknown): error is EvalError {
	return EVAL_ERROR_SCHEMA.safeParse(error).success;
}

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError} */
export const RANGE_ERROR_SCHEMA = z.instanceof(RangeError);
/** @see {@link RANGE_ERROR_SCHEMA} */
export function isRangeError(error: unknown): error is RangeError {
	return RANGE_ERROR_SCHEMA.safeParse(error).success;
}

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError} */
export const REFERENCE_ERROR_SCHEMA = z.instanceof(ReferenceError);
/** @see {@link REFERENCE_ERROR_SCHEMA} */
export function isReferenceError(error: unknown): error is ReferenceError {
	return REFERENCE_ERROR_SCHEMA.safeParse(error).success;
}

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError} */
export const SYNTAX_ERROR_SCHEMA = z.instanceof(SyntaxError);
/** @see {@link SYNTAX_ERROR_SCHEMA} */
export function isSyntaxError(error: unknown): error is SyntaxError {
	return SYNTAX_ERROR_SCHEMA.safeParse(error).success;
}

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError} */
export const TYPE_ERROR_SCHEMA = z.instanceof(TypeError);
/** @see {@link TYPE_ERROR_SCHEMA} */
export function isTypeError(error: unknown): error is TypeError {
	return TYPE_ERROR_SCHEMA.safeParse(error).success;
}

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/URIError} */
export const URI_ERROR_SCHEMA = z.instanceof(URIError);
/** @see {@link URI_ERROR_SCHEMA} */
export function isURIError(error: unknown): error is URIError {
	return URI_ERROR_SCHEMA.safeParse(error).success;
}
