import { z } from "zod";

/* prettier-ignore */
/** @see {@link TEXT_PROCESSING_BUILT_IN_OBJECTS} */
export const TEXT_PROCESSING_BUILT_IN_OBJECTS_NAMES = [
	"RegExp",
	"String",
] as const;

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#text_processing} */
export const TEXT_PROCESSING_BUILT_IN_OBJECTS = {
	RegExp: RegExp,
	String: String,
} as const;

export type TextProcessingBuiltInObjectName = keyof typeof TEXT_PROCESSING_BUILT_IN_OBJECTS;
export type TextProcessingBuiltInObject = (typeof TEXT_PROCESSING_BUILT_IN_OBJECTS)[TextProcessingBuiltInObjectName];

export const TEXT_PROCESSING_BUILT_IN_OBJECT_NAMES_SCHEMA = z.enum(TEXT_PROCESSING_BUILT_IN_OBJECTS_NAMES);

export const TEXT_PROCESSING_BUILT_IN_OBJECTS_SCHEMAS = {
	RegExp: z.instanceof(RegExp),
	String: z.instanceof(String),
} as const;
