import { z } from "zod";

export const JAVASCRIPT_EXTENSIONS = ["cjs", "js", "mjs"] as const;
export type JavaScriptExtension = (typeof JAVASCRIPT_EXTENSIONS)[number];
export const JAVASCRIPT_EXTENSION_SCHEMA = z.enum(JAVASCRIPT_EXTENSIONS);

export function isJavaScriptExtension(extension: string): extension is JavaScriptExtension {
	return JAVASCRIPT_EXTENSION_SCHEMA.safeParse(extension).success;
}
