import { z } from "zod";

import { URL_SCHEMA } from "../schema/schema.ts";

export const SOCIAL_MEDIA_NAMES = [
	"facebook",
	"github",
	"instagram",
	"linkedin",
	"mastodon",
	"polywork",
	"twitter",
] as const;
export type SocialMediaName = (typeof SOCIAL_MEDIA_NAMES)[number];

export const SOCIAL_MEDIA_HOSTNAMES = {
	facebook: ["facebook.com"],
	github: ["github.com"],
	instagram: ["instagram.com"],
	linkedin: ["linkedin.com"],
	mastodon: ["mastodon.social"],
	polywork: ["poly.me", "polywork.com"],
	twitter: ["twitter.com"],
} as const;

export const SOCIAL_MEDIA_NAME_SCHEMA = z.enum(SOCIAL_MEDIA_NAMES);

export interface SocialMediaOptions {
	name?: SocialMediaName;
}

export function isSocialMediaURL(url: string | URL, options: SocialMediaOptions = {}): boolean {
	const { hostname } = URL_SCHEMA.parse(url);
	const { name } = options;

	return name ? checkHostname(hostname, name) : hasSocialMediaHostname(hostname);
}

function checkHostname(currentHostname: string, name: SocialMediaName): boolean {
	for (const hostname of SOCIAL_MEDIA_HOSTNAMES[name]) {
		if (currentHostname === hostname || currentHostname === `www.${hostname}`) {
			return true;
		}
	}

	return false;
}

function hasSocialMediaHostname(hostname: string): boolean {
	for (const name of SOCIAL_MEDIA_NAMES) {
		if (checkHostname(hostname, name)) {
			return true;
		}
	}

	return false;
}

export const isFacebookURL = (url: string | URL): boolean => isSocialMediaURL(url, { name: "facebook" });
export const isGitHubURL = (url: string | URL): boolean => isSocialMediaURL(url, { name: "github" });
export const isInstagramURL = (url: string | URL): boolean => isSocialMediaURL(url, { name: "instagram" });
export const isLinkedInURL = (url: string | URL): boolean => isSocialMediaURL(url, { name: "linkedin" });
export const isMastodonURL = (url: string | URL): boolean => isSocialMediaURL(url, { name: "mastodon" });
export const isPolyworkURL = (url: string | URL): boolean => isSocialMediaURL(url, { name: "polywork" });
export const isTwitterURL = (url: string | URL): boolean => isSocialMediaURL(url, { name: "twitter" });
