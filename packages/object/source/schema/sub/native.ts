import { z } from "zod";

export const SCHEMA_OBJECT = z.object({});

export function isObject(value: unknown): value is object {
	return SCHEMA_OBJECT.safeParse(value).success;
}

export function validateObject(value: unknown): asserts value is object {
	SCHEMA_OBJECT.parse(value);
}
