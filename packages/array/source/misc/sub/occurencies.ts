import { validateArray } from "../../schema/sub/native.ts";

export function getOccurenciesMap<const T>(array: readonly T[]): ReadonlyMap<T, number> {
	validateArray(array);

	const map = new Map<T, number>();

	for (const item of array) {
		if (map.has(item)) {
			map.set(item, (map.get(item) as number) + 1);
		} else {
			map.set(item, 1);
		}
	}

	return map;
}
