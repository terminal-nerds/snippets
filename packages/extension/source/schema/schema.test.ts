import { returns } from "@terminal-nerds/snippets-test/unit";
import { describe, expect, it } from "vitest";

import {
	HTML_EXTENSIONS,
	isHTMLExtension,
	isJavaScriptExtension,
	isJSONExtension,
	isMarkdownExtension,
	isStylesheetExtension,
	isTypeScriptExtension,
	isUILibraryExtension,
	isYAMLExtension,
	JAVASCRIPT_EXTENSIONS,
	JSON_EXTENSIONS,
	MARKDOWN_EXTENSIONS,
	STYLESHEETS_EXTENSIONS,
	TYPESCRIPT_EXTENSIONS,
	UI_LIBRARY_EXTENSIONS,
	YAML_EXTENSIONS,
} from "./schema.ts";

describe("isHTMLExtension(extension)", () => {
	it(returns(false).on(`non-valid HTML extensions`).samples(YAML_EXTENSIONS), () => {
		for (const extension of YAML_EXTENSIONS) {
			expect(isHTMLExtension(extension)).toBe(false);
		}
	});

	it(returns(true).on(`valid HTML extensions`).samples(HTML_EXTENSIONS), () => {
		for (const extension of HTML_EXTENSIONS) {
			expect(isHTMLExtension(extension)).toBe(true);
		}
	});
});

describe("isJavaScriptExtension(extension)", () => {
	it(returns(false).on(`non-valid JavaScript extensions`).samples(TYPESCRIPT_EXTENSIONS), () => {
		for (const extension of TYPESCRIPT_EXTENSIONS) {
			expect(isJavaScriptExtension(extension)).toBe(false);
		}
	});

	it(returns(true).on(`valid JavaScript extensions`).samples(JAVASCRIPT_EXTENSIONS), () => {
		for (const extension of JAVASCRIPT_EXTENSIONS) {
			expect(isJavaScriptExtension(extension)).toBe(true);
		}
	});
});

describe("isMarkdownExtension(extension)", () => {
	it(returns(false).on(`non-valid Markdown extensions`).samples(TYPESCRIPT_EXTENSIONS), () => {
		for (const extension of TYPESCRIPT_EXTENSIONS) {
			expect(isMarkdownExtension(extension)).toBe(false);
		}
	});

	it(returns(true).on(`valid Markdown extensions`).samples(MARKDOWN_EXTENSIONS), () => {
		for (const extension of MARKDOWN_EXTENSIONS) {
			expect(isMarkdownExtension(extension)).toBe(true);
		}
	});
});

describe("isJSONExtension(extension)", () => {
	it(returns(false).on(`non-valid JSON extensions`).samples(HTML_EXTENSIONS), () => {
		for (const extension of HTML_EXTENSIONS) {
			expect(isJSONExtension(extension)).toBe(false);
		}
	});

	it(returns(true).on(`valid JSON extensions`).samples(JSON_EXTENSIONS), () => {
		for (const extension of JSON_EXTENSIONS) {
			expect(isJSONExtension(extension)).toBe(true);
		}
	});
});

describe("isStylesheetExtension(extension)", () => {
	it(returns(false).on(`non-valid Stylesheet extensions`).samples(JAVASCRIPT_EXTENSIONS), () => {
		for (const extension of JAVASCRIPT_EXTENSIONS) {
			expect(isStylesheetExtension(extension)).toBe(false);
		}
	});

	it(returns(true).on(`valid Stylesheet extensions`).samples(STYLESHEETS_EXTENSIONS), () => {
		for (const extension of STYLESHEETS_EXTENSIONS) {
			expect(isStylesheetExtension(extension)).toBe(true);
		}
	});
});

describe("isTypeScriptExtension(extension)", () => {
	it(returns(false).on(`non-valid TypeScript extensions`).samples(JAVASCRIPT_EXTENSIONS), () => {
		for (const extension of JAVASCRIPT_EXTENSIONS) {
			expect(isTypeScriptExtension(extension)).toBe(false);
		}
	});

	it(returns(true).on(`valid TypeScript extensions`).samples(TYPESCRIPT_EXTENSIONS), () => {
		for (const extension of TYPESCRIPT_EXTENSIONS) {
			expect(isTypeScriptExtension(extension)).toBe(true);
		}
	});
});

describe("isUILibraryExtension(extension)", () => {
	it(returns(false).on(`non-valid UI library extensions`).samples(JAVASCRIPT_EXTENSIONS), () => {
		for (const extension of JAVASCRIPT_EXTENSIONS) {
			expect(isUILibraryExtension(extension)).toBe(false);
		}
	});

	it(returns(true).on(`valid UI library extensions`).samples(UI_LIBRARY_EXTENSIONS), () => {
		for (const extension of UI_LIBRARY_EXTENSIONS) {
			expect(isUILibraryExtension(extension)).toBe(true);
		}
	});
});

describe("isYAMLExtension(extension)", () => {
	it(returns(false).on(`non-valid YAML extensions`).samples(HTML_EXTENSIONS), () => {
		for (const extension of HTML_EXTENSIONS) {
			expect(isYAMLExtension(extension)).toBe(false);
		}
	});

	it(returns(true).on(`valid YAML extensions`).samples(YAML_EXTENSIONS), () => {
		for (const extension of YAML_EXTENSIONS) {
			expect(isYAMLExtension(extension)).toBe(true);
		}
	});
});
