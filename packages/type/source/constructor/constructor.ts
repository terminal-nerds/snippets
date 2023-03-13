function extractObjectName(value: object): string {
	// eslint-disable-next-line unicorn/better-regex
	const matches = value.toString().match(/(?<=\[object )(\w+)(?!=\])/);

	if (matches && matches[0]) {
		return matches[0];
	} else {
		throw new Error("RegExp did not work.");
	}
}

function getObjectConstructorName(value: object | null): string {
	if (value) {
		const constructorName = value.constructor.name;

		return constructorName === "Object" ? extractObjectName(value) : constructorName;
	} else {
		return "null";
	}
}

function getPrimitiveConstructorName(value: unknown): string {
	const name = typeof value;

	return name.charAt(0).toUpperCase() + name.slice(1);
}

export function getConstructorName(value: unknown): string {
	/* prettier-ignore */
	switch (typeof value) {
		/* eslint-disable unicorn/switch-case-braces */
		case "function": return value.name;
		case "object": return getObjectConstructorName(value);
		case "undefined": return "undefined";
		default: return getPrimitiveConstructorName(value);
		/* eslint-enable unicorn/switch-case-braces */
	}
}
