import { z } from "zod";

import { getConstructorName } from "../constructor/constructor.js";

/** @see {@link FUNDAMENTAL_BUILT_IN_OBJECTS_NAMES} */
export const FUNDAMENTAL_BUILT_IN_OBJECTS_NAMES = ["Boolean", "Function", "Object", "Symbol"] as const;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#fundamental_objects} */
export const FUNDAMENTAL_BUILT_IN_OBJECTS = {
	Boolean: Boolean,
	Function: Function,
	Object: Object,
	Symbol: Symbol,
} as const;
export type FundamentalBuiltInObjectName = keyof typeof FUNDAMENTAL_BUILT_IN_OBJECTS;
export type FundamentalBuiltInObject = (typeof FUNDAMENTAL_BUILT_IN_OBJECTS)[FundamentalBuiltInObjectName];
export const FUNDAMENTAL_BUILT_IN_OBJECT_NAME_SCHEMA = z.enum(FUNDAMENTAL_BUILT_IN_OBJECTS_NAMES);
export const FUNDAMENTAL_BUILT_IN_OBJECTS_SCHEMAS = {
	Boolean: z.instanceof(Boolean),
	Function: z.instanceof(Function),
	Object: z.instanceof(Object),
	Symbol: z.symbol(), // NOTE: Symbol is not a contructor
} as const;

/** @see {@link ERROR_BUILT_IN_OBJECTS} */
export const ERROR_BUILT_IN_OBJECTS_NAMES = [
	"Error",
	"AggregateError",
	"EvalError",
	"RangeError",
	"ReferenceError",
	"SyntaxError",
	"TypeError",
	"URIError",
] as const;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#error_objects} */
export const ERROR_BUILT_IN_OBJECTS = {
	Error: Error,
	AggregateError: AggregateError,
	EvalError: EvalError,
	RangeError: RangeError,
	ReferenceError: ReferenceError,
	SyntaxError: SyntaxError,
	TypeError: TypeError,
	URIError: URIError,
} as const;
export type ErrorBuiltInObjectName = keyof typeof ERROR_BUILT_IN_OBJECTS;
export type ErrorBuiltInObject = (typeof ERROR_BUILT_IN_OBJECTS)[ErrorBuiltInObjectName];
export const ERROR_BUILT_IN_OBJECT_NAMES_SCHEMA = z.enum(ERROR_BUILT_IN_OBJECTS_NAMES);
export const ERROR_BUILT_IN_OBJECTS_SCHEMAS = {
	Error: z.instanceof(Error),
	AggregateError: z.instanceof(AggregateError),
	EvalError: z.instanceof(EvalError),
	RangeError: z.instanceof(RangeError),
	ReferenceError: z.instanceof(ReferenceError),
	SyntaxError: z.instanceof(SyntaxError),
	TypeError: z.instanceof(TypeError),
	URIError: z.instanceof(URIError),
} as const;

/* prettier-ignore */
/** @see {@link NUMBER_AND_DATE_BUILT_IN_OBJECTS} */
export const NUMBER_AND_DATE_BUILT_IN_OBJECTS_NAMES = [
	"Number",
	"BigInt",
	"Math",
	"Date",
] as const;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#number_and_dates} */
export const NUMBER_AND_DATE_BUILT_IN_OBJECTS = {
	BigInt: BigInt,
	Date: Date,
	Math: Math,
	Number: Number,
} as const;
export type NumberAndDateBuiltInObjectName = keyof typeof NUMBER_AND_DATE_BUILT_IN_OBJECTS;
export type NumberAndDateBuiltInObject = (typeof NUMBER_AND_DATE_BUILT_IN_OBJECTS)[NumberAndDateBuiltInObjectName];
export const NUMBER_AND_DATE_BUILT_IN_OBJECT_NAMES_SCHEMA = z.enum(NUMBER_AND_DATE_BUILT_IN_OBJECTS_NAMES);
export const NUMBER_AND_DATE_BUILT_IN_OBJECTS_SCHEMAS = {
	BigInt: z.bigint(), // NOTE: BigInt is not a constructor
	Date: z.instanceof(Date),
	Math: z.instanceof(Object), // NOTE: Math cannot be instantiated
	Number: z.instanceof(Number),
} as const;

/* prettier-ignore */
/** @see {@link TEXT_PROCESSING_BUILT_IN_OBJECTS} */
export const TEXT_PROCESSING_BUILT_IN_OBJECTS_NAMES = [
	"RegExp",
	"String",
] as const;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#text_processing} */
export const TEXT_PROCESSING_BUILT_IN_OBJECTS = {
	RegExp: RegExp,
	String: String,
} as const;
export type TextProcessingBuiltInObjectName = keyof typeof TEXT_PROCESSING_BUILT_IN_OBJECTS;
export type TextProcessingBuiltInObject = (typeof TEXT_PROCESSING_BUILT_IN_OBJECTS)[TextProcessingBuiltInObjectName];
export const TEXT_PROCESSING_BUILT_IN_OBJECT_NAMES_SCHEMA = z.enum(TEXT_PROCESSING_BUILT_IN_OBJECTS_NAMES);
export const TEXT_PROCESSING_BUILT_IN_OBJECTS_SCHEMAS = {
	RegExp: z.instanceof(RegExp),
	String: z.instanceof(String),
} as const;

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

/* prettier-ignore */
/** @see {@link KEYED_COLLECTION_BUILT_IN_OBJECTS} */
export const KEYED_COLLECTION_BUILT_IN_OBJECTS_NAMES = [
	"Map",
	"Set",
	"WeakMap",
	"WeakSet",
] as const;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections} */
export const KEYED_COLLECTION_BUILT_IN_OBJECTS = {
	Map: Map,
	Set: Set,
	WeakMap: WeakMap,
	WeakSet: WeakSet,
} as const;
export type KeyedCollectionBuiltInObjectName = keyof typeof KEYED_COLLECTION_BUILT_IN_OBJECTS;
export type KeyedCollectionBuiltInObject = (typeof KEYED_COLLECTION_BUILT_IN_OBJECTS)[KeyedCollectionBuiltInObjectName];
export const KEYED_COLLECTION_BUILT_IN_OBJECT_NAME_SCHEMA = z.enum(KEYED_COLLECTION_BUILT_IN_OBJECTS_NAMES);
export const KEYED_COLLECTION_BUILT_IN_OBJECTS_SCHEMAS = {
	Map: z.instanceof(Map),
	Set: z.instanceof(Set),
	WeakMap: z.instanceof(WeakMap),
	WeakSet: z.instanceof(WeakSet),
} as const;

/* prettier-ignore */
/** @see {@link STRUCTURED_DATA_BUILT_IN_OBJECTS} */
export const STRUCTURED_DATA_BUILT_IN_OBJECTS_NAMES = [
	"ArrayBuffer",
	"SharedArrayBuffer",
	"DataView",
	"Atomics",
	"JSON",
] as const;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#structured_data} */
export const STRUCTURED_DATA_BUILT_IN_OBJECTS = {
	ArrayBuffer: ArrayBuffer,
	SharedArrayBuffer: SharedArrayBuffer,
	DataView: DataView,
	Atomics: Atomics,
	JSON: JSON,
} as const;
export type StructuredDataBuiltInObjectName = (typeof STRUCTURED_DATA_BUILT_IN_OBJECTS_NAMES)[number];
export type StructuredDataBuiltInObject = (typeof STRUCTURED_DATA_BUILT_IN_OBJECTS)[StructuredDataBuiltInObjectName];
export const STRUCTURED_DATA_BUILT_IN_OBJECT_NAME_SCHEMA = z.enum(STRUCTURED_DATA_BUILT_IN_OBJECTS_NAMES);
export const STRUCTURED_DATA_BUILT_IN_OBJECTS_SCHEMAS = {
	ArrayBuffer: z.instanceof(ArrayBuffer),
	SharedArrayBuffer: z.instanceof(SharedArrayBuffer),
	DataView: z.instanceof(DataView),
	Atomics: z.instanceof(Object), // Atomics cannot be instantiated
	JSON: z.instanceof(Object), // NOTE: JSON cannot be instantiated
} as const;

/* prettier-ignore */
/** @see {@link MANAGING_MEMORY_BUILT_IN_OBJECTS} */
export const MANAGING_MEMORY_BUILT_IN_OBJECTS_NAMES = [
	"WeakRef",
	"FinalizationRegistry",
] as const;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#managing_memory} */
export const MANAGING_MEMORY_BUILT_IN_OBJECTS = {
	WeakRef: WeakRef,
	FinalizationRegistry: FinalizationRegistry,
} as const;
export type ManagingMemoryBuiltInObjectName = keyof typeof MANAGING_MEMORY_BUILT_IN_OBJECTS;
export type ManagingMemoryBuiltInObject = (typeof MANAGING_MEMORY_BUILT_IN_OBJECTS)[ManagingMemoryBuiltInObjectName];
export const MANAGING_MEMORY_BUILT_IN_OBJECT_NAME_SCHEMA = z.enum(MANAGING_MEMORY_BUILT_IN_OBJECTS_NAMES);
export const MANAGING_MEMORY_BUILT_IN_OBJECTS_SCHEMAS = {
	WeakRef: z.instanceof(WeakRef),
	FinalizationRegistry: z.instanceof(FinalizationRegistry),
} as const;

/* prettier-ignore */
/** @see {@link CONTROL_ABSTRACTION_BUILT_IN_OBJECTS} */
export const CONTROL_ABSTRACTION_BUILT_IN_OBJECTS_NAMES = [
	"Promise",
	// NOTE: Those are not defined.
	// "GeneratorFunction",
	// "AsyncGeneratorFunction",
	// "Generator",
	// "AsyncGenerator",
	// "AsyncFunction",
] as const;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#control_abstractions_objects} */
export const CONTROL_ABSTRACTION_BUILT_IN_OBJECTS = {
	Promise: Promise,
	// NOTE: Those are not defined, unlike what MDN says
	// GeneratorFunction: GeneratorFunction,
	// AsyncGeneratorFunction: AsyncGeneratorFunction,
	// Generator: Generator,
	// AsyncGenerator: AsyncGenerator,
	// AsyncFunction: AsyncFunction,
} as const;
export type ControlAbstractionBuiltInObjectName = keyof typeof CONTROL_ABSTRACTION_BUILT_IN_OBJECTS;
export type ControlAbstractionBuiltInObject =
	(typeof CONTROL_ABSTRACTION_BUILT_IN_OBJECTS)[ControlAbstractionBuiltInObjectName];
export const CONTROL_ABSTRACTION_BUILT_IN_OBJECT_NAME_SCHEMA = z.enum(CONTROL_ABSTRACTION_BUILT_IN_OBJECTS_NAMES);
export const CONTROL_ABSTRACTION_BUILT_IN_OBJECTS_SCHEMAS = {
	Promise: z.instanceof(Promise),
	// NOTE: Those are not defined, unlike what MDN says
	// GeneratorFunction: z.instanceof(GeneratorFunction),
	// AsyncGeneratorFunction: z.instanceof(AsyncGeneratorFunction),
	// Generator: z.instanceof(Generator),
	// AsyncGenerator: z.instanceof(AsyncGenerator),
	// AsyncFunction: z.instanceof(AsyncFunction),
} as const;

/* prettier-ignore */
/** @see {@link REFLECTION_BUILT_IN_OBJECTS} */
export const REFLECTION_BUILT_IN_OBJECTS_NAMES = [
	"Reflect",
	"Proxy",
] as const;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#reflection} */
export const REFLECTION_BUILT_IN_OBJECTS = {
	Reflect: Reflect,
	Proxy: Proxy,
} as const;
export type ReflectionBuiltInObjectName = keyof typeof REFLECTION_BUILT_IN_OBJECTS;
export type ReflectionBuiltInObject = (typeof REFLECTION_BUILT_IN_OBJECTS)[ReflectionBuiltInObjectName];
export const REFLECTION_BUILT_IN_OBJECT_NAME_SCHEMA = z.enum(REFLECTION_BUILT_IN_OBJECTS_NAMES);
export const REFLECTION_BUILT_IN_OBJECTS_SCHEMAS = {
	Reflect: z.instanceof(Object), // NOTE: Reflect is not an constructor, neither cannot be instantiated
	Proxy: z.instanceof(Proxy),
} as const;

/* prettier-ignore */
/** @see {@link INTERNATIONALIZATION_BUILT_IN_OBJECT_NAME_SCHEMA} */
export const INTERNATIONALIZATION_BUILT_IN_OBJECTS_NAMES = [
	"Intl",
] as const;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#internationalization} */
export const INTERNATIONALIZATION_BUILT_IN_OBJECTS = {
	Intl: Intl,
} as const;
export type InternationalizationBuiltInObjectName = keyof typeof INTERNATIONALIZATION_BUILT_IN_OBJECTS;
export type InternationalizationBuiltInObject =
	(typeof INTERNATIONALIZATION_BUILT_IN_OBJECTS)[InternationalizationBuiltInObjectName];
export const INTERNATIONALIZATION_BUILT_IN_OBJECT_NAME_SCHEMA = z.enum(INTERNATIONALIZATION_BUILT_IN_OBJECTS_NAMES);
export const INTERNATIONALIZATION_BUILT_IN_OBJECTS_SCHEMAS = {
	Intl: z.instanceof(Object), // NOTE: Intl cannot be instantiated
} as const;

/** @see {@link BUILT_IN_OBJECTS} */
export const BUILT_IN_OBJECTS_NAMES = [
	...FUNDAMENTAL_BUILT_IN_OBJECTS_NAMES,
	...ERROR_BUILT_IN_OBJECTS_NAMES,
	...NUMBER_AND_DATE_BUILT_IN_OBJECTS_NAMES,
	...TEXT_PROCESSING_BUILT_IN_OBJECTS_NAMES,
	...INDEXED_COLLECTION_BUILT_IN_OBJECTS_NAMES,
	...KEYED_COLLECTION_BUILT_IN_OBJECTS_NAMES,
	...STRUCTURED_DATA_BUILT_IN_OBJECTS_NAMES,
	...MANAGING_MEMORY_BUILT_IN_OBJECTS_NAMES,
	...CONTROL_ABSTRACTION_BUILT_IN_OBJECTS_NAMES,
	...REFLECTION_BUILT_IN_OBJECTS_NAMES,
	...INTERNATIONALIZATION_BUILT_IN_OBJECTS_NAMES,
] as const;
/* @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects} */
export const BUILT_IN_OBJECTS = {
	...FUNDAMENTAL_BUILT_IN_OBJECTS,
	...ERROR_BUILT_IN_OBJECTS,
	...NUMBER_AND_DATE_BUILT_IN_OBJECTS,
	...TEXT_PROCESSING_BUILT_IN_OBJECTS,
	...INDEXED_COLLECTION_BUILT_IN_OBJECTS,
	...KEYED_COLLECTION_BUILT_IN_OBJECTS,
	...STRUCTURED_DATA_BUILT_IN_OBJECTS,
	...MANAGING_MEMORY_BUILT_IN_OBJECTS,
	...CONTROL_ABSTRACTION_BUILT_IN_OBJECTS,
	...REFLECTION_BUILT_IN_OBJECTS,
	...INTERNATIONALIZATION_BUILT_IN_OBJECTS,
} as const;
export const BUILT_IN_OBJECT_NAME_SCHEMA = z.enum(BUILT_IN_OBJECTS_NAMES);
export const BUILT_IN_OBJECTS_SCHEMAS = {
	...FUNDAMENTAL_BUILT_IN_OBJECTS_SCHEMAS,
	...ERROR_BUILT_IN_OBJECTS_SCHEMAS,
	...NUMBER_AND_DATE_BUILT_IN_OBJECTS_SCHEMAS,
	...TEXT_PROCESSING_BUILT_IN_OBJECTS_SCHEMAS,
	...INDEXED_COLLECTION_BUILT_IN_OBJECTS_SCHEMAS,
	...KEYED_COLLECTION_BUILT_IN_OBJECTS_SCHEMAS,
	...STRUCTURED_DATA_BUILT_IN_OBJECTS_SCHEMAS,
	...MANAGING_MEMORY_BUILT_IN_OBJECTS_SCHEMAS,
	...CONTROL_ABSTRACTION_BUILT_IN_OBJECTS_SCHEMAS,
	...REFLECTION_BUILT_IN_OBJECTS_SCHEMAS,
	...INTERNATIONALIZATION_BUILT_IN_OBJECTS_SCHEMAS,
} as const;

export type BuiltInObjectName = keyof typeof BUILT_IN_OBJECTS;
export type BuiltInObject = (typeof BUILT_IN_OBJECTS)[BuiltInObjectName];

export type BuiltInPrimitiveObjectName = Extract<
	BuiltInObjectName,
	"BigInt" | "Boolean" | "Number" | "String" | "Symbol"
>;

export function validateBuiltInObjectName(name: string): asserts name is BuiltInObjectName {
	BUILT_IN_OBJECT_NAME_SCHEMA.parse(name);
}

export function isBuiltInObjectName(name: string): name is BuiltInObjectName {
	return BUILT_IN_OBJECT_NAME_SCHEMA.safeParse(name).success;
}

export function isBuiltInObject(value: unknown): value is BuiltInObject {
	const name = getConstructorName(value);

	/* prettier-ignore */
	return name && isBuiltInObjectName(name)
		? BUILT_IN_OBJECTS_SCHEMAS[name].safeParse(value).success
		: false;
}
