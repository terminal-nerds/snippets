# @terminal-nerds/snippets-string<!-- markdownlint-disable line-length list-marker-space no-duplicate-header ul-style ul-indent no-bare-urls -->

## 0.1.0

### Minor Changes

-   [#22](https://github.com/terminal-nerds/snippets/pull/22) [`86ac73b`](https://github.com/terminal-nerds/snippets/commit/86ac73b6f38a1aeebbb5e622763201c72cdf6fb3) Thanks [@xeho91](https://github.com/xeho91)! - ✨ Added a module `schema` for grouped snippets. It includes:

    -   `STRING_SCHEMA`
    -   `EMPTY_STRING_SCHEMA`
    -   `type EmptyString`
    -   `isString()`
    -   `isStringEmpty()`
    -   `validateString()`

-   [#22](https://github.com/terminal-nerds/snippets/pull/22) [`86ac73b`](https://github.com/terminal-nerds/snippets/commit/86ac73b6f38a1aeebbb5e622763201c72cdf6fb3) Thanks [@xeho91](https://github.com/xeho91)! - ✨ Added a module `word` for grouped snippets. It includes:

    -   `reverseString()`
    -   `type ReversedString`
    -   `isPalindrome()`
    -   `isNumeric()`

-   [#18](https://github.com/terminal-nerds/snippets/pull/18) [`c4a2d06`](https://github.com/terminal-nerds/snippets/commit/c4a2d064ee291d6ba3a5d92d35c2de5cb8c01420) Thanks [@xeho91](https://github.com/xeho91)! - ✨ Added a module `case` for grouped snippets. It includes string casing transformation functions from [`case-anything`](https://github.com/mesqueeb/case-anything)
    with a better types support from [`type-fest`](https://github.com/sindresorhus/type-fest) for:

    -   `camelCase()`
    -   `constantCase()`
    -   `kebabCase()`
    -   `pascalCase()`
    -   `snakeCase()`

-   [#22](https://github.com/terminal-nerds/snippets/pull/22) [`86ac73b`](https://github.com/terminal-nerds/snippets/commit/86ac73b6f38a1aeebbb5e622763201c72cdf6fb3) Thanks [@xeho91](https://github.com/xeho91)! - ✨ Added a module `char` for grouped snippets. It includes:

    -   `CHAR_TYPES`
    -   `type CharType`
    -   `LOWER_CASED_LATIN_CHARS`
    -   `type LowerCasedLatinChar`
    -   `UPPER_CASED_LATIN_CHARS`
    -   `type LowerCasedLatinChar`
    -   `LATIN_CHARS`
    -   `type LatinChar`
    -   `NUMBER_CHARS`
    -   `type NumberChar`
    -   `SPECIAL_CHARS`
    -   `type SpecialChar`
    -   `SINGLE_CHARS`
    -   `type SingleChar`
    -   `CHARS`
    -   `type Char`
    -   `NON_LATIN_CHARS`
    -   `NON_NUMBER_CHARS`
    -   `NON_SPECIAL_CHARS`
    -   `CHAR_SCHEMA`
    -   `CHAR_TYPE_SCHEMA`
    -   `LATIN_CHAR_SCHEMA`
    -   `NUMBER_CHAR_SCHEMA`
    -   `SPECIAL_CHAR_SCHEMA`
    -   `CHARS_SCHEMAS`
    -   `isSingleChar()`
    -   `validateSingleChar()`
    -   `getJoinedChars()`
    -   `type CharOptions()`
    -   `validateCharType()`
    -   `isValidCharType()`
    -   `getCharType()`
    -   `isChar()`
    -   `hasChars()`
    -   `getChars()`

### Patch Changes

-   Updated dependencies [[`0be5881`](https://github.com/terminal-nerds/snippets/commit/0be5881bb24cc8d6656a35804a4779c0fb8ec130)]:
    -   @terminal-nerds/snippets-regexp@0.1.0
