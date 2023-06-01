import { SAMPLE_PRIMITIVES } from "@terminal-nerds/snippets-test/sample";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, it } from "vitest";
import { ZodError } from "zod";

import { pickObjectEntries } from "./pick.ts";

describe("pickObjectEntries(object, keys)", () => {
	it(throws(ZodError).on(`invalid object values`).samples(SAMPLE_PRIMITIVES), ({ expect }) => {
		// @ts-expect-error Testing
		expect(() => pickObjectEntries(SAMPLE_PRIMITIVES)).toThrowError(ZodError);
	});

	it(
		returns({ a: 1 })
			.on(`sample object`)
			.with({ keys: ["a"] }),
		({ expect }) => {
			expect(pickObjectEntries({ a: 1, b: 2 }, ["a"])).toEqual({ a: 1 });
		},
	);
});
