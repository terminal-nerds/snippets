import { STRING_SCHEMA } from "../schema/schema.js";

export function validateString(value: unknown): string {
	return STRING_SCHEMA.parse(value);
}
