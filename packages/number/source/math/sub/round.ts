import { validateNumber } from "../../schema/sub/number.ts";

/*prettier-ignore */
export interface RoundingNumberOptions {
	/** @defaultValue `2` */
	decimals?: number;
}

/** Round **UP** number to specific decimals length. */
export function roundNumberUp(value: number, options: RoundingNumberOptions = {}): number {
	validateNumber(value);

	const { decimals = 2 } = options;

	return Number(Math.round(Number(value + "e" + decimals)) + "e-" + decimals);
}

/** Round **DOWN** number to specific decimals length. */
export function roundNumberDown(value: number, options: RoundingNumberOptions = {}): number {
	validateNumber(value);

	const { decimals = 2 } = options;

	return Number(Math.floor(Number.parseFloat(value + "e" + decimals)) + "e-" + decimals);
}
