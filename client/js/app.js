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
				$scope.$apply(function() {
					$scope.socket.emit("join", $scope.name);
					$scope.joined = true;
					$scope.messages.push({ system: $scope.name + " joined" });
				});
			});

			// on leave
			$scope.socket.on("leave", function(name) {
				$scope.$apply(function() {
					$scope.messages.push({ system: name + " left" });
				});
			});

			// on join
			$scope.socket.on("join", function(name) {
				$scope.$apply(function() {
					$scope.messages.push({ system: name + " joined" });
				});
			});

			// on message
			$scope.socket.on("message", function(m) {
				$scope.$apply(function() {
					$scope.messages.push(m);
				});
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