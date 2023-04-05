import type { Flag } from "magic-regexp";
import { z } from "zod";

export * from "magic-regexp";

// TODO: Get rid of this
/* eslint-disable no-unused-vars */
export enum REGEXP_FLAGS {
	/** Case-insensitive search */
	caseInsensitive = "i",
	/** Allows `.` to match newline characters */
	dotAll = "s",
	/** Global search */
	global = "g",
	/** Generate indices for substring matches */
	withIndices = "d",
	/** Multi-line search */
	multiline = "m",
	/** Treat a pattern as a sequence of unicode code points */
	unicode = "u",
	/** Perform a "sticky" search that matches starting at the current position in the target string */
	sticky = "y",
}
/* eslint-enable no-unused-vars */

export type RegExpFlagName = keyof typeof REGEXP_FLAGS;

export const REGEXP_FLAG_SCHEMA = z.nativeEnum(REGEXP_FLAGS);

export function validateRegExpFlag(flag: string): Flag {
	return REGEXP_FLAG_SCHEMA.parse(flag);
}

export function isValidRegExpFlag(flag: string): flag is Flag {
	return REGEXP_FLAG_SCHEMA.safeParse(flag).success;
}
// eslint-disable-next-line no-unused-vars
export type RegExpOptions = Partial<{ [name in RegExpFlagName]: boolean }>;

export function setRegExpFlags(options: RegExpOptions): Array<Flag> {
	return Object.entries(options)
		.filter(([, value]) => value)
		.map(([key]) => REGEXP_FLAGS[key as RegExpFlagName])
		.filter(Boolean);
}
