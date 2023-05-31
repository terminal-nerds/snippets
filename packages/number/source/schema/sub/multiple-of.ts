import { z } from "zod";

import { validateNumberInteger } from "./integer.ts";
import { validateNumber } from "./number.ts";
import { validateNonZero } from "./zero.ts";

export function isNumberEven<N extends number>(number: N): boolean {
	validateNumberInteger<N>(number);

	return number % 2 === 0;
}

export function isNumberOdd<N extends number>(number: N): boolean {
	return !isNumberEven<N>(number);
}

export function isNumberMultipleOf(number: number, multiplier: number): boolean {
	validateNumber(number);
	validateNonZero(multiplier);

	return z.number().multipleOf(multiplier).safeParse(number).success;
}
