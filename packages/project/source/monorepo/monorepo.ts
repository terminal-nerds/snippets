import { RuntimeError } from "@terminal-nerds/snippets-error/custom";
import { IN_BROWSER } from "@terminal-nerds/snippets-environment/environment";
import { monorepoRootSync } from "monorepo-root";

type Path = `/${string}`;

export function getProjectMonorepoRootPath(cwd?: string): Path {
	if (IN_BROWSER) {
		throw new RuntimeError(`You cannot determine if the current process is monorepo inside the browser.`);
	} else {
		const monorepoPath = monorepoRootSync(cwd);

		if (monorepoPath) {
			return monorepoPath as Path;
		} else {
			throw new RuntimeError(
				`The current project is either not a monorepo, or there was an issue determining it.`,
			);
		}
	}
}

export function isProjectMonorepo(): boolean {
	try {
		getProjectMonorepoRootPath();

		return true;
	} catch {
		return false;
	}
}
