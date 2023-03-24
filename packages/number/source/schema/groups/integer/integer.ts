import type { Integer, Negative, NonNegative } from "type-fest/source/numeric";
import { z } from "zod";

export type { Integer } from "type-fest/source/numeric";

export const INTEGER_SCHEMA = z.number().int();
export const NEGATIVE_INTEGER_SCHEMA = z.number().int().negative();
export const POSITIVE_INTEGER_SCHEMA = z.number().int().positive();

export function validateInteger<N extends number>(value: N): asserts value is Integer<N> {
	INTEGER_SCHEMA.parse(value);
}

export function validateNegativeInteger<N extends number>(value: N): asserts value is Negative<Integer<N>> {
	NEGATIVE_INTEGER_SCHEMA.parse(value);
}

export function validatePositiveInteger<N extends number>(value: N): asserts value is NonNegative<Integer<N>> {
	POSITIVE_INTEGER_SCHEMA.parse(value);
}

export function isInteger<N extends number>(value: N): value is Integer<N> {
	return INTEGER_SCHEMA.safeParse(value).success;
}

export function isNegativeInteger<N extends number>(value: N): value is Negative<Integer<N>> {
	return NEGATIVE_INTEGER_SCHEMA.safeParse(value).success;
}

export function isPositiveInteger<N extends number>(value: N): value is NonNegative<Integer<N>> {
	return POSITIVE_INTEGER_SCHEMA.safeParse(value).success;
}
