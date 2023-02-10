#!/usr/bin/env tsx

/* eslint-disable n/shebang */
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import minimist from "minimist";
import { Plop, run } from "plop";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PLOP_CONFIG_PATH = join(__dirname, "plopfile.ts");

interface Argv {
	cwd: string;
	preload: Array<string>;
	completion: string;
}

const arguments_ = process.argv.slice(2);
const argv = minimist<Argv>(arguments_);

Plop.prepare(
	{
		cwd: argv.cwd,
		configPath: PLOP_CONFIG_PATH,
		preload: argv.preload || [],
		completion: argv.completion,
	},
	(environment) => {
		return run(environment, undefined, true);
	},
);
