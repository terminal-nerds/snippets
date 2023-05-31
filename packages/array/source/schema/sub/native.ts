import { z } from "zod";

export const SCHEMA_ARRAY = z.array(z.any());

export type AnyArray = ReadonlyArray<unknown>;

export function validateArray(value: unknown): asserts value is AnyArray {
	SCHEMA_ARRAY.parse(value);
}

export function validateArrays(...arrays: AnyArray[]): void {
	for (const currentArray of arrays) {
		validateArray(currentArray);
	}
}
