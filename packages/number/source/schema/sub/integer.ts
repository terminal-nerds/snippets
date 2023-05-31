import type { Integer, Negative, NonNegative } from "type-fest/source/numeric";
import { z } from "zod";

export type { Integer } from "type-fest/source/numeric";

export const SCHEMA_NUMBER_INTEGER = z.number().int();
export const SCHEMA_NUMBER_INTEGER_NEGATIVE = z.number().int().negative();
export const SCHEMA_NUMBER_INTEGER_POSITIVE = z.number().int().positive();

export function isNumberInteger<N extends number>(value: N): value is Integer<N> {
	return SCHEMA_NUMBER_INTEGER.safeParse(value).success;
}

export function isNumberIntegerNegative<N extends number>(value: N): value is Negative<Integer<N>> {
	return SCHEMA_NUMBER_INTEGER_NEGATIVE.safeParse(value).success;
}

export function isNumberIntegerPositive<N extends number>(value: N): value is NonNegative<Integer<N>> {
	return SCHEMA_NUMBER_INTEGER_POSITIVE.safeParse(value).success;
}

export function validateNumberInteger<N extends number>(value: N): asserts value is Integer<N> {
	SCHEMA_NUMBER_INTEGER.parse(value);
}

export function validateNumberIntegerNegative<N extends number>(value: N): asserts value is Negative<Integer<N>> {
	SCHEMA_NUMBER_INTEGER_NEGATIVE.parse(value);
}

export function validateNumberIntegerPositive<N extends number>(value: N): asserts value is NonNegative<Integer<N>> {
	SCHEMA_NUMBER_INTEGER_POSITIVE.parse(value);
}
