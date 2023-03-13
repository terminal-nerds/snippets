import { z } from "zod";

/** @see {@link INDEXED_COLLECTION_BUILT_IN_OBJECTS} */
export const INDEXED_COLLECTION_BUILT_IN_OBJECTS_NAMES = [
	"Array",
	"Int8Array",
	"Uint8Array",
	"Uint8ClampedArray",
	"Int16Array",
	"Uint16Array",
	"Int32Array",
	"Uint32Array",
	"BigInt64Array",
	"BigUint64Array",
	"Float32Array",
	"Float64Array",
] as const;

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#indexed_collections} */
export const INDEXED_COLLECTION_BUILT_IN_OBJECTS = {
	Array: Array,
	Int8Array: Int8Array,
	Uint8Array: Uint8Array,
	Uint8ClampedArray: Uint8ClampedArray,
	Int16Array: Int16Array,
	Uint16Array: Uint16Array,
	Int32Array: Int32Array,
	Uint32Array: Uint32Array,
	BigInt64Array: BigInt64Array,
	BigUint64Array: BigUint64Array,
	Float32Array: Float32Array,
	Float64Array: Float64Array,
} as const;

export type IndexedCollectionBuiltInObjectName = keyof typeof INDEXED_COLLECTION_BUILT_IN_OBJECTS;
export type IndexedCollectionBuiltInObject =
	(typeof INDEXED_COLLECTION_BUILT_IN_OBJECTS)[IndexedCollectionBuiltInObjectName];

export const INDEXED_COLLECTION_BUILT_IN_OBJECT_NAME_SCHEMA = z.enum(INDEXED_COLLECTION_BUILT_IN_OBJECTS_NAMES);

export const INDEXED_COLLECTION_BUILT_IN_OBJECTS_SCHEMAS = {
	Array: z.instanceof(Array),
	Int8Array: z.instanceof(Int8Array),
	Uint8Array: z.instanceof(Uint8Array),
	Uint8ClampedArray: z.instanceof(Uint8ClampedArray),
	Int16Array: z.instanceof(Int16Array),
	Uint16Array: z.instanceof(Uint16Array),
	Int32Array: z.instanceof(Int32Array),
	Uint32Array: z.instanceof(Uint32Array),
	BigInt64Array: z.instanceof(BigInt64Array),
	BigUint64Array: z.instanceof(BigUint64Array),
	Float32Array: z.instanceof(Float32Array),
	Float64Array: z.instanceof(Float64Array),
} as const;
