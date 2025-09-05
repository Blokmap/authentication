import app from "./app.js";

const server = app.listen(80, () => {
	console.log("authentication server is running on port 80");
});

process.once("SIGINT", () => {
	console.log("received SIGINT, closing server...");
	server.close(() => {
		console.log("server closed, exiting...");
		process.exit(0);
	});
});
