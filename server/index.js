var http = require("http");
var fs   = require("fs");

// create server
var server = http.createServer(function(req, res) {

});

// listen
var port = 2403;
server.listen(port, function() {
	console.log("server listening on", port);
});