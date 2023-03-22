import { z } from "zod";

export const ZERO_SCHEMA = z.literal(0);

export type Zero = NegativeZero | PositiveZero;
export type PositiveZero = 0;
export type NegativeZero = -0;

export function validateZero(value: number): asserts value is Zero {
	ZERO_SCHEMA.parse(value);
}

export function isZero(value: number): value is Zero {
	return ZERO_SCHEMA.safeParse(value).success;
}

export function isNegativeZero(value: number): value is NegativeZero {
	validateZero(value);

	return Object.is(-0, value);
}

export function isPositiveZero(value: number): value is PositiveZero {
	return !isNegativeZero(value);
}
