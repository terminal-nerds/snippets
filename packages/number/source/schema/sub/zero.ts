import { z } from "zod";

export const SCHEMA_ZERO = z.literal(0);
export const SCHEMA_NON_ZERO = z.number().negative().or(z.number().positive());

export type Zero = ZeroNegative | ZeroPositive;
export type ZeroPositive = 0;
export type ZeroNegative = -0;

export function isZero(value: number): value is Zero {
	return SCHEMA_ZERO.safeParse(value).success;
}

export function isZeroNegative(value: number): value is ZeroNegative {
	validateZero(value);

	return Object.is(-0, value);
}

export function isZeroPositive(value: number): value is ZeroPositive {
	return !isZeroNegative(value);
}

export function isNonZero(value: number): value is number {
	return SCHEMA_NON_ZERO.safeParse(value).success;
}

export function validateZero(value: number): asserts value is Zero {
	SCHEMA_ZERO.parse(value);
}

export function validateNonZero(value: number): asserts value is number {
	SCHEMA_NON_ZERO.parse(value);
}
