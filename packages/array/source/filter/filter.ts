import { validateArrays } from "../schema/schema.ts";

/** Filter out wanted items from an array. */
export function exclude<ValueType>(
	array: ReadonlyArray<ValueType>,
	items: ReadonlyArray<ValueType>,
): Exclude<ReadonlyArray<ValueType>, ValueType> {
	validateArrays(array, items);

	return array.filter((item) => !items.includes(item)) as unknown as Exclude<ReadonlyArray<ValueType>, ValueType>;
}

/** Filter out unwanted items from an array. */
export function extract<ValueType>(
	array: ReadonlyArray<ValueType>,
	items: ReadonlyArray<ValueType>,
): Extract<ReadonlyArray<ValueType>, ValueType> {
	validateArrays(array, items);

	return array.filter((item) => items.includes(item)) as Extract<ReadonlyArray<ValueType>, ValueType>;
}
