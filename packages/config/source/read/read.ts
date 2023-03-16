import { existsSync } from "node:fs";
import { join } from "node:path";

import { getRuntimeEnvironmentName, IN_BROWSER } from "@terminal-nerds/snippets-runtime/environment";
import { RuntimeError } from "@terminal-nerds/snippets-runtime/error";
import { packageDirectorySync } from "pkg-dir";
import type { Join } from "type-fest";

// TODO: Move it to a separate package
export type AbsolutePath = `/${string}`;
export type CWD = AbsolutePath;

// TODO: Move it to a separate package
export function isCWD(path: string): path is CWD {
	return path.startsWith("/");
}

// TODO: Move it to a separate package
export function getCurrentWorkingDirectory(): CWD {
	if (IN_BROWSER) throw new RuntimeError(`You cannot get current working directory in the browser.`);

	const runtimeName = getRuntimeEnvironmentName();

	let cwd;

	switch (runtimeName) {
		case "bun":
		case "node": {
			cwd = process.cwd();
			break;
		}
		case "deno": {
			cwd = Deno.cwd();
			break;
		}
		default: {
			throw new RuntimeError(
				`Cannot determine the current working directory in the current runtime environment - ${runtimeName}.`,
			);
		}
	}

	if (isCWD(cwd)) {
		return cwd;
	} else {
		throw new TypeError(
			`The current runtime ${runtimeName} provived an invalid current working directory path - ${cwd}.`,
		);
	}
}

// TODO: Move it to a separate package
export function joinPaths<T extends readonly string[]>(paths: T): Join<T, "/"> {
	const joined = join(...paths);

	if (isCWD(joined)) {
		return joined as Join<T, "/">;
	} else {
		throw new TypeError(`Joined path did not return an absolute path.`);
	}
}

export function getNearestPackageRootPath(cwd?: string): AbsolutePath {
	if (IN_BROWSER) throw new RuntimeError(`You cannot get root path of a package in the browser.`);

	const packageDirectoryPath = packageDirectorySync({ cwd: cwd ?? getCurrentWorkingDirectory() });

	if (packageDirectoryPath && isCWD(packageDirectoryPath)) {
		return packageDirectoryPath;
	} else {
		throw new RuntimeError(`Cannot determine the nearest root of the package for the file: ${cwd}!`);
	}
}

export type ConfigFileName = string;
export type ConfigPath<A extends CWD, N extends ConfigFileName> = Join<[A, N], "/">;

export function getNearestConfigPath<N extends ConfigFileName, A extends AbsolutePath = AbsolutePath>(
	fileName: N,
	cwd?: A,
): ConfigPath<A, N> {
	const packageRootPath = getNearestPackageRootPath(cwd);
	const configPath = joinPaths<[A, N]>([packageRootPath as A, fileName]);

	if (existsSync(configPath)) {
		return configPath;
	} else {
		throw new RuntimeError(`Cannot locate nearest "${fileName}" file!`);
	}
}
