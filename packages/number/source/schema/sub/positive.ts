import type { NonNegative } from "type-fest/source/numeric";
import { z } from "zod";

export type { NonNegative } from "type-fest/source/numeric";

export const SCHEMA_NUMBER_NON_NEGATIVE = z.number().nonnegative();
export const SCHEMA_NUMBER_POSITIVE = z.number().positive();

export function isNumberNonNegative<N extends number>(value: N): value is NonNegative<N> {
	return SCHEMA_NUMBER_NON_NEGATIVE.safeParse(value).success;
}

export function isNumberPositive<N extends number>(value: N): value is NonNegative<N> {
	return SCHEMA_NUMBER_POSITIVE.safeParse(value).success;
}

export function validateNumberNonNegative<N extends number>(value: N): asserts value is NonNegative<N> {
	SCHEMA_NUMBER_NON_NEGATIVE.parse(value);
}

export function validateNumberPositive<N extends number>(value: N): asserts value is NonNegative<N> {
	SCHEMA_NUMBER_POSITIVE.parse(value);
}
