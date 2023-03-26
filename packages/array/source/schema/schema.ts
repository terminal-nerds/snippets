import { z } from "zod";

export const ARRAY_SCHEMA = z.array(z.any());

export type AnyArray = ReadonlyArray<unknown>;

export function validateArray(value: unknown): asserts value is AnyArray {
	ARRAY_SCHEMA.parse(value);
}

export function validateArrays(...arrays: AnyArray[]): void {
	for (const currentArray of arrays) {
		validateArray(currentArray);
	}
}
