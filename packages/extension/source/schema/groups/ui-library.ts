import { z } from "zod";

export const UI_LIBRARY_EXTENSIONS = ["astro", "jsx", "tsx", "svelte", "vue"] as const;
export type UILibraryExtension = (typeof UI_LIBRARY_EXTENSIONS)[number];
export const UI_LIBRARY_EXTENSION_SCHEMA = z.enum(UI_LIBRARY_EXTENSIONS);

export function isUILibraryExtension(extension: string): extension is UILibraryExtension {
	return UI_LIBRARY_EXTENSION_SCHEMA.safeParse(extension).success;
}
