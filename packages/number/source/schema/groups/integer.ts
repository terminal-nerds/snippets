import type { Integer } from "type-fest/source/numeric";
import { z } from "zod";

export type { Integer } from "type-fest/source/numeric";

export const INTEGER_SCHEMA = z.number().int();

export function validateInteger<N extends number>(value: N): asserts value is Integer<N> {
	INTEGER_SCHEMA.parse(value);
}

export function isInteger<N extends number>(value: N): value is Integer<N> {
	return INTEGER_SCHEMA.safeParse(value).success;
}
