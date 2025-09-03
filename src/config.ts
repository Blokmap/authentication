import dotenv from "dotenv";

dotenv.config();

interface Config {
	authenticationUrl: string;
	frontendUrl: string;
}

const config: Config = {
	authenticationUrl: process.env["AUTHENTICATION_URL"] as string,
	frontendUrl: process.env["FRONTEND_URL"] as string,
};

export default config;
