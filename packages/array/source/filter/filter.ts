import { type AnyArray, validateArray } from "../schema/schema.ts";

/** Filter out wanted items from an array. */
export function exclude<Array extends AnyArray, Items extends AnyArray>(
	array: Array,
	items: Items,
): Extract<Array, Items> {
	validateArray(array);
	validateArray(items);

	return array.filter((item) => !items.includes(item)) as Extract<Array, Items>;
}

/** Filter out unwanted items from an array. */
export function extract<Array extends AnyArray, Items extends AnyArray>(
	array: Array,
	items: Items,
): Exclude<Array, Items> {
	validateArray(array);
	validateArray(items);

	return array.filter((item) => items.includes(item)) as Exclude<Array, Items>;
}
