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