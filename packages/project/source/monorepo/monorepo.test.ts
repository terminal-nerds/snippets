import { join } from "node:path";

import { RuntimeError } from "@terminal-nerds/snippets-error/custom";
import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, it } from "vitest";

import { getProjectMonorepoRootPath, isProjectMonorepo } from "./monorepo.ts";

describe(`getProjectMonorepoRoothPath(cwd?)`, () => {
	const sampleCwd = join(process.env["HOME"] as string);

	it(throws(RuntimeError).on(`random cwd`).sample(sampleCwd), ({ expect }) => {
		expect(() => getProjectMonorepoRootPath(sampleCwd)).toThrowError(RuntimeError);
	});

	it(returns({ what: "String", value: "<project monorepo path>" }).on(`monorepo project`), ({ expect }) => {
		expect(getProjectMonorepoRootPath()).toBeTypeOf("string");
	});
});

describe(`isProjectMonorepo()`, () => {
	// TODO: Find a way to test this case.
	describe.todo("returns false on random cwd - don't know how to test it yet.");

	it(returns(true).on(`monorepo project`), ({ expect }) => {
		expect(isProjectMonorepo()).toBe(true);
	});
});
