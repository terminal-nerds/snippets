import { validateArrays } from "../../schema/sub/native.ts";

/** NOTE: It doesn't consider non-primitive types on items */
export function getArraysIntersection<ValueType>(
	left: ReadonlyArray<ValueType>,
	right: ReadonlyArray<ValueType>,
): Array<ValueType> {
	validateArrays(left, right);

	const setLeft = new Set(left);

	return [...new Set(right.filter((item) => setLeft.has(item)))];
}
