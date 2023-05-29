import { z } from "zod";

/* prettier-ignore */
export const CHARS_NUMBER = [
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
] as const;

export type CharNumber = (typeof CHARS_NUMBER)[number];

export const SCHEMA_CHAR_NUMBER = z.enum(CHARS_NUMBER);

export function isCharNumber(char: string): char is CharNumber {
	return SCHEMA_CHAR_NUMBER.safeParse(char).success;
}

export function validateCharNumber(char: string): asserts char is CharNumber {
	SCHEMA_CHAR_NUMBER.parse(char);
}
