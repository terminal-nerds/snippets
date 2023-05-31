export function getSum(numbers: number[]): number {
	return numbers.reduce((accumulator, current) => accumulator + current, 0);
}
