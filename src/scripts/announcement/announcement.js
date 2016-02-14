var models = require('../models/index'),
  crypto = require('crypto');

function strIDHash(str) {
  return crypto.createHash('md5').update(str).digest("hex");
}

module.exports = function(io) {
  io.on('connection', function(socket) {
    socket.on('post:announcement', function(announcement) {
      models.CourseData.findOne({
        "_id": socket.room + ""
      }, function(err, courseDataResult) {
        if (err) {
          console.err("error: " + err);
        }
        if (courseDataResult) {
          courseDataResult.announcements.push(announcement);
          courseDataResult.save();

          models.Course.findOne({
            courseDataRef: courseDataResult._id
          }, function(err, courseResult) {
            if (err) {
              console.err("error: " + err);
            }
            if (courseResult) {

              for (var i = 0; i < courseResult.subscribers.length; i++) {
                models.User.findOne({
                  "_id": courseResult.subscribers[i] + ""
                }, function(err, userResult) {

                  if (err) {
                    console.err("error: " + err);
                  }
                  if (userResult) {
                    models.Notification.findOne({
                      "_id": userResult.notifications
                    }, function(err, notificationResult) {

                      if (err) {
                        console.err("error: " + err);
                      }
                      if (notificationResult) {
                        var newNotification = {
                          courseID: courseResult._id,
                          content: announcement.content,
                          time: new Date()
                        }
                        notificationResult.notifications.push(newNotification);
                        notificationResult.save(function(err){
                            if (err)
                                throw err
                        })
                      }

                    })
                  }



                })
              }
            }

          })


        }
      })
      socket.broadcast.to(socket.room).emit('receive:announcement', announcement);
    });
  });
}