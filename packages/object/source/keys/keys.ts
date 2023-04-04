import { z } from "zod";

export const OBJECT_KEY_SCHEMA = z.number().or(z.string()).or(z.symbol());

const RENAMER_SCHEMA = z.function().args(OBJECT_KEY_SCHEMA).returns(OBJECT_KEY_SCHEMA);

export type ObjectKey = number | string | symbol;

export function renameObjectKeys<OldKey extends ObjectKey, Value, NewKey extends ObjectKey>(
	object: Record<OldKey, Value>,
	renamer: (key: OldKey) => NewKey,
): Record<NewKey, Value> {
	RENAMER_SCHEMA.parse(renamer);

	return Object.fromEntries(
		(Object.entries(object) as Array<[OldKey, Value]>).map(([key, value]) => [renamer(key), value]),
	) as Record<NewKey, Value>;
}
