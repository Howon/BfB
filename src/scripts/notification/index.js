"use strict";

module.exports = function(io) {
  var notificationHandler = io.of("/notification").on('connection', function(socket) {
    socket.on('match:card', function(message) {
      socket.broadcast.to(socket.room).emit('receive:chat_message', message);
    });

    socket.on("join", function(roomID) {
      socket.room = roomID;
      socket.join(channelID);
    });
  });
}