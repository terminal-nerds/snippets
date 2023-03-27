import { z } from "zod";

/** @see {@link https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers} */
export type Port = number;

export const MAX_PORT_NUMBER = 49_151;
export const MAX_WELL_KNOWN_PORT_NUMBER = 1023;
export const MIN_REGISTERED_PORT_NUMBER = MAX_WELL_KNOWN_PORT_NUMBER + 1;

/** @see {@link Port} Port */
export const PORT_SCHEMA = z.number().min(0).max(MAX_PORT_NUMBER);
export const WELL_KNOWN_PORT_SCHEMA = z.number().min(0).max(MAX_WELL_KNOWN_PORT_NUMBER);
export const REGISTERED_PORT_SCHEMA = z.number().min(MIN_REGISTERED_PORT_NUMBER).max(MAX_PORT_NUMBER);

/** @see {@link Port} Port */
export function validatePort(value: unknown): asserts value is Port {
	PORT_SCHEMA.parse(value);
}

/** @see {@link Port} Port */
export function isPort(value: unknown): value is Port {
	return PORT_SCHEMA.safeParse(value).success;
}
