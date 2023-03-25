import { validatePositiveInteger } from "@terminal-nerds/snippets-number";
import { getRandomIntNumber } from "@terminal-nerds/snippets-number/random";

import { validateArray } from "../schema/schema.ts";

export async function getRandomItem<Type = unknown>(array: Array<Type> | readonly Type[]): Promise<Type> {
	validateArray(array);

	return array.at(await getRandomIntNumber({ min: 0, max: array.length - 1 })) as Type;
}

interface RandomArrayItemsOptions {
	/**
	 * A positive integer, with a count of how many random items you want to be picked.
	 * NOTE: It could create duplicates.
	 */
	count: number;
}

export async function getRandomItems<Type = unknown>(
	array: Array<Type> | readonly Type[],
	options: RandomArrayItemsOptions,
): Promise<Array<Type>> {
	const { count } = options;

	validatePositiveInteger(count);

	const results: Array<Type> = [];

	while (results.length < count) {
		results.push(await getRandomItem(array));
	}

	return results;
}
