# Snippets

[![pnpm workspace badge]][pnpm workspace]
[![changesets badge]][changesets]
[![turborepo badge]][turborepo]
[![vitest badge]][vitest]

➡️ This project is a [monorepo] made with [pnpm workspace] and powered by [changesets], [turborepo], [vitest].

[monorepo]: https://en.wikipedia.org/wiki/monorepo
[pnpm workspace]: https://pnpm.io/workspaces
[pnpm workspace badge]: https://img.shields.io/badge/-pnpm%20workspace-informational?style=for-the-badge&logo=pnpm
[changesets]: https://github.com/changesets/changesets
[changesets badge]: https://img.shields.io/badge/-changesets-gray?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAABYUlEQVQoU02RvUoDQRDHZ3b3TiwsjI0xWFjb+gIKoqIIKUSCCjY+ho3voO9gF7wq+AaBVOJXY4JaCH5FMSbeJTf+Z3OeWVhmv37zn/kvCwYR6dTBmA1mXsj2Pmyed+6N4dkgdBJYQ4Eh5gzU+1EYN6xJaDFqi3NGAQ6cHYIOJECD+36mJikWMVJ0cbISvfns+tgFVkJrCUkoWho3PivgC4T5eEAcY9sbEPX6xOvRMxQYChYJGAmwHrO12vLEqgcz2LYTSgCxgl3McvQkoQJQc1CtlwtWu/szY9QHuvuS9Af1dlDqVvWRh4YwXVamtaV85Ip6cvspolCckkCRt88eJIRJXtEYut75h3Pw6kMEpghM4QTxG3G32hLfn/bmezR0szfjmRxsvEvaTQBl5qwV2Zc2ddJM1ckQ7jrnpLlf8ucerL/KIUo7UlMAtjaKPDfaz+Rx8wV/V9D/C1JTaR2UTn8B1OeSRP02JSkAAAAASUVORK5CYII=
[turborepo]: https://github.com/vercel/turborepo
[turborepo badge]: https://img.shields.io/badge/-turborepo-gray?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAklJREFUOE91kU9oE1EQxuftbpqkmBRJKRYVih6iIEEELcYoBUF6EQ8lPWihtoInNVYQAhZKLRQiikgvRQ968KDtIRUKKpVWq6IHRaonUVs0BitRBJtkk+xmn9+sG9lG/eC382dnZt/OE1TThFS3fNK7LVKOSKKdkoSuSnWYFLNfNa2pynr/tfc94uefescRbMOpXCBoemarJMjUxLhHpacVw/pqyCbFp5Y6qVo+plliK2z/i6GWu/VD7Hjfue8bSUp74L8UG/4S7xjKLsWSH9e63/+voR1FEVAED0GWm+ITssF8+W6aSJ5Np8ILnFP44dI6+PPgObgKboIlMALEZLeorDH0uUA5n6r1uAewPwX2grcgCS4BAwyCM4ACpdaxgF6KJk8/a+PYrQMIcAG0DNz/2eXkv8Fq3JA8OjM92Hevj333CXZwAroPfjg+mzTgXYRAGyeCRuGGt2LYe7EnOuKjslZtGXEj8DjvdLsgvxLS1N/7d59gBu/4FzpBh9PAVecBD3gD7K82mYWuRrPoZd894DXiMaf4ASzfBC9zAJTBCUBzBy82Byt61FeWsxzXi7+YABnAp6mCJ2B3rXB+z8iFR7HR27XYvQPOcdMVh2bYEsjXij/vHw3lCnqrYjXwFa9WJpJolxsG/PV5jiVJJbPt1MnFSGL5w6bjTe4ae5W5cH+gSuotTVjbNUnXNaE8lsLKauRbMcxS3FCp1yRVCq/S27Iw/uqvAbVEcXNPVJHyMDa7iyzLUIRy2RDikCQr7V807gia5J2s0i8UIcDwgEVTwgAAAABJRU5ErkJggg==
[vitest]: https://github.com/vitest-dev/vitest
[vitest badge]: https://img.shields.io/badge/-vitest-gray?style=for-the-badge&logo=vitest

![sauron-monorepo-meme]

[sauron-monorepo-meme]: https://github.com/terminal-nerds/.github/blob/main/assets/monorepo-sauron.jpg

## Project goal

🎯 **Collect all code snippets in one repository, and keep them organized.**

### What are snippets?

Reusable pieces of code, which can be **reused** across the projects.

### Why?

-   follows the **[DRY principle]**,
-   easier maintainability,
-   testable, and easier to debug,
-   prevents searching for a snippet in projects,
-   lowers the amount of automated dependencies updates in Pull Requests,
-   eases the issues during the attempts to revive a project with legacy code.

[DRY principle]: https://en.wikipedia.org/wiki/Don%27t_repeat_yourself

### Features

-   typed 📑,
-   tested 🧪,
-   [tree-shakeable] 🎋 - _(bundless can easily do "code-splitting")_,
-   relieves the count of project dependencies ☀️ - you have a better view of what package is being used, for what, and where.

> **Note**\
> **They are written with [ES Module] (_ESM_) type** - we adhere to the future of JavaScript (_following EcmaScript)_.\
> Hence they can be used in as many runtimes as possible, such as:
>
> -   ![Node.js icon] Node.js,
> -   ![Deno icon] Deno,
> -   ![Bun icon] Bun,
> -   modern website browsers.

[tree-shakeable]: https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking
[ES Module]: https://www.freecodecamp.org/news/javascript-es-modules-and-module-bundlers
[node.js icon]: https://api.iconify.design/logos/nodejs-icon.svg
[deno icon]: https://api.iconify.design/logos/deno.svg
[bun icon]: https://api.iconify.design/logos/bun.svg

---

## Packages

![workflow CI-CD badge]
[![dependencies badge]][dependencies url]

[workflow ci-cd badge]: https://img.shields.io/github/actions/workflow/status/terminal-nerds/snippets/ci-cd.yml?label=CI%20%26%20CD&logo=github&style=for-the-badge&branch=main
[dependencies badge]: https://img.shields.io/librariesio/github/terminal-nerds/snippets?style=for-the-badge
[dependencies url]: https://libraries.io/github/terminal-nerds/snippets "Dependencies status"

📦 The following packages are available under the [packages/](./packages) directory.

> **Note**\
> **All of them are [scoped] - they are prefixed with `@terminal-nerds/`.**\
> They are accessible for public use and downloadable from the [npmjs.com registry].

[scoped]: https://docs.npmjs.com/cli/v6/using-npm/scope
[npmjs.com registry]: https://npmjs.com/org/terminal-nerds

**There are two recommended ways to use the snippets**:

1. **If you are still determining which snippets you will need**,\
   use the [`@terminal-nerds/snippets`][snippets] package, which contains all snippets.

1. **You know which snippets you need**;\
   you can download one or a few specific snippets.\
   It might help understand what is being used in the project(s),
   reduce the automated Pull Requests related to updating dependencies, etc.

    > **Note**\
    > Package names are prefixed with `snippets-`.\
    > As in: `@terminal-nerds/snippets-<package name>`

| Name                            | Version                                          |
| ------------------------------- | ------------------------------------------------ |
| [![snippets badge]][snippets]   | [![snippets version badge]][snippets npm page]   |
| <!-- PACKAGES -->               | <!-- PACKAGES -->                                |
| [![object badge]][object]       | [![object version badge]][object npm page]       |
| [![url badge]][url]             | [![url version badge]][url npm page]             |
| [![array badge]][array]         | [![array version badge]][array npm page]         |
| [![number badge]][number]       | [![number version badge]][number npm page]       |
| [![config badge]][config]       | [![config version badge]][config npm page]       |
| [![extension badge]][extension] | [![extension version badge]][extension npm page] |
| [![error badge]][error]         | [![error version badge]][error npm page]         |
| [![regexp badge]][regexp]       | [![regexp version badge]][regexp npm page]       |
| [![runtime badge]][runtime]     | [![runtime version badge]][runtime npm page]     |
| [![string badge]][string]       | [![string version badge]][string npm page]       |
| [![test badge]][test]           | [![test version badge]][test npm page]           |
| [![type badge]][type]           | [![type version badge]][type npm page]           |

[snippets]: ./packages/snippets/README.md
[snippets badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=snippets&style=flat-square&color=informational
[snippets version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets/latest?style=flat-square&logo=npm
[snippets npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets

<!-- prettier-ignore-start -->
<!-- PACKAGES LINKS -->
[object]: ./packages/object/README.md
[object badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=snippets-object&style=flat-square&color=informational
[object version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-object/latest?style=flat-square&logo=npm
[object npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets-object

[url]: ./packages/url/README.md
[url badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=snippets-url&style=flat-square&color=informational
[url version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-url/latest?style=flat-square&logo=npm
[url npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets-url

[array]: ./packages/array/README.md
[array badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=snippets-array&style=flat-square&color=informational
[array version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-array/latest?style=flat-square&logo=npm
[array npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets-array

[number]: ./packages/number/README.md
[number badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=snippets-number&style=flat-square&color=informational
[number version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-number/latest?style=flat-square&logo=npm
[number npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets-number

[config]: ./packages/config/README.md
[config badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=snippets-config&style=flat-square&color=informational
[config version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-config/latest?style=flat-square&logo=npm
[config npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets-config

[extension]: ./packages/extension/README.md
[extension badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=snippets-extension&style=flat-square&color=informational
[extension version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-extension/latest?style=flat-square&logo=npm
[extension npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets-extension

[error]: ./packages/error/README.md
[error badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=snippets-error&style=flat-square&color=informational
[error version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-error/latest?style=flat-square&logo=npm
[error npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets-error

[function]: ./packages/function/README.md
[function badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=snippets-function&style=flat-square&color=informational
[function version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-function/latest?style=flat-square&logo=npm
[function npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets-function

[regexp]: ./packages/regexp/README.md
[regexp badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=snippets-regexp&style=flat-square&color=informational
[regexp version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-regexp/latest?style=flat-square&logo=npm
[regexp npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets-regexp

[runtime]: ./packages/runtime/README.md
[runtime badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=snippets-runtime&style=flat-square&color=informational
[runtime version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-runtime/latest?style=flat-square&logo=npm
[runtime npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets-runtime

[string]: ./packages/string/README.md
[string badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=snippets-string&style=flat-square&color=informational
[string version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-string/latest?style=flat-square&logo=npm
[string npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets-string

[test]: ./packages/test/README.md
[test badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=snippets-test&style=flat-square&color=informational
[test version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-test/latest?style=flat-square&logo=npm
[test npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets-test

[type]: ./packages/type/README.md
[type badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=snippets-type&style=flat-square&color=informational
[type version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-type/latest?style=flat-square&logo=npm
[type npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets-type
<!-- prettier-ignore-end -->

---

## Security

![workflow maintenance badge]
![Snyk vulnerabilities badge]

🔐 Our team has a shared [Security Policy]. If you have concerns or found an
issue, please follow the instructions, and remember one thing:

> **Warning**\
> We are all ears, but please, **DO NOT create a GitHub issue for reporting a vulnerability**.

[workflow maintenance badge]: https://img.shields.io/github/actions/workflow/status/terminal-nerds/snippets/maintenance.yml?label=Security&logo=github&style=for-the-badge&branch=main
[snyk vulnerabilities badge]: https://img.shields.io/snyk/vulnerabilities/github/terminal-nerds/snippets?logo=snyk&style=for-the-badge
[security policy]: https://github.com/terminal-nerds/snippets/security/policy

---

## License

![License badge](https://img.shields.io/github/license/terminal-nerds/snippets?style=for-the-badge)

⚖️ **The code, including packages**, is licensed under the [MIT license](./LICENSE.md).

![FOSSA Status Card](https://app.fossa.com/api/projects/custom%2B20521%2Fgit%40github.com%3Aterminal-nerds%2Fsnippets.git.svg?type=large)

### Project contributors

[![contributors badge]][contributors url]
[![discord badge]][discord invite url]

🥰 Thanks go to these wonderful people and bots _([emoji key])_:

[contributors badge]: https://img.shields.io/github/contributors/terminal-nerds/snippets?style=for-the-badge
[contributors url]: /#contributors
[discord badge]: https://img.shields.io/discord/862890839537877012?label=Discord&logo=discord&style=for-the-badge
[discord invite url]: https://discord.terminal-nerds.dev
[emoji key]: https://allcontributors.org/docs/en/emoji-key

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/xeho91"><img src="https://avatars.githubusercontent.com/u/18627568?v=4?s=60" width="60px;" alt=""/><br /><sub><b>Matt Kadlubowski</b></sub></a><br /><a href="https://github.com/terminal-nerds/@terminal-nerds/configs/commits?author=xeho91" title="Code">💻</a> <a href="#maintenance-xeho91" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/atlassian/changesets"><img src="https://avatars.githubusercontent.com/u/51163350?v=4?s=60" width="60px;" alt=""/><br /><sub><b>changesets</b></sub></a><br /><a href="https://github.com/terminal-nerds/@terminal-nerds/configs/commits?author=changesets" title="Documentation">📖</a> <a href="#platform-changesets" title="Packaging/porting to new platform">📦</a> <a href="#tool-changesets" title="Tools">🔧</a></td>
    <td align="center"><a href="https://renovatebot.com/"><img src="https://avatars.githubusercontent.com/u/38656520?v=4?s=60" width="60px;" alt=""/><br /><sub><b>Renovate Bot</b></sub></a><br /><a href="#maintenance-renovatebot" title="Maintenance">🚧</a> <a href="#security-renovatebot" title="Security">🛡️</a> <a href="#tool-renovatebot" title="Tools">🔧</a></td>
    <td align="center"><a href="https://snyk.io/"><img src="https://avatars.githubusercontent.com/u/19733683?v=4?s=60" width="60px;" alt=""/><br /><sub><b>Snyk bot</b></sub></a><br /><a href="#maintenance-snyk-bot" title="Maintenance">🚧</a> <a href="#security-snyk-bot" title="Security">🛡️</a> <a href="#tool-snyk-bot" title="Tools">🔧</a></td>
    <td align="center"><a href="https://github.com/Codesee-io"><img src="https://avatars.githubusercontent.com/u/59343751?v=4?s=60" width="60px;" alt=""/><br /><sub><b>CodeSee</b></sub></a><br /><a href="https://github.com/terminal-nerds/@terminal-nerds/configs/pulls?q=is%3Apr+reviewed-by%3ACodesee-io" title="Reviewed Pull Requests">👀</a> <a href="#tool-Codesee-io" title="Tools">🔧</a></td>
  </tr>
</table>
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

### Contributing

[![SonarCloud badge]][sonarcloud report]
[![coverage badge]][coverage report]
[![CodeClimate issues badge]][codeclimate report]

🤝 This project follows the [all-contributors] specification.\
**Therefore, contributions of any kind are welcome!**

Please refer to our [CONTRIBUTING] file for more information about getting involved.

[all-contributors]: https://github.com/all-contributors/all-contributors
[contributing]: ./.github/CONTRIBUTING.md
[sonarcloud badge]: https://img.shields.io/sonar/quality_gate/terminal-nerds_snippets/main?logo=sonarcloud&server=https%3A%2F%2Fsonarcloud.io&style=for-the-badge
[sonarcloud report]: https://sonarcloud.io/summary/overall?id=terminal-nerds_snippets
[coverage badge]: https://img.shields.io/coverallsCoverage/github/terminal-nerds/snippets?branch=main&style=for-the-badge
[coverage report]: https://coveralls.io/github/terminal-nerds/snippets
[codeclimate issues badge]: https://img.shields.io/codeclimate/issues/terminal-nerds/snippets?logo=codeclimate&style=for-the-badge
[codeclimate report]: https://codeclimate.com/github/terminal-nerds/snippets

### Author

🎉 The idea of this project repository was initiated by [xeho91]. However, it's the contributors who matter the most.

[xeho91]: https://github.com/xeho91
