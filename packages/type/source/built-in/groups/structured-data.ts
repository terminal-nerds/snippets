import { z } from "zod";

/* prettier-ignore */
/** @see {@link STRUCTURED_DATA_BUILT_IN_OBJECTS} */
export const STRUCTURED_DATA_BUILT_IN_OBJECTS_NAMES = [
	"ArrayBuffer",
	"SharedArrayBuffer",
	"DataView",
	"Atomics",
	"JSON",
] as const;

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#structured_data} */
export const STRUCTURED_DATA_BUILT_IN_OBJECTS = {
	ArrayBuffer: ArrayBuffer,
	SharedArrayBuffer: SharedArrayBuffer,
	DataView: DataView,
	Atomics: Atomics,
	JSON: JSON,
} as const;

export type StructuredDataBuiltInObjectName = (typeof STRUCTURED_DATA_BUILT_IN_OBJECTS_NAMES)[number];
export type StructuredDataBuiltInObject = (typeof STRUCTURED_DATA_BUILT_IN_OBJECTS)[StructuredDataBuiltInObjectName];

export const STRUCTURED_DATA_BUILT_IN_OBJECT_NAME_SCHEMA = z.enum(STRUCTURED_DATA_BUILT_IN_OBJECTS_NAMES);

export const STRUCTURED_DATA_BUILT_IN_OBJECTS_SCHEMAS = {
	ArrayBuffer: z.instanceof(ArrayBuffer),
	SharedArrayBuffer: z.instanceof(SharedArrayBuffer),
	DataView: z.instanceof(DataView),
	Atomics: z.instanceof(Object), // NOTE: Atomics cannot be instantiated
	JSON: z.instanceof(Object), // NOTE: JSON cannot be instantiated
} as const;
