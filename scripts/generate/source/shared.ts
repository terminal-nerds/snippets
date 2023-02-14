import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import type { ActionType, AppendActionConfig } from "node-plop";
import nodePlop from "node-plop";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

// TODO: Make it more flexible by finding the project root path
export const ROOT_DIRECTORY_PATH = join(__dirname, "..", "..", "..");
export const PACKAGES_DIRECTORY_PATH = join(ROOT_DIRECTORY_PATH, "packages");
export const SNIPPETS_DIRECTORY_PATH = join(PACKAGES_DIRECTORY_PATH, "snippets");

export async function hasAppendedTemplate(action: ActionType): Promise<boolean> {
	if (isAppendActionConfig(action)) {
		const { data, path, template, templateFile } = action;
		const fileContent = readFileSync(path, { encoding: "utf8" });
		const plop = await nodePlop();

		let generatedTemplate: string;

		if (template) {
			generatedTemplate = plop.renderString(template, data);
		} else if (templateFile) {
			generatedTemplate = plop.renderString(readFileSync(templateFile, { encoding: "utf8" }), data);
		} else {
			throw new Error("There was no template provided to check for generated entry.");
		}

		return fileContent.includes(generatedTemplate);
	} else {
		throw new Error("Invalid action type passed.");
	}
}

export function isAppendActionConfig(action: ActionType): action is AppendActionConfig {
	return typeof action === "object" && action.type === "append";
}
