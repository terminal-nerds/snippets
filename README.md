# Snippets

[![pnpm workspace badge]][pnpm workspace]
[![changesets badge]][changesets]
[![turborepo badge]][turborepo]

➡️ This project is a [monorepo] made with [pnpm workspace] and powered by [changesets], [turborepo].

[monorepo]: https://en.wikipedia.org/wiki/monorepo
[pnpm workspace]: https://pnpm.io/workspaces
[pnpm workspace badge]: https://img.shields.io/badge/-pnpm%20workspace-informational?style=for-the-badge&logo=pnpm
[changesets]: https://github.com/changesets/changesets
[changesets badge]: https://img.shields.io/badge/-changesets-gray?style=for-the-badge&logo=data:image/png;base64>,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAABYUlEQVQoU02RvUoDQRDHZ3b3TiwsjI0xWFjb+gIKoqIIKUSCCjY+ho3voO9gF7wq+AaBVOJXY4JaCH5FMSbeJTf+Z3OeWVhmv37zn/kvCwYR6dTBmA1mXsj2Pmyed+6N4dkgdBJYQ4Eh5gzU+1EYN6xJaDFqi3NGAQ6cHYIOJECD+36mJikWMVJ0cbISvfns+tgFVkJrCUkoWho3PivgC4T5eEAcY9sbEPX6xOvRMxQYChYJGAmwHrO12vLEqgcz2LYTSgCxgl3McvQkoQJQc1CtlwtWu/szY9QHuvuS9Af1dlDqVvWRh4YwXVamtaV85Ip6cvspolCckkCRt88eJIRJXtEYut75h3Pw6kMEpghM4QTxG3G32hLfn/bmezR0szfjmRxsvEvaTQBl5qwV2Zc2ddJM1ckQ7jrnpLlf8ucerL/KIUo7UlMAtjaKPDfaz+Rx8wV/V9D/C1JTaR2UTn8B1OeSRP02JSkAAAAASUVORK5CYII=
[turborepo]: https://github.com/vercel/turborepo
[turborepo badge]: https://img.shields.io/badge/-turborepo-gray?style=for-the-badge&logo=data:image/png;base64>,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAklJREFUOE91kU9oE1EQxuftbpqkmBRJKRYVih6iIEEELcYoBUF6EQ8lPWihtoInNVYQAhZKLRQiikgvRQ968KDtIRUKKpVWq6IHRaonUVs0BitRBJtkk+xmn9+sG9lG/eC382dnZt/OE1TThFS3fNK7LVKOSKKdkoSuSnWYFLNfNa2pynr/tfc94uefescRbMOpXCBoemarJMjUxLhHpacVw/pqyCbFp5Y6qVo+plliK2z/i6GWu/VD7Hjfue8bSUp74L8UG/4S7xjKLsWSH9e63/+voR1FEVAED0GWm+ITssF8+W6aSJ5Np8ILnFP44dI6+PPgObgKboIlMALEZLeorDH0uUA5n6r1uAewPwX2grcgCS4BAwyCM4ACpdaxgF6KJk8/a+PYrQMIcAG0DNz/2eXkv8Fq3JA8OjM92Hevj333CXZwAroPfjg+mzTgXYRAGyeCRuGGt2LYe7EnOuKjslZtGXEj8DjvdLsgvxLS1N/7d59gBu/4FzpBh9PAVecBD3gD7K82mYWuRrPoZd894DXiMaf4ASzfBC9zAJTBCUBzBy82Byt61FeWsxzXi7+YABnAp6mCJ2B3rXB+z8iFR7HR27XYvQPOcdMVh2bYEsjXij/vHw3lCnqrYjXwFa9WJpJolxsG/PV5jiVJJbPt1MnFSGL5w6bjTe4ae5W5cH+gSuotTVjbNUnXNaE8lsLKauRbMcxS3FCp1yRVCq/S27Iw/uqvAbVEcXNPVJHyMDa7iyzLUIRy2RDikCQr7V807gia5J2s0i8UIcDwgEVTwgAAAABJRU5ErkJggg==

## Project goal

🎯 **Collect all of the snippets in one repository, and keep them organized**.
For easier maintainability, testability, etc.
Prevent searching for a certain snippet in projects, reduce the issues during attempt to revive a project with legacy code.

-   typed
-   testable
-   tree-shakeable (bundlers can easily do code-splitting)
-   written with ES Module (_ESM_) type - we adhere to the future of JavaScript (_follow EcmaScript)_

---

## Packages

![workflow CI-CD badge]
[![CodeClimate issues badge]][codeclimate report]\
![node.js version support badge]
[![Dependencies badge]][dependencies url]

[workflow ci-cd badge]: https://img.shields.io/github/actions/workflow/status/terminal-nerds/snippets/ci-cd.yml?label=CI%20%26%20CD&logo=github&style=for-the-badge&branch=main
[codeclimate issues badge]: https://img.shields.io/codeclimate/issues/terminal-nerds/snippets?logo=codeclimate&style=for-the-badge
[codeclimate report]: https://codeclimate.com/github/terminal-nerds/snippets
[node.js version support badge]: https://img.shields.io/node/v-lts/@terminal-nerds/snippets?style=for-the-badge&logo=nodedotjs
[dependencies badge]: https://img.shields.io/librariesio/github/terminal-nerds/snippets?style=for-the-badge
[dependencies url]: https://libraries.io/github/terminal-nerds/snippets "Dependencies status"

📦 The following packages are available under the [packages/](./packages) directory.

> **Info:** > **All of them are [scoped] - they are prefixed with `@terminal-nerds/`.**
> They are accessible for public use and downloadable from the [npmjs.com registry].

[scoped]: https://docs.npmjs.com/cli/v6/using-npm/scope
[npmjs.com registry]: https://npmjs.com/org/terminal-nerds

There are two recommended ways to use the snippets:

1. If you are unsure which snippets you are going to need,
   use [`snippets`](snippets) package which contains all of the snippets.
   They're still tree-shakeable.

2. You know which snippets you're going to need, you can download one or few of specific snippets.
   It might help understand what exactly in being used in the project(s),
   reduce the automated Pull Requests related to updating dependencies and so on.

    > **Info**:
    > Package names are prefixed with `snippets-`. As in: `@terminal-nerds/snippets-<package name>`

| Name                          | Version                                        |
| ----------------------------- | ---------------------------------------------- |
| [![snippets badge]][snippets] | [![snippets version badge]][snippets npm page] |
| <!-- PACKAGES -->             | <!-- PACKAGES -->                              |
| [![string badge]][string]     | [![string version badge]][string npm page]     |

[snippets]: ./packages/snippets/README.md
[snippets badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=string&style=flat-square&color=informational
[snippets version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets/latest?style=flat-square&logo=npm
[snippets npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets

<!-- prettier-ignore-start -->
<!-- PACKAGES LINKS -->
[string]: ./packages/string/README.md
[string badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=snippets-string&style=flat-square&color=informational
[string version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-string/latest?style=flat-square&logo=npm
[string npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets-string
<!-- prettier-ignore-end -->

---

## Security

![workflow maintenance badge]
![Snyk vulnerabilities badge]

🔐 Our team has a shared [Security Policy]. If you have concerns or found an
issue, please follow the instructions, and remember about one thing:

> We are all ears, but please, **DO NOT create a GitHub issue for reporting a
> vulnerability**.

[workflow maintenance badge]: https://img.shields.io/github/actions/workflow/status/terminal-nerds/snippets/maintenance.yml?label=Security&logo=github&style=for-the-badge&branch=main
[snyk vulnerabilities badge]: https://img.shields.io/snyk/vulnerabilities/github/terminal-nerds/snippets?logo=snyk&style=for-the-badge
[security policy]: https://github.com/terminal-nerds/snippets/security/policy

---

## Contributing

[![contributors badge]][contributors url]
[![SonarCloud badge]][sonarcloud report]
[![coverage badge]][coverage report]

🤝 This project follows the [all-contributors] specification.\
**Therefore, contributions of any kind are welcome!**

Please refer to our [CONTRIBUTING] file for more information if you wish to get
involved.

[all-contributors]: https://github.com/all-contributors/all-contributors
[contributing]: ./.github/CONTRIBUTING.md
[contributors badge]: https://img.shields.io/github/contributors/terminal-nerds/snippets?style=for-the-badge
[contributors url]: /#contributors
[sonarcloud badge]: https://img.shields.io/sonar/quality_gate/terminal-nerds_snippets/main?logo=sonarcloud&server=https%3A%2F%2Fsonarcloud.io&style=for-the-badge
[sonarcloud report]: https://sonarcloud.io/summary/overall?id=terminal-nerds_snippets
[coverage badge]: https://img.shields.io/coverallsCoverage/github/terminal-nerds/snippets?branch=main&style=for-the-badge
[coverage report]: https://coveralls.io/github/terminal-nerds/snippets

### Project contributors

🥰 Thanks goes to these wonderful people and bots _([emoji key])_:

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
