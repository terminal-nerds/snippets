export const SAMPLE_ARROW_FUNCTION = () => void 0;

export const SAMPLE_ARROW_ASYNC_FUNCTION = async () => void 0;

export const SAMPLE_SIMPLE_FUNCTION = function () {
	return void 0;
};

export const SAMPLE_SIMPLE_ASYNC_FUNCTION = async function () {
	return void 0;
};

export const SAMPLE_SIMPLE_ASYNC_GENERATOR_FUNCTION = async function* () {
	yield void 0;
	return void 0;
};

export const SAMPLE_SIMPLE_GENERATOR_FUNCTION = function* () {
	yield void 0;
	return void 0;
};

export const SAMPLE_ASYNC_FUNCTIONS = [
	SAMPLE_ARROW_ASYNC_FUNCTION,
	SAMPLE_SIMPLE_ASYNC_FUNCTION,
	SAMPLE_SIMPLE_ASYNC_GENERATOR_FUNCTION,
] as const;

export const SAMPLE_SYNC_FUNCTIONS = [
	SAMPLE_ARROW_FUNCTION,
	SAMPLE_SIMPLE_FUNCTION,
	SAMPLE_SIMPLE_GENERATOR_FUNCTION,
] as const;

export const SAMPLE_GENERATOR_FUNCTIONS = [
	SAMPLE_SIMPLE_ASYNC_GENERATOR_FUNCTION,
	SAMPLE_SIMPLE_GENERATOR_FUNCTION,
] as const;

export const SAMPLE_NON_GENERATOR_FUNCTIONS = [
	SAMPLE_ARROW_FUNCTION,
	SAMPLE_ARROW_ASYNC_FUNCTION,
	SAMPLE_SIMPLE_FUNCTION,
	SAMPLE_SIMPLE_ASYNC_FUNCTION,
] as const;

export const SAMPLE_BUILT_IN_METHODS = [
	Date.now,
	Intl.NumberFormat.supportedLocalesOf,
	Math.min,
	Math.max,
	Number.isNaN,
	String.prototype.match,
] as const;

export const SAMPLE_OBJECT_WITH_METHODS = {
	arrow: SAMPLE_ARROW_FUNCTION,
	arrowAsync: SAMPLE_ARROW_ASYNC_FUNCTION,
	simple: SAMPLE_SIMPLE_FUNCTION,
	simpleAsync: SAMPLE_SIMPLE_ASYNC_FUNCTION,
	simpleAsyncGenerator: SAMPLE_SIMPLE_ASYNC_GENERATOR_FUNCTION,
	simpleGenerator: SAMPLE_SIMPLE_GENERATOR_FUNCTION,
} as const;

class SampleClass {
	static staticArrow = SAMPLE_ARROW_FUNCTION;
	static staticSimple = SAMPLE_SIMPLE_FUNCTION;

	/* prettier-ignore */
	constructor() { void 0; }

	public arrow = SAMPLE_ARROW_FUNCTION;
	public simple = SAMPLE_SIMPLE_FUNCTION;
	/* prettier-ignore */
	public method() { return void 0; }
}

const sampleClass = new SampleClass();

export const SAMPLE_CLASS_METHODS = [
	SampleClass.staticArrow,
	SampleClass.staticSimple,
	sampleClass.arrow,
	sampleClass.simple,
	sampleClass.method,
] as const;

export const SAMPLE_OBJECT_METHODS = [
	SAMPLE_OBJECT_WITH_METHODS.arrow,
	SAMPLE_OBJECT_WITH_METHODS.arrowAsync,
	SAMPLE_OBJECT_WITH_METHODS.simple,
	SAMPLE_OBJECT_WITH_METHODS.simpleAsync,
	SAMPLE_OBJECT_WITH_METHODS.simpleAsyncGenerator,
	SAMPLE_OBJECT_WITH_METHODS.simpleGenerator,
] as const;

export const SAMPLE_ARROW_FUNCTIONS = [
	SampleClass.staticArrow,
	SAMPLE_OBJECT_WITH_METHODS.arrow,
	SAMPLE_OBJECT_WITH_METHODS.arrowAsync,
	sampleClass.arrow,
	SAMPLE_ARROW_FUNCTION,
	() => SAMPLE_SIMPLE_FUNCTION,
	SAMPLE_ARROW_ASYNC_FUNCTION,
	async () => SAMPLE_SIMPLE_FUNCTION,
] as const;

/* prettier-ignore */
export const SAMPLE_SIMPLE_FUNCTIONS = [
	SAMPLE_SIMPLE_FUNCTION,
	function simple() { return SAMPLE_ARROW_FUNCTION; },
	SAMPLE_SIMPLE_ASYNC_FUNCTION,
	async function simple() { return SAMPLE_ARROW_FUNCTION; },
	SAMPLE_SIMPLE_ASYNC_GENERATOR_FUNCTION,
	async function* simple() { yield void 0; return SAMPLE_ARROW_FUNCTION; },
	SAMPLE_SIMPLE_GENERATOR_FUNCTION,
	function* simple() { yield void 0; return SAMPLE_ARROW_FUNCTION; },
	SampleClass.staticSimple,
	sampleClass.simple,
	SAMPLE_OBJECT_WITH_METHODS.simple,
	SAMPLE_OBJECT_WITH_METHODS.simpleAsync,
	SAMPLE_OBJECT_WITH_METHODS.simpleAsyncGenerator,
	SAMPLE_OBJECT_WITH_METHODS.simpleGenerator,
	sampleClass.method,
	...SAMPLE_BUILT_IN_METHODS,
] as const;

export const SAMPLE_FUNCTIONS = [...SAMPLE_ARROW_FUNCTIONS, ...SAMPLE_SIMPLE_FUNCTIONS] as const;
