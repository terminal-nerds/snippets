/* @vitest-environment node */

import { returns } from "@terminal-nerds/snippets-test/unit";
import { describe, it } from "vitest";

import { getRuntimeName } from "./name.ts";

describe("getRuntimeName() - in Node.js", () => {
	it(returns("node"), ({ expect }) => {
		expect(getRuntimeName()).toBe("node");
	});
});
