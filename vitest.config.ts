import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		open: false,
		include: ["source/**/*.test.ts"],
		ui: true,
	},
});
