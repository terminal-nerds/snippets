import { STRING_SCHEMA } from "../string.schema.js";

export function isString(value: unknown): value is string {
	return STRING_SCHEMA.safeParse(value).success;
}
