import { z } from "zod";

export const CHARS_SPECIAL = [
	"~",
	"`",
	"@",
	"#",
	"$",
	"%",
	"^",
	"&",
	"*",
	"(",
	")",
	"-",
	"_",
	"+",
	"=",
	"\\",
	"|",
	"]",
	"}",
	"[",
	"{",
	'"',
	"'",
	";",
	":",
	"/",
	"?",
	".",
	">",
	",",
	"<",
] as const;
export type CharSpecial = (typeof CHARS_SPECIAL)[number];

export const SCHEMA_CHAR_SPECIAL = z.enum(CHARS_SPECIAL);

export function isSpecialChar(input: string): input is CharSpecial {
	return SCHEMA_CHAR_SPECIAL.safeParse(input).success;
}

export function validateSpecialChar(input: string): asserts input is CharSpecial {
	SCHEMA_CHAR_SPECIAL.parse(input);
}
