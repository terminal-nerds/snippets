import { z } from "zod";

export type MaxSafeInteger = 9_007_199_254_740_991;
export type MinSafeInteger = -9_007_199_254_740_991;

export const SAFE_NUMBER_SCHEMA = z.number().safe();
export const MAX_SAFE_NUMBER_SCHEMA = z.literal(Number.MAX_SAFE_INTEGER as MaxSafeInteger);
export const MIN_SAFE_NUMBER_SCHEMA = z.literal(Number.MIN_SAFE_INTEGER as MinSafeInteger);

export function validateSafeNumber(value: number): asserts value is number {
	SAFE_NUMBER_SCHEMA.parse(value);
}

export function isSafeNumber(value: number): value is number {
	return SAFE_NUMBER_SCHEMA.safeParse(value).success;
}

export function validateMaxSafeNumber(value: number): asserts value is MaxSafeInteger {
	MAX_SAFE_NUMBER_SCHEMA.parse(value);
}

export function isMaxSafeNumber(value: number): value is MaxSafeInteger {
	return MAX_SAFE_NUMBER_SCHEMA.safeParse(value).success;
}

export function validateMinSafeNumber(value: number): asserts value is MinSafeInteger {
	MIN_SAFE_NUMBER_SCHEMA.parse(value);
}

export function isMinSafeNumber(value: number): value is MinSafeInteger {
	return MIN_SAFE_NUMBER_SCHEMA.safeParse(value).success;
}
