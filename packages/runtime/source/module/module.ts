import { RuntimeError } from "@terminal-nerds/snippets-error/custom";
import { resolveModule } from "local-pkg";
import { type NormalizedPackageJson, readPackageUpSync } from "read-pkg-up";
import type { KebabCase } from "type-fest/source/kebab-case.ts";

import { IN_BROWSER } from "../environment/environment.ts";

/** @see {@link https://nodejs.org/api/modules.html#modules-commonjs-modules} CommonJS Module */
export const IN_CJS = typeof globalThis.require === "function";

/** @see {@link https://nodejs.org/api/esm.html#modules-ecmascript-modules} ECMAScript Module */
export const IN_ESM = !IN_CJS && Boolean(import.meta);

export function hasModule(name: string): boolean {
	if (IN_BROWSER) throw new RuntimeError(`You cannot check for module existence in the browser.`);

	return Boolean(resolveModule(name));
}

export type PackageName<T extends string = string> = KebabCase<T>;
// TODO: Add typings for SemVer and other doable stuff, e.g. `workspace:*`
export type PackageVersion = string;

export function readPackageJSON(): NormalizedPackageJson {
	if (IN_BROWSER) throw new RuntimeError(`You cannot read the package.json inside the browser.`);

	const file = readPackageUpSync();

	if (file) {
		return file.packageJson;
	} else {
		throw new Error('Cannot locate nearest "package.json" file!');
	}
}

export type DepedencyType = "dependencies" | "devDependencies" | "optionalDependencies" | "peerDependencies";
export type Depedencies = Partial<Record<PackageName, PackageVersion>>;

export function getDependenciesMap(): Map<DepedencyType, Depedencies | undefined> {
	const { dependencies, devDependencies, optionalDependencies, peerDependencies } = readPackageJSON();

	return new Map(
		Object.entries({
			dependencies,
			devDependencies,
			optionalDependencies,
			peerDependencies,
		}) as Array<[DepedencyType, Depedencies]>,
	);
}

/** TODO: Add targetting, for better debugging (required, dev, optional or peer) */
export function getDepedencies(): Depedencies {
	const { dependencies, devDependencies, optionalDependencies, peerDependencies } = readPackageJSON();

	return { ...dependencies, ...devDependencies, ...optionalDependencies, ...peerDependencies };
}

export function getPackagesNames(): Set<PackageName> {
	return new Set(Object.keys(getDepedencies()));
}

/**
 * TODO: Add targetting, for better debugging (required, dev, optional or peer)
 *
 * @param name
 */
export function hasPackage(name: string): boolean {
	return getPackagesNames().has(name);
}
