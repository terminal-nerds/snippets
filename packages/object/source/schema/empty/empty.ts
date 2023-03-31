import type { EmptyObject } from "type-fest";
import { z } from "zod";

export const EMPTY_OBJECT_SCHEMA = z.record(z.undefined());

export type { EmptyObject } from "type-fest";

export function validateEmptyObject(value: object): asserts value is EmptyObject {
	EMPTY_OBJECT_SCHEMA.parse(value);
}

export function isObjectEmpty(value: object): value is EmptyObject {
	return EMPTY_OBJECT_SCHEMA.safeParse(value).success;
}
