"use strict";

var models = require('../models/index'),
  crypto = require('crypto'),
  mongoose = require('mongoose');

function strIDHash(str) {
  return crypto.createHash('md5').update(str).digest("hex");
}

module.exports = function(io) {
  var threadHandler = io.of("/thread").on('connection', function(socket) {
    socket.on('post:thread', function(thread) {
      var threadMini = {
        'title' : thread.title,
        'postedBy' : thread.postedBy,
        'time' : thread.time
      }

      console.log(threadMini);
      console.log(thread);

      var threadID = new mongoose.Types.ObjectId();

      var newThread = new models.Thread({
        "_id": threadID,
        "content": thread.content,
        "comments": []
      })

      newThread.save();
      threadMini.threadRef = threadID;

      var courseID = socket.room + "";
      var courseDataID = strIDHash("data_" + courseID);

      models.CourseData.findById(courseDataID, function(err, courseDataResult) {
        if (err) {
          console.err("error: " + err);
        }
        if (courseDataResult) {
          courseDataResult.threads.unshift(threadMini);
          courseDataResult.save();

          models.Course.findById(courseID, function(err, courseResult) {
            if (err) {
              console.err("error: " + err);
            }
            if (courseResult) {
              courseResult.subscriberRefs.forEach(function(subscriberID){
                models.User.findById(subscriberID, function(err, userResult) {
                  if (err) {
                    console.err("error: " + err);
                  }
                  if (userResult) {
                    var notificationID = userResult.notificationsRef;
                    models.Notification.findById(notificationID, function(err, notificationResult) {
                      if (err) {
                        console.err("error: " + err);
                      }
                      if (notificationResult) {
                        var newNotification = {
                          courseID : courseResult._id,
                          content  : thread.content,
                          time     : thread.time
                        }
                        notificationResult.notifications.unshift(newNotification);
                        notificationResult.save(function(err) {
                          if (err)
                            throw err
                        })
                        socket.broadcast.to(socket.room).emit('receive:thread', thread);
                      }
                    })
                  }
                })
              })
            }
          })
        }
      })
    });

    socket.on("join:thread_space", function(roomID) {
      socket.room = roomID;
      socket.join(roomID);
    });

    socket.on("post:thread_comment", function(comment) {
      // var comment = {
      //   postedBy  : String,
      //   content : String,
      //   time    : Date
      // }
      models.Thread.findById(threadId, function(err, threadResult){
        if (err) {
          console.err("error: " + err);
        }

        if (threadResult){
          threadResult.comments.push({
            "postedBy": comment.postedBy,
            "content": comment.content,
            "time" : new Date()
          })

          threadResult.save();
        }

      });

    });
  });
}