import { SAMPLE_ARRAYS } from "./groups/array.ts";
import { FALSY_BIG_INTS, SAMPLE_BIG_INTS, TRUTHY_BIG_INTS } from "./groups/bigint.ts";
import { FALSY_BOOLEANS, SAMPLE_BOOLEANS, TRUTHY_BOOLEANS } from "./groups/boolean.ts";
import { SAMPLE_DATES } from "./groups/date.ts";
import { SAMPLE_FUNCTIONS } from "./groups/function.ts";
import { SAMPLE_MAPS } from "./groups/map.ts";
import { SAMPLE_NULLS } from "./groups/null.ts";
import { FALSY_NUMBERS, SAMPLE_NUMBERS, TRUTHY_NUMBERS } from "./groups/number.ts";
import { SAMPLE_OBJECTS } from "./groups/object.ts";
import { SAMPLE_REGEXES } from "./groups/regexp.ts";
import { SAMPLE_SETS } from "./groups/set.ts";
import { FALSY_STRINGS, SAMPLE_STRINGS, TRUTHY_STRINGS } from "./groups/string.ts";
import { SAMPLE_SYMBOLS } from "./groups/symbol.ts";
import { SAMPLE_UNDEFINEDES } from "./groups/undefined.ts";

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

export const SAMPLE_NON_PRIMITIVES = [
	...SAMPLE_ARRAYS,
	...SAMPLE_DATES,
	...SAMPLE_FUNCTIONS,
	...SAMPLE_MAPS,
	...SAMPLE_OBJECTS,
	...SAMPLE_SETS,
	...SAMPLE_REGEXES,
] as const;

export const ALL_SAMPLES = [...SAMPLE_PRIMITIVES, ...SAMPLE_NON_PRIMITIVES] as const;
