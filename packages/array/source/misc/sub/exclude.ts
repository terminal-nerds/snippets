import { validateArrays } from "../../schema/sub/native.ts";

/** Get selected items from an array. */
export function excludeArrayItems<const T, const I extends readonly T[]>(
	array: readonly T[],
	items: I,
): Exclude<T, I[number]>[] {
	validateArrays(array, items);

	const itemsSet = new Set(items);

	return array.filter((item) => !itemsSet.has(item)) as Exclude<T, I[number]>[];
}
