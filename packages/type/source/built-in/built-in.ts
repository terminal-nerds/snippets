import { z } from "zod";

import { getConstructorName } from "../constructor/constructor.ts";
import {
	CONTROL_ABSTRACTION_BUILT_IN_OBJECTS,
	CONTROL_ABSTRACTION_BUILT_IN_OBJECTS_NAMES,
	CONTROL_ABSTRACTION_BUILT_IN_OBJECTS_SCHEMAS,
} from "./groups/control-abstraction.ts";
import {
	ERROR_BUILT_IN_OBJECTS,
	ERROR_BUILT_IN_OBJECTS_NAMES,
	ERROR_BUILT_IN_OBJECTS_SCHEMAS,
} from "./groups/error.ts";
import {
	FUNDAMENTAL_BUILT_IN_OBJECTS,
	FUNDAMENTAL_BUILT_IN_OBJECTS_NAMES,
	FUNDAMENTAL_BUILT_IN_OBJECTS_SCHEMAS,
} from "./groups/fundamental.ts";
import {
	INDEXED_COLLECTION_BUILT_IN_OBJECTS,
	INDEXED_COLLECTION_BUILT_IN_OBJECTS_NAMES,
	INDEXED_COLLECTION_BUILT_IN_OBJECTS_SCHEMAS,
} from "./groups/indexed-collection.ts";
import {
	INTERNATIONALIZATION_BUILT_IN_OBJECTS,
	INTERNATIONALIZATION_BUILT_IN_OBJECTS_NAMES,
	INTERNATIONALIZATION_BUILT_IN_OBJECTS_SCHEMAS,
} from "./groups/internationalization.ts";
import {
	KEYED_COLLECTION_BUILT_IN_OBJECTS,
	KEYED_COLLECTION_BUILT_IN_OBJECTS_NAMES,
	KEYED_COLLECTION_BUILT_IN_OBJECTS_SCHEMAS,
} from "./groups/keyed-collection.ts";
import {
	MANAGING_MEMORY_BUILT_IN_OBJECTS,
	MANAGING_MEMORY_BUILT_IN_OBJECTS_NAMES,
	MANAGING_MEMORY_BUILT_IN_OBJECTS_SCHEMAS,
} from "./groups/managing-memory.ts";
import {
	NUMBER_AND_DATE_BUILT_IN_OBJECTS,
	NUMBER_AND_DATE_BUILT_IN_OBJECTS_NAMES,
	NUMBER_AND_DATE_BUILT_IN_OBJECTS_SCHEMAS,
} from "./groups/number-and-date.ts";
import {
	REFLECTION_BUILT_IN_OBJECTS,
	REFLECTION_BUILT_IN_OBJECTS_NAMES,
	REFLECTION_BUILT_IN_OBJECTS_SCHEMAS,
} from "./groups/reflection.ts";
import {
	STRUCTURED_DATA_BUILT_IN_OBJECTS,
	STRUCTURED_DATA_BUILT_IN_OBJECTS_NAMES,
	STRUCTURED_DATA_BUILT_IN_OBJECTS_SCHEMAS,
} from "./groups/structured-data.ts";
import {
	TEXT_PROCESSING_BUILT_IN_OBJECTS,
	TEXT_PROCESSING_BUILT_IN_OBJECTS_NAMES,
	TEXT_PROCESSING_BUILT_IN_OBJECTS_SCHEMAS,
} from "./groups/test-processing.ts";

/** @see {@link BUILT_IN_OBJECTS} */
export const BUILT_IN_OBJECTS_NAMES = [
	...FUNDAMENTAL_BUILT_IN_OBJECTS_NAMES,
	...ERROR_BUILT_IN_OBJECTS_NAMES,
	...NUMBER_AND_DATE_BUILT_IN_OBJECTS_NAMES,
	...TEXT_PROCESSING_BUILT_IN_OBJECTS_NAMES,
	...INDEXED_COLLECTION_BUILT_IN_OBJECTS_NAMES,
	...KEYED_COLLECTION_BUILT_IN_OBJECTS_NAMES,
	...STRUCTURED_DATA_BUILT_IN_OBJECTS_NAMES,
	...MANAGING_MEMORY_BUILT_IN_OBJECTS_NAMES,
	...CONTROL_ABSTRACTION_BUILT_IN_OBJECTS_NAMES,
	...REFLECTION_BUILT_IN_OBJECTS_NAMES,
	...INTERNATIONALIZATION_BUILT_IN_OBJECTS_NAMES,
] as const;

/* @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects} */
export const BUILT_IN_OBJECTS = {
	...FUNDAMENTAL_BUILT_IN_OBJECTS,
	...ERROR_BUILT_IN_OBJECTS,
	...NUMBER_AND_DATE_BUILT_IN_OBJECTS,
	...TEXT_PROCESSING_BUILT_IN_OBJECTS,
	...INDEXED_COLLECTION_BUILT_IN_OBJECTS,
	...KEYED_COLLECTION_BUILT_IN_OBJECTS,
	...STRUCTURED_DATA_BUILT_IN_OBJECTS,
	...MANAGING_MEMORY_BUILT_IN_OBJECTS,
	...CONTROL_ABSTRACTION_BUILT_IN_OBJECTS,
	...REFLECTION_BUILT_IN_OBJECTS,
	...INTERNATIONALIZATION_BUILT_IN_OBJECTS,
} as const;

export const BUILT_IN_OBJECT_NAME_SCHEMA = z.enum(BUILT_IN_OBJECTS_NAMES);

export const BUILT_IN_OBJECTS_SCHEMAS = {
	...FUNDAMENTAL_BUILT_IN_OBJECTS_SCHEMAS,
	...ERROR_BUILT_IN_OBJECTS_SCHEMAS,
	...NUMBER_AND_DATE_BUILT_IN_OBJECTS_SCHEMAS,
	...TEXT_PROCESSING_BUILT_IN_OBJECTS_SCHEMAS,
	...INDEXED_COLLECTION_BUILT_IN_OBJECTS_SCHEMAS,
	...KEYED_COLLECTION_BUILT_IN_OBJECTS_SCHEMAS,
	...STRUCTURED_DATA_BUILT_IN_OBJECTS_SCHEMAS,
	...MANAGING_MEMORY_BUILT_IN_OBJECTS_SCHEMAS,
	...CONTROL_ABSTRACTION_BUILT_IN_OBJECTS_SCHEMAS,
	...REFLECTION_BUILT_IN_OBJECTS_SCHEMAS,
	...INTERNATIONALIZATION_BUILT_IN_OBJECTS_SCHEMAS,
} as const;

export type BuiltInObjectName = keyof typeof BUILT_IN_OBJECTS;
export type BuiltInObject = (typeof BUILT_IN_OBJECTS)[BuiltInObjectName];

export type BuiltInPrimitiveObjectName = Extract<
	BuiltInObjectName,
	"BigInt" | "Boolean" | "Number" | "String" | "Symbol"
>;

export function validateBuiltInObjectName(name: string): asserts name is BuiltInObjectName {
	BUILT_IN_OBJECT_NAME_SCHEMA.parse(name);
}

export function isBuiltInObjectName(name: string): name is BuiltInObjectName {
	return BUILT_IN_OBJECT_NAME_SCHEMA.safeParse(name).success;
}

export function isBuiltInObject(value: unknown): value is BuiltInObject {
	const name = getConstructorName(value);

	/* prettier-ignore */
	return name && isBuiltInObjectName(name)
		? BUILT_IN_OBJECTS_SCHEMAS[name].safeParse(value).success
		: false;
}

export { AsyncFunction, AsyncGeneratorFunction, GeneratorFunction } from "./groups/control-abstraction.ts";
