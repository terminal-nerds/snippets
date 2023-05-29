export function isStringNumeric(input: string): boolean {
	return Number.isNaN(Number(input)) === false;
}
