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
      var channelID = strIDHash((channelInfo.channel + "_" + channelInfo.course));
      socket.room = channelID
      socket.join(channelID);

      models.Channel.findById(channelID, function(err2, channelResult){
        if(err2){
          console.error("error: " + err2);
        }
        if(channelResult){
          socket.emit("load:channel", {
            channelName : channelInfo.channel,
            messages    : channelResult.messages
          });
        }
      });
    });

    socket.on("make:new_channel", function(newChannelData){
      var channelID = strIDHash((newChannelData.name + "_" + newChannelData.course));
      socket.room = channelID;
      socket.join(channelID);

      models.Channel.findById(channelID, function(err, channelResult){
        if(err){
          console.error("error: " + err);
        }
        if(!channelResult){
          var newChannel = new models.Channel({
            "_id"  : channelID,
            "name" : newChannelData.name,
            "desc" : newChannelData.desc
          })
          newChannel.save();
          var courseDataID = strIDHash("data_" + newChannelData.course);
          models.CourseData.findById(courseDataID, function(err1, courseDataResult){
            if(err1){
              console.error("error: " + err1);
            }
            if(courseDataResult){
              courseDataResult.channelRefs.push({
                name : newChannelData.name,
                ref  : channelID
              });
              courseDataResult.save();
            }
          })
        }
      });
    });

    socket.on('fetch:channels', function(courseID) {
      socket.room = courseID;
      socket.join(courseID);
      models.Course.findById(courseID, function(err, courseResult) {
        if (err) {
          console.error("error: " + err);
        }
        if (courseResult) {
          var dataRef = courseResult.courseDataRef;
          models.CourseData.findById(dataRef, function(err1, courseDataResult) {
            if (err1) {
              console.error("error: " + err1);
            }
            if(courseDataResult){
              socket.emit("receive:course_data", {
                course: courseResult,
                courseData: courseDataResult            
              });
            }        
          })
        }
      });
    });
  });
}