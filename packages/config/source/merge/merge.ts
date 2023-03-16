import { deepmerge } from "deepmerge-ts";

export type MergedConfig<T extends Record<string, unknown> = Record<string, unknown>> = T;

export function createMergedConfig<T extends Record<string, unknown> = Record<string, unknown>>(
	dirtyConfigsList: Array<unknown>,
): MergedConfig<T> {
	const cleanConfigsList = dirtyConfigsList.filter(Boolean);

	return deepmerge(...cleanConfigsList) as MergedConfig<T>;
}
