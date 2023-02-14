import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { chdir } from "node:process";

import { kebabCase } from "@terminal-nerds/snippets-string/case";
import type { Answers, Question } from "inquirer";
import type { Actions, ActionType, CustomActionFunction, PlopGeneratorConfig } from "node-plop";
import { z } from "zod";

import { __dirname, PACKAGES_DIRECTORY_PATH } from "../../shared.js";

// TODO: __dirname should return current file path
const TEMPLATES_DIRECTORY_PATH = join(__dirname, "generators", "module", "templates");
const AVAILABLE_PACKAGE_NAMES = getPackagesNames();

export const snippetModuleGenerator: PlopGeneratorConfig = {
	description: "Generate a snippet module",
	prompts: [
		{
			name: "packageName",
			message: "Which one of available packages will contain this snippet(s) module?",
			type: "autocomplete",
			loop: false,
			pageSize: AVAILABLE_PACKAGE_NAMES.length,
			source: searchPackageName,
		} as Question<Answers>,
		{
			name: "moduleName",
			message: "What is going to be a name of this snippet module?",
			type: "input",
		} as Question<Answers>,
		{
			name: "includeTestFile",
			message: "Do you want to generate a test file for this module snippet?",
			type: "confirm",
			default: true,
		} as Question<Answers>,
	],
	actions(answers) {
		const actions: Actions = [];

		if (answers && isGenerateSnippetsModuleAnswers(answers)) {
			const { includeTestFile, moduleName, packageName } = answers;
			const packageDirectory = join(PACKAGES_DIRECTORY_PATH, kebabCase(packageName));
			const transformedModuleName = kebabCase(moduleName);
			const mainFile = join(packageDirectory, "source", "main.ts");
			const readmeFile = join(packageDirectory, "README.md");
			const moduleDirectory = join(packageDirectory, "source", transformedModuleName);
			const moduleFile = join(moduleDirectory, `${transformedModuleName}.ts`);
			const moduleTestFile = join(moduleDirectory, `${transformedModuleName}.test.ts`);

			const generateSnippetsModuleSourceFile: ActionType = {
				type: "add",
				path: moduleFile,
				skipIfExists: true,
				templateFile: join(TEMPLATES_DIRECTORY_PATH, `module.ts.hbs`),
			};

			const generateSnippetsModuleTestFile: ActionType = {
				type: "add",
				path: moduleTestFile,
				skipIfExists: true,
				templateFile: join(TEMPLATES_DIRECTORY_PATH, `module.test.ts.hbs`),
			};

			const appendExportToMainFile: ActionType = {
				type: "append",
				path: mainFile,
				templateFile: join(TEMPLATES_DIRECTORY_PATH, "main-export-line.ts.hbs"),
			};

			const fixMainFile: CustomActionFunction = async () => {
				chdir(packageDirectory);
				execFileSync("pnpm", ["eslint", "--fix", mainFile]);

				return `Fixed issues in: ${mainFile}`;
			};

			const appendToReadmeTable: ActionType = {
				type: "append",
				path: readmeFile,
				pattern: /## Modules included\n{2}.*\n{2}.*\n.*- \|$/gm,
				templateFile: join(TEMPLATES_DIRECTORY_PATH, "README-table.md.hbs"),
			};

			const appendToReadmeLinks: ActionType = {
				type: "append",
				path: readmeFile,
				pattern: `<!-- MODULES LINKS -->`,
				templateFile: join(TEMPLATES_DIRECTORY_PATH, "README-links.md.hbs"),
			};

			const formatReadmeFile: CustomActionFunction = async () => {
				chdir(packageDirectory);
				execFileSync("pnpm", ["prettier", "--write", readmeFile]);
				// FIXME: Once appended, and fixed... the format, the sort plugin doesn't work, hence needs to be called again
				execFileSync("pnpm", ["prettier", "--write", readmeFile]);

				return `Formatted: ${readmeFile}`;
			};

			if (includeTestFile) actions.push(generateSnippetsModuleTestFile);
			/* prettier-ignore */
			actions.push(
				generateSnippetsModuleSourceFile,
				appendExportToMainFile,
				fixMainFile,
				appendToReadmeTable,
				appendToReadmeLinks,
				formatReadmeFile,
			);
		} else {
			throw new Error("Something went wrong with getting answers.");
		}

		return actions;
	},
};

type GenerateSnippetsModuleAnswers = z.infer<typeof GENERATE_SNIPPETS_MODULE_ANSWER_SCHEMA>;
const GENERATE_SNIPPETS_MODULE_ANSWER_SCHEMA = z.object({
	includeTestFile: z.boolean(),
	moduleName: z.string().max(60),
	packageName: z.string().max(40),
});

function isGenerateSnippetsModuleAnswers(data: unknown): data is GenerateSnippetsModuleAnswers {
	return GENERATE_SNIPPETS_MODULE_ANSWER_SCHEMA.safeParse(data).success;
}

function getPackagesNames(): Array<string> {
	return readdirSync(PACKAGES_DIRECTORY_PATH, { encoding: "utf8" }).filter((name) => name !== "snippets");
}

function searchPackageName(_: Answers, input = "") {
	return AVAILABLE_PACKAGE_NAMES.filter((name) => name.startsWith(input));
}
