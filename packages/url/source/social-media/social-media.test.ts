import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { isSocialMediaURL, SOCIAL_MEDIA_HOSTNAMES } from "./social-media.ts";

const INVALID_SOCIAL_MEDIA_URLS = Object.entries(SOCIAL_MEDIA_HOSTNAMES).flatMap(([, hosts]) => hosts);
const VALID_SOCIAL_MEDIA_URLS = Object.entries(SOCIAL_MEDIA_HOSTNAMES).flatMap(([, hosts]) => [
	...hosts.map((host) => `https://${host}`),
	...hosts.map((host) => `https://www.${host}`),
]);
const NOT_A_SOCIAL_MEDIA_URLS = ["https://wikipedia.org", "https://reactjs.org", "https://nodejs.org"] as const;

describe("isSocialMediaURL(url, options?)", () => {
	it(throws(ZodError).on(`invalid social media URLs (without protocol)`).samples(INVALID_SOCIAL_MEDIA_URLS), () => {
		for (const url of INVALID_SOCIAL_MEDIA_URLS) {
			expect(() => isSocialMediaURL(url)).toThrowError(ZodError);
		}
	});

	it(returns(false).on(`not a social media URLs`).samples(NOT_A_SOCIAL_MEDIA_URLS), () => {
		for (const url of NOT_A_SOCIAL_MEDIA_URLS) {
			expect(isSocialMediaURL(url)).toBe(false);
		}
	});

	it(returns(true).on(`valid social media URLs`).samples(VALID_SOCIAL_MEDIA_URLS), () => {
		for (const url of VALID_SOCIAL_MEDIA_URLS) {
			expect(isSocialMediaURL(url)).toBe(true);
		}
	});
});
