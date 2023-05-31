import deepEqual from "fast-deep-equal/es6/react";

import { validateArrays } from "../../schema/sub/native.ts";

export function areArraysEqual<ValueType>(left: ReadonlyArray<ValueType>, right: ReadonlyArray<ValueType>): boolean {
	validateArrays(left, right);

	return left.length === right.length ? deepEqual(left, right) : false;
}

/**
 * Check whether the arrays has same items, but in a different order.
 */
export function areArraysItemsSame<ValueType>(
	left: ReadonlyArray<ValueType>,
	right: ReadonlyArray<ValueType>,
): boolean {
	validateArrays(left, right);

	return left.length === right.length ? deepEqual((left as []).sort(), (right as []).sort()) : false;
}
