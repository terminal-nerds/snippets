import { returns, throws } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import { isLocalhost, LOCALHOST_HOSTNAMES } from "./localhost.ts";

const INVALID_URLS = ["not a url", "http;//localhost:3000", "github.com"] as const;
const NOT_HOSTNAME_URLS = ["https://github.com", "https://192.143.13.13"] as const;
const HOSTNAME_URLS = LOCALHOST_HOSTNAMES.flatMap((host) => [
	`http://${host}`,
	`https://${host}:8080`,
	`http://${host}:3000`,
]);

describe("isLocalhost(url)", () => {
	it(throws(ZodError).on(`invalid URLs`).samples(INVALID_URLS), () => {
		for (const url of INVALID_URLS) {
			expect(() => isLocalhost(url)).toThrowError(ZodError);
		}
	});

	it(returns(false).on(`not a hostname URLs`).samples(NOT_HOSTNAME_URLS), () => {
		for (const url of NOT_HOSTNAME_URLS) {
			expect(isLocalhost(url)).toBe(false);
		}
	});

	it(returns(true).on(`hostname URLs`).samples(HOSTNAME_URLS), () => {
		for (const url of HOSTNAME_URLS) {
			expect(isLocalhost(url)).toBe(true);
		}
	});
});
