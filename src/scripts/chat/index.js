"use strict";

module.exports = function(io) {
  var chatHanlder = io.of("/chat").on('connection', function(socket) {
    socket.on('post:message', function(message) {
      socket.broadcast.emit('receive:message', message);
    });

    socket.on("start:chat", function(){
      socket.emit('receive:message');
    });
  });
}