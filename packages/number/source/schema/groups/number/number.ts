import { isPrimitive, validatePrimitive } from "@terminal-nerds/snippets-type/primitive";

export { NUMBER_SCHEMA } from "@terminal-nerds/snippets-type/primitive";

/** NOTE: This snippet doesn't consider `NaN` as number! */
export function validateNumber(value: unknown): asserts value is number {
	return validatePrimitive(value, "number");
}

/** NOTE: This snippet doesn't consider `NaN` as number! */
export function isNumber(value: unknown): value is number {
	return isPrimitive(value, "number");
}
