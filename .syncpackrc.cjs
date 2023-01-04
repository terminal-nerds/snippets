const config = {
	// https://github.com/JamieMason/syncpack/#-configuration-file
	...require("@terminal-nerds/syncpack-config"),
	source: ["package.json"],
};

module.exports = config;
