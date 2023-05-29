const config = {
	extends: "@terminal-nerds/eslint-config",

	env: {
		browser: true,
		node: true,
	},

	rules: {
		"jsdoc/require-param": ["off"],
	},
};

module.exports = config;
