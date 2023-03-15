export const SAMPLE_SYMBOL = Symbol("terminal-nerds");

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol} */
export const SAMPLE_SYMBOLS = [
	Symbol(),
	Symbol(1),
	Symbol(0),
	Symbol(-0),
	// eslint-disable-next-line unicorn/prefer-number-properties
	Symbol(NaN),
	// eslint-disable-next-line unicorn/no-useless-undefined
	Symbol(undefined),
	Symbol("string"),
	Symbol(""),
] as const;
