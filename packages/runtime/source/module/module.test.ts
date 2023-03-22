import { returns } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";

import { getDependenciesMap, getPackagesNames, hasModule } from "./module.ts";

describe(`hasModule(name)`, () => {
	const nonExistingModuleName = "terminal-nerdss";

	it(returns(false).on(`non-existing module`).sample(nonExistingModuleName), () => {
		expect(hasModule(nonExistingModuleName)).toBe(false);
	});

	const moduleName = "typescript";

	it(returns(true).on(`existing module`).sample(moduleName), () => {
		expect(hasModule(moduleName)).toBe(true);
	});
});

describe(`getDependenciesMap()`, () => {
	const map = getDependenciesMap();

	it(returns(map).on(`the current package directory`), () => {
		expect(map).toBeInstanceOf(Map);
	});

	const expectedKeys = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"] as const;

	it(`has keys: ${JSON.stringify(expectedKeys, undefined, 1)}`, () => {
		expect([...map.keys()]).toStrictEqual(expectedKeys);
	});

	/**
	 * NOTE: This is apparently an expected behaviour...?
	 *
	 * @see {@link https://github.com/npm/cli/issues/1886}
	 */
	it.fails(`'dependencies' at the root is '${undefined}'`, () => {
		expect(map.get("dependencies")).toBeUndefined();
	});

	// eslint-disable-next-line unicorn/prevent-abbreviations
	const expectedDevDependencyName = "eslint";

	it(`'devDeependencies' at the root has '${expectedDevDependencyName}'`, () => {
		expect(map.get("devDependencies")).toHaveProperty(expectedDevDependencyName);
	});

	it(`'peerDeependencies' at the root has '${undefined}'`, () => {
		expect(map.get("peerDependencies")).toBeUndefined();
	});

	const expectedOptionalDependencyName = "husky";

	it(`'optionalDeependencies' at the root has '${expectedOptionalDependencyName}'`, () => {
		expect(map.get("optionalDependencies")).toHaveProperty(expectedOptionalDependencyName);
	});
});

describe(`getAllPackagesNames()`, () => {
	const packages = getPackagesNames();

	it(returns(packages).on(`the current repository with all package names`), () => {
		expect(packages).toBeInstanceOf(Set);
		expect(packages).toContain("typescript");
	});
});

describe(`hasPackage(name)`, () => {
	const nonExistingPackageName = "terminal-nerdss";

	it(returns(false).on(`non-existing package name in any of dependencies`).sample(nonExistingPackageName), () => {
		expect(hasModule(nonExistingPackageName)).toBe(false);
	});

	const packageName = "typescript";

	it(returns(true).on(`existing package name in any of dependencies`).sample(packageName), () => {
		expect(hasModule(packageName)).toBe(true);
	});
});
