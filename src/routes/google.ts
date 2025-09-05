import config from "../config.js";
import constants from "../constants.js";
import express from "express";
import passport from "passport";
import OpenIDConnectStrategy, {
	type Profile,
	type VerifyCallback,
	type VerifyFunction,
} from "passport-openidconnect";
import urlJoin from "url-join";

const googleSSORouter = express.Router();

class GoogleOIDCStrategy extends OpenIDConnectStrategy {
	override name: string = "google-oidc";

	constructor(verify: VerifyFunction) {
		super(
			{
				issuer: "https://accounts.google.com",
				authorizationURL: "https://accounts.google.com/o/oauth2/v2/auth",
				tokenURL: " https://oauth2.googleapis.com/token",
				userInfoURL: "https://openidconnect.googleapis.com/v1/userinfo",
				clientID: constants.googleClientId,
				clientSecret: constants.googleClientSecret,
				callbackURL: urlJoin(config.authenticationUrl, "/sso/google/callback"),
				scope: ["openid", "email", "profile"],
			},
			verify,
		);
	}
}

passport.use(
	new GoogleOIDCStrategy((issuer: string, profile: Profile, cb: VerifyCallback) => {
		const email = profile.emails?.[0];

		if (!email) {
			console.error("Google SSO verification failed - missing email");
			return cb(new Error("missing email"));
		}

		const user: Express.User = {
			issuer: issuer,
			email: email.value,
			username: profile.username,
			firstName: profile.name?.givenName,
			lastName: profile.name?.familyName,
			avatarUrl: profile.photos?.[0]?.value,
		};

		return cb(null, user);
	}),
);

googleSSORouter.get("/", passport.authenticate("google-oidc"));

googleSSORouter.get(
	"/callback",
	passport.authenticate("google-oidc", { failureMessage: true, failWithError: true }),
	(req, res) => {
		console.log(`successfull Google SSO authentication - ${JSON.stringify(req.user)}`);

		res.redirect(urlJoin(config.frontendUrl, "/auth/sso"));
	},
);

export default googleSSORouter;
