import { z } from "zod";

export type NaN = typeof Number.NaN;

export const SCHEMA_NAN = z.nan();

export function isItNaN(value: number): value is NaN {
	return SCHEMA_NAN.safeParse(value).success;
}

export function validateNaN(value: number): asserts value is NaN {
	SCHEMA_NAN.parse(value);
}
