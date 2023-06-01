import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, it } from "vitest";
import { ZodError } from "zod";

import { isObjectEmpty, validateEmptyObject } from "./empty.ts";

const EMPTY_OBJECT = {} as const;
const NON_EMPTY_OBJECT = { a: 1 } as const;

describe(`validateEmptyObject(value)`, () => {
	it(throws(ZodError).on(`non-empty object`).sample(NON_EMPTY_OBJECT), ({ expect }) => {
		expect(() => validateEmptyObject(NON_EMPTY_OBJECT)).toThrowError(ZodError);
	});

	it(returns().on(`empty object`).sample(EMPTY_OBJECT), ({ expect }) => {
		expect(() => validateEmptyObject(EMPTY_OBJECT)).not.toThrowError(ZodError);
	});
});

describe(`validateEmptyObject(value)`, () => {
	it(returns(false).on(`non-empty object`).sample(NON_EMPTY_OBJECT), ({ expect }) => {
		expect(isObjectEmpty(NON_EMPTY_OBJECT)).toBe(false);
	});

	it(returns(true).on(`empty object`).sample(EMPTY_OBJECT), ({ expect }) => {
		expect(isObjectEmpty(EMPTY_OBJECT)).toBe(true);
	});
});
