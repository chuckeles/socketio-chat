var app = angular.module("socketio-chat", [])

	// main chat controller
	.controller("chatCtrl", function($scope) {
		var socket = $scope.socket = io();
	});