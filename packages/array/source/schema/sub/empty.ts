import { SCHEMA_ARRAY } from "./native.ts";

export const SCHEMA_ARRAY_EMPTY = SCHEMA_ARRAY.length(0);

export type ArrayEmpty = [];

export function validateArrayEmpty(array: Array<unknown> | readonly unknown[]): asserts array is ArrayEmpty {
	SCHEMA_ARRAY_EMPTY.parse(array);
}

export function isArrayEmpty(array: Array<unknown> | readonly unknown[]): array is ArrayEmpty {
	return SCHEMA_ARRAY_EMPTY.safeParse(array).success;
}
