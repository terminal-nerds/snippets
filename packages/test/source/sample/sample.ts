/* eslint-disable unicorn/no-useless-undefined, unicorn/prefer-number-properties, unicorn/no-null */

export const FALSY_BIG_INTS = [0n, -0n, BigInt(0), BigInt(-0)] as const;
export const TRUTHY_BIG_INTS = [
	BigInt(Number.MIN_SAFE_INTEGER),
	BigInt(Number.MAX_SAFE_INTEGER),
	BigInt(Number.MAX_VALUE),
] as const;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt} */
export const SAMPLE_BIG_INTS = [...FALSY_BIG_INTS, ...TRUTHY_BIG_INTS] as const;

export const FALSY_BOOLEANS = [
	false,
	Boolean(false),
	Boolean(),
	Boolean(0),
	Boolean(""),
	Boolean(undefined),
	Boolean(null),
] as const;
export const TRUTHY_BOOLEANS = [true, Boolean(true), Boolean(1), Boolean("a")] as const;
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean} */
export const SAMPLE_BOOLEANS = [...FALSY_BOOLEANS, ...TRUTHY_BOOLEANS] as const;

export const SAMPLE_INFINITIES = [-Infinity, Number.NEGATIVE_INFINITY, Infinity, Number.POSITIVE_INFINITY] as const;
export const SAMPLE_NANS = [NaN, Number.NaN, Number(NaN), Number(Number.NaN)] as const;
export const FALSY_NUMBERS = [-0, 0, Number(), ...SAMPLE_NANS] as const;
export const TRUTHY_NUMBERS = [
	Number.MIN_SAFE_INTEGER,
	Number.MIN_VALUE,
	Number.EPSILON,
	Number.MAX_SAFE_INTEGER,
	Number.MAX_VALUE,
] as const;

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number} */
export const SAMPLE_NUMBERS = [...SAMPLE_INFINITIES, ...FALSY_NUMBERS, ...TRUTHY_NUMBERS] as const;

/**
 * This is a bug, because its type is an object.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Glossary/Null}
 */
export const SAMPLE_NULLS = [null] as const;

/* prettier-ignore */
export const FALSY_STRINGS = ["", '', ``, String(), String(""), String(''), String(``)] as const;
export const NUMERIC_STRINGS = [
	"123456789",
	"-123456789",
	"123.456789",
	"-123.456789",
	" 123.456789 ",
	" -123.456789 ",
	"0b11111111", // 255
	"0o377", // 255
	"0xFF", // 255
	"10e1000",
	"Infinity",
	"-Infinity",
] as const;
export const TRUTHY_STRINGS = [
	'string from double quotes (")',
	"string from single quotes (')",
	`string from backtick - ${"template literals"} - (\`)`,
	...NUMERIC_STRINGS,
] as const;
/* prettier-ignore */
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String} */
export const SAMPLE_STRINGS = [
	...FALSY_STRINGS,
	...TRUTHY_STRINGS,
] as const;

/* prettier-ignore */
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol} */
export const SAMPLE_SYMBOLS = [
	Symbol(),
	Symbol(1),
	Symbol(0),
	Symbol(-0),
	Symbol(NaN),
	// eslint-disable-next-line unicorn/no-useless-undefined
	Symbol(undefined),
	Symbol("string"),
	Symbol(""),
] as const;

/* prettier-ignore */
/** @see {@link https://developer.mozilla.org/en-US/docs/Glossary/Undefined} */
export const SAMPLE_UNDEFINEDES = [
	undefined,
	void 0,
];

/** @see {@link https://developer.mozilla.org/en-US/docs/Glossary/Falsy} */
export const FALSY_PRIMITIVES = [
	...FALSY_BIG_INTS,
	...FALSY_BOOLEANS,
	...FALSY_NUMBERS,
	...SAMPLE_NULLS,
	...FALSY_STRINGS,
	...SAMPLE_UNDEFINEDES,
] as const;

/** @see {@link https://developer.mozilla.org/en-US/docs/Glossary/Truthy} */
export const TRUTHY_PRIMITIVES = [
	...TRUTHY_BIG_INTS,
	...TRUTHY_BOOLEANS,
	...TRUTHY_NUMBERS,
	...TRUTHY_STRINGS,
] as const;

export const SAMPLE_PRIMITIVES = [
	...SAMPLE_BIG_INTS,
	...SAMPLE_BOOLEANS,
	...SAMPLE_NULLS,
	...SAMPLE_NUMBERS,
	...SAMPLE_STRINGS,
	...SAMPLE_SYMBOLS,
	...SAMPLE_UNDEFINEDES,
] as const;

export const SAMPLE_BIG_INT = BigInt(987);
export const SAMPLE_NUMBER = 1337;
export const SAMPLE_STRING = "terminal-nerds.DEV@2023";
export const SAMPLE_SYMBOL = Symbol("terminal-nerds");

export const SAMPLE_REGEXES = [
	// eslint-disable-next-line prefer-regex-literals
	new RegExp(""),
	/nerds/i,
] as const;

export const SAMPLE_ARRAYS = [[], [1, 2]] as const;
export const SAMPLE_DATES = [new Date(), new Date("2023-01-01T00:00:00.000Z")];
export const SAMPLE_MAPS = [
	new Map(),
	new Map([
		[1, "one"],
		[2, "two"],
		[3, "three"],
	]),
] as const;
export const SAMPLE_OBJECTS = [{}, { key: "value" }] as const;
export const SAMPLE_SETS = [new Set(), new Set([1, 2, 2])] as const;

export const NON_PRIMITIVES = [
	...SAMPLE_ARRAYS,
	...SAMPLE_DATES,
	...SAMPLE_MAPS,
	...SAMPLE_OBJECTS,
	...SAMPLE_SETS,
	...SAMPLE_REGEXES,
] as const;

export const ALL_SAMPLES = [...SAMPLE_PRIMITIVES, ...NON_PRIMITIVES] as const;
