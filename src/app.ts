import express from "express";

import auth_router from "./routes/auth.js";

const app = express();

app.use(express.json());

app.use("/auth", auth_router);

export default app;
