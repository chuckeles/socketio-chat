// express server
var express = require("express");
var server = express();

// socket server
var http = require("http").createServer(server);
var io = require("socket.io")(http);

// routes
server.get("/", function(req, res) {
	res.sendFile(process.cwd() + "/client/html/index.html");
});
server.use(express.static("client/build"));

// listen
var port = 2500;
http.listen(port, function() {
	console.log("listening on", port);
});

// on connection
io.on("connection", function(socket) {
	console.log("client connected");

	// name
	var name = "";

	// on disconnect
	socket.on("disconnect", function() {
		console.log("client disconnected");

		if (name)
			socket.broadcast.emit("leave", name);
	});

	// on join
	socket.on("join", function(joinName) {
		console.log(joinName, "joined");
		name = joinName;

		socket.broadcast.emit("join", joinName);
	});

	// on message
	socket.on("message", function(details) {
		console.log("message from", details.name, "-", details.message);

		socket.broadcast.emit("message", details);
	});
});