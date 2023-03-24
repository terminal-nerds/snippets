import { z } from "zod";

import { validateInteger } from "./integer.ts";
import { validateNumber } from "./number.ts";
import { validateNonZero } from "./zero.ts";

export function isEven(number: number): boolean {
	validateInteger(number);

	return number % 2 === 0;
}

export function isOdd(number: number): boolean {
	return !isEven(number);
}

export function isMultipleOf(number: number, multiplier: number): boolean {
	validateNumber(number);
	validateNonZero(multiplier);

	return z.number().multipleOf(multiplier).safeParse(number).success;
}
