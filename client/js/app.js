var app = angular.module("socketio-chat", [])

	// main chat controller
	.controller("chatCtrl", function($scope) {
		// vars
		$scope.joined = false;
		$scope.messages = [];

		// join function
		$scope.join = function() {
			// check
			if (!$scope.name)
				return;

			// connect socket
			$scope.socket = io("localhost:2500");

			// on connect
			$scope.socket.on("connect", function() {
				$scope.socket.emit("join", $scope.name);
				$scope.joined = true;
			});
		};

		// send message function
		$scope.send = function() {
			// check
			if (!$scope.joined || !$scope.text)
				return;

			// message
			var m = {
				name: $scope.name,
				message: $scope.text
			};

			// emit
			$scope.socket.emit("message", m);

			// clear
			$scope.text = "";

			// add message
			$scope.messages.push(m);
		};
	});