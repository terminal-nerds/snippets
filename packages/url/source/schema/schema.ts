import { z } from "zod";

export const URL_SCHEMA = z.instanceof(URL).or(
	z
		.string()
		.url()
		.transform((value) => new URL(value)),
);

export function validateURL(value: unknown): asserts value is URL {
	URL_SCHEMA.parse(value);
}

export function isURL(value: unknown): value is URL {
	return URL_SCHEMA.safeParse(value).success;
}

export * from "./port/port.ts";
export * from "./protocol/protocol.ts";
