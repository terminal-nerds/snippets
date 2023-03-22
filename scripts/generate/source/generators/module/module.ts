import { readdirSync } from "node:fs";
import { join } from "node:path";
import { chdir } from "node:process";

import { kebabCase } from "@terminal-nerds/snippets-string/case";
import type { Answers, Question } from "inquirer";
import type { Actions, ActionType, CustomActionFunction, PlopGeneratorConfig } from "node-plop";
import { z } from "zod";

import {
	__dirname,
	defineAddAction,
	defineAppendAction,
	defineToolAction,
	formatWithPrettier,
	PACKAGES_DIRECTORY_PATH,
} from "../../shared.ts";

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
		if (answers && isGenerateSnippetsModuleAnswers(answers)) {
			const { includeTestFile } = answers;
			const names = getNames(answers);
			const paths = getPaths(names);

			/* prettier-ignore */
			return [
				...setModuleFilesAction(paths, includeTestFile),
				...setPackageMainFileAction(paths),
				...setPackageReadmeFileActions(paths),
			];
		} else {
			throw new Error("Something went wrong with getting answers.");
		}
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

type Names = ReturnType<typeof getNames>;
function getNames(answers: GenerateSnippetsModuleAnswers) {
	return {
		moduleName: kebabCase(answers.moduleName),
		packageName: kebabCase(answers.packageName),
	};
}

type Paths = ReturnType<typeof getPaths>;
function getPaths(names: Names) {
	const { moduleName, packageName } = names;
	const packageDirectoryPath = join(PACKAGES_DIRECTORY_PATH, kebabCase(packageName));
	const moduleDirectoryPath = join(packageDirectoryPath, "source", moduleName);

	return {
		mainFilePath: join(packageDirectoryPath, "source", "main.ts"),
		mainExportTemplatePath: join(TEMPLATES_DIRECTORY_PATH, "main-export-line.ts.hbs"),
		moduleDirectoryPath,
		moduleFilePath: join(moduleDirectoryPath, `${moduleName}.ts`),
		moduleFileTemplatePath: join(TEMPLATES_DIRECTORY_PATH, "module.ts.hbs"),
		moduleTestFilePath: join(moduleDirectoryPath, `${moduleName}.test.ts`),
		moduleTestFileTemplatePath: join(TEMPLATES_DIRECTORY_PATH, "module.test.ts.hbs"),
		packageDirectoryPath,
		readmeFilePath: join(packageDirectoryPath, "README.md"),
		readmeLinksTemplatePath: join(TEMPLATES_DIRECTORY_PATH, "README-links.md.hbs"),
		readmeTableTemplatePath: join(TEMPLATES_DIRECTORY_PATH, "README-table.md.hbs"),
	};
}

/** Generate files in `/packages/<packageName>/<source>/<moduleName>/` */
function setModuleFilesAction(paths: Paths, includeTest: boolean): Array<ActionType> {
	const { moduleFilePath, moduleTestFilePath, moduleTestFileTemplatePath, moduleFileTemplatePath } = paths;
	const actions: Actions = [];
	const addSourceFileAction = defineAddAction(moduleFilePath, moduleFileTemplatePath);
	const addSourceTestFileAction = defineAddAction(moduleTestFilePath, moduleTestFileTemplatePath);

	actions.push(addSourceFileAction);
	if (includeTest) actions.push(addSourceTestFileAction);

	return actions;
}

/** Generate export in `./packages/<packageName>/<source>/main.ts` */
function setPackageMainFileAction(paths: Paths): Array<ActionType> {
	const { mainFilePath, mainExportTemplatePath, packageDirectoryPath } = paths;
	const appendExportToMainFileAction = defineAppendAction({
		path: mainFilePath,
		templateFile: mainExportTemplatePath,
		pattern: /\/\* MODULES \*\//g,
	});
	const fixMainFileAction = defineToolAction("eslint", { directory: packageDirectoryPath, file: mainFilePath });

	return [appendExportToMainFileAction, fixMainFileAction];
}

/** Generate an row and links in package's `README.md` file */
function setPackageReadmeFileActions(paths: Paths): Array<ActionType> {
	const { packageDirectoryPath, readmeFilePath, readmeTableTemplatePath, readmeLinksTemplatePath } = paths;
	const appendToReadmeLinksAction = defineAppendAction({
		path: readmeFilePath,
		templateFile: readmeLinksTemplatePath,
		pattern: /<!-- MODULES LINKS -->/,
	});
	const appendToReadmeTableAction = defineAppendAction({
		path: readmeFilePath,
		templateFile: readmeTableTemplatePath,
		pattern: /## Modules included\n{2}.*\n{2}.*\n.*- \|$/gm,
	});
	const formatReadmeFileAction: CustomActionFunction = async () => {
		chdir(packageDirectoryPath);
		formatWithPrettier(readmeFilePath);
		// FIXME: Once appended, and formatted, the sort plugin doesn't work, hence needs to be called again
		formatWithPrettier(readmeFilePath);

		return `Formatted: ${readmeFilePath}`;
	};

	/* prettier-ignore */
	return [
		appendToReadmeTableAction,
		appendToReadmeLinksAction,
		formatReadmeFileAction,
	];
}
