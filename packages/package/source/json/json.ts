import { RuntimeError } from "@terminal-nerds/snippets-error/custom";
import { IN_BROWSER } from "@terminal-nerds/snippets-runtime/environment";
import { type NormalizedPackageJson, readPackageUpSync } from "read-pkg-up";

export function readPackageJSON(): NormalizedPackageJson {
	if (IN_BROWSER) throw new RuntimeError(`You cannot read the package.json inside the browser.`);

	const file = readPackageUpSync();

	if (file) {
		return file.packageJson;
	} else {
		throw new Error('Cannot locate nearest "package.json" file!');
	}
}
