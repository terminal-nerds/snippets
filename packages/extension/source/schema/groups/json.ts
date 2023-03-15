import { z } from "zod";

export const JSON_EXTENSIONS = ["json", "json5", "jsonc"] as const;
export type JSONExtension = (typeof JSON_EXTENSIONS)[number];
export const JSON_EXTENSION_SCHEMA = z.enum(JSON_EXTENSIONS);

export function isJSONExtension(extension: string): extension is JSONExtension {
	return JSON_EXTENSION_SCHEMA.safeParse(extension).success;
}
