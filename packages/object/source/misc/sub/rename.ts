import { z } from "zod";

import { type ObjectKey, SCHEMA_OBJECT_KEY, validateObjectKey } from "../../schema/sub/key.ts";
import { validateObject } from "../../schema/sub/native.ts";

/* prettier-ignore */
const SCHEMA_RENAMER = z.function()
	.args(SCHEMA_OBJECT_KEY, z.number().optional())
	.returns(SCHEMA_OBJECT_KEY);

export function renameObjectKeys<OldKey extends ObjectKey, Value, NewKey extends ObjectKey>(
	object: Record<OldKey, Value>,
	renamer: (key: OldKey, index: number) => NewKey,
): Record<NewKey, Value> {
	validateObject(object);
	SCHEMA_RENAMER.parse(renamer);

	const handleRename = (key: OldKey, index: number) => {
		const renamedKey = renamer(key, index);

		validateObjectKey(renamedKey);

		return renamedKey;
	};

	return Object.fromEntries(
		(Object.entries(object) as Array<[OldKey, Value]>).map(([key, value], index) => [
			handleRename(key, index),
			value,
		]),
	) as Record<NewKey, Value>;
}
