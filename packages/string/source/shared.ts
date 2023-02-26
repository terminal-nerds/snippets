// TODO: Move to separate package for array
export function stringifyArray(array: Array<unknown> | readonly unknown[]): string {
	return array.map((value) => `"${value}"`).join(", ");
}
