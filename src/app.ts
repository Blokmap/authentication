import googleSSORouter from "@/routes/google.js";
import cookieParser from "cookie-parser";
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

app.use(cookieParser("jemama"));
app.use(express.json());
app.use(
	session({
		cookie: { secure: true },
		secret: "jemama",
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

app.get("/success", (_req, res) => {
	res.send("success");
});

export default app;
