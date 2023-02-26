import type { Flag } from "magic-regexp";
import { z } from "zod";

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

export type RegExpFlagName = keyof typeof REGEXP_FLAGS;

export const REGEXP_FLAG_SCHEMA = z.nativeEnum(REGEXP_FLAGS);

export function validateRegExpFlag(flag: string): Flag {
	return REGEXP_FLAG_SCHEMA.parse(flag);
}

export function isValidRegExpFlag(flag: string): flag is Flag {
	return REGEXP_FLAG_SCHEMA.safeParse(flag).success;
}
export type RegExpOptions = Partial<{ [name in RegExpFlagName]: boolean }>;

export function setRegExpFlags(options: RegExpOptions): Array<Flag> {
	return Object.entries(options)
		.filter(([, value]) => value)
		.map(([key]) => REGEXP_FLAGS[key as RegExpFlagName])
		.filter(Boolean);
}

export * from "magic-regexp";
