import { z } from "zod";

import { validateObject } from "../schema/schema.ts";

export const OBJECT_KEY_SCHEMA = z.number().or(z.string()).or(z.symbol());

const RENAMER_SCHEMA = z.function().args(OBJECT_KEY_SCHEMA, z.number().optional()).returns(OBJECT_KEY_SCHEMA);

export type ObjectKey = number | string | symbol;

export function renameObjectKeys<OldKey extends ObjectKey, Value, NewKey extends ObjectKey>(
	object: Record<OldKey, Value>,
	renamer: (key: OldKey, index: number) => NewKey,
): Record<NewKey, Value> {
	validateObject(object);
	RENAMER_SCHEMA.parse(renamer);

	function handleRename(key: OldKey, index: number) {
		return OBJECT_KEY_SCHEMA.parse(renamer(key, index));
	}

	return Object.fromEntries(
		(Object.entries(object) as Array<[OldKey, Value]>).map(([key, value], index) => [
			handleRename(key, index),
			value,
		]),
	) as Record<NewKey, Value>;
}
