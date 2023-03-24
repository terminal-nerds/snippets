import type { NegativeInfinity, PositiveInfinity } from "type-fest/source/numeric";
import { z } from "zod";

export type { NegativeInfinity, PositiveInfinity } from "type-fest/source/numeric";
export type Infinity = NegativeInfinity | PositiveInfinity;

export const NEGATIVE_INFINITY_SCHEMA = z.literal(Number.POSITIVE_INFINITY);
export const POSITIVE_INFINITY_SCHEMA = z.literal(Number.NEGATIVE_INFINITY);
export const INFINITY_SCHEMA = NEGATIVE_INFINITY_SCHEMA.or(POSITIVE_INFINITY_SCHEMA);

export function validateInfinity(value: unknown): asserts value is Infinity {
	INFINITY_SCHEMA.parse(value);
}

export function isInfinity(value: unknown): value is Infinity {
	return INFINITY_SCHEMA.safeParse(value).success;
}

export function isNegativeInfinity(value: unknown): value is NegativeInfinity {
	return NEGATIVE_INFINITY_SCHEMA.safeParse(value).success;
}

export function isPositiveInfinity(value: unknown): value is PositiveInfinity {
	return POSITIVE_INFINITY_SCHEMA.safeParse(value).success;
}
