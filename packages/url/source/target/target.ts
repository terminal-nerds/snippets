import { z } from "zod";

import { URL_SCHEMA } from "../schema/schema.ts";

export type InternalURL = `/${string}`;
export type ExternalURL = URL;

// eslint-disable-next-line unicorn/prefer-export-from
export const EXTERNAL_URL_SCHEMA = URL_SCHEMA;
export const INTERNAL_URL_SCHEMA = z.string().startsWith("/");

export function validateExternalURL(value: unknown): asserts value is ExternalURL {
	EXTERNAL_URL_SCHEMA.parse(value);
}

export function validateInternalURL(value: unknown): asserts value is InternalURL {
	INTERNAL_URL_SCHEMA.parse(value);
}

export function isExternalURL(value: unknown): value is ExternalURL {
	return EXTERNAL_URL_SCHEMA.safeParse(value).success;
}

export function isInternalURL(value: unknown): value is InternalURL {
	return INTERNAL_URL_SCHEMA.safeParse(value).success;
}
