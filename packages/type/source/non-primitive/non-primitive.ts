/* eslint-disable unicorn/prefer-number-properties, unicorn/no-null */
import { z } from "zod";

/* prettier-ignore */
export const NON_PRIMITIVE_NAMES = [
	"function",
	"object",
] as const;

export const NON_PRIMITIVE_NAME_SCHEMA = z.enum(NON_PRIMITIVE_NAMES);

export interface NonPrimitives {
	function: (...args: unknown[]) => unknown;
	object: object;
}

export type NonPrimitiveName = keyof NonPrimitives;
export type NonPrimitive = NonPrimitives[NonPrimitiveName];

export const FUNCTION_SCHEMA = z.function();
export const OBJECT_SCHEMA = z.object({});

export const NON_PRIMITIVE_SCHEMAS = {
	function: FUNCTION_SCHEMA,
	object: OBJECT_SCHEMA,
} as const;

export function validateNonPrimitiveName(name: unknown): asserts name is NonPrimitiveName {
	NON_PRIMITIVE_NAME_SCHEMA.parse(name);
}

export function isNonPrimitiveName(name: unknown): name is NonPrimitiveName {
	return NON_PRIMITIVE_NAME_SCHEMA.safeParse(name).success;
}

export function getNonPrimitiveName<T extends NonPrimitiveName>(value: unknown, typeName?: T): NonPrimitiveName {
	const name = typeName ?? typeof value;

	validateNonPrimitiveName(name);

	return name;
}

export function validateNonPrimitive<T extends NonPrimitiveName>(
	value: unknown,
	typeName: T,
): asserts value is NonPrimitives[T] {
	NON_PRIMITIVE_SCHEMAS[getNonPrimitiveName(value, typeName)].parse(value);
}

export function isNonPrimitive<T extends NonPrimitiveName>(value: unknown, typeName: T): value is NonPrimitives[T] {
	return NON_PRIMITIVE_SCHEMAS[getNonPrimitiveName(value, typeName)].safeParse(value).success;
}
