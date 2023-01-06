/** @type {import("semantic-release").Options} */
module.exports = {
	branches: [
		"+([0-9])?(.{+([0-9]),x}).x",
		"main",
		"next",
		"next-major",
		{ name: "beta", prerelease: true },
		{ name: "alpha", prerelease: true },
	],
	ci: true,
	debug: true,
	dryRun: false,
	tagFormat: "${version}",
	plugins: [
		[
			// https://github.com/semantic-release/commit-analyzer
			"@semantic-release/commit-analyzer",
			{
				preset: "conventionalcommits",
				releaseRules: [
					{ type: "docs", release: "patch" },
					{ type: "perf", release: "patch" },
					{ type: "style", release: "patch" },
				],
				parserOpts: {
					noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"],
				},
			},
		],
		[
			// https://github.com/semantic-release/release-notes-generator
			"@semantic-release/release-notes-generator",
			{
				preset: "conventionalcommits",
				presetConfig: {
					types: [
						{ type: "feat", section: "Features" },
						{ type: "fix", section: "Bug Fixes" },
						{ type: "chore", section: "Other" },
						{ type: "docs", section: "Documentation" },
						{ type: "style", section: "Other" },
						{ type: "refactor", section: "Other" },
						{ type: "perf", section: "Other" },
						{ type: "test", section: "Other" },
						{ type: "build", section: "Other" },
						{ type: "ci", section: "Other" },
					],
				},
			},
		],
		// https://github.com/semantic-release/changelog
		"@semantic-release/changelog",
		// https://github.com/semantic-release/github
		"@semantic-release/github",
		// https://github.com/semantic-release/npm
		"@semantic-release/npm",
		// https://github.com/semantic-release/git
		"@semantic-release/git",
	],
};
