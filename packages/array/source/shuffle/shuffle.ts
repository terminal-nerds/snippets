import { getRandomIndex } from "../random/random.ts";
import { isEmptyArray } from "../schema/empty/empty.ts";
import { validateArray } from "../schema/schema.ts";

export async function shuffleArray<ValueType>(array: ReadonlyArray<ValueType>): Promise<Array<ValueType>> {
	validateArray(array);

	if (isEmptyArray(array)) return [];
	else {
		const shuffled = [...array];

		for (let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
			const newIndex = await getRandomIndex(array.length);

			/* prettier-ignore */
			[
                shuffled[currentIndex],
                shuffled[newIndex],
            ] = [
				shuffled[newIndex] as ValueType,
				shuffled[currentIndex] as ValueType,
			];
		}

		return shuffled;
	}
}
