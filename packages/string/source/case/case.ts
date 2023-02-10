import type { CamelCase, KebabCase, PascalCase, ScreamingSnakeCase, SnakeCase } from "type-fest";

/** @see {@link https://github.com/mesqueeb/case-anything} */
// eslint-disable-next-line import/export
export * from "case-anything";

/** @see {@link https://github.com/mesqueeb/case-anything} */
// eslint-disable-next-line import/export
export declare function camelCase<T extends string>(value: T): CamelCase<T>;

/** @see {@link https://github.com/mesqueeb/case-anything} */
// eslint-disable-next-line import/export
export declare function constantCase<T extends string>(value: T): ScreamingSnakeCase<T>;

/** @see {@link https://github.com/mesqueeb/case-anything} */
// eslint-disable-next-line import/export
export declare function kebabCase<T extends string>(value: T): KebabCase<T>;

/** @see {@link https://github.com/mesqueeb/case-anything} */
// eslint-disable-next-line import/export
export declare function pascalCase<T extends string>(value: T): PascalCase<T>;

/** @see {@link https://github.com/mesqueeb/case-anything} */
// eslint-disable-next-line import/export
export declare function snakeCase<T extends string>(value: T): SnakeCase<T>;
