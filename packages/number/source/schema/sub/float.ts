import type { Float } from "type-fest/source/numeric";
import { z } from "zod";

const SCHEMA_NUMBER_FLOAT = z.number().refine((n) => {
	return !z.number().int().safeParse(n).success && z.number().finite().safeParse(n).success;
}, "should not be an integer");

export type { Float } from "type-fest/source/numeric";

export function isNumberFloat<N extends number>(value: N): value is Float<N> {
	return SCHEMA_NUMBER_FLOAT.safeParse(value).success;
}

export function validateNumberFloat<N extends number>(value: N): asserts value is Float<N> {
	SCHEMA_NUMBER_FLOAT.parse(value);
}
