import type { Finite } from "type-fest/source/numeric";
import { z } from "zod";

export type { Finite } from "type-fest/source/numeric";

export const SCHEMA_NUMBER_FINITE = z.number().finite();

export function validateNumberFinite<N extends number>(value: N): asserts value is Finite<N> {
	SCHEMA_NUMBER_FINITE.parse(value);
}

export function isNumberFinite<N extends number>(value: N): value is Finite<N> {
	return SCHEMA_NUMBER_FINITE.safeParse(value).success;
}
