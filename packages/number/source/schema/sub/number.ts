import { z } from "zod";

export const SCHEMA_NUMBER = z.number();

/** NOTE: `NaN` is not considered as a number. */
export function validateNumber(value: unknown): asserts value is number {
	SCHEMA_NUMBER.parse(value);
}

/** NOTE: `NaN` is not considered as a number. */
export function isNumber(value: unknown): value is number {
	return SCHEMA_NUMBER.safeParse(value).success;
}
