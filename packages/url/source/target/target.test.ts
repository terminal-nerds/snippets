import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { isExternalURL, isInternalURL, validateExternalURL, validateInternalURL } from "./target.ts";

const INVALID_URLS = ["not a url", "http;//localhost:3000", "github.com"] as const;
const VALID_EXTERNAL_URLS = ["http://localhost:3000", "https://wikipedia.org"] as const;
const VALID_INTERNAL_URLS = ["/about-us", "/contacts.html#send-message"] as const;

describe("validateExternalURL(url)", () => {
	it(throws(ZodError).on(`invalid URLs`).samples(INVALID_URLS), () => {
		for (const url of INVALID_URLS) {
			expect(() => validateExternalURL(url)).toThrowError(ZodError);
		}
	});

	it(returns().on(`valid external URLs`).samples(VALID_EXTERNAL_URLS), () => {
		for (const url of VALID_EXTERNAL_URLS) {
			expect(() => validateExternalURL(url)).not.toThrowError();
		}
	});
});

describe("isExternalURL(url)", () => {
	it(returns(false).on(`invalid_URLs`).samples(INVALID_URLS), () => {
		for (const url of INVALID_URLS) {
			expect(isExternalURL(url)).toBe(false);
		}
	});

	it(returns(true).on(`valid external URLs`).samples(VALID_EXTERNAL_URLS), () => {
		for (const url of VALID_EXTERNAL_URLS) {
			expect(isExternalURL(url)).toBe(true);
		}
	});
});

describe("validateInternalURL(url)", () => {
	it(throws(ZodError).on(`invalid URLs`).samples(INVALID_URLS), () => {
		for (const url of INVALID_URLS) {
			expect(() => validateInternalURL(url)).toThrowError(ZodError);
		}
	});

	it(returns().on(`valid internal URLs`).samples(VALID_INTERNAL_URLS), () => {
		for (const url of VALID_INTERNAL_URLS) {
			expect(() => validateInternalURL(url)).not.toThrowError();
		}
	});
});

describe("isInternalURL(url)", () => {
	it(returns(false).on(`invalid_URLs`).samples(INVALID_URLS), () => {
		for (const url of INVALID_URLS) {
			expect(isInternalURL(url)).toBe(false);
		}
	});

	it(returns(true).on(`invalid_URLs`).samples(VALID_INTERNAL_URLS), () => {
		for (const url of VALID_INTERNAL_URLS) {
			expect(isInternalURL(url)).toBe(true);
		}
	});
});
