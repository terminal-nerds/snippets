import { RuntimeError } from "@terminal-nerds/snippets-error/custom";
import { resolveModule } from "local-pkg";

import { IN_BROWSER } from "../environment/environment.ts";

/** @see {@link https://nodejs.org/api/modules.html#modules-commonjs-modules} CommonJS Module */
export const IN_CJS = typeof globalThis.require === "function";

/** @see {@link https://nodejs.org/api/esm.html#modules-ecmascript-modules} ECMAScript Module */
export const IN_ESM = !IN_CJS && Boolean(import.meta);

export function hasModule(name: string): boolean {
	if (IN_BROWSER) throw new RuntimeError(`You cannot check for module existence in the browser.`);

	return Boolean(resolveModule(name));
}
