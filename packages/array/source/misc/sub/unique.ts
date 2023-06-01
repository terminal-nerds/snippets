import { validateArray } from "../../schema/sub/native.ts";

/** NOTE: It does not consider non-primitve items. */
export function removeDuplicates<ValueType>(array: ReadonlyArray<ValueType>): Array<ValueType> {
	validateArray(array);

	return [...new Set(array)];
}
