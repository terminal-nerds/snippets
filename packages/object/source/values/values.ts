import { isFunction } from "@terminal-nerds/snippets-function/schema";
import { PRIMITIVE_SCHEMA } from "@terminal-nerds/snippets-type/primitive";
import { z } from "zod";

import { OBJECT_KEY_SCHEMA, type ObjectKey } from "../keys/keys.ts";
import { validateObject } from "../schema/schema.ts";

const FILTER_SCHEMA = z
	.array(PRIMITIVE_SCHEMA)
	.or(z.set(PRIMITIVE_SCHEMA))
	.or(z.function().args(OBJECT_KEY_SCHEMA, z.number().optional()).returns(z.boolean()));

/** TODO: I don't know (yet!) how to type the return value based on the `filter`. */
export function filterByObjectValues<Key extends ObjectKey, Value>(
	target: Record<Key, Value>,
	filter: ReadonlyArray<Value> | Set<Value> | ((value: Value, index: number) => boolean),
): Record<Key, Value> {
	validateObject(target);
	FILTER_SCHEMA.parse(filter);

	function handleFilter([, value]: [Key, Value], index: number) {
		if (Array.isArray(filter)) {
			return filter.includes(value);
		} else if (isFunction(filter)) {
			return filter(value, index);
		} else {
			return (filter as Set<Value>).has(value);
		}
	}

	return Object.fromEntries(
		(Object.entries(target) as Array<[Key, Value]>).filter((entry, index) => handleFilter(entry, index)),
	) as Record<Key, Value>;
}
