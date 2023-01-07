import { STRING_SCHEMA } from "../string.schema.js";

export function validateString(value: unknown): string {
	return STRING_SCHEMA.parse(value);
}
