import { validatePositiveInteger } from "../schema/groups/integer/integer.ts";

/** @see {@link https://en.wikipedia.org/wiki/Fibonacci_number} Fibonacci number */
export function fibonacci(number: number): number {
	validatePositiveInteger(number);

	if (number === 1 || number === 2) {
		return 1;
	}

	return fibonacci(number - 1) + fibonacci(number - 2);
}
