import type { Finite } from "type-fest/source/numeric";
import { z } from "zod";

export type { Finite } from "type-fest/source/numeric";

export const FINITE_NUMBER_SCHEMA = z.number().finite();

export function validateFiniteNumber<N extends number>(value: N): asserts value is Finite<N> {
	FINITE_NUMBER_SCHEMA.parse(value);
}

export function isFiniteNumber<N extends number>(value: N): value is Finite<N> {
	return FINITE_NUMBER_SCHEMA.safeParse(value).success;
}
