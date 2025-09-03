import auth_router from "./routes/auth.js";
import express from "express";

const app = express();

app.use(express.json());

app.use("/auth", auth_router);

export default app;
