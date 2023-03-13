/* eslint-disable unicorn/prefer-number-properties, unicorn/no-null */
import { z } from "zod";

/* prettier-ignore */
/** @see {@link https://developer.mozilla.org/en-US/docs/Glossary/Primitive} */
export const PRIMITIVE_NAMES = [
	"bigint",
	"boolean",
	"number",
	"null",
	"string",
	"symbol",
	"undefined",
] as const;

export const PRIMITIVE_NAME_SCHEMA = z.enum(PRIMITIVE_NAMES);

export interface Primitives {
	bigint: bigint;
	boolean: boolean;
	number: number;
	null: null;
	string: string;
	symbol: symbol;
	undefined: undefined;
}

export type PrimitiveName = keyof Primitives;
export type Primitive = Primitives[PrimitiveName];

export const BIG_INT_SCHEMA = z.bigint();
export const BOOLEAN_SCHEMA = z.boolean();
export const NUMBER_SCHEMA = z.number();
export const NULL_SCHEMA = z.null();
export const STRING_SCHEMA = z.string();
export const SYMBOL_SCHEMA = z.symbol();
export const UNDEFINED_SCHEMA = z.undefined();

export const PRIMITIVE_SCHEMAS = {
	bigint: BIG_INT_SCHEMA,
	boolean: BOOLEAN_SCHEMA,
	number: NUMBER_SCHEMA,
	null: NULL_SCHEMA,
	string: STRING_SCHEMA,
	symbol: SYMBOL_SCHEMA,
	undefined: UNDEFINED_SCHEMA,
} as const;

export function validatePrimitiveName(name: unknown): asserts name is PrimitiveName {
	PRIMITIVE_NAME_SCHEMA.parse(name);
}

export function isPrimitiveName(name: unknown): name is PrimitiveName {
	return PRIMITIVE_NAME_SCHEMA.safeParse(name).success;
}

export function getPrimitiveName<T extends PrimitiveName>(value: unknown, typeName?: T): PrimitiveName | undefined {
	const name = typeName ?? typeof value;

	if (isPrimitiveName(name)) {
		return name;
	}
}

export function validatePrimitive<T extends PrimitiveName>(
	value: unknown,
	typeName?: T,
): asserts value is Primitives[T] {
	const primitiveName = getPrimitiveName(value, typeName);

	if (primitiveName) {
		PRIMITIVE_SCHEMAS[primitiveName].parse(value);
	} else {
		throw new TypeError(`Invalid primitive.`);
	}
}

export function isPrimitive<T extends PrimitiveName>(value: unknown, typeName?: T): value is Primitives[T] {
	const primitiveName = getPrimitiveName(value, typeName);

	return primitiveName ? PRIMITIVE_SCHEMAS[primitiveName].safeParse(value).success : false;
}
