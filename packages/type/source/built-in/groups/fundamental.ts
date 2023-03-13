import { z } from "zod";

/** @see {@link FUNDAMENTAL_BUILT_IN_OBJECTS_NAMES} */
export const FUNDAMENTAL_BUILT_IN_OBJECTS_NAMES = ["Boolean", "Function", "Object", "Symbol"] as const;

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#fundamental_objects} */
export const FUNDAMENTAL_BUILT_IN_OBJECTS = {
	Boolean: Boolean,
	Function: Function,
	Object: Object,
	Symbol: Symbol,
} as const;

export type FundamentalBuiltInObjectName = keyof typeof FUNDAMENTAL_BUILT_IN_OBJECTS;
export type FundamentalBuiltInObject = (typeof FUNDAMENTAL_BUILT_IN_OBJECTS)[FundamentalBuiltInObjectName];

export const FUNDAMENTAL_BUILT_IN_OBJECT_NAME_SCHEMA = z.enum(FUNDAMENTAL_BUILT_IN_OBJECTS_NAMES);

export const FUNDAMENTAL_BUILT_IN_OBJECTS_SCHEMAS = {
	Boolean: z.instanceof(Boolean),
	Function: z.instanceof(Function),
	Object: z.instanceof(Object),
	Symbol: z.symbol(), // NOTE: Symbol is not a contructor
} as const;
