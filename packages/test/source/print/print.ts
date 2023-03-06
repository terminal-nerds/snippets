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
	Array: `⛓️ `,
	BigInt: `⛰`,
	Boolean: {
		false: `🔴`,
		true: `🟢`,
	},
	Date: `🗓`,
	Error: `📛`,
	Function: `📍`,
	Map: `📑`,
	Number: `🔢`,
	Object: `🗃`,
	null: `👤`,
	RegExp: `🔎`,
	Set: `🦄`,
	Symbol: "💠",
	String: "✏",
	undefined: "🫥",
} as const;

// TODO: Move it to a spearate package
export function getValueTypeName(value: unknown): ValueTypeName {
	/* eslint-disable unicorn/switch-case-braces */
	switch (typeof value) {
		case "function":
			return value.name as ValueTypeName;
		case "number":
			return "Number";
		case "undefined":
			return "undefined";
		case "object": {
			return value ? getObjectConstructorName(value) : ("null" as ValueTypeName);
		}
		case "bigint":
		case "boolean":
		case "string":
		case "symbol":
			return value.constructor.name as ValueTypeName;
	}
	/* eslint-enable unicorn/switch-case-braces */
}

// TODO: Move it to a spearate package
export type ValueTypeName = keyof typeof VALUE_TYPE_EMOJIS;
// TODO: Move it to a spearate package
export type ValueTypeEmoji =
	| (typeof VALUE_TYPE_EMOJIS)[Exclude<ValueTypeName, "Boolean">]
	| (typeof VALUE_TYPE_EMOJIS)["Boolean"][keyof (typeof VALUE_TYPE_EMOJIS)["Boolean"]];

// TODO: Move it to a spearate package
export function getValueTypeEmoji(valueType: ValueTypeName, value?: unknown): ValueTypeEmoji {
	// eslint-disable-next-line unicorn/prefer-ternary
	if (valueType === "Boolean" && typeof value === "boolean") {
		return VALUE_TYPE_EMOJIS.Boolean[`${value}`];
	} else if (value instanceof Error) {
		return VALUE_TYPE_EMOJIS.Error;
	} else {
		return VALUE_TYPE_EMOJIS[valueType as Exclude<ValueTypeName, "Boolean">];
	}
}

class TestString {
	public prefixEmoji: string;
	public prefix: string;
	public value: unknown;
	public valueTypeEmoji: ValueTypeEmoji;
	public valueTypeName: ValueTypeName;
	public printifiedValue: string | undefined;
	public print: string;

	constructor(prefixEmoji: string, prefix: string, value: unknown) {
		this.prefix = prefix;
		this.prefixEmoji = prefixEmoji;
		this.value = value;
		this.valueTypeName = getValueTypeName(value);
		this.valueTypeEmoji = getValueTypeEmoji(this.valueTypeName);
		this.printifiedValue = this.printifyValue();
		this.print = this.createPrint();
	}

	private printifyValue(): string | undefined {
		switch (this.valueTypeName) {
			/* eslint-disable unicorn/switch-case-braces */
			case "Number":
				return `${this.value}`;
			case "null":
				return;
			case "String":
				return `"${this.value}"`;
			case "undefined":
				return;
			/* eslint-enable unicorn/switch-case-braces */
		}
	}

	private createPrint(): string {
		const printifiedValue = this.printifiedValue ? ` (${this.printifiedValue})` : "";

		return `${this.prefixEmoji} ${this.prefix} ${this.valueTypeEmoji} '${this.valueTypeName}'${printifiedValue}`;
	}

	on(situation: string): string {
		return `${this.print} - on ${situation}`;
	}

	toString(): string {
		return this.print;
	}
}

export const throws = (value: unknown) => new TestString(`💥`, `throws`, value);
export const returns = (value: unknown) => new TestString(`🔙`, `returns`, value);
