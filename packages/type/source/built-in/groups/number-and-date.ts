import { z } from "zod";

/* prettier-ignore */
/** @see {@link NUMBER_AND_DATE_BUILT_IN_OBJECTS} */
export const NUMBER_AND_DATE_BUILT_IN_OBJECTS_NAMES = [
	"Number",
	"BigInt",
	"Math",
	"Date",
] as const;

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#number_and_dates} */
export const NUMBER_AND_DATE_BUILT_IN_OBJECTS = {
	BigInt: BigInt,
	Date: Date,
	Math: Math,
	Number: Number,
} as const;

export type NumberAndDateBuiltInObjectName = keyof typeof NUMBER_AND_DATE_BUILT_IN_OBJECTS;
export type NumberAndDateBuiltInObject = (typeof NUMBER_AND_DATE_BUILT_IN_OBJECTS)[NumberAndDateBuiltInObjectName];

export const NUMBER_AND_DATE_BUILT_IN_OBJECT_NAMES_SCHEMA = z.enum(NUMBER_AND_DATE_BUILT_IN_OBJECTS_NAMES);

export const NUMBER_AND_DATE_BUILT_IN_OBJECTS_SCHEMAS = {
	BigInt: z.bigint(), // NOTE: BigInt is not a constructor
	Date: z.instanceof(Date),
	Math: z.instanceof(Object), // NOTE: Math cannot be instantiated
	Number: z.instanceof(Number),
} as const;
