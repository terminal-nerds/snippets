import { WITH_COVERAGE_OPTIONS } from "@terminal-nerds/vitest-config";
import { defineConfig } from "vitest/config";

// https://vitest.dev/config/
export default defineConfig({
	test: { ...WITH_COVERAGE_OPTIONS },
});
