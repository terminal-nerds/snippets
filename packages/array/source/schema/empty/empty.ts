import { ARRAY_SCHEMA, validateArray } from "../native/native.ts";

export const EMPTY_ARRAY_SCHEMA = ARRAY_SCHEMA.length(0);

export type EmptyArray = [];

export function validateEmptyArray(array: Array<unknown> | readonly unknown[]): asserts array is EmptyArray {
	EMPTY_ARRAY_SCHEMA.parse(array);
}

export function isEmptyArray(array: Array<unknown> | readonly unknown[]): array is EmptyArray {
	validateArray(array);

	return EMPTY_ARRAY_SCHEMA.safeParse(array).success;
}
