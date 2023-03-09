import { returns } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";

import {
	getRuntimeEnvironmentName,
	IN_BROWSER,
	IN_BUN,
	IN_DENO,
	IN_DOM,
	IN_EDGE,
	IN_HAPPY_DOM,
	IN_JSDOM,
	IN_NODE,
	IN_WEB_WORKER,
} from "./environment.js";

// @vitest-environment happy-dom
describe("getRuntimeEnvironmentName() - in happy DOM", () => {
	it(returns("happy-dom"), () => {
		expect(getRuntimeEnvironmentName()).toBe("happy-dom");
	});
});

describe("IN_BROWSER", () => {
	it(returns(false), () => {
		expect(IN_BROWSER).toBe(false);
	});
});

describe("IN_BUN", () => {
	it(returns(false), () => {
		expect(IN_BUN).toBe(false);
	});
});

describe("IN_DENO", () => {
	it(returns(false), () => {
		expect(IN_DENO).toBe(false);
	});
});

describe("IN_DOM", () => {
	it(returns(true), () => {
		expect(IN_DOM).toBe(true);
	});
});

describe("IN_EDGE_RUNTIME", () => {
	it(returns(false), () => {
		expect(IN_EDGE).toBe(false);
	});
});

describe("IN_HAPPY_DOM", () => {
	it(returns(true), () => {
		expect(IN_HAPPY_DOM).toBe(true);
	});
});

describe("IN_JSDOM", () => {
	it(returns(false), () => {
		expect(IN_JSDOM).toBe(false);
	});
});

describe("IN_NODE", () => {
	it(returns(true), () => {
		expect(IN_NODE).toBe(true);
	});
});

describe("IN_WEB_WORKER", () => {
	it(returns(false), () => {
		expect(IN_WEB_WORKER).toBe(false);
	});
});
