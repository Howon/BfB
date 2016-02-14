"use strict";

var models = require('../models/index'),
  crypto = require('crypto');

function strIDHash(str) {
  return crypto.createHash('md5').update(str).digest("hex");
}

module.exports = function(io) {
  var chatHanlder = io.of("/chat").on('connection', function(socket) {
    socket.on('post:chat_message', function(message) {
      models.Channel.findById(socket.room, function(err, channelResult) {
        if (err) {
          console.error("error: " + err);
        }
        if (channelResult) {
          channelResult.messages.push(message);
          channelResult.save();
        }
      })

      socket.broadcast.to(socket.room).emit('receive:chat_message', message);
    });

    socket.on("join:channel", function(channelInfo) {
      var channelID = strIDHash((channelInfo.name + "_" + channelInfo.course));
      socket.room = channelID
      socket.join(channelID);
      models.Channel.findById(channelID, function(err2, channelResult){
        if(err2){
          console.error("error: " + err2);
        }
        if(channelResult){
          socket.emit("load:channel", {
            name : channelResult.name,
            desc : channelResult.desc,
            messages    : channelResult.messages
          });
        }
      });
    });
  });
}