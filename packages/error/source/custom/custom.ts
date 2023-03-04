/**
 * FIXME: There's a bug with pnpm and TypeScript, this a workaround.
 *
 * @see {@link https://github.com/microsoft/TypeScript/issues/42873}
 */
import type {} from "modern-errors";
import ModernError from "modern-errors";
import { ZodError } from "zod";

export function isError(error: unknown): error is Error {
	return error instanceof Error;
}

export const RuntimeError: typeof ModernError = ModernError.subclass("RuntimeError", {
	props: {
		isRuntimeError: true,
	},
});

export function isRuntimeError(error: unknown): error is typeof RuntimeError {
	return error instanceof RuntimeError;
}

export const ValidationError = ZodError;

export function isValidationError(error: unknown): error is typeof ValidationError {
	return error instanceof ValidationError;
}
