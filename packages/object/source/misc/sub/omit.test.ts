import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, it } from "vitest";
import { ZodError } from "zod";

import { omitObjectEntries } from "./omit.ts";

describe("omitObjectEntries(object, keys)", () => {
	it(throws(ZodError).on(`invalid object values`).samples(SAMPLE_PRIMITIVES), ({ expect }) => {
		// @ts-expect-error Testing
		expect(() => omitObjectEntries(SAMPLE_PRIMITIVES)).toThrowError(ZodError);
	});

	it(
		returns({ b: 2 })
			.on(`sample object`)
			.with({ keys: ["a"] }),
		({ expect }) => {
			expect(omitObjectEntries({ a: 1, b: 2 }, ["a"])).toEqual({ b: 2 });
		},
	);
});
