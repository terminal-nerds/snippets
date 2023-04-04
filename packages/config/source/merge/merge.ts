import { mergeDeepObjects } from "@terminal-nerds/snippets-object/merge";

export type MergedConfig<T extends Record<string, unknown> = Record<string, unknown>> = T;

export function createMergedConfig<T extends Record<string, unknown> = Record<string, unknown>>(
	dirtyConfigsList: Array<unknown>,
): MergedConfig<T> {
	const cleanConfigsList = dirtyConfigsList.filter(Boolean) as Array<Record<string, object>>;

	return mergeDeepObjects(cleanConfigsList) as MergedConfig<T>;
}
