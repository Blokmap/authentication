import express from "express";
import passport from "passport";
import OpenIDConnectStrategy, {
	type Profile,
	type VerifyCallback,
} from "passport-openidconnect";

import constants from "../constants.js";

const router = express.Router();

passport.use(
	new OpenIDConnectStrategy(
		{
			issuer: "https://accounts.google.com",
			authorizationURL: "https://accounts.google.com/o/oauth2/v2/auth",
			tokenURL: " https://oauth2.googleapis.com/token",
			userInfoURL: "https://openidconnect.googleapis.com/v1/userinfo",
			clientID: constants.google_client_id,
			clientSecret: constants.google_client_secret,
			callbackURL: "",
			scope: ["profile"],
		},
		(_issuer: string, profile: Profile, cb: VerifyCallback) => {
			return cb(null, profile);
		},
	),
);

router.get("/sso/google", passport.authenticate("google"));

export default router;
