export const SAMPLE_STRING = "terminal-nerds.DEV@2023";

/* prettier-ignore */
export const FALSY_STRINGS = [
	"",
	'',
	``,
	String(),
	String(""),
	String(''),
	String(``),
] as const;

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

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String} String */
export const SAMPLE_STRINGS = [...FALSY_STRINGS, ...TRUTHY_STRINGS] as const;
