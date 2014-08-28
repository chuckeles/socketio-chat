var express = require("express");
var server = express();

// routes
server.use(express.static("client"));

// listen
var port = 2500;
server.listen(port, function() {
	console.log("listening on", port);
});