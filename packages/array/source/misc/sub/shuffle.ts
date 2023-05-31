import { isArrayEmpty } from "../../schema/sub/empty.ts";
import { validateArray } from "../../schema/sub/native.ts";
import { getRandomIndex } from "./random.ts";

export async function shuffleArray<ValueType>(array: ReadonlyArray<ValueType>): Promise<Array<ValueType>> {
	validateArray(array);

	if (isArrayEmpty(array)) return [];
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
