# @terminal-nerds/snippets

![package version badge]
[![size badge]][size url]
[![dependencies badge]][dependencies url]

➡️ **This package wraps all available snippets packages in one** — part of the [terminal-nerds/snippets] project.

[terminal-nerds/snippets]: https://github.com/terminal-nerds/snippets
[package version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets/latest?style=for-the-badge&logo=npm
[dependencies badge]: https://img.shields.io/librariesio/release/npm/@terminal-nerds/snippets?style=for-the-badge
[dependencies url]: https://libraries.io/npm/@terminal-nerds%2snippets
[size badge]: https://img.shields.io/bundlephobia/minzip/@terminal-nerds/snippets?style=for-the-badge&label=size
[size url]: https://packagephobia.com/result?p=@terminal-nerds/snippets

## Packages included

[![documentation badge]][documentation url]

[documentation badge]: https://img.shields.io/static/v1?color=informational&style=for-the-badge&label=documentation&message=jsdocs.io
[documentation url]: https://jsdocs.io/package/@terminal-nerds/snippets

| Name                            | Version                                          |
| ------------------------------- | ------------------------------------------------ |
| [![extension badge]][extension] | [![extension version badge]][extension npm page] |
| [![error badge]][error]         | [![error version badge]][error npm page]         |
| [![function badge]][function]   | [![function version badge]][function npm page]   |
| [![regexp badge]][regexp]       | [![regexp version badge]][regexp npm page]       |
| [![runtime badge]][runtime]     | [![runtime version badge]][runtime npm page]     |
| [![string badge]][string]       | [![string version badge]][string npm page]       |
| [![test badge]][test]           | [![test version badge]][test npm page]           |

<!-- prettier-ignore-start -->
<!-- PACKAGES LINKS -->
[config]: https://github.com/terminal-nerds/snippets/blob/main/packages/config/README.md
[config badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=snippets-config&style=flat-square&color=informational
[config version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-config/latest?style=flat-square&logo=npm
[config npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets-config

[extension]: https://github.com/terminal-nerds/snippets/blob/main/packages/extension/README.md
[extension badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=snippets-extension&style=flat-square&color=informational
[extension version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-extension/latest?style=flat-square&logo=npm
[extension npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets-extension

[error]: https://github.com/terminal-nerds/snippets/blob/main/packages/error/README.md
[error badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=snippets-error&style=flat-square&color=informational
[error version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-error/latest?style=flat-square&logo=npm
[error npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets-error

[function]: https://github.com/terminal-nerds/snippets/blob/main/packages/function/README.md
[function badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=snippets-function&style=flat-square&color=informational
[function version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-function/latest?style=flat-square&logo=npm
[function npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets-function

[regexp]: https://github.com/terminal-nerds/snippets/blob/main/packages/regexp/README.md
[regexp badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=snippets-regexp&style=flat-square&color=informational
[regexp version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-regexp/latest?style=flat-square&logo=npm
[regexp npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets-regexp

[runtime]: https://github.com/terminal-nerds/snippets/blob/main/packages/runtime/README.md
[runtime badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=snippets-runtime&style=flat-square&color=informational
[runtime version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-runtime/latest?style=flat-square&logo=npm
[runtime npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets-runtime

[string]: https://github.com/terminal-nerds/snippets/blob/main/packages/string/README.md
[string badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=snippets-string&style=flat-square&color=informational
[string version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-string/latest?style=flat-square&logo=npm
[string npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets-string

[test]: https://github.com/terminal-nerds/snippets/blob/main/packages/test/README.md
[test badge]: https://img.shields.io/static/v1?label=%40terminal-nerds&message=snippets-test&style=flat-square&color=informational
[test version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-test/latest?style=flat-square&logo=npm
[test npm page]: https://www.npmjs.com/package/@terminal-nerds/snippets-test
<!-- prettier-ignore-end -->

---

## Prerequisites & usage

### Optional

[![supported typescript version badge]][typescript]
![types badge]

[typescript]: https://typescriptlang.org/
[typescript icon]: https://api.iconify.design/logos/typescript-icon.svg
[supported typescript version badge]: https://img.shields.io/github/package-json/dependency-version/terminal-nerds/snippets/peer/typescript?filename=packages%2Ftypescript%2Fpackage.json&logo=typescript&style=for-the-badge&label=typescript
[types badge]: https://img.shields.io/npm/types/@terminal-nerds/snippets-function?style=for-the-badge&logo=typescript

If you are using ![typescript icon] [TypeScript],
the latest version, which supports new features _(such as `satisfies`)_, is supported.

### Runtime environments

This package can be used in several runtime environments.
We aim for cross-runtime compatibility and ensure proper error messages
if a particular snippet cannot be run in the currently running environment.

#### Browsers

We use [browserslist] to define the minimum browsers versions supported.\
Take a look at our [shared browserslist configuration] for more details.

[browserslist]: https://github.com/browserslist/browserslist
[shared browserslist configuration]: https://github.com/terminal-nerds/configs/blob/main/packages/browserslist/source/browsers.ts

**Usage**:

```html
<script type="module">
	import { snippet } from "https://cdn.jsdelivr.net/npm/@terminal-nerds/snippets";
</script>
```

---

#### Bun

We aim to support the latest version of ![bun icon] [bun].

**Usage**:

Firstly, install it:

```sh
bun add @terminal-nerds/snippets
```

And then in a particular file:

```js
import { snippet } from "@terminal-nerds/snippets";
```

[bun]: https://bun.sh/
[bun icon]: https://api.iconify.design/logos/bun.svg

---

#### Deno

We aim to support the latest version of ![deno icon] [Deno].

**Usage**:

```ts
import { snippet } from "npm:@terminal-nerds/snippets";
```

[deno]: https://deno.land/
[deno icon]: https://api.iconify.design/logos/deno.svg

---

#### Node.js

[![node.js version support badge]][node.js]

The latest ![node.js icon] [Node.js] LTS _(Long-Term Support)_ version is the minimum one supported.

> **Warning**\
> **This package is written in [ES Module] _(ESM)_ type.**\
> So, if you wish to use it in a project with CommonJS (CJS) type, you need to bundle this package or a particular module(s).

**Usage**:

Install it first with the Node.js package manager of your choice. In our example, we use [pnpm].

```sh
pnpm add @terminal-nerds/snippets
```

And then in a particular file:

```js
import { snippet } from "@terminal-nerds/snippets";
```

[ES Module]: https://www.freecodecamp.org/news/javascript-es-modules-and-module-bundlers
[pnpm]: https://pnpm.io
[node.js]: https://nodejs.org/en/
[node.js icon]: https://api.iconify.design/logos/nodejs-icon.svg
[node.js version support badge]: https://img.shields.io/node/v-lts/@terminal-nerds/snippets?style=for-the-badge&logo=nodedotjs

---

## Security

[![workflow security badge]][security policy]

🔐 For more information, please refer to the [Security section] at the root of
the [terminal-nerds/snippets] monorepo.

[workflow security badge]: https://img.shields.io/github/actions/workflow/status/terminal-nerds/snippets/maintenance.yml?label=Security&logo=github&style=for-the-badge&branch=main
[security section]: https://github.com/terminal-nerds/snippets#security
[security policy]: https://github.com/terminal-nerds/snippets/security/policy

---

## License

[![license badge]][license]

⚖️ For more information, please refer to the [License section] at the root of the [terminal-nerds/snippets] monorepo.

[license]: https://github.com/terminal-nerds/snippets/blob/main/LICENSE.md
[license badge]: https://img.shields.io/github/license/terminal-nerds/snippets?style=for-the-badge
[license section]: https://github.com/terminal-nerds/snippets#License

### Contributing

[![contributors badge]][contributors url]

🤝 **Contributions of any kind are welcome!**

Please refer to the monorepo _([terminal-nerds/snippets])_ project's [CONTRIBUTING file] for more information
if you wish to get involved.

[contributing file]: https://github.com/terminal-nerds/snippets/blob/main/.github/CONTRIBUTING.md
[contributors badge]: https://img.shields.io/github/contributors/terminal-nerds/snippets?style=for-the-badge
[contributors url]: https://github.com/terminal-nerds/snippets#contributors

### Author

🎉 The idea of this project was initiated by [xeho91]. However, it's the [contributors] who matter the most.

[contributors]: https://github.com/terminal-nerds/snippets/blob/main/README.md#project-contributors
[xeho91]: https://github.com/xeho91
