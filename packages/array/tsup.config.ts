import { getNodeUniversalOptions } from "@terminal-nerds/tsup-config";
import { defineConfig } from "tsup";

export default defineConfig((options) => ({
	...getNodeUniversalOptions(options),
	entry: ["source/**/*.ts", "!source/**/*.test.ts"],
}));
