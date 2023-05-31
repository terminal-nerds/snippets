import { validateNumberIntegerPositive } from "../../schema/sub/integer.ts";

/** @see {@link https://en.wikipedia.org/wiki/Fibonacci_number} Fibonacci number */
export function getFibonacciNumber(number: number): number {
	validateNumberIntegerPositive(number);

	if (number === 1 || number === 2) {
		return 1;
	}

	return getFibonacciNumber(number - 1) + getFibonacciNumber(number - 2);
}
