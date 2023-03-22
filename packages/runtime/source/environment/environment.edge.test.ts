/* @vitest-environment edge-runtime */

// FIXME: Something is wrong with zod getting instanceof cls.name, when environment is edge-runtime
// import { returns } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";

// import {
// 	getRuntimeEnvironmentName,
// 	IN_BROWSER,
// 	IN_BUN,
// 	IN_DENO,
// 	IN_DOM,
// 	IN_EDGE,
// 	IN_HAPPY_DOM,
// 	IN_JSDOM,
// 	IN_NODE,
// 	IN_WEB_WORKER,
// } from "./environment.ts";

// describe.todo("getRuntimeEnvironmentName() - in Edge Runtime", () => {
// 	it.fails(returns("edge"), () => {
// 		expect(getRuntimeEnvironmentName()).toBe("edge");
// 	});
// });

describe.todo("IN_BROWSER", () => {
	// it.fails(returns(false), () => {
	// 	expect(IN_BROWSER).toBe(false);
	// });
});

describe.todo("IN_BUN", () => {
	// it.fails(returns(false), () => {
	// 	expect(IN_BUN).toBe(false);
	// });
});

describe.todo("IN_DENO", () => {
	// it.fails(returns(false), () => {
	// 	expect(IN_DENO).toBe(false);
	// });
});

describe.todo("IN_DOM", () => {
	// it.fails(returns(false), () => {
	// 	expect(IN_DOM).toBe(false);
	// });
});

describe.todo("IN_EDGE_RUNTIME", () => {
	// it.fails(returns(true), () => {
	// 	expect(IN_EDGE).toBe(true);
	// });
});

describe.todo("IN_HAPPY_DOM", () => {
	// it.fails(returns(false), () => {
	// 	expect(IN_HAPPY_DOM).toBe(false);
	// });
});

describe.todo("IN_JSDOM", () => {
	// it.fails(returns(false), () => {
	// 	expect(IN_JSDOM).toBe(false);
	// });
});

describe.todo("IN_NODE", () => {
	// NOTE: This test is being run in Node.js.
	// it.fails(returns(false), () => {
	// 	expect(IN_NODE).toBe(false);
	// });
});

describe.todo("IN_WEB_WORKER", () => {
	// it.fails(returns(false), () => {
	// 	expect(IN_WEB_WORKER).toBe(false);
	// });
});
