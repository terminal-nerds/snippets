import { z } from "zod";

export const YAML_EXTENSIONS = ["yml", "yaml"] as const;
export type YAMLExtension = (typeof YAML_EXTENSIONS)[number];
export const YAML_EXTENSION_SCHEMA = z.enum(YAML_EXTENSIONS);

export function isYAMLExtension(extension: string): extension is YAMLExtension {
	return YAML_EXTENSION_SCHEMA.safeParse(extension).success;
}
