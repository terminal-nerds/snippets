import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { chdir } from "node:process";
import { fileURLToPath } from "node:url";

import type {
	ActionType,
	AddActionConfig,
	AddManyActionConfig,
	AppendActionConfig,
	CustomActionFunction,
} from "node-plop";
import nodePlop from "node-plop";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

// TODO: Make it more flexible by finding the project root path
export const ROOT_DIRECTORY_PATH = join(__dirname, "..", "..", "..");
export const PACKAGES_DIRECTORY_PATH = join(ROOT_DIRECTORY_PATH, "packages");
export const SNIPPETS_DIRECTORY_PATH = join(PACKAGES_DIRECTORY_PATH, "snippets");

export async function hasAppendedTemplate(action: ActionType): Promise<boolean> {
	if (isAppendActionConfig(action)) {
		const { path } = action;
		const fileContent = readFileSync(path, { encoding: "utf8" });
		const template = await getGeneratedTemplate(action);

		return fileContent.includes(template);
	} else {
		throw new Error("Invalid action type passed.");
	}
}

async function getGeneratedTemplate(action: AppendActionConfig): Promise<string> {
	const { data, template, templateFile } = action;
	const plop = await nodePlop();

	if (template) {
		return plop.renderString(template, data);
	} else if (templateFile) {
		return plop.renderString(readFileSync(templateFile, { encoding: "utf8" }), data);
	} else {
		throw new Error("There was no template provided to check for generated entry.");
	}
}

export function isAppendActionConfig(action: ActionType): action is AppendActionConfig {
	return typeof action === "object" && action.type === "append";
}

export function fixWithESLint(file: string) {
	execFileSync("pnpm", ["eslint", "--fix", file]);
}

export function formatWithPrettier(file: string) {
	execFileSync("pnpm", ["prettier", "--write", file]);
}

export function formatWithSyncpack() {
	execFileSync("pnpm", ["syncpack", "format"]);
}

export function defineAddManyAction(config: Pick<AddManyActionConfig, "base" | "data" | "destination" | "templateFiles">): AddManyActionConfig {
	const { base = "", data = {}, destination, templateFiles = "" } = config;

	return {
		type: "addMany",
		base,
		destination,
		data,
		globOptions: { dot: true },
		skipIfExists: true,
		templateFiles,
		verbose: true,
	};
}

export function defineAddAction(path: string, templateFile: string): AddActionConfig {
	return {
		type: "add",
		path,
		skipIfExists: true,
		templateFile,
	};
}

export function defineAppendAction(
	config: Pick<AppendActionConfig, "path" | "templateFile" | "pattern" | "data">,
): AppendActionConfig {
	const { data = {}, path, pattern, templateFile = "" } = config;

	return {
		type: "append",
		path,
		pattern,
		templateFile,
		data,
		unique: true,
		separator: "\n",
	};
}

interface FileAndDirectoryPaths {
	directory: string;
	file: string;
}

function runFileCommandAction(paths: FileAndDirectoryPaths, commandFunction: (filePath: string) => void) {
	const { directory, file } = paths;

	chdir(directory);
	commandFunction(file);
}

type Tool = "eslint" | "prettier" | "syncpack";

export function defineToolAction(tool: Tool, paths: FileAndDirectoryPaths): CustomActionFunction {
	const { file } = paths;
	const messages: { [key in Tool]: string } = {
		eslint: `Fixed issues with ESLint in: ${file}`,
		prettier: `Formatted with Prettier in: ${file}`,
		syncpack: `Formatted with syncpack in: ${file}`,
	};
	const runCommandFunctions: { [key in Tool]: (file: string) => void } = {
		eslint: fixWithESLint,
		prettier: formatWithPrettier,
		syncpack: formatWithSyncpack,
	};

	return () => {
		runFileCommandAction(paths, runCommandFunctions[tool]);

		return messages[tool];
	};
}
