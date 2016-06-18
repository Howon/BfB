"use strict";

module.exports = function(io) {
  var chatHanlder = io.of("/chat").on('connection', function(socket) {
    socket.on('post:chat_message', function(message) {
      socket.broadcast.to(socket.room).emit('receive:chat_message', message);
    });

    socket.on("join", function(roomID) {
      socket.room = roomID;
      socket.join(channelID);
    });
  });
}