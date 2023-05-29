import type { Join, Split } from "type-fest";

import { validateString } from "../../schema/sub/string.ts";

export type ReversedTuple<T> = T extends [infer Head, ...infer Rest] ? [...ReversedTuple<Rest>, Head] : [];
export type ReversedString<T extends string> = Join<ReversedTuple<Split<T, "">>, "">;

export function reverseString<T extends string>(input: T): ReversedString<T> {
	validateString(input);

	return [...input].reverse().join("") as ReversedString<T>;
}
