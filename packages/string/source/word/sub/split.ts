import { validateString } from "../../schema/sub/string.ts";

/** NOTE: For uneven (odd) string lengths, the first half _(index 0)_ will be the bigger one. */
export function splitStringByHalf(value: string): readonly [string, string] {
	validateString(value);

	const halfIndex = Math.round(value.length / 2);

	return [
		/* prettier-ignore */
		value.slice(0, halfIndex),
		value.slice(halfIndex),
	];
}
