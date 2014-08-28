var express = require("express");
var server = express();

// routes
server.get("/", function(req, res) {
	res.sendfile("client/html/index.html");
});
server.use(express.static("client/build"));

// listen
var port = 2500;
server.listen(port, function() {
	console.log("listening on", port);
});