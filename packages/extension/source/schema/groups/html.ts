import { z } from "zod";

export const HTML_EXTENSIONS = ["html", "htm"] as const;
export type HTMLExtension = (typeof HTML_EXTENSIONS)[number];
export const HTML_EXTENSION_SCHEMA = z.enum(HTML_EXTENSIONS);

export function isHTMLExtension(extension: string): extension is HTMLExtension {
	return HTML_EXTENSION_SCHEMA.safeParse(extension).success;
}
