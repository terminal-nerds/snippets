# @terminal-nerds/snippets-type

![package version badge]
[![size badge]][size url]
[![dependencies badge]][dependencies url]

➡️ **This package wraps all available modules with snippets related to type**
— part of the [terminal-nerds/snippets] project.

[terminal-nerds/snippets]: https://github.com/terminal-nerds/snippets
[package version badge]: https://img.shields.io/npm/v/@terminal-nerds/snippets-type/latest?style=for-the-badge&logo=npm
[dependencies badge]: https://img.shields.io/librariesio/release/npm/@terminal-nerds/snippets-type?style=for-the-badge
[dependencies url]: https://libraries.io/npm/@terminal-nerds%2snippets-type
[size badge]: https://img.shields.io/bundlephobia/minzip/@terminal-nerds/snippets-type?style=for-the-badge&label=size
[size url]: https://packagephobia.com/result?p=@terminal-nerds/snippets-type

## Modules included

[![documentation badge]][documentation url]

[documentation badge]: https://img.shields.io/static/v1?color=informational&style=for-the-badge&label=documentation&message=jsdocs.io
[documentation url]: https://jsdocs.io/package/@terminal-nerds/snippets-type

<!-- prettier-sort-markdown-table -->

| Name                                            | Size                                                                |
| ----------------------------------------------- | ------------------------------------------------------------------- |
| [`@terminal-nerds/snippets-type/built-in`]      | ![built-in size gzip badge] ![built-in size brotli badge]           |
| [`@terminal-nerds/snippets-type/constructor`]   | ![constructor size gzip badge] ![constructor size brotli badge]     |
| [`@terminal-nerds/snippets-type/non-primitive`] | ![non-primitive size gzip badge] ![non-primitive size brotli badge] |
| [`@terminal-nerds/snippets-type/primitive`]     | ![primitive size gzip badge] ![primitive size brotli badge]         |

<!-- prettier-ignore-start -->
<!-- MODULES LINKS -->
[`@terminal-nerds/snippets-type/constructor`]: https://github.com/terminal-nerds/snippets/blob/main/packages/type/source/constructor/constructor.ts
[constructor size gzip badge]: https://badgen.net/badgesize/gzip/file-url/unpkg.com/@terminal-nerds/snippets-type/dist/constructor/constructor.js?label=gzip
[constructor size brotli badge]: https://badgen.net/badgesize/brotli/file-url/unpkg.com/@terminal-nerds/snippets-type/dist/constructor/constructor.js?label=brotli

[`@terminal-nerds/snippets-type/built-in`]: https://github.com/terminal-nerds/snippets/blob/main/packages/type/source/built-in/built-in.ts
[built-in size gzip badge]: https://badgen.net/badgesize/gzip/file-url/unpkg.com/@terminal-nerds/snippets-type/dist/built-in/built-in.js?label=gzip
[built-in size brotli badge]: https://badgen.net/badgesize/brotli/file-url/unpkg.com/@terminal-nerds/snippets-type/dist/built-in/built-in.js?label=brotli

[`@terminal-nerds/snippets-type/non-primitive`]: https://github.com/terminal-nerds/snippets/blob/main/packages/type/source/non-primitive/non-primitive.ts
[non-primitive size gzip badge]: https://badgen.net/badgesize/gzip/file-url/unpkg.com/@terminal-nerds/snippets-type/dist/non-primitive/non-primitive.js?label=gzip
[non-primitive size brotli badge]: https://badgen.net/badgesize/brotli/file-url/unpkg.com/@terminal-nerds/snippets-type/dist/non-primitive/non-primitive.js?label=brotli

[`@terminal-nerds/snippets-type/primitive`]: https://github.com/terminal-nerds/snippets/blob/main/packages/type/source/primitive/primitive.ts
[primitive size gzip badge]: https://badgen.net/badgesize/gzip/file-url/unpkg.com/@terminal-nerds/snippets-type/dist/primitive/primitive.js?label=gzip
[primitive size brotli badge]: https://badgen.net/badgesize/brotli/file-url/unpkg.com/@terminal-nerds/snippets-type/dist/primitive/primitive.js?label=brotli

<!-- prettier-ignore-end -->

---

## Prerequisites & usage

### Optional

[![supported typescript version badge]][typescript]
![types badge]

[typescript]: https://typescriptlang.org/
[typescript icon]: https://api.iconify.design/logos/typescript-icon.svg
[supported typescript version badge]: https://img.shields.io/github/package-json/dependency-version/terminal-nerds/snippets/peer/typescript?filename=packages%2Ftypescript%2Fpackage.json&logo=typescript&style=for-the-badge&label=typescript
[types badge]: https://img.shields.io/npm/types/@terminal-nerds/snippets-type?style=for-the-badge&logo=typescript

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
	import { snippet } from "https://cdn.jsdelivr.net/npm/@terminal-nerds/snippets-type";
</script>
```

---

#### Bun

We aim to support the latest version of ![bun icon] [bun].

**Usage**:

Firstly, install it:

```sh
bun add @terminal-nerds/snippets-type
```

And then in a particular file:

```js
import { snippet } from "@terminal-nerds/snippets-type";
```

[bun]: https://bun.sh/
[bun icon]: https://api.iconify.design/logos/bun.svg

---

#### Deno

We aim to support the latest version of ![deno icon] [Deno].

**Usage**:

```ts
import { snippet } from "npm:@terminal-nerds/snippets-type";
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
pnpm add @terminal-nerds/snippets-type
```

And then in a particular file:

```js
import { snippet } from "@terminal-nerds/snippets-type";
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
