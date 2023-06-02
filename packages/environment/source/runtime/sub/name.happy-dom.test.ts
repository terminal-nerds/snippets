/* @vitest-environment happy-dom */

import { returns } from "@terminal-nerds/snippets-test/unit";
import { describe, it } from "vitest";

import { getRuntimeName } from "./name.ts";

describe("getRuntimeName() - in Happy DOM", () => {
	it(returns("happy-dom"), ({ expect }) => {
		expect(getRuntimeName()).toBe("happy-dom");
	});
});
