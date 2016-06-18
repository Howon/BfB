"use strict";

module.exports = function(io) {
  var notificationHandler = io.of("/notification").on('connection', function(socket) {
    socket.on('match:card', function(notification) {
      socket.broadcast.emit("match:card", notification)
    });
  });
}