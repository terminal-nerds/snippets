import { z } from "zod";

export type NaN = typeof Number.NaN;

export const NAN_SCHEMA = z.nan();

export function validateNaN(value: number): asserts value is NaN {
	NAN_SCHEMA.parse(value);
}

export function isItNaN(value: number): value is NaN {
	return NAN_SCHEMA.safeParse(value).success;
}
