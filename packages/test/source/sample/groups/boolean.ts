export const FALSY_BOOLEANS = [
	false,
	Boolean(false),
	Boolean(),
	Boolean(0),
	Boolean(""),
	// eslint-disable-next-line unicorn/no-useless-undefined
	Boolean(undefined),
	// eslint-disable-next-line unicorn/no-null
	Boolean(null),
] as const;

/* prettier-ignore */
export const TRUTHY_BOOLEANS = [
	true,
	Boolean(true),
	Boolean(1),
	Boolean("a"),
] as const;

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean} */
export const SAMPLE_BOOLEANS = [...FALSY_BOOLEANS, ...TRUTHY_BOOLEANS] as const;
