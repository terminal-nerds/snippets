# @terminal-nerds/snippets-environment<!-- markdownlint-disable line-length list-marker-space no-duplicate-header ul-style ul-indent no-bare-urls -->

## 0.6.2

### Patch Changes

-   [#93](https://github.com/terminal-nerds/snippets/pull/93) [`d86ad4a`](https://github.com/terminal-nerds/snippets/commit/d86ad4abf89db7ed01dfce729594d07b74d189a7) Thanks [@xeho91](https://github.com/xeho91)! - ♻️ Remove more occurences of `RuntimeError` to fix CJS issues

## 0.6.1

### Patch Changes

-   [#91](https://github.com/terminal-nerds/snippets/pull/91) [`05015d5`](https://github.com/terminal-nerds/snippets/commit/05015d567ddfc7beff51b9c09aac59c06f3380b9) Thanks [@xeho91](https://github.com/xeho91)! - 🐛 Removed `RuntimeError` usage due to CJS issues with `modern-erro`

## 0.6.0

### Minor Changes

-   [#90](https://github.com/terminal-nerds/snippets/pull/90) [`b2341ed`](https://github.com/terminal-nerds/snippets/commit/b2341ed3378773a64fe9df1283e4a3225da0b90e) Thanks [@xeho91](https://github.com/xeho91)! - Use native `Error` instead of custom `RuntimeError`

### Patch Changes

-   [#81](https://github.com/terminal-nerds/snippets/pull/81) [`3d519ff`](https://github.com/terminal-nerds/snippets/commit/3d519ffcc696e8c102fcb8856c9067ad6e51c35d) Thanks [@renovate](https://github.com/apps/renovate)! - ⬆️ Update package(s) dependencies

-   Updated dependencies [[`3d519ff`](https://github.com/terminal-nerds/snippets/commit/3d519ffcc696e8c102fcb8856c9067ad6e51c35d)]:
    -   @terminal-nerds/snippets-error@0.4.1

## 0.5.0

### Minor Changes

-   [#52](https://github.com/terminal-nerds/snippets/pull/52) [`2630f51`](https://github.com/terminal-nerds/snippets/commit/2630f5138db3f2f1bc0b766cd94c1c415bba2656) Thanks [@renovate](https://github.com/apps/renovate)! - ⬆️ Update package(s) dependencies:

    -   `modern-errors` to `v5.5.4`
    -   `type-fest` to `v3.7.2`
    -   `typescript` to `v5.0.3`

-   [#77](https://github.com/terminal-nerds/snippets/pull/77) [`ebabfc7`](https://github.com/terminal-nerds/snippets/commit/ebabfc72f7831ea12055d0214e47c4be8aa051fd) Thanks [@xeho91](https://github.com/xeho91)! - ✨ Split snippets related to package and dependencies into a separate package - `package`

-   [#79](https://github.com/terminal-nerds/snippets/pull/79) [`c07740f`](https://github.com/terminal-nerds/snippets/commit/c07740fb2f91e869d75c01b23724a3dad634a0c5) Thanks [@xeho91](https://github.com/xeho91)! - ✨ Improve typing for `getEnvironmentVariable()` and `parseEnvironmentVariableValue()`

### Patch Changes

-   Updated dependencies [[`2630f51`](https://github.com/terminal-nerds/snippets/commit/2630f5138db3f2f1bc0b766cd94c1c415bba2656)]:
    -   @terminal-nerds/snippets-error@0.4.0

## 0.4.0

### Minor Changes

-   [#69](https://github.com/terminal-nerds/snippets/pull/69) [`7591f40`](https://github.com/terminal-nerds/snippets/commit/7591f402ea0d6287ccc30c93aab16e725ebd252d) Thanks [@xeho91](https://github.com/xeho91)! - 🐛 Resolve issue with duplicated re-export - `RuntimeError`

### Patch Changes

-   Updated dependencies [[`7591f40`](https://github.com/terminal-nerds/snippets/commit/7591f402ea0d6287ccc30c93aab16e725ebd252d)]:
    -   @terminal-nerds/snippets-error@0.3.0

## 0.3.0

### Minor Changes

-   [#55](https://github.com/terminal-nerds/snippets/pull/55) [`2a474e0`](https://github.com/terminal-nerds/snippets/commit/2a474e0f693bcc245108ccba1ad1606a747c3591) Thanks [@xeho91](https://github.com/xeho91)! - 🔥 Remove `inContinuousIntegration()` and `inTest()` in favour of `isIn(scopeName)`

-   [#55](https://github.com/terminal-nerds/snippets/pull/55) [`2a474e0`](https://github.com/terminal-nerds/snippets/commit/2a474e0f693bcc245108ccba1ad1606a747c3591) Thanks [@xeho91](https://github.com/xeho91)! - ✨ Add `isIn()`

-   [#55](https://github.com/terminal-nerds/snippets/pull/55) [`2a474e0`](https://github.com/terminal-nerds/snippets/commit/2a474e0f693bcc245108ccba1ad1606a747c3591) Thanks [@xeho91](https://github.com/xeho91)! - ✨ Improve return type for the snippet `getEnvironmentVariable()`

## 0.2.0

### Minor Changes

-   [#53](https://github.com/terminal-nerds/snippets/pull/53) [`7ba7377`](https://github.com/terminal-nerds/snippets/commit/7ba73779bb732b0f1bfe7a9d1c702514fb99a193) Thanks [@xeho91](https://github.com/xeho91)! - ⬆️ Upgrade `typescript` to `v5`

### Patch Changes

-   Updated dependencies [[`7ba7377`](https://github.com/terminal-nerds/snippets/commit/7ba73779bb732b0f1bfe7a9d1c702514fb99a193)]:
    -   @terminal-nerds/snippets-error@0.2.0

## 0.1.0

### Minor Changes

-   [#29](https://github.com/terminal-nerds/snippets/pull/29) [`82e822d`](https://github.com/terminal-nerds/snippets/commit/82e822d32580c8f31a51416b05cca0f6a4222c20) Thanks [@xeho91](https://github.com/xeho91)! - ✨ Added a module `scope` for grouped snippets.

-   [#34](https://github.com/terminal-nerds/snippets/pull/34) [`40625dc`](https://github.com/terminal-nerds/snippets/commit/40625dcc60a3d3484e1b9bed3b840f215e3c4803) Thanks [@xeho91](https://github.com/xeho91)! - ✨ Added a module `module` for snippets related to module, dependencies and packages.

-   [#29](https://github.com/terminal-nerds/snippets/pull/29) [`82e822d`](https://github.com/terminal-nerds/snippets/commit/82e822d32580c8f31a51416b05cca0f6a4222c20) Thanks [@xeho91](https://github.com/xeho91)! - ✨ Added a module `environment` for grouped snippets.

-   [#35](https://github.com/terminal-nerds/snippets/pull/35) [`1837e4f`](https://github.com/terminal-nerds/snippets/commit/1837e4f5ee3883b2187c5b81f6cf8ceb2ed7619a) Thanks [@xeho91](https://github.com/xeho91)! - ✨ Added a module `error` which re-exports snippets related to `RuntimeError`;

-   [#29](https://github.com/terminal-nerds/snippets/pull/29) [`82e822d`](https://github.com/terminal-nerds/snippets/commit/82e822d32580c8f31a51416b05cca0f6a4222c20) Thanks [@xeho91](https://github.com/xeho91)! - ✨ Added a module `variable` for grouped snippets.

### Patch Changes

-   Updated dependencies [[`9afe9b9`](https://github.com/terminal-nerds/snippets/commit/9afe9b904c74d6ad572fd5cff9ac69f6610c36cf), [`f937f27`](https://github.com/terminal-nerds/snippets/commit/f937f27a25efd5ca3ce38a83710465f3486b6adb)]:
    -   @terminal-nerds/snippets-error@0.1.0
