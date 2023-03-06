declare global {
	interface String {
		on: (situation: string) => string;
		sample: (data: unknown) => string;
		samples: (data: unknown) => string;
		with: (options: Record<string, unknown>) => string;
	}
}

/* eslint-disable func-names */
String.prototype.on = function (situation: string): string {
	return `${this} - on ${situation}`;
};

/* eslint-disable func-names */
String.prototype.sample = function (value: unknown): string {
	/* prettier-ignore */
	switch (typeof value) {
		/* eslint-disable unicorn/switch-case-braces */
		case "bigint": return `${this}: ${value}`;
		case "boolean": return `${this}: ${value}`;
		case "function": return `${this}: ${value.name}()`;
		case "number": return `${this}: ${value}`;
		case "object": {
			const stringified = value ? value.toString() : `null`;
			return `${this}: ${stringified}`;
		}
		case "undefined": return this.toString();
		case "string": return `${this}: "${value}"`;
		case "symbol": return `${this}: ${value.toString()}`;
		/* eslint-disable unicorn/switch-case-braces */
	}
};

/* eslint-disable func-names */
String.prototype.samples = function (data: unknown): string {
	if (Array.isArray(data) || data instanceof Set) {
		return `${this}: ${getStringifiedAndTruncatedArray([...data])}`;
	} else {
		// TODO: Handle more cases
		throw new TypeError("Unhandled sample data type");
	}
};

/* eslint-disable func-names */
String.prototype.with = function (options: Record<string, unknown>): string {
	const stringifiedOptions = JSON.stringify(options, undefined, 1);

	return `${this} - with options: ${stringifiedOptions}`;
};

// TODO: Move it to a spearate package
// export const BUILT_IN_CONSTRUCTORS = [
// 	Array,
// 	// BigInt,
// 	Boolean,
// 	Date,
// 	Error,
// 	Number,
// 	Map,
// 	Object,
// 	RegExp,
// 	Set,
// 	String,
// 	// Symbol,
// ] as const;

// TODO: Move it to a spearate package
function getObjectConstructorName(value: object): ValueTypeName {
	const constructorName = value.constructor.name;

	if (constructorName === "Object") {
		// eslint-disable-next-line unicorn/better-regex
		const match = value.toString().match(/(?<=\[object )(\w+)(?!=\])/);

		if (match && match[0]) {
			return match[0] as ValueTypeName;
		} else {
			throw new Error("RegExp did not work.");
		}
	} else {
		return constructorName as ValueTypeName;
	}
}

// TODO: Move it to a spearate package
export const VALUE_TYPE_EMOJIS = {
	Array: `🇦`,
	BigInt: `🇧`,
	Boolean: {
		false: `🔴`,
		true: `🟢`,
	},
	Date: `🗓️`,
	Error: `📛`,
	ZodError: `📛`,
	Function: `🇫`,
	Map: `🇲`,
	Number: `🇳`,
	Object: `🇴`,
	null: `❎`,
	RegExp: `🔎🇸"`,
	Set: `🦄`,
	Symbol: `💠`,
	String: `🇸`,
	undefined: `🫥`,
} as const;

// TODO: Move it to a spearate package
export function getValueTypeName(value: unknown): ValueTypeName {
	/* prettier-ignore */
	switch (typeof value) {
		/* eslint-disable unicorn/switch-case-braces */
		case "function": return value.name as ValueTypeName;
		case "object": return value ? getObjectConstructorName(value) : ("null" as ValueTypeName);
		case "number": return "Number";
		case "undefined": return "undefined";
		case "bigint":
		case "boolean":
		case "string":
		case "symbol":
			return value.constructor.name as ValueTypeName;
		/* eslint-enable unicorn/switch-case-braces */
	}
}

// TODO: Move it to a spearate package
export type ValueTypeName = keyof typeof VALUE_TYPE_EMOJIS;
// TODO: Move it to a spearate package
export type ValueTypeEmoji =
	| (typeof VALUE_TYPE_EMOJIS)[Exclude<ValueTypeName, "Boolean">]
	| (typeof VALUE_TYPE_EMOJIS)["Boolean"][keyof (typeof VALUE_TYPE_EMOJIS)["Boolean"]];

// TODO: Move it to a spearate package
export function getValueTypeEmoji(value: unknown, valueType: ValueTypeName): ValueTypeEmoji {
	// eslint-disable-next-line unicorn/prefer-ternary
	if (valueType === "Boolean" && typeof value === "boolean") {
		return VALUE_TYPE_EMOJIS.Boolean[`${value}`];
	} else if (value instanceof Error) {
		return VALUE_TYPE_EMOJIS.Error;
	} else {
		return VALUE_TYPE_EMOJIS[valueType as Exclude<ValueTypeName, "Boolean">];
	}
}

function stringifyValue(value: unknown, valueType: ValueTypeName): string | undefined {
	/* prettier-ignore */
	switch (valueType) {
		/* eslint-disable unicorn/switch-case-braces */
		case "Array":
		case "Set": {
			return getStringifiedAndTruncatedArray([...(value as Array<unknown> | Set<unknown>)]);
		}
		case "Boolean": return `${value}`;
		case "Error": return (value as Error).message;
		case "Number": return `${value}`;
		case "null": return;
		case "String": return `"${value}"`;
		case "undefined": return;
		/* eslint-enable unicorn/switch-case-braces */
	}
}

function getStringifiedAndTruncatedArray(array: Array<unknown>): string {
	const firstItems = array.slice(0, 3);
	const middle = array.length - 6 > 0 ? `... truncated ${array.length - 6} samples ...` : ``;
	const lastItems = array.slice(-4, -1);

	return JSON.stringify([...firstItems, "%mid%", ...lastItems], undefined, 1).replace(/"%mid%",/, middle);
}

interface CustomValueDescription {
	what: ValueTypeName;
	value: unknown;
}
function isCustomValueDescription(value: unknown): value is CustomValueDescription {
	return typeof value === "object" && value ? Object.hasOwn(value, "what") && Object.hasOwn(value, "value") : false;
}

function createPrint(prefixEmoji: string, prefix: string, value: unknown | CustomValueDescription): string {
	let customValue: unknown;
	let valueTypeName: ValueTypeName;
	if (isCustomValueDescription(value)) {
		valueTypeName = value.what;
		customValue = value.value;
	} else {
		customValue = value;
		valueTypeName = getValueTypeName(value);
	}
	const valueTypeEmoji = getValueTypeEmoji(customValue, valueTypeName);
	const stringifiedValue = stringifyValue(customValue, valueTypeName);
	const displayStringifieddValue = stringifiedValue ? ` (${stringifiedValue})` : "";

	return `${prefixEmoji} ${prefix} ${valueTypeEmoji} '${valueTypeName}'${displayStringifieddValue}`;
}

export const throws = (value: unknown) => createPrint(`💥`, `throws`, value);
export const returns = (value: unknown) => createPrint(`🔙`, `returns`, value);
