import type { EmptyObject as ObjectEmpty } from "type-fest/source/empty-object";
import { z } from "zod";

export const EMPTY_OBJECT_SCHEMA = z.record(z.undefined());

export type { EmptyObject as ObjectEmpty } from "type-fest/source/empty-object";

export function isObjectEmpty(value: object): value is ObjectEmpty {
	return EMPTY_OBJECT_SCHEMA.safeParse(value).success;
}

export function validateEmptyObject(value: object): asserts value is ObjectEmpty {
	EMPTY_OBJECT_SCHEMA.parse(value);
}
