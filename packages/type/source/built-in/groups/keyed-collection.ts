import { z } from "zod";

/* prettier-ignore */
/** @see {@link KEYED_COLLECTION_BUILT_IN_OBJECTS} */
export const KEYED_COLLECTION_BUILT_IN_OBJECTS_NAMES = [
	"Map",
	"Set",
	"WeakMap",
	"WeakSet",
] as const;

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections} */
export const KEYED_COLLECTION_BUILT_IN_OBJECTS = {
	Map: Map,
	Set: Set,
	WeakMap: WeakMap,
	WeakSet: WeakSet,
} as const;

export type KeyedCollectionBuiltInObjectName = keyof typeof KEYED_COLLECTION_BUILT_IN_OBJECTS;
export type KeyedCollectionBuiltInObject = (typeof KEYED_COLLECTION_BUILT_IN_OBJECTS)[KeyedCollectionBuiltInObjectName];

export const KEYED_COLLECTION_BUILT_IN_OBJECT_NAME_SCHEMA = z.enum(KEYED_COLLECTION_BUILT_IN_OBJECTS_NAMES);

export const KEYED_COLLECTION_BUILT_IN_OBJECTS_SCHEMAS = {
	Map: z.instanceof(Map),
	Set: z.instanceof(Set),
	WeakMap: z.instanceof(WeakMap),
	WeakSet: z.instanceof(WeakSet),
} as const;
