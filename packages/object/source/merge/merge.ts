import { OBJECT_SCHEMA } from "@terminal-nerds/snippets-type/non-primitive";
import { deepmerge } from "deepmerge-ts";
import { z } from "zod";

export function mergeDeepObjects(objects: ReadonlyArray<object>): object {
	z.array(OBJECT_SCHEMA).parse(objects);

	return deepmerge(...objects) as object;
}
