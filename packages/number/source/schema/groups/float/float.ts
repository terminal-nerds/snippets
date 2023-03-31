import type { Float } from "type-fest/source/numeric";
import { z } from "zod";

const FLOAT_NUMBER_SCHEMA = z.number().refine((n) => {
	return !z.number().int().safeParse(n).success && z.number().finite().safeParse(n).success;
}, "should not be an integer");

export type { Float } from "type-fest/source/numeric";

export function validateFloatNumber<N extends number>(value: N): asserts value is Float<N> {
	FLOAT_NUMBER_SCHEMA.parse(value);
}

export function isFloatNumber<N extends number>(value: N): value is Float<N> {
	return FLOAT_NUMBER_SCHEMA.safeParse(value).success;
}
