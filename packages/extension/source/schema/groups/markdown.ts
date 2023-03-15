import { z } from "zod";

export const MARKDOWN_EXTENSIONS = ["md", "mdx"] as const;
export type MarkdownExtension = (typeof MARKDOWN_EXTENSIONS)[number];
export const MARKDOWN_EXTENSION_SCHEMA = z.enum(MARKDOWN_EXTENSIONS);

export function isMarkdownExtension(extension: string): extension is MarkdownExtension {
	return MARKDOWN_EXTENSION_SCHEMA.safeParse(extension).success;
}
