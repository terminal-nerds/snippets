import { z } from "zod";

/* prettier-ignore */
/** @see {@link INTERNATIONALIZATION_BUILT_IN_OBJECT_NAME_SCHEMA} */
export const INTERNATIONALIZATION_BUILT_IN_OBJECTS_NAMES = [
	"Intl",
] as const;

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#internationalization} */
export const INTERNATIONALIZATION_BUILT_IN_OBJECTS = {
	Intl: Intl,
} as const;

export type InternationalizationBuiltInObjectName = keyof typeof INTERNATIONALIZATION_BUILT_IN_OBJECTS;
export type InternationalizationBuiltInObject =
	(typeof INTERNATIONALIZATION_BUILT_IN_OBJECTS)[InternationalizationBuiltInObjectName];

export const INTERNATIONALIZATION_BUILT_IN_OBJECT_NAME_SCHEMA = z.enum(INTERNATIONALIZATION_BUILT_IN_OBJECTS_NAMES);

export const INTERNATIONALIZATION_BUILT_IN_OBJECTS_SCHEMAS = {
	Intl: z.instanceof(Object), // NOTE: Intl cannot be instantiated
} as const;
