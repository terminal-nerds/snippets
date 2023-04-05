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
import which from "which";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const PNPM_EXECUTABLE_PATH = getPnpmExecutablePath();

// TODO: Make it more flexible by finding the project root path
export const ROOT_DIRECTORY_PATH = join(__dirname, "..", "..", "..");
export const PACKAGES_DIRECTORY_PATH = join(ROOT_DIRECTORY_PATH, "packages");
export const SNIPPETS_DIRECTORY_PATH = join(PACKAGES_DIRECTORY_PATH, "snippets");

/**
 * TODO: How to solve the problem on append action duplicates? Plop is asynchronous and makes it difficult
 *
 * @deprecated Needs rethinking.
 */
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

/** @deprecated Needs rethinking on how to solve the problem */
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

export function getPnpmExecutablePath() {
	return which.sync("pnpm");
}

export function isAppendActionConfig(action: ActionType): action is AppendActionConfig {
	return typeof action === "object" && action.type === "append";
}

export function fixWithESLint(file: string) {
	execFileSync(PNPM_EXECUTABLE_PATH, ["eslint", "--fix", file]);
}

export function formatWithPrettier(file: string) {
	execFileSync(PNPM_EXECUTABLE_PATH, ["prettier", "--write", file]);
}

export function formatWithSyncpack() {
	execFileSync(PNPM_EXECUTABLE_PATH, ["syncpack", "format"]);
}

export function defineAddManyAction(
	config: Pick<AddManyActionConfig, "base" | "data" | "destination" | "templateFiles">,
): AddManyActionConfig {
	const { base = "", data = {}, destination, templateFiles = "" } = config;

	// @ts-ignore Not a bug
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

function runFileCommandAction(paths: FileAndDirectoryPaths, commandFunction: (_filePath: string) => void) {
	const { directory, file } = paths;

	chdir(directory);
	commandFunction(file);
}

type Tool = "eslint" | "prettier" | "syncpack";

export function defineToolAction(tool: Tool, paths: FileAndDirectoryPaths): CustomActionFunction {
	const { file } = paths;
	// eslint-disable-next-line no-unused-vars
	const messages: { [key in Tool]: string } = {
		eslint: `Fixed issues with ESLint in: ${file}`,
		prettier: `Formatted with Prettier in: ${file}`,
		syncpack: `Formatted with syncpack in: ${file}`,
	};
	// eslint-disable-next-line no-unused-vars
	const runCommandFunctions: { [key in Tool]: (_file: string) => void } = {
		eslint: fixWithESLint,
		prettier: formatWithPrettier,
		syncpack: formatWithSyncpack,
	};

	return () => {
		runFileCommandAction(paths, runCommandFunctions[tool]);

		return messages[tool];
	};
}
