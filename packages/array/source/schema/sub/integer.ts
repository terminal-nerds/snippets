import { BUILT_IN_OBJECTS_SCHEMAS } from "@terminal-nerds/snippets-type/built-in";

export const ARRAY_INT_TYPES = ["signed", "unsigned"] as const;
export type ArrayIntType = (typeof ARRAY_INT_TYPES)[number];

export const ARRAY_INT_BITS = [8, 16, 32] as const;
export type ArrayIntBit = (typeof ARRAY_INT_BITS)[number];

export const ARRAY_INT_CATEGORIES = ["clamped", "standard"] as const;
export type IntegerArrayCategory = (typeof ARRAY_INT_CATEGORIES)[number];

export const SCHEMA_ARRAY_INT8 = BUILT_IN_OBJECTS_SCHEMAS.Int8Array;
export const SCHEMA_ARRAY_INT16 = BUILT_IN_OBJECTS_SCHEMAS.Int16Array;
export const SCHEMA_ARRAY_INT32 = BUILT_IN_OBJECTS_SCHEMAS.Int32Array;

export function isArrayInt8(value: unknown): value is Int8Array {
	return SCHEMA_ARRAY_INT8.safeParse(value).success;
}

export function isArrayInt16(value: unknown): value is Int16Array {
	return SCHEMA_ARRAY_INT16.safeParse(value).success;
}

export function isArrayInt32(value: unknown): value is Int32Array {
	return SCHEMA_ARRAY_INT32.safeParse(value).success;
}

export function validateArrayInt8(value: unknown): asserts value is Int8Array {
	SCHEMA_ARRAY_INT8.parse(value);
}

export function validateArrayInt16(value: unknown): asserts value is Int16Array {
	SCHEMA_ARRAY_INT16.parse(value);
}

export function validateArrayInt32(value: unknown): asserts value is Int32Array {
	SCHEMA_ARRAY_INT32.parse(value);
}

export const SCHEMA_ARRAY_UINT8 = BUILT_IN_OBJECTS_SCHEMAS.Uint8Array;
export const SCHEMA_ARRAY_UINT8_CLAMPED = BUILT_IN_OBJECTS_SCHEMAS.Uint8ClampedArray;
export const SCHEMA_ARRAY_UINT16 = BUILT_IN_OBJECTS_SCHEMAS.Uint16Array;
export const SCHEMA_ARRAY_UINT32 = BUILT_IN_OBJECTS_SCHEMAS.Uint32Array;

export function isArrayUint8(value: unknown): value is Uint8Array {
	return SCHEMA_ARRAY_UINT8.safeParse(value).success;
}

export function isArrayUint16(value: unknown): value is Uint16Array {
	return SCHEMA_ARRAY_UINT16.safeParse(value).success;
}

export function isArrayUint32(value: unknown): value is Uint32Array {
	return SCHEMA_ARRAY_UINT32.safeParse(value).success;
}

export function validateArrayUint8(value: unknown): asserts value is Uint8Array {
	SCHEMA_ARRAY_UINT8.parse(value);
}

export function validateArrayUint16(value: unknown): asserts value is Uint16Array {
	SCHEMA_ARRAY_UINT16.parse(value);
}

export function validateArrayUint32(value: unknown): asserts value is Uint32Array {
	SCHEMA_ARRAY_UINT32.parse(value);
}
