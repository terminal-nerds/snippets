export const SAMPLE_STRING = "terminal-nerds";

/* prettier-ignore */
export const EMPTY_STRING_VALUES = [
	"", String(),
	String(""),
];

/* prettier-ignore */
export const NON_EMPTY_STRING_VALUES = [
	SAMPLE_STRING,
	String(SAMPLE_STRING),
	"10",
];

/* prettier-ignore */
export const STRING_VALUES = [
	...EMPTY_STRING_VALUES,
	...NON_EMPTY_STRING_VALUES,
];

/* prettier-ignore */
export const NON_STRING_VALUES = [
	undefined,
	// eslint-disable-next-line unicorn/no-null
	null,
	true,
	Boolean(),
	{},
	[],
	{ string: "" },
	[""],
	10,
	/a/,
	// eslint-disable-next-line prefer-regex-literals
	new RegExp(""),
];
