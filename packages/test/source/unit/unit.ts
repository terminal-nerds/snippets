import { getConstructorName } from "@terminal-nerds/snippets-type/constructor";
import { isPrimitiveName } from "@terminal-nerds/snippets-type/primitive";

import { getValueTypeEmoji } from "../emoji/emoji.ts";

declare global {
	interface String {
		and: (_description: string) => string;
		on: (_situation: string) => string;
		sample: (_data: unknown) => string;
		samples: (_data: unknown) => string;
		with: (_options: Record<string, unknown>) => string;
	}
}

/* eslint-disable func-names */
String.prototype.and = function (description: string): string {
	return `${this}, and ${description}`;
};

/* eslint-disable func-names */
String.prototype.on = function (situation: string): string {
	return `${this} - on ${situation}`;
};

/* eslint-disable func-names */
String.prototype.sample = function (value: unknown): string {
	/* prettier-ignore */
	switch (typeof value) {
		/* eslint-disable unicorn/switch-case-braces */
		case "bigint": return `${this}: ${value}n`;
		case "boolean": return `${this}: ${value}`;
		case "function": return `${this}: ${value.toString()}`;
		case "number": return `${this}: ${value}`;
		case "object": {
			const stringified = value ? value.toString() : `null`;

			return `${this}: ${stringified}`;
		}
		case "undefined": return this.toString();
		case "string": return `${this}: "${value}"`;
		case "symbol": return `${this}: ${value.toString()}`;
		/* eslint-enable unicorn/switch-case-braces */
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

function getFormattedPrimitiveValue(value: unknown): string {
	/* prettier-ignore */
	switch(typeof value) {
			/* eslint-disable unicorn/switch-case-braces */
			case "bigint": return `${value}n`;
			case "boolean": return `${value}`;
			case "function": return `${value.toString()}`;
			case "number": return `${value}`;
			case "string": return `"${value}"`;
			case "symbol": return `"${value.toString()}"`;
			case "undefined": return ``;
			default: throw new TypeError(`The value is non-primitive.`);
			/* eslint-enable unicorn/switch-case-braces */
		}
}

function getFormattedNonPrimitiveValue(value: unknown, valueType: string): string {
	switch (valueType) {
		/* eslint-disable unicorn/switch-case-braces */
		case "Array":
			return `[ ...${(value as Array<unknown>).length} item(s)... ]`;
		case "Set":
			return `[ ...${(value as Set<unknown>).size} item(s)... ]`;
		case "Error":
			return (value as Error).message;
		case "Map":
			return `{ ...${(value as Map<unknown, unknown>).size} entry(ies)... }`;
		case "Object":
			return `{ ...${Object.entries(value as object).length} entry(ies)... }`;
		default:
			return "";
		/* eslint-enable unicorn/switch-case-braces */
	}
}

function stringifyValue(value: unknown, valueType: string): string | undefined {
	return isPrimitiveName(valueType.toLowerCase())
		? getFormattedPrimitiveValue(value)
		: getFormattedNonPrimitiveValue(value, valueType);
}

function getStringifiedAndTruncatedArray(array: Array<unknown>): string {
	const { length } = array;
	const maxLength = 4;

	if (length > maxLength) {
		const firstItems = array.slice(0, maxLength / 2);
		const middle = `\n... ${length - maxLength} items ...`;
		const lastItems = array.slice(-(maxLength / 2), length);

		return JSON.stringify([...firstItems, "%mid%", ...lastItems], jsonReplacer, 1).replace(/,\n "%mid%",?/, middle);
	} else {
		return JSON.stringify(array, jsonReplacer, 1);
	}
}

interface CustomValueDescription {
	what: string;
	value: unknown;
}
function isCustomValueDescription(value: unknown): value is CustomValueDescription {
	/* prettier-ignore */
	return typeof value === "object" &&
		value
			? Object.hasOwn(value, "what") &&
			  Object.hasOwn(value, "value")
			: false;
}

function createPrint(prefixEmoji: string, prefix: string, value: unknown | CustomValueDescription): string {
	let processedValue: unknown;
	let valueTypeName: string;

	if (isCustomValueDescription(value)) {
		valueTypeName = value.what;
		processedValue = value.value;
	} else {
		processedValue = value;
		valueTypeName = getConstructorName(value);
	}

	const valueTypeEmoji = getValueTypeEmoji(processedValue);
	const stringifiedValue = stringifyValue(processedValue, valueTypeName);
	const displayStringifiedValue = stringifiedValue ? ` (${stringifiedValue})` : "";

	return `${prefixEmoji} ${prefix} ${valueTypeEmoji} '${valueTypeName}'${displayStringifiedValue}`;
}

function jsonReplacer(_key: string, value: unknown) {
	/* prettier-ignore */
	switch(typeof value) {
		/* eslint-disable unicorn/switch-case-braces */
		case "bigint": return `${value.toString()}n`;
		case "function": return value.toString();
		case "undefined": return `undefined`;
		default: return value;
		/* eslint-enable unicorn/switch-case-braces */
	}
}

export const throws = (value: unknown) => createPrint(`💥`, `throws`, value);
export const returns = (value?: unknown) => createPrint(`🔙`, `returns`, value);
