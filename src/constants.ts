import fs from "node:fs";

const constants = { google_client_id: "", google_client_secret: "" };

try {
	const google_oidc_credentials = fs.readFileSync("/run/secrets/google-oidc-credentials", {
		encoding: "utf-8",
	});
	const google_oidc_parts = google_oidc_credentials.split("\n");

	constants.google_client_id = google_oidc_parts[0] as string;
	constants.google_client_secret = google_oidc_parts[1] as string;
} catch (err) {
	console.error(err);
	process.exit(1);
}

export default constants;
