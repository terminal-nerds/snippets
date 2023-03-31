import { isNonPrimitive, validateNonPrimitive } from "@terminal-nerds/snippets-type/non-primitive";

export function validateObject(value: unknown): asserts value is object {
	validateNonPrimitive(value, "object");
}

export function isObject(value: unknown): value is object {
	return isNonPrimitive(value, "object");
}

export * from "./empty/empty.ts";
