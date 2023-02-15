// https://prettier.io/docs/en/index.html

const prettierConfig = require("@terminal-nerds/prettier-config");

const { plugins } = prettierConfig;

/** @type {import("prettier").Options} */
const config = {
	...prettierConfig,
	plugins: [...plugins, "prettier-plugin-sort-markdown-table"],
};

module.exports = config;
