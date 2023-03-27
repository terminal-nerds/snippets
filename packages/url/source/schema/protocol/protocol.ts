import { z } from "zod";

export const PROTOCOLS = ["http", "https"] as const;
export type Protocol = (typeof PROTOCOLS)[number];

export const PROTOCOL_SCHEMA = z.enum(PROTOCOLS);

export function validateProtocol(input: unknown): asserts input is Protocol {
	PROTOCOL_SCHEMA.parse(input);
}

export function isProtocol(input: unknown): input is Protocol {
	return PROTOCOL_SCHEMA.safeParse(input).success;
}
