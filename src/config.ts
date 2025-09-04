import dotenv from "dotenv";
import type { CookieOptions } from "express";

dotenv.config();

interface Config {
	authenticationUrl: string;
	frontendUrl: string;

	accessCookieName: string;
	accessCookieOptions: CookieOptions;
}

const config: Config = {
	authenticationUrl: process.env["AUTHENTICATION_URL"] as string,
	frontendUrl: process.env["FRONTEND_URL"] as string,

	accessCookieName: process.env["ACCESS_COOKIE_NAME"] || "blokmap_access_token",
	accessCookieOptions: {
		maxAge: parseInt(process.env["ACCESS_COOKIE_LIFETIME_MINUTES"] || "120", 10) * 60 * 1000,
		httpOnly: true,
		path: "/",
		secure: true,
		sameSite: "lax",
	},
};

export default config;
