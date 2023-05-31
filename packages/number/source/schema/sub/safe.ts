import { z } from "zod";

export const SCHEMA_NUMBER_SAFE = z.number().safe();

export function isNumberSafe(value: unknown): value is number {
	return SCHEMA_NUMBER_SAFE.safeParse(value).success;
}

export function validateNumberSafe(value: unknown): asserts value is number {
	SCHEMA_NUMBER_SAFE.parse(value);
}

export type IntegerSafeMax = 9_007_199_254_740_991;
export type IntegerSafeMin = -9_007_199_254_740_991;

export const SCHEMA_INTEGER_SAFE_MAX = z.literal(Number.MAX_SAFE_INTEGER as IntegerSafeMax);
export const SCHEMA_INTEGER_SAFE_MIN = z.literal(Number.MIN_SAFE_INTEGER as IntegerSafeMin);

export function isIntegerSafeMax(value: unknown): value is IntegerSafeMax {
	return SCHEMA_INTEGER_SAFE_MAX.safeParse(value).success;
}

export function isIntegerSafeMin(value: unknown): value is IntegerSafeMin {
	return SCHEMA_INTEGER_SAFE_MIN.safeParse(value).success;
}

export function validateIntegerSafeMax(value: unknown): asserts value is IntegerSafeMax {
	SCHEMA_INTEGER_SAFE_MAX.parse(value);
}

export function validatIntegerSafeMin(value: unknown): asserts value is IntegerSafeMin {
	SCHEMA_INTEGER_SAFE_MIN.parse(value);
}
