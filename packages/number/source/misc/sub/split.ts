import { splitStringByHalf } from "@terminal-nerds/snippets-string/word/sub/split";

/** NOTE: For uneven number lengths, the first half will be the bigger portion. */
export function splitNumberByHalf(input: number): readonly [number, number] {
	const [firstHalf, secondHalf] = splitStringByHalf(input.toString());

	return [Number(firstHalf), Number(secondHalf)];
}
