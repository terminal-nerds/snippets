import { returns } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";

import { getDependenciesMap, getPackagesNames, hasModule } from "./module.js";

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

	it(`has keys: ${JSON.stringify(expectedKeys, undefined, 1)} - of the current package directory`, () => {
		expect([...map.keys()]).toStrictEqual(expectedKeys);
	});

	const expectedDependencyName = "zod";

	it(`'dependencies' has '${expectedDependencyName}'`, () => {
		expect(map.get("dependencies")).toHaveProperty(expectedDependencyName);
	});

	// eslint-disable-next-line unicorn/prevent-abbreviations
	const expectedDevDependencyName = "@terminal-nerds/snippets-test";

	it(`'devDeependencies' has '${expectedDevDependencyName}'`, () => {
		expect(map.get("devDependencies")).toHaveProperty(expectedDevDependencyName);
	});

	const expectedPeerDependencyName = "typescript";

	it(`'peerDeependencies' has '${expectedPeerDependencyName}'`, () => {
		expect(map.get("peerDependencies")).toHaveProperty(expectedPeerDependencyName);
	});

	it(`'optionalDeependencies' is '${undefined}'`, () => {
		expect(map.get("optionalDependencies")).toBeUndefined();
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
