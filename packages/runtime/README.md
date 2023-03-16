# @terminal-nerds/snippets-runtime

➡️ **This package wraps all available modules with snippets related to JavasScript runtimes**
— part of the [terminal-nerds/snippets] project.

[terminal-nerds/snippets]: https://github.com/terminal-nerds/snippets
[package version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-runtime/latest?style=for-the-badge&logo=npm
[dependencies badge]: https://img.shields.io/librariesio/release/npm/@terminal-nerds/snippets-runtime?style=for-the-badge
[dependencies url]: https://libraries.io/npm/@terminal-nerds%2snippets-runtime
[size badge]: https://img.shields.io/bundlephobia/minzip/@terminal-nerds/snippets-runtime?style=for-the-badge&label=size
[size url]: https://packagephobia.com/result?p=@terminal-nerds/snippets-runtime

## Modules included

[![documentation badge]][documentation url]

[documentation badge]: https://img.shields.io/static/v1?color=informational&style=for-the-badge&label=documentation&message=jsdocs.io
[documentation url]: https://jsdocs.io/package/@terminal-nerds/snippets-runtime

| Name                                             | Size                                                            |
| ------------------------------------------------ | --------------------------------------------------------------- |
| [`@terminal-nerds/snippets-runtime/environment`] | ![environment size gzip badge] ![environment size brotli badge] |
| [`@terminal-nerds/snippets-runtime/module`]      | ![module size gzip badge] ![module size brotli badge]           |
| [`@terminal-nerds/snippets-runtime/scope`]       | ![scope size gzip badge] ![scope size brotli badge]             |
| [`@terminal-nerds/snippets-runtime/variable`]    | ![variable size gzip badge] ![variable size brotli badge]       |

<!-- prettier-ignore-start -->
<!-- MODULES LINKS -->
[`@terminal-nerds/snippets-runtime/environment`]: https://github.com/terminal-nerds/snippets/blob/main/packages/runtime/source/environment/environment.ts
[environment size gzip badge]: https://badgen.net/badgesize/gzip/file-url/unpkg.com/@terminal-nerds/snippets-runtime/dist/environment/environment.js?label=gzip
[environment size brotli badge]: https://badgen.net/badgesize/brotli/file-url/unpkg.com/@terminal-nerds/snippets-runtime/dist/environment/environment.js?label=brotli

[`@terminal-nerds/snippets-runtime/module`]: https://github.com/terminal-nerds/snippets/blob/main/packages/runtime/source/module/module.ts
[module size gzip badge]: https://badgen.net/badgesize/gzip/file-url/unpkg.com/@terminal-nerds/snippets-runtime/dist/module/module.js?label=gzip
[module size brotli badge]: https://badgen.net/badgesize/brotli/file-url/unpkg.com/@terminal-nerds/snippets-runtime/dist/module/module.js?label=brotli

[`@terminal-nerds/snippets-runtime/scope`]: https://github.com/terminal-nerds/snippets/blob/main/packages/runtime/source/scope/scope.ts
[scope size gzip badge]: https://badgen.net/badgesize/gzip/file-url/unpkg.com/@terminal-nerds/snippets-runtime/dist/scope/scope.js?label=gzip
[scope size brotli badge]: https://badgen.net/badgesize/brotli/file-url/unpkg.com/@terminal-nerds/snippets-runtime/dist/scope/scope.js?label=brotli

[`@terminal-nerds/snippets-runtime/variable`]: https://github.com/terminal-nerds/snippets/blob/main/packages/runtime/source/variable/variable.ts
[variable size gzip badge]: https://badgen.net/badgesize/gzip/file-url/unpkg.com/@terminal-nerds/snippets-runtime/dist/variable/variable.js?label=gzip
[variable size brotli badge]: https://badgen.net/badgesize/brotli/file-url/unpkg.com/@terminal-nerds/snippets-runtime/dist/variable/variable.js?label=brotli
<!-- prettier-ignore-end -->

---

## Prerequisites & usage

### Optional

[![supported typescript version badge]][typescript]
![types badge]

[typescript]: https://typescriptlang.org/
[typescript icon]: https://api.iconify.design/logos/typescript-icon.svg
[supported typescript version badge]: https://img.shields.io/github/package-json/dependency-version/terminal-nerds/snippets/peer/typescript?filename=packages%2Ftypescript%2Fpackage.json&logo=typescript&style=for-the-badge&label=typescript
[types badge]: https://img.shields.io/npm/types/@terminal-nerds/snippets-test?style=for-the-badge&logo=typescript

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
	import { snippet } from "https://cdn.jsdelivr.net/npm/@terminal-nerds/snippets-test";
</script>
```

---

#### Bun

We aim to support the latest version of ![bun icon] [bun].

**Usage**:

Firstly, install it:

```sh
bun add @terminal-nerds/snippets-test
```

And then in a particular file:

```js
import { snippet } from "@terminal-nerds/snippets-test";
```

[bun]: https://bun.sh/
[bun icon]: https://api.iconify.design/logos/bun.svg

---

#### Deno

We aim to support the latest version of ![deno icon] [Deno].

**Usage**:

```ts
import { snippet } from "npm:@terminal-nerds/snippets-test";
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
pnpm add @terminal-nerds/snippets-test
```

And then in a particular file:

```js
import { snippet } from "@terminal-nerds/snippets-test";
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
