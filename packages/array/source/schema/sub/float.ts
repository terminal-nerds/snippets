import { BUILT_IN_OBJECTS_SCHEMAS } from "@terminal-nerds/snippets-type/built-in";

export const ARRAY_FLOAT_BITS = [32, 64] as const;
export type ArrayFloatBit = (typeof ARRAY_FLOAT_BITS)[number];

export const SCHEMA_ARRAY_FLOAT32 = BUILT_IN_OBJECTS_SCHEMAS.Float32Array;
export const SCHEMA_ARRAY_FLOAT64 = BUILT_IN_OBJECTS_SCHEMAS.Float64Array;

export function isArrayFloat32(value: unknown): value is Float32Array {
	return SCHEMA_ARRAY_FLOAT32.safeParse(value).success;
}

export function isArrayFloat64(value: unknown): value is Float64Array {
	return SCHEMA_ARRAY_FLOAT64.safeParse(value).success;
}

export function validateArrayFloat32(value: unknown): asserts value is Float32Array {
	SCHEMA_ARRAY_FLOAT32.safeParse(value);
}

export function validateArrayFloat64(value: unknown): asserts value is Float64Array {
	SCHEMA_ARRAY_FLOAT64.safeParse(value);
}
