import autocompletePrompt from "inquirer-autocomplete-prompt";
import type { NodePlopAPI } from "plop";

import { snippetModuleGenerator } from "./generators/module/module.js";
import { packageDirectoryGenerator } from "./generators/package/package.js";

export default function setupPlop(plop: NodePlopAPI) {
	plop.setPrompt("autocomplete", autocompletePrompt);
	plop.setGenerator("module", snippetModuleGenerator);
	plop.setGenerator("package", packageDirectoryGenerator);
}
