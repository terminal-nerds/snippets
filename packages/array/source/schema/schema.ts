import { z } from "zod";

export const ARRAY_SCHEMA = z.array(z.any());

export type AnyArray = Array<unknown> | readonly unknown[];

export function validateArray(value: unknown): asserts value is AnyArray {
	ARRAY_SCHEMA.parse(value);
}
