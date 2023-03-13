import { z } from "zod";

/* prettier-ignore */
/** @see {@link REFLECTION_BUILT_IN_OBJECTS} */
export const REFLECTION_BUILT_IN_OBJECTS_NAMES = [
	"Reflect",
	"Proxy",
] as const;

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#reflection} */
export const REFLECTION_BUILT_IN_OBJECTS = {
	Reflect: Reflect,
	Proxy: Proxy,
} as const;

export type ReflectionBuiltInObjectName = keyof typeof REFLECTION_BUILT_IN_OBJECTS;
export type ReflectionBuiltInObject = (typeof REFLECTION_BUILT_IN_OBJECTS)[ReflectionBuiltInObjectName];

export const REFLECTION_BUILT_IN_OBJECT_NAME_SCHEMA = z.enum(REFLECTION_BUILT_IN_OBJECTS_NAMES);

export const REFLECTION_BUILT_IN_OBJECTS_SCHEMAS = {
	Reflect: z.instanceof(Object), // NOTE: Reflect is not an constructor, neither cannot be instantiated
	Proxy: z.instanceof(Proxy),
} as const;
