"use strict";

module.exports = function(io) {
  var notificationHandler = io.of("/notification").on('connection', function(socket) {
    socket.on('match:card', function(room) {
      console.log(room)
      socket.broadcast.to(room).emit('match:card', room);
    });

    socket.on("join", function(roomID) {
      console.log(roomID)
      socket.room = roomID;
      socket.join(roomID);
    });
  });
}