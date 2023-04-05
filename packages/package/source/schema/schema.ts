import type { KebabCase } from "type-fest/source/kebab-case.ts";

export type PackageName<T extends string = string> = KebabCase<T>;
// TODO: Add typings for SemVer and other doable stuff, e.g. `workspace:*`
export type PackageVersion = string;
