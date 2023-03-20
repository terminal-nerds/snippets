// https://prettier.io/docs/en/index.html

// eslint-disable-next-line @typescript-eslint/no-var-requires
const prettierConfig = require("@terminal-nerds/prettier-config");

/** @type {import("prettier").Options} */
const config = {
	...prettierConfig,
};

module.exports = config;
