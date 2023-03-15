import { type BuiltInObjectName, isBuiltInObjectName } from "@terminal-nerds/snippets-type/built-in";
import { getConstructorName } from "@terminal-nerds/snippets-type/constructor";
import { getPrimitiveName, isPrimitiveName, type PrimitiveName } from "@terminal-nerds/snippets-type/primitive";

export const PRIMITIVES_EMOJIS = {
	bigint: `🇧`,
	boolean: {
		false: `🔴`,
		true: `🟢`,
	},
	null: `❎`,
	number: `🇳`,
	symbol: `💠`,
	string: `🇸`,
	undefined: `🫥`,
} as const;
export type PrimitiveEmoji =
	| (typeof PRIMITIVES_EMOJIS)[Exclude<PrimitiveName, "boolean">]
	| (typeof PRIMITIVES_EMOJIS.boolean)["false" | "true"];

export const BUILT_IN_OBJECTS_EMOJIS = {
	// Fundamental
	Function: `🇫`,
	Object: `🇴`,
	// Error
	Error: `📛`,
	AggregateError: `📛`,
	EvalError: `📛`,
	RangeError: `📛`,
	ReferenceError: `📛`,
	SyntaxError: `📛`,
	TypeError: `📛`,
	URIError: `📛`,
	// Math and date
	Date: `🗓️`,
	Math: `🧮`,
	// Text processing
	RegExp: `🔎🇸"`,
	// Indexed collection
	Array: `🇦`,
	Int8Array: `❔`,
	Uint8Array: `❔`,
	Uint8ClampedArray: `❔`,
	Int16Array: `❔`,
	Uint16Array: `❔`,
	Int32Array: `❔`,
	Uint32Array: `❔`,
	BigInt64Array: `❔`,
	BigUint64Array: `❔`,
	Float32Array: `❔`,
	Float64Array: `❔`,
	// Keyed collection
	Map: `🇲`,
	Set: `🦄`,
	WeakMap: `❔`,
	WeakSet: `❔`,
	// Structured data
	ArrayBuffer: `❔`,
	SharedArrayBuffer: `❔`,
	DataView: `❔`,
	Atomics: `❔`,
	JSON: `❔`,
	// Managing memory
	WeakRef: `❔`,
	FinalizationRegistry: `❔`,
	// Control abstraction
	Promise: `❔`,
	AsyncFunction: `❔`,
	AsyncGeneratorFunction: `❔`,
	GeneratorFunction: `❔`,
	// AsyncGenerator: `❔`,
	// Generator: `❔`,
	// Reflection
	Reflect: `❔`,
	Proxy: `❔`,
	// Internationalization
	Intl: `🌐`,
} as const;

type BuiltInNameWithoutPrimitives = Exclude<BuiltInObjectName, "BigInt" | "Boolean" | "Number" | "String" | "Symbol">;
export type BuiltInEmoji = (typeof BUILT_IN_OBJECTS_EMOJIS)[BuiltInNameWithoutPrimitives];

export const CUSTOM_TYPE_EMOJIS = {
	ZodError: `📛`,
} as const;

export type CustomTypeName = keyof typeof CUSTOM_TYPE_EMOJIS;
export type CustomTypeEmoji = (typeof CUSTOM_TYPE_EMOJIS)[CustomTypeName];

export const UNRECOGNIZED_TYPE_EMOJI = `❓`;
export type UnrecognizedTypeEmoji = typeof UNRECOGNIZED_TYPE_EMOJI;

export const VALUE_TYPE_EMOJIS = {
	...PRIMITIVES_EMOJIS,
	...BUILT_IN_OBJECTS_EMOJIS,
	...CUSTOM_TYPE_EMOJIS,
	UNRECOGNIZED_TYPE_EMOJI,
} as const;

export type ValueTypeName = keyof typeof PRIMITIVES_EMOJIS | keyof typeof BUILT_IN_OBJECTS_EMOJIS;
export type ValueTypeEmoji =
	| (typeof VALUE_TYPE_EMOJIS)[Exclude<ValueTypeName, "boolean">]
	| (typeof PRIMITIVES_EMOJIS)["boolean"]["true" | "false"]
	| UnrecognizedTypeEmoji;

function getPrimitiveEmoji(value: unknown): PrimitiveEmoji {
	const primitiveName = getPrimitiveName(value);

	if (primitiveName) {
		return primitiveName === "boolean"
			? PRIMITIVES_EMOJIS["boolean"][String(value) as "true" | "false"]
			: PRIMITIVES_EMOJIS[primitiveName];
	} else {
		throw new TypeError(`Unrecognized primitive, cannot get emoji.`);
	}
}

export function getValueTypeEmoji(value: unknown): ValueTypeEmoji {
	const name = getConstructorName(value);

	if (isPrimitiveName(name.toLowerCase())) {
		return getPrimitiveEmoji(value);
	} else if (isBuiltInObjectName(name)) {
		return BUILT_IN_OBJECTS_EMOJIS[name as BuiltInNameWithoutPrimitives];
	} else {
		// @ts-ignore TODO: Add type safety for custom objects?
		const emoji = CUSTOM_TYPE_EMOJIS[name];

		return emoji ?? UNRECOGNIZED_TYPE_EMOJI;
	}
}
