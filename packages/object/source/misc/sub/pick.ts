import { validateObject } from "../../schema/sub/native.ts";

export function pickObjectEntries<const O extends object, K extends keyof O>(object: O, keys: K[]): Pick<O, K> {
	validateObject(object);

	const keysSet = new Set(keys);

	return Object.fromEntries((Object.entries(object) as Array<[K, O[K]]>).filter(([key]) => keysSet.has(key))) as Pick<
		O,
		K
	>;
}
