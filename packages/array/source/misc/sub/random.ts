import { getRandomNumberInt } from "@terminal-nerds/snippets-number/misc/sub/random";
import { validateNumberIntegerPositive } from "@terminal-nerds/snippets-number/schema/sub/integer";

import { validateArray } from "../../schema/sub/native.ts";

export async function getRandomIndex(length: number): Promise<number> {
	return await getRandomNumberInt({ min: 0, max: length - 1 });
}

export async function getRandomItem<Type = unknown>(array: Array<Type> | readonly Type[]): Promise<Type> {
	validateArray(array);

	return array.at(await getRandomIndex(array.length)) as Type;
}

interface GetRandomItemsOptions {
	/**
	 * A positive integer, with a count of how many random items you want to be picked.
	 */
	count: number;
}

/** NOTE: It could create duplicates. */
export async function getRandomItems<Type = unknown>(
	array: Array<Type> | readonly Type[],
	options: GetRandomItemsOptions,
): Promise<Array<Type>> {
	const { count } = options;

	validateNumberIntegerPositive(count);

	const results: Array<Type> = [];

	while (results.length < count) {
		results.push(await getRandomItem(array));
	}

	return results;
}
