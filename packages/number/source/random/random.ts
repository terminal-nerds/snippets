// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { MaxSafeInteger, MinSafeInteger } from "../schema/groups/safe/safe.ts";

/* prettier-ignore */
export interface RandomNumberOptions {
    /** @defaultValue {@link MaxSafeInteger} */
    max?: number;
    /** @defaultValue {@link MinSafeInteger} */
    min?: number;
}

export function getSafeRandomNumber(): number {
	return globalThis.crypto.getRandomValues(new Uint32Array(1)).at(0) as number;
}

/** Get a random **integer** number from the specified range. */
export function getRandomIntNumber(options: RandomNumberOptions = {}): number {
	const { max = Number.MAX_SAFE_INTEGER, min = Number.MIN_SAFE_INTEGER } = options;

	return Math.floor(getSafeRandomNumber() * (max - min + 1) + min);
}

/** Get a random number **_(with decimals!)_** from the specified range. */
export function getRandomNumber(options: RandomNumberOptions = {}): number {
	const { max = Number.MAX_SAFE_INTEGER, min = Number.MIN_SAFE_INTEGER } = options;

	return getSafeRandomNumber() * (max - min) + min;
}
