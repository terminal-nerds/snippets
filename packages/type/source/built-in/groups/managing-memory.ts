import { z } from "zod";

/* prettier-ignore */
/** @see {@link MANAGING_MEMORY_BUILT_IN_OBJECTS} */
export const MANAGING_MEMORY_BUILT_IN_OBJECTS_NAMES = [
	"WeakRef",
	"FinalizationRegistry",
] as const;

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#managing_memory} */
export const MANAGING_MEMORY_BUILT_IN_OBJECTS = {
	WeakRef: WeakRef,
	FinalizationRegistry: FinalizationRegistry,
} as const;

export type ManagingMemoryBuiltInObjectName = keyof typeof MANAGING_MEMORY_BUILT_IN_OBJECTS;
export type ManagingMemoryBuiltInObject = (typeof MANAGING_MEMORY_BUILT_IN_OBJECTS)[ManagingMemoryBuiltInObjectName];

export const MANAGING_MEMORY_BUILT_IN_OBJECT_NAME_SCHEMA = z.enum(MANAGING_MEMORY_BUILT_IN_OBJECTS_NAMES);

export const MANAGING_MEMORY_BUILT_IN_OBJECTS_SCHEMAS = {
	WeakRef: z.instanceof(WeakRef),
	FinalizationRegistry: z.instanceof(FinalizationRegistry),
} as const;
