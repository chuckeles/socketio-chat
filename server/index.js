var express = require("express");
var server = express();

var http = require("http").createServer(server);
var io = require("socket.io")(http);

// routes
server.get("/", function(req, res) {
	res.sendfile("client/html/index.html");
});
server.use(express.static("client/build"));

// listen
var port = 2500;
http.listen(port, function() {
	console.log("listening on", port);
});