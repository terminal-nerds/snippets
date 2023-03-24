// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { MaxSafeInteger, MinSafeInteger } from "../schema/groups/safe/safe.ts";

/* prettier-ignore */
export interface RandomNumberOptions {
    /** @defaultValue {@link MaxSafeInteger} */
    max?: number;
    /** @defaultValue {@link MinSafeInteger} */
    min?: number;
}

/** Get a random **integer** number from the specified range. */
export function getRandomIntNumber(options: RandomNumberOptions = {}): number {
	const { max = Number.MAX_SAFE_INTEGER, min = Number.MIN_SAFE_INTEGER } = options;

	return Math.floor(Math.random() * (max - min + 1) + min);
}

/** Get a random number **_(with decimals!)_** from the specified range. */
export function getRandomNumber(options: RandomNumberOptions = {}): number {
	const { max = Number.MAX_SAFE_INTEGER, min = Number.MIN_SAFE_INTEGER } = options;

	return Math.random() * (max - min) + min;
}
