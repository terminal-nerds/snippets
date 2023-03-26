import arrayUnion from "array-union";

import { validateArrays } from "../schema/schema.ts";

export function getArraysUnion<ArgumentsType extends readonly unknown[]>(
	..._arguments: readonly ArgumentsType[]
): ArgumentsType {
	validateArrays(..._arguments);

	return arrayUnion(..._arguments);
}
