# @terminal-nerds/snippets

![package version badge]
[![size badge]][size url]
[![dependencies badge]][dependencies url]
![types badge]

➡️ **This package wraps all available snippets packages in one** — part of the [terminal-nerds/snippets] project.

[terminal-nerds/snippets]: https://github.com/terminal-nerds/snippets
[package version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets/latest?style=for-the-badge&logo=npm
[dependencies badge]: https://img.shields.io/librariesio/release/npm/@terminal-nerds/snippets?style=for-the-badge
[dependencies url]: https://libraries.io/npm/@terminal-nerds%2snippets
[size badge]: https://img.shields.io/bundlephobia/minzip/@terminal-nerds/snippets?style=for-the-badge&label=size
[size url]: https://packagephobia.com/result?p=@terminal-nerds/snippets
[types badge]: https://img.shields.io/npm/types/@terminal-nerds/snippets?style=for-the-badge&logo=typescript

## Packages included

| Name                      | Version                                    |
| ------------------------- | ------------------------------------------ |
| [![string badge]][string] | [![string version badge]][string npm page] |

<!-- prettier-ignore-start -->
<!-- PACKAGES LINKS -->
[string]: https://github.com/terminal-nerds/snippets/blob/main/packages/string/README.md
[string badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=snippets-string&style=flat-square&color=informational
[string version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-string/latest?style=flat-square&logo=npm
[string npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets-string
<!-- prettier-ignore-end -->

---

## Prerequisites

> **Note:** > **The packages are written in ES Module _(ESM)_ type.**\
> If you with to use in project with CommonJS _(CJS)_ type, then, you need to bundle this package.

### Required

[![node.js version support badge]][node.js]

1. Latest ![node.js icon] [Node.js] LTS _(Long-Term Support)_ version.

[node.js]: https://nodejs.org/en/
[node.js icon]: https://api.iconify.design/logos/nodejs-icon.svg
[node.js version support badge]: https://img.shields.io/node/v-lts/@terminal-nerds/snippets?style=for-the-badge&logo=nodedotjs

### Optional

[![supported typescript version badge]][typescript]

[typescript]: https://typescriptlang.org/
[typescript icon]: https://api.iconify.design/logos/typescript-icon.svg
[supported typescript version badge]: https://img.shields.io/github/package-json/dependency-version/terminal-nerds/snippets/peer/typescript?filename=packages%2Ftypescript%2Fpackage.json&logo=typescript&style=for-the-badge

1. If you are using ![typescript icon] [TypeScript], then the latest version which supports new features _(such as `satisfies`)_
   is recommended.

---

## Usage

1. **Install it with the ![node.js icon] [Node.js] package manager of your choice** _(in our case, we use ![pnpm icon] [pnpm])_.

    ```sh
     pnpm install --save-dev eslint @terminal-nerds/snippets
    ```

1. **Import snippet(s) from this package _(module)_ and use it.**

    ```ts
    import { isString } from "@terminal-nerds/snippets";

    console.log(isString("terminal-nerds")); // true
    ```

[pnpm]: https://pnpm.io/
[pnpm icon]: https://api.iconify.design/vscode-icons/file-type-light-pnpm.svg

---

## Security

[![workflow security badge]][security policy]

🔐 For more information, please refer to the [Security section] at the root of the [terminal-nerds/snippets] monorepo.

[workflow security badge]: https://img.shields.io/github/actions/workflow/status/terminal-nerds/snippets/maintenance.yml?label=Security&logo=github&style=for-the-badge&branch=main
[security section]: https://github.com/terminal-nerds/snippets#security
[security policy]: https://github.com/terminal-nerds/snippets/security/policy

---

## Contributing

[![contributors badge]][contributors url]

🤝 **Contributions of any kind are welcome!**

Please refer to the monorepo _([terminal-nerds/snippets])_ project's [CONTRIBUTING file] for more information if you wish
to get involved.

[contributing file]: https://github.com/terminal-nerds/snippets/blob/main/.github/CONTRIBUTING.md
[contributors badge]: https://img.shields.io/github/contributors/terminal-nerds/snippets?style=for-the-badge
[contributors url]: https://github.com/terminal-nerds/snippets#contributors

---

## License

[![license badge]][license]

⚖️ For more information, please refer to the [License section] at the root of the [terminal-nerds/snippets] monorepo.

[license badge]: https://img.shields.io/github/license/terminal-nerds/snippets?style=for-the-badge
[license]: https://github.com/terminal-nerds/snippets/blob/main/LICENSE.md
[license section]: https://github.com/terminal-nerds/snippets#License
