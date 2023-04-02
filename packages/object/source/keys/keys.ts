import { isFunction } from "@terminal-nerds/snippets-function/schema";
import { z } from "zod";

import { validateObject } from "../schema/schema.ts";

export const OBJECT_KEY_SCHEMA = z.number().or(z.string()).or(z.symbol());
export type ObjectKey = z.infer<typeof OBJECT_KEY_SCHEMA>;

const RENAMER_SCHEMA = z.function().args(OBJECT_KEY_SCHEMA, z.number()).returns(OBJECT_KEY_SCHEMA);

export function renameObjectKeys<OldKey extends ObjectKey, Value, NewKey extends ObjectKey>(
	object: Record<OldKey, Value>,
	renamer: (key: OldKey, index: number) => NewKey,
): Record<NewKey, Value> {
	validateObject(object);
	RENAMER_SCHEMA.parse(renamer);

	return Object.fromEntries(
		(Object.entries(object) as Array<[OldKey, Value]>).map(([key, value], index) => [renamer(key, index), value]),
	) as Record<NewKey, Value>;
}

const KEYS_PICKER_SCHEMA = z
	.array(OBJECT_KEY_SCHEMA)
	.or(z.set(OBJECT_KEY_SCHEMA))
	.or(z.function().args(OBJECT_KEY_SCHEMA, z.number().optional()).returns(z.boolean()));

export function omitObjectKeys<Key extends ObjectKey, Value, Target extends Record<Key, Value>>(
	target: Target,
	picker: ReadonlyArray<Key> | Set<Key> | ((key: Key, index: number) => boolean),
): Omit<Target, Key> {
	validateObject(target);
	KEYS_PICKER_SCHEMA.safeParse(picker);

	function handleFilter([key]: [Key, Value], index: number) {
		if (Array.isArray(picker)) {
			return !picker.includes(key);
		} else if (isFunction(picker)) {
			return picker(key, index);
		} else {
			return !(picker as Set<Key>).has(key);
		}
	}

	return Object.fromEntries(
		(Object.entries(target) as Array<[Key, Value]>).filter((entry, index) => handleFilter(entry, index)),
	) as Omit<Target, Key>;
}

export function pickObjectKeys<Key extends ObjectKey, Value, Target extends Record<Key, Value>>(
	target: Target,
	picker: ReadonlyArray<Key> | Set<Key> | ((key: Key, index: number) => boolean),
): Pick<Target, Key> {
	validateObject(target);
	KEYS_PICKER_SCHEMA.parse(picker);

	function handleFilter([key]: [Key, Value], index: number) {
		if (Array.isArray(picker)) {
			return picker.includes(key);
		} else if (isFunction(picker)) {
			return picker(key, index);
		} else {
			return (picker as Set<Key>).has(key);
		}
	}

	return Object.fromEntries(
		(Object.entries(target) as Array<[Key, Value]>).filter((entry, index) => handleFilter(entry, index)),
	) as Pick<Target, Key>;
}
