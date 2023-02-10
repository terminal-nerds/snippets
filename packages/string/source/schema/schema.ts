import { z } from "zod";

export const STRING_SCHEMA = z.string();

export type EmptyString = "";
export const EMPTY_STRING_SCHEMA = STRING_SCHEMA.length(0, "This is supposed to be an empty string.");
