import { validateObject } from "../../schema/sub/native.ts";

export function omitObjectEntries<const O extends object, K extends keyof O>(object: O, keys: K[]): Omit<O, K> {
	validateObject(object);

	const keysSet = new Set(keys);

	return Object.fromEntries(
		(Object.entries(object) as Array<[K, O[K]]>).filter(([key]) => !keysSet.has(key)),
	) as unknown as Omit<O, K>;
}
