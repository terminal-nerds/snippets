import type { Join } from "type-fest";

export function getJoinedChars<const T extends readonly string[]>(chars: T) {
	return chars.join("") as Join<T, "">;
}
