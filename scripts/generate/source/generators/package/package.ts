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
	PACKAGES_DIRECTORY_PATH,
	ROOT_DIRECTORY_PATH,
} from "../../shared.ts";

const PROJECT_README_FILE_PATH = join(ROOT_DIRECTORY_PATH, "README.md");
const PROJECT_LICENSE_FILE_PATH = join(ROOT_DIRECTORY_PATH, "LICENSE.md");
// TODO: __dirname should return current file path
const TEMPLATES_DIRECTORY_PATH = join(__dirname, "generators", "package", "templates");

export const packageDirectoryGenerator: PlopGeneratorConfig = {
	description: "Generate a package directory",
	prompts: [
		{
			name: "name",
			message: "What will be the name of package containing snippets modules?",
			type: "input",
		} as Question<Answers>,
	],
	actions: (answers) => {
		if (answers && isGeneratePackageDirectoryAnswers(answers)) {
			const name = getName(answers);
			const paths = getPaths(name);

			return [...setPackageDirectoryActions(answers, paths), ...setProjectReadmeFileActions(answers, paths)];
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

/** Generate an row and links in project's `README.md` file. */
function setProjectReadmeFileActions(data: GeneratePackageDirectoryAnswers, paths: Paths): Array<ActionType> {
	const { projectReadmeTableTemplatePath } = paths;
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

	return [appendToProjectReadmeFileTableAction, appendToProjectReadmeFileLinks, formatProjectReadmeFile];
}
