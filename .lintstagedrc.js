// https://github.com/okonet/lint-staged

const config = {
	// Prettier
	"*": ["pretty-quick --check --staged"],

	// ESLint
	"*.{js,json,ts,yml,yaml}": ["eslint"],

	// depcheck & syncpack
	"**/package.json": () => [
		"depcheck",
		"syncpack list-mismatches",
		"syncpack format",
	],

	// markdownlint
	"*.md": [`markdownlint --ignore "./.changeset/*.md"`],

	"*.ts": ["tsc --noEmit"],
};

export default config;
