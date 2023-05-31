import { BUILT_IN_OBJECTS_SCHEMAS } from "@terminal-nerds/snippets-type/built-in";

export const ARRAY_BIGINT64_TYPES = ["signed", "unsigned"] as const;
export type ArrayBigIntType = (typeof ARRAY_BIGINT64_TYPES)[number];

export const SCHEMA_ARRAY_BIGINT64 = BUILT_IN_OBJECTS_SCHEMAS.BigInt64Array;
export const SCHEMA_ARRAY_BIGUINT64 = BUILT_IN_OBJECTS_SCHEMAS.BigUint64Array;

export function isArrayBigInt64(value: unknown): value is BigInt64Array {
	return SCHEMA_ARRAY_BIGINT64.safeParse(value).success;
}

export function isArrayBigUint64(value: unknown): value is BigUint64Array {
	return SCHEMA_ARRAY_BIGUINT64.safeParse(value).success;
}

export function validateArrayBigInt64(value: unknown): asserts value is BigInt64Array {
	SCHEMA_ARRAY_BIGINT64.safeParse(value);
}

export function validateArrayBigUint64(value: unknown): asserts value is BigUint64Array {
	SCHEMA_ARRAY_BIGUINT64.safeParse(value);
}
