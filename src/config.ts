import dotenv from "dotenv";
import type { CookieOptions } from "express";

dotenv.config();

interface Config {
	authenticationUrl: string;
	frontendUrl: string;

	claimsCookieName: string;
	claimsCookieOptions: CookieOptions;
}

const config: Config = {
	authenticationUrl: process.env["AUTHENTICATION_URL"] as string,
	frontendUrl: process.env["FRONTEND_URL"] as string,

	claimsCookieName: process.env["CLAIMS_COOKIE_NAME"] || "blokmap_login_claims",
	claimsCookieOptions: {
		maxAge: parseInt(process.env["CLAIMS_COOKIE_LIFETIME_MINUTES"] || "120", 10) * 60 * 1000,
		httpOnly: true,
		path: "/",
		secure: true,
		sameSite: "lax",
	},
};

export default config;
