import { STRING_SCHEMA } from "../schema/schema.js";

export function isString(value: unknown): value is string {
	return STRING_SCHEMA.safeParse(value).success;
}
