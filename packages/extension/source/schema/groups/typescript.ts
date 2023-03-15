import { z } from "zod";

export const TYPESCRIPT_EXTENSIONS = ["cts", "ts", "tsx", "mts"] as const;
export type TypeScriptExtension = (typeof TYPESCRIPT_EXTENSIONS)[number];
export const TYPESCRIPT_EXTENSION_SCHEMA = z.enum(TYPESCRIPT_EXTENSIONS);

export function isTypeScriptExtension(extension: string): extension is TypeScriptExtension {
	return TYPESCRIPT_EXTENSION_SCHEMA.safeParse(extension).success;
}
