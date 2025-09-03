import express from "express";
import passport from "passport";
import GoogleStrategy from "passport-google-oidc";

const router = express.Router();

passport.use(
	new GoogleStrategy({ clientID: "", clientSecret: "", callbackURL: "", scope: ["profile"] }),
);

router.get("/sso/google", passport.authenticate("google"));

export default router;
