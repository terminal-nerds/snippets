import { existsSync, symlinkSync } from "node:fs";
import { join } from "node:path";
import { chdir } from "node:process";

import { kebabCase } from "@terminal-nerds/snippets-string/case";
import type { Answers, Question } from "inquirer";
import type { Actions, ActionType, CustomActionFunction, PlopGeneratorConfig } from "node-plop";
import { z } from "zod";

import {
	__dirname,
	defineAddManyAction,
	defineAppendAction,
	defineToolAction,
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
		if (answers && isGeneratePackageDirectoryAnswers(answers)) {
			const actions: Actions = [];
			const name = getName(answers);
			const paths = getPaths(name);

			return [
				...setPackageDirectoryActions(answers, paths),
				...setSnippetsMainFileActions(answers, paths),
				...setSnippetsPackageJSONActions(answers),
				...setSnippetsReadmeFileActions(answers),
				...setProjectReadmeFileActions(answers, paths),
				...actions,
			];
		} else {
			throw new Error("Something went wrong with getting answers.");
		}
	},
};

type GeneratePackageDirectoryAnswers = z.infer<typeof GENERATE_PACKAGE_DIRECTORY_ANSWER_SCHEMA>;
const GENERATE_PACKAGE_DIRECTORY_ANSWER_SCHEMA = z.object({
	name: z.string().max(40),
});

function isGeneratePackageDirectoryAnswers(data: unknown): data is GeneratePackageDirectoryAnswers {
	return GENERATE_PACKAGE_DIRECTORY_ANSWER_SCHEMA.safeParse(data).success;
}

function getName(answers: GeneratePackageDirectoryAnswers) {
	return kebabCase(answers.name);
}

type Paths = ReturnType<typeof getPaths>;
function getPaths(name: string) {
	const directoryPath = join(PACKAGES_DIRECTORY_PATH, name);

	return {
		directoryPath,
		directoryTemplatesPath: join(TEMPLATES_DIRECTORY_PATH, "package"),
		licensePath: join(directoryPath, "LICENSE.md"),
		projectReadmePath: join(ROOT_DIRECTORY_PATH, "README.md"),
		projectReadmeTableTemplatePath: join(TEMPLATES_DIRECTORY_PATH, "project-README-table.md.hbs"),
	};
}

/** Generate files in `./packages/<packageName>/` */
function setPackageDirectoryActions(data: GeneratePackageDirectoryAnswers, paths: Paths): Array<ActionType> {
	const { directoryPath, directoryTemplatesPath, licensePath } = paths;
	const actions: Actions = [];
	const createDirectoryAction = defineAddManyAction({
		base: directoryTemplatesPath,
		destination: directoryPath,
		data,
		templateFiles: join(directoryTemplatesPath, "**", "*.hbs"),
	});
	const createLicenseSymlinkAction: CustomActionFunction = () => {
		chdir(directoryPath);
		symlinkSync(PROJECT_LICENSE_FILE_PATH, licensePath, "file");

		return `Created symbolic link to project's LICENSE.md: ${licensePath}`;
	};

	actions.push(createDirectoryAction);
	if (!existsSync(licensePath)) actions.push(createLicenseSymlinkAction);

	return actions;
}

/** Add export of the package in the `./packages/snippets/source/main.ts` file */
function setSnippetsMainFileActions(data: GeneratePackageDirectoryAnswers, paths: Paths): Array<ActionType> {
	const { directoryPath } = paths;
	const actions: Actions = [];
	const appendAction = defineAppendAction({
		path: SNIPPETS_MAIN_FILE_PATH,
		data,
		pattern: /\/\* PACKAGES \*\//g,
		templateFile: join(TEMPLATES_DIRECTORY_PATH, "snippets-main-export.ts.hbs"),
	});
	const fixAction = defineToolAction("eslint", { directory: directoryPath, file: SNIPPETS_MAIN_FILE_PATH });

	(async function run() {
		if (!(await hasAppendedTemplate(appendAction))) {
			actions.push(appendAction, fixAction);
		}
	})();

	return actions;
}

/** Generate an dependency entry in in snippets `package.json` file */
function setSnippetsPackageJSONActions(data: GeneratePackageDirectoryAnswers): Array<ActionType> {
	const actions: Actions = [];
	const appendAction = defineAppendAction({
		path: join(SNIPPETS_DIRECTORY_PATH, "package.json"),
		data,
		pattern: `"dependencies": {`,
		templateFile: join(TEMPLATES_DIRECTORY_PATH, "snippets-package-dependency.json-hbs"),
	});
	const formatAction = defineToolAction("syncpack", {
		directory: SNIPPETS_DIRECTORY_PATH,
		file: SNIPPETS_PACKAGE_JSON_FILE_PATH,
	});

	(async function run() {
		if (!(await hasAppendedTemplate(appendAction))) {
			actions.push(appendAction, formatAction);
		}
	})();

	return actions;
}

/** Append to `./packages/snippets/README.md` table and links */
function setSnippetsReadmeFileActions(data: GeneratePackageDirectoryAnswers): Array<ActionType> {
	const actions: Actions = [];
	const appendTableAction = defineAppendAction({
		path: SNIPPETS_README_FILE_PATH,
		data,
		pattern: /## Packages included\n\n.*\n.*- \|$/gm,
		templateFile: join(TEMPLATES_DIRECTORY_PATH, "snippets-README-table.md.hbs"),
	});
	const appendLinksAction = defineAppendAction({
		path: SNIPPETS_README_FILE_PATH,
		data,
		pattern: `<!-- PACKAGES LINKS -->`,
		templateFile: join(TEMPLATES_DIRECTORY_PATH, "snippets-README-links.md.hbs"),
	});
	const formatAction = defineToolAction("prettier", {
		directory: SNIPPETS_DIRECTORY_PATH,
		file: SNIPPETS_README_FILE_PATH,
	});

	(async function run() {
		if (!(await hasAppendedTemplate(appendLinksAction))) {
			actions.push(appendTableAction, appendLinksAction, formatAction);
		}
	})();

	return actions;
}

/** Generate an row and links in project's `README.md` file */
function setProjectReadmeFileActions(data: GeneratePackageDirectoryAnswers, paths: Paths): Array<ActionType> {
	const { projectReadmeTableTemplatePath } = paths;
	const actions: Actions = [];
	const appendToProjectReadmeFileTableAction = defineAppendAction({
		path: PROJECT_README_FILE_PATH,
		pattern: /<!-- PACKAGES -->.*\|$/gm,
		data,
		templateFile: projectReadmeTableTemplatePath,
	});
	const appendToProjectReadmeFileLinks: ActionType = {
		type: "append",
		path: PROJECT_README_FILE_PATH,
		data,
		pattern: `<!-- PACKAGES LINKS -->`,
		templateFile: join(TEMPLATES_DIRECTORY_PATH, "project-README-links.md.hbs"),
	};
	const formatProjectReadmeFile = defineToolAction("prettier", {
		directory: ROOT_DIRECTORY_PATH,
		file: PROJECT_README_FILE_PATH,
	});

	(async function run() {
		if (!(await hasAppendedTemplate(appendToProjectReadmeFileLinks))) {
			actions.push(appendToProjectReadmeFileTableAction, appendToProjectReadmeFileLinks, formatProjectReadmeFile);
		}
	})();

	return actions;
}
