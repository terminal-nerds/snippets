import type { NonNegative } from "type-fest/source/numeric";
import { z } from "zod";

export type { NonNegative } from "type-fest/source/numeric";

export const POSITIVE_NUMBER_SCHEMA = z.number().positive();
export const NON_NEGATIVE_NUMBER_SCHEMA = z.number().nonnegative();

export function validatePositiveNumber<N extends number>(value: N): asserts value is NonNegative<N> {
	POSITIVE_NUMBER_SCHEMA.parse(value);
}

export function isPositiveNumber<N extends number>(value: N): value is NonNegative<N> {
	return POSITIVE_NUMBER_SCHEMA.safeParse(value).success;
}

export function validateNonNegativeNumber<N extends number>(value: N): asserts value is NonNegative<N> {
	NON_NEGATIVE_NUMBER_SCHEMA.parse(value);
}

export function isNonNegativeNumber<N extends number>(value: N): value is NonNegative<N> {
	return NON_NEGATIVE_NUMBER_SCHEMA.safeParse(value).success;
}
