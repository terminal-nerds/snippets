import { validateArrays } from "../../schema/sub/native.ts";

/** Get selected items from an array. */
export function extractArrayItems<const T, const I extends readonly T[]>(
	array: readonly T[],
	items: I,
): Extract<T, I[number]>[] {
	validateArrays(array, items);

	const itemsSet = new Set(items);

	return array.filter((item) => itemsSet.has(item)) as Extract<T, I[number]>[];
}
