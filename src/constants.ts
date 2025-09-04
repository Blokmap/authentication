import fs from "node:fs";

const constants = {
	googleClientId: "",
	googleClientSecret: "",

	claimsCookieSecret: "",
};

try {
	const googleOIDCCredentials = fs.readFileSync("/run/secrets/google-oidc-credentials", {
		encoding: "utf-8",
	});
	const googleOIDCParts = googleOIDCCredentials.split("\n");

	constants.googleClientId = googleOIDCParts[0] as string;
	constants.googleClientSecret = googleOIDCParts[1] as string;

	const cookieSecret = fs.readFileSync("/run/secrets/cookie-jar-key", { encoding: "utf-8" });
	constants.claimsCookieSecret = cookieSecret;
} catch (err) {
	console.error(err);
	process.exit(1);
}

export default constants;
