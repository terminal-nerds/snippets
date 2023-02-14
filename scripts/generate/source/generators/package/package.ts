import { execFileSync } from "node:child_process";
import { existsSync, symlinkSync } from "node:fs";
import { join } from "node:path";
import { chdir } from "node:process";

import { kebabCase } from "@terminal-nerds/snippets-string/case";
import type { Answers, Question } from "inquirer";
import type { Actions, ActionType, CustomActionFunction, PlopGeneratorConfig } from "node-plop";
import { z } from "zod";

import {
	__dirname,
	hasAppendedTemplate,
	PACKAGES_DIRECTORY_PATH,
	ROOT_DIRECTORY_PATH,
	SNIPPETS_DIRECTORY_PATH,
} from "../../shared.js";

const PROJECT_README_FILE_PATH = join(ROOT_DIRECTORY_PATH, "README.md");
const PROJECT_LICENSE_FILE_PATH = join(ROOT_DIRECTORY_PATH, "LICENSE.md");
// TODO: __dirname should return current file path
const TEMPLATES_DIRECTORY_PATH = join(__dirname, "generators", "package", "templates");
const SNIPPETS_MAIN_FILE_PATH = join(SNIPPETS_DIRECTORY_PATH, "source", "main.ts");
const SNIPPETS_README_FILE_PATH = join(SNIPPETS_DIRECTORY_PATH, "README.md");
const SNIPPETS_PACKAGE_JSON_FILE_PATH = join(SNIPPETS_DIRECTORY_PATH, "package.json");

export const packageDirectoryGenerator: PlopGeneratorConfig = {
	description: "Generate a package directory",
	prompts: [
		{
			name: "name",
			message: "What will be the name of package containing snippets modules?",
			type: "input",
		} as Question<Answers>,
	],
	actions(answers) {
		const actions: Actions = [];

		if (answers && isGeneratePackageDirectoryAnswers(answers)) {
			const { name } = answers;
			const transformedName = kebabCase(name);
			const destination = join(PACKAGES_DIRECTORY_PATH, transformedName);
			const destinationLicensePath = join(destination, "LICENSE.md");

			// Directory in packages/
			const generatePackageDirectory: ActionType = {
				type: "addMany",
				base: join(TEMPLATES_DIRECTORY_PATH, "package"),
				destination,
				data: answers,
				globOptions: {
					dot: true,
				},
				skipIfExists: true,
				templateFiles: join(TEMPLATES_DIRECTORY_PATH, "package", "**", "*.hbs"),
				verbose: true,
			};
			const generateLicenseSymlink: CustomActionFunction = async () => {
				chdir(destination);
				symlinkSync(PROJECT_LICENSE_FILE_PATH, destinationLicensePath, "file");

				return `Created symbolic link to project's LICENSE.md: ${destinationLicensePath}`;
			};

			// Snippets package source/main.ts
			const appendToSnippetsMainFile: ActionType = {
				type: "append",
				path: SNIPPETS_MAIN_FILE_PATH,
				data: answers,
				pattern: /\/\* PACKAGES \*\//g,
				template: `export * from "@terminal-nerds/snippets-${transformedName}";`,
			};
			const fixSnippetsMainFile: CustomActionFunction = async () => {
				chdir(destination);
				execFileSync("pnpm", ["eslint", "--fix", SNIPPETS_MAIN_FILE_PATH]);

				return `Fixed issues in: ${SNIPPETS_MAIN_FILE_PATH}`;
			};

			// Snippets package's package.json
			const appendToSnippetsPackageJSONFile: ActionType = {
				type: "append",
				path: join(SNIPPETS_DIRECTORY_PATH, "package.json"),
				data: answers,
				pattern: `"dependencies": {`,
				template: `\t\t"@terminal-nerds/snippets-${transformedName}": "workspace:*",`,
			};
			const formatSnippetsPackageJSONFile: CustomActionFunction = async () => {
				chdir(SNIPPETS_DIRECTORY_PATH);
				execFileSync("pnpm", ["syncpack", "format"]);

				return `Formatted: ${SNIPPETS_PACKAGE_JSON_FILE_PATH}`;
			};

			// Snippets package's README.md
			const appendToSnippetsReadmeFileTable: ActionType = {
				type: "append",
				path: SNIPPETS_README_FILE_PATH,
				data: answers,
				pattern: /## Packages included\n\n.*\n.*- \|$/gm,
				templateFile: join(TEMPLATES_DIRECTORY_PATH, "snippets-README-table.md.hbs"),
			};
			const appendToSnippetsReadmeFileLinks: ActionType = {
				type: "append",
				path: SNIPPETS_README_FILE_PATH,
				data: answers,
				pattern: `<!-- PACKAGES LINKS -->`,
				templateFile: join(TEMPLATES_DIRECTORY_PATH, "snippets-README-links.md.hbs"),
			};
			const formatSnippetsReadmeFile: CustomActionFunction = async () => {
				chdir(destination);
				execFileSync("pnpm", ["prettier", "--write", SNIPPETS_README_FILE_PATH]);

				return `Formatted: ${SNIPPETS_README_FILE_PATH}`;
			};

			// Project README.md
			const appendToProjectReadmeFileTable: ActionType = {
				type: "append",
				path: join(ROOT_DIRECTORY_PATH, "README.md"),
				data: answers,
				pattern: /<!-- PACKAGES -->.*\|$/gm,
				templateFile: join(TEMPLATES_DIRECTORY_PATH, "project-README-table.md.hbs"),
			};
			const appendToProjectReadmeFileLinks: ActionType = {
				type: "append",
				path: join(ROOT_DIRECTORY_PATH, "README.md"),
				data: answers,
				pattern: `<!-- PACKAGES LINKS -->`,
				templateFile: join(TEMPLATES_DIRECTORY_PATH, "project-README-links.md.hbs"),
			};
			const formatProjectReadmeFile: CustomActionFunction = async () => {
				chdir(ROOT_DIRECTORY_PATH);
				execFileSync("pnpm", ["prettier", "--write", PROJECT_README_FILE_PATH]);

				return `Formatted: ${PROJECT_README_FILE_PATH}`;
			};

			(async function run() {
				actions.push(generatePackageDirectory);
				if (!existsSync(destinationLicensePath)) {
					actions.push(generateLicenseSymlink);
				}
				if (!(await hasAppendedTemplate(appendToSnippetsMainFile))) {
					/* prettier-ignore */
					actions.push(
						appendToSnippetsMainFile,
						fixSnippetsMainFile,
					);
				}
				if (!(await hasAppendedTemplate(appendToSnippetsPackageJSONFile))) {
					/* prettier-ignore */
					actions.push(
						appendToSnippetsPackageJSONFile,
						formatSnippetsPackageJSONFile,
					);
				}
				if (!(await hasAppendedTemplate(appendToSnippetsReadmeFileLinks))) {
					/* prettier-ignore */
					actions.push(
						appendToSnippetsReadmeFileTable,
						appendToSnippetsReadmeFileLinks,
						formatSnippetsReadmeFile,
					);
				}
				if (!(await hasAppendedTemplate(appendToProjectReadmeFileLinks))) {
					/* prettier-ignore */
					actions.push(
						appendToProjectReadmeFileTable,
						appendToProjectReadmeFileLinks,
						formatProjectReadmeFile,
					);
				}
			})();
		} else {
			throw new Error("Something went wrong with getting answers.");
		}

		return actions;
	},
};

type GeneratePackageDirectoryAnswers = z.infer<typeof GENERATE_PACKAGE_DIRECTORY_ANSWER_SCHEMA>;
const GENERATE_PACKAGE_DIRECTORY_ANSWER_SCHEMA = z.object({
	name: z.string().max(40),
});

function isGeneratePackageDirectoryAnswers(data: unknown): data is GeneratePackageDirectoryAnswers {
	return GENERATE_PACKAGE_DIRECTORY_ANSWER_SCHEMA.safeParse(data).success;
}
