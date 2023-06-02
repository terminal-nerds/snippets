/* @vitest-environment jsdom */

import { returns } from "@terminal-nerds/snippets-test/unit";
import { describe, it } from "vitest";

import { getRuntimeName } from "./name.ts";

describe("getRuntimeName() - in JS DOM", () => {
	it(returns("jsdom"), ({ expect }) => {
		expect(getRuntimeName()).toBe("jsdom");
	});
});
