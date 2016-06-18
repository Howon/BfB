"use strict";

module.exports = function(io) {
  var chatHanlder = io.of("/chat").on('connection', function(socket) {
    socket.on('post:message', function(message) {
      socket.broadcast.emit('receive:message', message);
    });

    socket.on("start:chat", function(chatData) {
      socket.broadcast.emit('start:chat', chatData);
    });

    socket.on("close:chat", function(user) {
      socket.broadcast.emit('close:chat', user);
    })
  });
}