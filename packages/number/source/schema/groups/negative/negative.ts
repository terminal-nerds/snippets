import type { Negative } from "type-fest/source/numeric";
import { z } from "zod";

export type { Negative } from "type-fest/source/numeric";

export const NEGATIVE_NUMBER_SCHEMA = z.number().negative();
export const NON_POSITIVE_NUMBER_SCHEMA = z.number().nonpositive();

export function validateNegativeNumber<N extends number>(value: N): asserts value is Negative<N> {
	NEGATIVE_NUMBER_SCHEMA.parse(value);
}

export function isNegativeNumber<N extends number>(value: N): value is Negative<N> {
	return NEGATIVE_NUMBER_SCHEMA.safeParse(value).success;
}

export function validateNonPositiveNumber<N extends number>(value: N): asserts value is Negative<N> {
	NON_POSITIVE_NUMBER_SCHEMA.parse(value);
}

export function isNonPositiveNumber<N extends number>(value: N): value is Negative<N> {
	return NON_POSITIVE_NUMBER_SCHEMA.safeParse(value).success;
}
