import type { Float } from "type-fest/source/numeric";

/* import { z } from "zod"; */
import { isFiniteNumber } from "./finite";
import { isInteger } from "./integer";

export type { Float } from "type-fest/source/numeric";

/* export const FLOAT_NUMBER_SCHEMA = z.number().; */

/* export function validateFloatNumber<N extends number>(value: N): asserts value is Float<N> { */
/* 	FLOAT_NUMBER_SCHEMA.parse(value); */
/* } */

export function isFloat<N extends number>(value: N): value is Float<N> {
	return isFiniteNumber(value) && !isInteger(value);
}
