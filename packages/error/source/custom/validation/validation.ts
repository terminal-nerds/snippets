import { z, ZodError } from "zod";

/** Error related to the type validation. */
export const ValidationError = ZodError;
/** @see {@link ValidationError} */
export const VALIDATION_ERROR_SCHEMA = z.instanceof(ValidationError);
/** @see {@link ValidationError} */
export function isValidationError(error: unknown): error is typeof ValidationError {
	return VALIDATION_ERROR_SCHEMA.safeParse(error).success;
}
