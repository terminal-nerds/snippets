import { z } from "zod";

export const OBJECT_SCHEMA = z.object({});

export function validateObject(value: unknown): asserts value is object {
	OBJECT_SCHEMA.parse(value);
}

export function isObject(value: unknown): value is object {
	return OBJECT_SCHEMA.safeParse(value).success;
}

export * from "./empty/empty.ts";
