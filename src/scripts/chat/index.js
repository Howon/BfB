"use strict";

module.exports = function(io) {
  var chatHanlder = io.of("/chat").on('connection', function(socket) {
    socket.on('post:message', function(message) {
      socket.emit('receive:message', message);
    });

    socket.on("join", function(roomID) {
      socket.room = roomID;
      socket.join(channelID);
    });

    socket.on("start:chat", function(users){
      socket.emit('receive:message', message);
    });
  });
}