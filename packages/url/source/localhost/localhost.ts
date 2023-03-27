import { URL_SCHEMA } from "../schema/schema.ts";

export const LOCALHOST_HOSTNAMES = ["localhost", "127.0.0.1"] as const;

export function isLocalhost(url: string | URL): boolean {
	const { hostname } = URL_SCHEMA.parse(url);

	for (const allowedHostname of LOCALHOST_HOSTNAMES) {
		if (hostname === allowedHostname) {
			return true;
		}
	}

	return false;
}
