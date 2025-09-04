import config from "@/config.js";
import constants from "@/constants.js";
import googleSSORouter from "@/routes/google.js";
import express from "express";
import session from "express-session";
import passport from "passport";

passport.serializeUser((user, cb) => {
	process.nextTick(() => {
		cb(null, user);
	});
});

passport.deserializeUser((user: Express.User, cb) => {
	process.nextTick(() => {
		return cb(null, user);
	});
});

const app = express();

app.set("trust proxy", 1);

app.use(express.json());
app.use(
	session({
		name: config.claimsCookieName,
		cookie: config.claimsCookieOptions,
		secret: constants.claimsCookieSecret,
		resave: false,
		saveUninitialized: false,
		rolling: true,
		proxy: true,
	}),
);

app.use("/sso/google", googleSSORouter);
// app.use("/sso/microsoft", microsoftSSORouter);

// app.use("/cas/ugent", ugentCASRouter);
// app.use("/cas/hogent", hogentCASRouter);

export default app;
