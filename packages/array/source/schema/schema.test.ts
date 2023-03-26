import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { validateArray } from "./schema.ts";

describe("validateArray(value)", () => {
	it(throws(ZodError).on(`non-array values`).samples(SAMPLE_PRIMITIVES), () => {
		for (const sample of SAMPLE_PRIMITIVES) {
			expect(() => validateArray(sample)).toThrowError(ZodError);
		}
	});

	it(returns().on(`array value`), () => {
		expect(() => validateArray([])).not.toThrowError(ZodError);
	});
});
