export const SAMPLE_BIG_INT = BigInt(987);
/* prettier-ignore */
export const FALSY_BIG_INTS = [
	0n,
	-0n,
	BigInt(0),
	BigInt(-0),
] as const;

export const TRUTHY_BIG_INTS = [
	BigInt(Number.MIN_SAFE_INTEGER),
	BigInt(Number.MAX_SAFE_INTEGER),
	BigInt(Number.MAX_VALUE),
] as const;

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt} */
export const SAMPLE_BIG_INTS = [...FALSY_BIG_INTS, ...TRUTHY_BIG_INTS] as const;
