import { BUILT_IN_OBJECTS_SCHEMAS } from "@terminal-nerds/snippets-type/built-in";

export const BIGINT_ARRAY_TYPES = ["signed", "unsigned"] as const;
export type BigIntArrayType = (typeof BIGINT_ARRAY_TYPES)[number];

export const BIGINT64_ARRAY_SCHEMA = BUILT_IN_OBJECTS_SCHEMAS.BigInt64Array;
export const BIGUINT64_ARRAY_SCHEMA = BUILT_IN_OBJECTS_SCHEMAS.BigUint64Array;

export const BIGINT_ARRAY_SCHEMAS = {
	signed: BIGINT64_ARRAY_SCHEMA,
	unsigned: BIGUINT64_ARRAY_SCHEMA,
} as const;

export interface BigIntArrays {
	signed: BigInt64Array;
	unsigned: BigUint64Array;
}

export type BigIntArray<Type extends BigIntArrayType> = BigIntArrays[Type];

type BigIntArrayOptions<Type extends BigIntArrayType> = {
	type: Type;
};

export function validateBigIntArray<Type extends BigIntArrayType>(
	value: unknown,
	options: BigIntArrayOptions<Type>,
): asserts value is BigIntArray<Type> {
	const { type } = options;

	BIGINT_ARRAY_SCHEMAS[type].parse(value);
}

export function isBigIntArray<Type extends BigIntArrayType>(
	value: unknown,
	options: BigIntArrayOptions<Type>,
): value is BigIntArray<Type> {
	const { type } = options;

	return BIGINT_ARRAY_SCHEMAS[type].safeParse(value).success;
}
