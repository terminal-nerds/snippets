import { z } from "zod";

/* prettier-ignore */
/** @see {@link CONTROL_ABSTRACTION_BUILT_IN_OBJECTS} */
export const CONTROL_ABSTRACTION_BUILT_IN_OBJECTS_NAMES = [
	"Promise",
	// NOTE: Those are not defined.
	// "GeneratorFunction",
	// "AsyncGeneratorFunction",
	// "Generator",
	// "AsyncGenerator",
	// "AsyncFunction",
] as const;

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#control_abstractions_objects} */
export const CONTROL_ABSTRACTION_BUILT_IN_OBJECTS = {
	Promise: Promise,
	// NOTE: Those are not defined, unlike what MDN says
	// GeneratorFunction: GeneratorFunction,
	// AsyncGeneratorFunction: AsyncGeneratorFunction,
	// Generator: Generator,
	// AsyncGenerator: AsyncGenerator,
	// AsyncFunction: AsyncFunction,
} as const;

export type ControlAbstractionBuiltInObjectName = keyof typeof CONTROL_ABSTRACTION_BUILT_IN_OBJECTS;
export type ControlAbstractionBuiltInObject =
	(typeof CONTROL_ABSTRACTION_BUILT_IN_OBJECTS)[ControlAbstractionBuiltInObjectName];

export const CONTROL_ABSTRACTION_BUILT_IN_OBJECT_NAME_SCHEMA = z.enum(CONTROL_ABSTRACTION_BUILT_IN_OBJECTS_NAMES);

export const CONTROL_ABSTRACTION_BUILT_IN_OBJECTS_SCHEMAS = {
	Promise: z.instanceof(Promise),
	// NOTE: Those are not defined, unlike what MDN says
	// GeneratorFunction: z.instanceof(GeneratorFunction),
	// AsyncGeneratorFunction: z.instanceof(AsyncGeneratorFunction),
	// Generator: z.instanceof(Generator),
	// AsyncGenerator: z.instanceof(AsyncGenerator),
	// AsyncFunction: z.instanceof(AsyncFunction),
} as const;
