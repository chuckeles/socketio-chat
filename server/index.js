var http = require("http");

// create server
var server = http.createServer(function(req, res) {
	console.log(req);
});

// listen
var port = 2403;
server.listen(port, function() {
	console.log("server listening on", port);
});