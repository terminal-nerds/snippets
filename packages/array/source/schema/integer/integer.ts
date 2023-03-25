import { BUILT_IN_OBJECTS_SCHEMAS } from "@terminal-nerds/snippets-type/built-in";

export const INTEGER_ARRAY_TYPES = ["signed", "unsigned"] as const;
export type IntegerArrayType = (typeof INTEGER_ARRAY_TYPES)[number];

export const INTEGER_ARRAY_BITS = [8, 16, 32] as const;
export type IntegerArrayBit = (typeof INTEGER_ARRAY_BITS)[number];

export const INTEGER_ARRAY_CATEGORIES = ["clamped", "standard"] as const;
export type IntegerArrayCategory = (typeof INTEGER_ARRAY_CATEGORIES)[number];

export const INT8_ARRAY_SCHEMA = BUILT_IN_OBJECTS_SCHEMAS.Int8Array;
export const INT16_ARRAY_SCHEMA = BUILT_IN_OBJECTS_SCHEMAS.Int16Array;
export const INT32_ARRAY_SCHEMA = BUILT_IN_OBJECTS_SCHEMAS.Int32Array;

export const INT_ARRAY_SCHEMAS = {
	8: { standard: INT8_ARRAY_SCHEMA },
	16: { standard: INT16_ARRAY_SCHEMA },
	32: { standard: INT32_ARRAY_SCHEMA },
} as const;

export const UINT8_ARRAY_SCHEMA = BUILT_IN_OBJECTS_SCHEMAS.Uint8Array;
export const UINT8_CLAMPED_ARRAY_SCHEMA = BUILT_IN_OBJECTS_SCHEMAS.Uint8ClampedArray;
export const UINT16_ARRAY_SCHEMA = BUILT_IN_OBJECTS_SCHEMAS.Uint16Array;
export const UINT32_ARRAY_SCHEMA = BUILT_IN_OBJECTS_SCHEMAS.Uint32Array;

export const UINT_ARRAY_SCHEMAS = {
	8: { standard: UINT8_ARRAY_SCHEMA, clamped: UINT8_CLAMPED_ARRAY_SCHEMA },
	16: { standard: UINT16_ARRAY_SCHEMA },
	32: { standard: UINT32_ARRAY_SCHEMA },
} as const;

export const INTEGER_ARRAY_SCHEMAS = {
	signed: INT_ARRAY_SCHEMAS,
	unsigned: UINT_ARRAY_SCHEMAS,
} as const;

export interface IntegerArrays {
	signed: {
		8: { standard: Int8Array };
		16: { standard: Int16Array };
		32: { standard: Int32Array };
	};
	unsigned: {
		8: { standard: Uint8Array; clamped: Uint8ClampedArray };
		16: { standard: Uint16Array };
		32: { standard: Uint32Array };
	};
}

export type IntArray<Bit extends IntegerArrayBit> = IntegerArrays["signed"][Bit]["standard"];
export type UintArray<Bit extends IntegerArrayBit, Category extends IntegerArrayCategory> = Bit extends 8
	? IntegerArrays["unsigned"][8][Category]
	: IntegerArrays["unsigned"][Bit]["standard"];
export type IntegerArray<
	Type extends IntegerArrayType,
	Bit extends IntegerArrayBit,
	Category extends IntegerArrayCategory = Type extends "unsigned"
		? Bit extends 8
			? IntegerArrayCategory
			: "standard"
		: "standard",
> = Type extends "signed" ? IntArray<Bit> : Type extends "unsigned" ? UintArray<Bit, Category> : never;

type IntArrayOptions<Type extends IntegerArrayType, Bit extends IntegerArrayBit> = {
	type: Type;
	bit: Bit;
};

type Uint8ArrayOptions<Clamped extends boolean | undefined = undefined> = {
	type: "unsigned";
	clamped?: Clamped;
	bit: 8;
};

export type IntegerArrayOptions<
	Type extends IntegerArrayType,
	Bit extends IntegerArrayBit,
	Clamped extends boolean | undefined = undefined,
> = Type extends "unsigned"
	? Bit extends 8
		? Uint8ArrayOptions<Type extends "unsigned" ? (Bit extends 8 ? Clamped : undefined) : undefined>
		: IntArrayOptions<Type, Bit>
	: IntArrayOptions<Type, Bit>;

export function isUnsigned(type: IntegerArrayType): type is "unsigned" {
	return type === "unsigned";
}

export function is8Bit(bit: IntegerArrayBit): bit is 8 {
	return bit === 8;
}

/**
 * FIXME:
 * There's an unwanted case, where the passed options -`{ type: "standard", bit: 8 }`
 * the return value will be: `Uint8Array` | `Uint8ClampedArray`.
 * What is expected: it should pick one, and base it on the `clamped` optional key in options.
 */
export function validateIntegerArray<
	Type extends IntegerArrayType,
	Bit extends IntegerArrayBit,
	Clamped extends boolean | undefined = undefined,
>(
	value: unknown,
	options: IntegerArrayOptions<Type, Bit, Clamped>,
): asserts value is IntegerArray<Type, Bit, IntegerArrayCategory> {
	const { type, bit } = options;

	if (isUnsigned(type) && is8Bit(bit)) {
		const { clamped = false } = options as IntegerArrayOptions<"unsigned", 8, Clamped>;

		INTEGER_ARRAY_SCHEMAS[type][bit][clamped ? "clamped" : "standard"].parse(value);
	} else {
		INTEGER_ARRAY_SCHEMAS[type][bit]["standard"].parse(value);
	}
}

/**
 * FIXME:
 * There's an unwanted case, where the passed options -`{ type: "standard", bit: 8 }`
 * the return value will be: `Uint8Array` | `Uint8ClampedArray`.
 * What is expected: it should pick one, and base it on the `clamped` optional key in options.
 */
export function isIntegerArray<
	Type extends IntegerArrayType,
	Bit extends IntegerArrayBit,
	Clamped extends boolean | undefined = undefined,
>(
	value: unknown,
	options: IntegerArrayOptions<Type, Bit, Clamped>,
): value is IntegerArray<Type, Bit, IntegerArrayCategory> {
	const { type, bit } = options;

	if (isUnsigned(type) && is8Bit(bit)) {
		const { clamped = false } = options as IntegerArrayOptions<"unsigned", 8, Clamped>;

		return INTEGER_ARRAY_SCHEMAS[type][bit][clamped ? "clamped" : "standard"].safeParse(value).success;
	} else {
		return INTEGER_ARRAY_SCHEMAS[type][bit]["standard"].safeParse(value).success;
	}
}
