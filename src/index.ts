import app from "@/app.js";
import config from "@/config.js";

const server = app.listen(config.port, () => {
	console.log(`authentication server is running on port ${config.port}`);
});

process.once("SIGINT", () => {
	console.log("received SIGINT, closing server...");
	server.close(() => {
		console.log("server closed, exiting...");
		process.exit(0);
	});
});
