import { validateArrays } from "../../schema/sub/native.ts";

export function getArraysUnion<T extends readonly unknown[]>(..._arguments: readonly T[]): T {
	validateArrays(..._arguments);

	return [...new Set(_arguments.flat())] as unknown as T;
}
