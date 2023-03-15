/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN} NaN - Not-A-Number */
export const SAMPLE_NANS = [
	// eslint-disable-next-line unicorn/prefer-number-properties
	NaN,
	Number.NaN,
	// eslint-disable-next-line unicorn/prefer-number-properties
	Number(NaN),
	Number(Number.NaN),
] as const;
