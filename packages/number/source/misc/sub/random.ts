import { IN_NODE } from "@terminal-nerds/snippets-environment/environment";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import type { IntegerSafeMax, IntegerSafeMin } from "../../schema/sub/safe.ts";

/* prettier-ignore */
export interface RandomNumberOptions {
    /** @defaultValue {@link IntegerSafeMax} */
    max?: number;
    /** @defaultValue {@link IntegerSafeMin} */
    min?: number;
}

/** Get a random **integer** number from the specified range. */
export async function getRandomNumberInt(options: RandomNumberOptions = {}): Promise<number> {
	const { max = Number.MAX_SAFE_INTEGER, min = Number.MIN_SAFE_INTEGER } = options;

	const random = await getSafeRandomNumber();
	return Math.floor(random * (max - min + 1) + min);
}

/** Get a random number **_(with decimals!)_** from the specified range. */
export async function getRandomNumber(options: RandomNumberOptions = {}): Promise<number> {
	const { max = Number.MAX_SAFE_INTEGER, min = Number.MIN_SAFE_INTEGER } = options;

	return (await getSafeRandomNumber()) * (max - min) + min;
}

async function getSafeRandomNumber(): Promise<number> {
	let random: number;

	if (IN_NODE) {
		const { getRandomValues } = await import("node:crypto");

		random = getRandomValues(new Uint32Array(1)).at(0) as number;
	} else {
		random = globalThis.crypto.getRandomValues(new Uint32Array(1)).at(0) as number;
	}

	/**
	 * NOTE: `0xff_ff_ff_ff` aka (`0xFFFFFFF`) - Uint32 Max value represent in hexadecimal format `+1` - because
	 * Math.random is inclusive of 0, but not 1 Credits: https://stackoverflow.com/a/62792582.
	 */
	return random / (0xff_ff_ff_ff + 1);
}
