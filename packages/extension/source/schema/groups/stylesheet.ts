import { z } from "zod";

export const STYLESHEETS_EXTENSIONS = ["css", "sass", "scss"] as const;
export type StylesheetExtension = (typeof STYLESHEETS_EXTENSIONS)[number];
export const STYLESHEET_EXTENSION_SCHEMA = z.enum(STYLESHEETS_EXTENSIONS);

export function isStylesheetExtension(extension: string): extension is StylesheetExtension {
	return STYLESHEET_EXTENSION_SCHEMA.safeParse(extension).success;
}
