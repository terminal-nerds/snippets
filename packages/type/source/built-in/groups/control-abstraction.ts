import { z } from "zod";

// eslint-disable-next-line func-names, @typescript-eslint/no-empty-function
export const AsyncFunction = async function () {}.constructor as (...args: any[]) => Promise<any>;

// eslint-disable-next-line func-names, @typescript-eslint/no-empty-function
export const AsyncGeneratorFunction = async function* () {}.constructor as AsyncGeneratorFunction;

// eslint-disable-next-line func-names, @typescript-eslint/no-empty-function
export const GeneratorFunction = function* () {}.constructor as GeneratorFunction;

/* prettier-ignore */
/** @see {@link CONTROL_ABSTRACTION_BUILT_IN_OBJECTS} */
export const CONTROL_ABSTRACTION_BUILT_IN_OBJECTS_NAMES = [
	"AsyncFunction"	,
	"AsyncGeneratorFunction",
	"GeneratorFunction",
	"Promise",
	// NOTE: Those are not defined.
	// "AsyncGenerator",
	// "Generator",
] as const;

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#control_abstractions_objects} */
export const CONTROL_ABSTRACTION_BUILT_IN_OBJECTS = {
	AsyncFunction: AsyncFunction,
	AsyncGeneratorFunction: AsyncGeneratorFunction,
	GeneratorFunction: GeneratorFunction,
	Promise: Promise,
	// NOTE: Those are not defined, unlike what MDN says
	// AsyncGenerator: AsyncGenerator,
	// Generator: Generator,
} as const;

export type ControlAbstractionBuiltInObjectName = keyof typeof CONTROL_ABSTRACTION_BUILT_IN_OBJECTS;
export type ControlAbstractionBuiltInObject =
	(typeof CONTROL_ABSTRACTION_BUILT_IN_OBJECTS)[ControlAbstractionBuiltInObjectName];

export const CONTROL_ABSTRACTION_BUILT_IN_OBJECT_NAME_SCHEMA = z.enum(CONTROL_ABSTRACTION_BUILT_IN_OBJECTS_NAMES);

export const CONTROL_ABSTRACTION_BUILT_IN_OBJECTS_SCHEMAS = {
	AsyncFunction: z.function().returns(z.promise(z.any())),
	AsyncGeneratorFunction: z.instanceof(AsyncGeneratorFunction),
	GeneratorFunction: z.instanceof(GeneratorFunction),
	Promise: z.promise(z.any()),
	// NOTE: Those are not defined, unlike what MDN says
	// AsyncGenerator: z.instanceof(AsyncGenerator),
	// Generator: z.instanceof(Generator),
} as const;
