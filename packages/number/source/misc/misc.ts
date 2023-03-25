import { validateNumber } from "../schema/groups/number/number.ts";

/** @see {@link https://en.wikipedia.org/wiki/Happy_number} Happy number */
export function isHappyNumber(number: number): boolean {
	validateNumber(number);

	const seen: Set<number> = new Set<number>();

	while (number !== 1 && !seen.has(number)) {
		seen.add(number);
		number = [...number.toString()].reduce((sum, digit) => sum + Number(digit) ** 2, 0);
	}

	return number === 1;
}
