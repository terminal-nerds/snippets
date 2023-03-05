/**
 * FIXME: There's a bug with pnpm and TypeScript, this a workaround.
 *
 * @see {@link https://github.com/microsoft/TypeScript/issues/42873}
 */
import type {} from "modern-errors";
import ModernError from "modern-errors";
import { z, ZodError } from "zod";

export const RuntimeError: typeof ModernError = ModernError.subclass("RuntimeError", {
	props: {
		bun: typeof globalThis.Bun,
		deno: typeof globalThis.Deno,
		process: typeof globalThis.process,
		window: typeof globalThis.window,
	},
});
export const RUNTIME_ERROR_SCHEMA: ReturnType<typeof z.instanceof<typeof RuntimeError>> = z.instanceof(RuntimeError);

export function isRuntimeError(error: unknown): error is typeof RuntimeError {
	return RUNTIME_ERROR_SCHEMA.safeParse(error).success;
}

export const ValidationError = ZodError;
export const VALIDATION_ERROR_SCHEMA = z.instanceof(ValidationError);

export function isValidationError(error: unknown): error is typeof ValidationError {
	return VALIDATION_ERROR_SCHEMA.safeParse(error).success;
}
