import { SAMPLE_ARRAYS } from "./groups/array.js";
import { FALSY_BIG_INTS, SAMPLE_BIG_INTS, TRUTHY_BIG_INTS } from "./groups/bigint.js";
import { FALSY_BOOLEANS, SAMPLE_BOOLEANS, TRUTHY_BOOLEANS } from "./groups/boolean.js";
import { SAMPLE_DATES } from "./groups/date.js";
import { SAMPLE_FUNCTIONS } from "./groups/function.js";
import { SAMPLE_MAPS } from "./groups/map.js";
import { SAMPLE_NULLS } from "./groups/null.js";
import { FALSY_NUMBERS, SAMPLE_NUMBERS, TRUTHY_NUMBERS } from "./groups/number.js";
import { SAMPLE_OBJECTS } from "./groups/object.js";
import { SAMPLE_REGEXES } from "./groups/regexp.js";
import { SAMPLE_SETS } from "./groups/set.js";
import { FALSY_STRINGS, SAMPLE_STRINGS, TRUTHY_STRINGS } from "./groups/string.js";
import { SAMPLE_SYMBOLS } from "./groups/symbol.js";
import { SAMPLE_UNDEFINEDES } from "./groups/undefined.js";

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
