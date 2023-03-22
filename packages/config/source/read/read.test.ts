import { returns } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";

import {
	type AbsolutePath,
	getCurrentWorkingDirectory,
	getNearestConfigPath,
	getNearestPackageRootPath,
} from "./read.ts";

describe(`getNearestPackageRootPath(cwd?)`, () => {
	const expected = getCurrentWorkingDirectory();

	it(returns(expected).on(`a call without parameter`), () => {
		expect(getNearestPackageRootPath()).toBe(expected);
	});

	const customCwd = `${getCurrentWorkingDirectory()}/packages/config/read`;
	const expectedWithCustomCwd = `${getCurrentWorkingDirectory()}/packages/config`;

	it(returns(expectedWithCustomCwd).on(`a call custom cwd parameter`), () => {
		expect(getNearestPackageRootPath(customCwd)).toBe(expectedWithCustomCwd);
	});
});

describe(`getNearestConfigPath(name, cwd?)`, () => {
	const expected = `${getCurrentWorkingDirectory()}/.editorconfig`;

	it(returns(expected).on(`finding`).sample(".editorconfig"), () => {
		expect(getNearestConfigPath(".editorconfig")).toBe(expected);
	});

	const customCwd = `${getCurrentWorkingDirectory()}/packages/config/read` as AbsolutePath;
	const expectedWithCustomCwd = `${getCurrentWorkingDirectory()}/packages/config/package.json`;

	it(returns(expectedWithCustomCwd).on(`finding "package.json"`).and(`with custom cwd parameter`), () => {
		expect(getNearestConfigPath("package.json", customCwd)).toBe(expectedWithCustomCwd);
	});
});
