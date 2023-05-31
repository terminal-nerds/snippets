import { validateArrays } from "../../schema/sub/native.ts";

/** NOTE: This doesn't consider non-primitive values. */
export function getArrayDifference<ValueType>(
	input: ReadonlyArray<ValueType>,
	...values: Array<ReadonlyArray<ValueType>>
): Array<ValueType> {
	validateArrays(input, ...values);

	const valuesSet = new Set(values.flat());

	return input.filter((value) => !valuesSet.has(value));
}

/** NOTE: This doesn't consider non-primitive values. */
export function getArraysSymmetricDifference<ValueType>(
	left: ReadonlyArray<ValueType>,
	right: ReadonlyArray<ValueType>,
): Array<ValueType> {
	validateArrays(left, right);

	const setLeft = new Set(left);
	const setRight = new Set(right);

	const differencesLeft = left.filter((x) => !setRight.has(x));
	const differencesRight = right.filter((x) => !setLeft.has(x));

	return [...differencesLeft, ...differencesRight];
}
