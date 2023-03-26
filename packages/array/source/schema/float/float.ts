import { BUILT_IN_OBJECTS_SCHEMAS } from "@terminal-nerds/snippets-type/built-in";

export const FLOAT_ARRAY_BITS = [32, 64] as const;
export type FloatArrayBit = (typeof FLOAT_ARRAY_BITS)[number];

export const FLOAT32_ARRAY_SCHEMA = BUILT_IN_OBJECTS_SCHEMAS.Float32Array;
export const FLOAT64_ARRAY_SCHEMA = BUILT_IN_OBJECTS_SCHEMAS.Float64Array;

export const FLOAT_ARRAY_SCHEMAS = {
	32: FLOAT32_ARRAY_SCHEMA,
	64: FLOAT64_ARRAY_SCHEMA,
} as const;

export type FloatArrays = {
	32: Float32Array;
	64: Float64Array;
};

export type FloatArray<Bit extends FloatArrayBit> = FloatArrays[Bit];

export interface FloatArrayOptions<Bit extends FloatArrayBit> {
	bit: Bit;
}

export function validateFloatArray<Bit extends FloatArrayBit>(
	value: unknown,
	options: FloatArrayOptions<Bit>,
): asserts value is FloatArray<Bit> {
	const { bit } = options;

	FLOAT_ARRAY_SCHEMAS[bit].parse(value);
}

export function isFloatArray<Bit extends FloatArrayBit>(
	value: unknown,
	options: FloatArrayOptions<Bit>,
): value is FloatArray<Bit> {
	const { bit } = options;

	return FLOAT_ARRAY_SCHEMAS[bit].safeParse(value).success;
}
