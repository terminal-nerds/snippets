import { readPackageJSON } from "../json/json.ts";
import type { PackageName, PackageVersion } from "../schema/schema.ts";

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
 */
export function hasPackage(name: string): boolean {
	return getPackagesNames().has(name);
}
