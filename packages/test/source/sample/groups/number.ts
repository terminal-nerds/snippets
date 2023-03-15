import { SAMPLE_INFINITIES } from "./infinity.js";
import { SAMPLE_NANS } from "./nan.js";

export const SAMPLE_NUMBER = 1337;

/* prettier-ignore */
export const FALSY_NUMBERS = [
	-0,
	0,
	Number(),
	...SAMPLE_NANS,
] as const;

export const TRUTHY_NUMBERS = [
	SAMPLE_NUMBER,
	...SAMPLE_INFINITIES,
	Number.MIN_SAFE_INTEGER,
	Number.MIN_VALUE,
	Number.EPSILON,
	Number.MAX_SAFE_INTEGER,
	Number.MAX_VALUE,
] as const;

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number} Number */
export const SAMPLE_NUMBERS = [...FALSY_NUMBERS, ...TRUTHY_NUMBERS] as const;
