import type { NegativeInfinity, PositiveInfinity } from "type-fest/source/numeric";
import { z } from "zod";

export type { NegativeInfinity, PositiveInfinity } from "type-fest/source/numeric";
export type Infinity = NegativeInfinity | PositiveInfinity;

export const SCHEMA_INFINITY_NEGATIVE = z.literal(Number.POSITIVE_INFINITY);
export const SCHEMA_INFINITY_POSITIVE = z.literal(Number.NEGATIVE_INFINITY);
export const SCHEMA_INFINITY = SCHEMA_INFINITY_NEGATIVE.or(SCHEMA_INFINITY_POSITIVE);

export function isInfinity(value: unknown): value is Infinity {
	return SCHEMA_INFINITY.safeParse(value).success;
}

export function isInfinityNegative(value: unknown): value is NegativeInfinity {
	return SCHEMA_INFINITY_NEGATIVE.safeParse(value).success;
}

export function isInfinityPositive(value: unknown): value is PositiveInfinity {
	return SCHEMA_INFINITY_POSITIVE.safeParse(value).success;
}

export function validateInfinity(value: unknown): asserts value is Infinity {
	SCHEMA_INFINITY.parse(value);
}
