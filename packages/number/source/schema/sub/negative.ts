import type { Negative } from "type-fest/source/numeric";
import { z } from "zod";

export type { Negative } from "type-fest/source/numeric";

export const SCHEMA_NUMBER_NEGATIVE = z.number().negative();
export const SCHEMA_NUMBER_NON_POSITIVE = z.number().nonpositive();

export function isNumberNegative<N extends number>(value: N): value is Negative<N> {
	return SCHEMA_NUMBER_NEGATIVE.safeParse(value).success;
}

export function isNumberNonPositive<N extends number>(value: N): value is Negative<N> {
	return SCHEMA_NUMBER_NON_POSITIVE.safeParse(value).success;
}

export function validatNumberNegative<N extends number>(value: N): asserts value is Negative<N> {
	SCHEMA_NUMBER_NEGATIVE.parse(value);
}

export function validateNumberNonPositive<N extends number>(value: N): asserts value is Negative<N> {
	SCHEMA_NUMBER_NON_POSITIVE.parse(value);
}
