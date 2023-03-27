import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { isURL, validateURL } from "./schema.ts";

const INVALID_URLS = ["not a url", "http;//localhost;3000", "github.com"] as const;
const VALID_URLS = [
	"http://localhost:3000",
	"https://github.com?q=param",
	"http://www.github.com",
	new URL("https://github.com"),
] as const;

describe("validateURL(url)", () => {
	it(throws(ZodError).on(`invalid URLs`).samples(INVALID_URLS), () => {
		for (const url of INVALID_URLS) {
			expect(() => validateURL(url)).toThrowError(ZodError);
		}
	});

	it(returns().on(`valid URLs`).samples(VALID_URLS), () => {
		for (const url of VALID_URLS) {
			expect(() => validateURL(url)).not.toThrowError();
		}
	});
});

describe("isURL(url)", () => {
	it(returns(false).on(`valid URLs`).samples(INVALID_URLS), () => {
		for (const url of INVALID_URLS) {
			expect(isURL(url)).toBe(false);
		}
	});

	it(returns(true).on(`valid URLs`).samples(VALID_URLS), () => {
		for (const url of VALID_URLS) {
			expect(isURL(url)).toBe(true);
		}
	});
});
