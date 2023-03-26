import { validateArray } from "../schema/schema.ts";

/** NOTE: It does not consider non-primitve items. */
export function getArrayUniques<ValueType>(array: ReadonlyArray<ValueType>): Array<ValueType> {
	validateArray(array);

	return [...new Set(array)];
}
