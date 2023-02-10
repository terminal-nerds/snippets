import { EMPTY_STRING_SCHEMA, type EmptyString } from "../schema/schema.js";
import { validateString } from "../validate-string/validate-string.js";

export function isStringEmpty(value: string): value is EmptyString {
	validateString(value);

	return EMPTY_STRING_SCHEMA.safeParse(value).success;
}
