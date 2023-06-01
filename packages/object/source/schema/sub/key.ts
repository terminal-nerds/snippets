import { z } from "zod";

export const SCHEMA_OBJECT_KEY = z.number().or(z.string()).or(z.symbol());

export type ObjectKey = number | string | symbol;

export function isValidObjectKey(key: unknown): key is ObjectKey {
	return SCHEMA_OBJECT_KEY.safeParse(key).success;
}

export function validateObjectKey(key: unknown): asserts key is ObjectKey {
	SCHEMA_OBJECT_KEY.parse(key);
}
