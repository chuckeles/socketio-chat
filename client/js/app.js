var app = angular.module("socketio-chat", [])

	// main chat controller
	.controller("chatCtrl", function($scope) {
		// vars
		$scope.joined = false;

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
	});