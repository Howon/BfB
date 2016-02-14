"use strict";

var fs = require('fs'),
  exec = require('child_process').exec,
  models = require('../models/index'),
  async = require('async'),
  crypto = require('crypto'),
  drive = require('../drive/drive'),
  mongoose = require('mongoose');

function validateCourse(course) {
  var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
  if (re.test(course)) {
    if (course.indexOf('@vergil.columbia.edu', course.length - '@vergil.columbia.edu'.length) !== -1) {
      return true;
    }
  } else {
    return false;
  }
}

function strIDHash(str) {
  return crypto.createHash('md5').update(str).digest("hex");
}

module.exports = function(io) {
  var courseHandler = io.of("/course").on('connection', function(socket) {
    socket.on('upload:calendar', function(data) {
      var fileNameICS = "tempCal/" + data.uploader + '_calendar.ics';
      var fileNameJSON = "tempCal/" + data.uploader + '_calendar.json';
      var user;

      models.User.findOne({
        "_id": data.uploader
      }, function(err, userResult) {
        if (err) {
          console.error("error: " + err);
        }
        if (userResult) {
          user = userResult;
        }
      })

      fs.writeFile(fileNameICS, data.calendarData, function(err) {
        if (err) return console.error(err);
      });

      var execCommand = 'ical2json ' + fileNameICS;

      exec(execCommand, function(error, stdout, stderr) {
        if (error) {
          console.error(error)
        };

        var digest = function(cleanTempFiles) {
          fs.readFile(fileNameJSON, 'utf8', function(err, calFile) {
            if (err) {
              return console.error(err);
            }

            var courseTimes = JSON.parse(calFile)['VCALENDAR'][0]['VEVENT'];

            if (courseTimes) {
              var setupMeetingTimes = function() {
                var courseObjList = {};
                for (var i = 0; i < courseTimes.length; i++) {
                  var meeting = {
                    "startTime": courseTimes[i]['DTSTART'],
                    'endTime': courseTimes[i]['DTEND']
                  }
                  var id = courseTimes[i]['UID'];
                  if (validateCourse(id)) {
                    var UID = strIDHash(id); // creates a hash based on the course name
                    if (courseObjList[id]) {
                      courseObjList[id]['meetings'].push(meeting);
                    } else {
                      courseObjList[id] = {};
                      courseObjList[id].courseID = UID;
                      courseObjList[id].summary = courseTimes[i]['SUMMARY'];
                      courseObjList[id].location = courseTimes[i]['LOCATION'];
                      courseObjList[id].meetings = [];
                      courseObjList[id].meetings.push(meeting);
                    }
                  }
                }

                setupCourse(courseObjList);
              }

              var setupCourse = function(courseObjList) {
                var userCalendar = [];
                var courseIDList = [];
                var counter = 0;
                var courseCount = Object.keys(courseObjList).length;

                var checkDBForClass = function(courseObj) {
                  var courseID = courseObj.courseID; // creates a hash based on the course name
                  models.Course.findById(courseID, function(err, courseResult) {
                    var courseDataID = strIDHash("data_" + courseID);
                    if (err) {
                      console.error("error: " + err);
                    }
                    if (courseResult) {
                      if (courseResult.subscriberRefs.indexOf(user._id) < 0) { //if user is not in the subscriber list
                        courseResult.subscriberRefs.push(user._id);
                        courseResult.save();
                      }
                      models.CourseData.findById(courseDataID, function(err2, courseDataResult) {
                        if (err2) {
                          console.error("error: " + err2);
                        }
                        if (courseDataResult) {
                          drive.insertPermission(courseDataResult.folderRef, user.info.email, function() {

                          });
                        }
                      })
                      courseIDList.push(courseResult._id);
                      userCalendar.push(courseResult);

                      if (++counter == courseCount) { // if the number of objects compared matches the parameter length
                        outputResult(userCalendar); // returns it back to the user
                        saveUserClasses(courseIDList);
                      }
                    } else {
                      var channelID = strIDHash("main_" + courseID);

                      var newCourse = new models.Course({
                        "_id": courseID,
                        "meetingTimes": courseObj.meetings,
                        "summary": courseObj.summary,
                        "location": courseObj.location,
                        "subscriberRefs": user._id,
                        "courseDataRef": courseDataID
                      })

                      var newChannel = new models.Channel({
                        "_id": channelID,
                        "name" : "main",
                        "desc": "I am the main chat channel for " + courseObj.summary,
                        "messages" : {
                          "sender" : "Rayos",
                          "content" : "Hello!"
                        }
                      });
                      newChannel.save();

                      var threadID = new mongoose.Types.ObjectId();

                      var newThread = new models.Thread({
                        "_id" : threadID,
                        "courseRef" : courseID,
                        "content" : "Rayos is a virtual classroom environment...",
                        'comments' : [{
                          "content": "example comment",
                          "postedBy": "Rayos",
                          "time": new Date()
                        }]
                      })
                      newThread.save();

                      var newCourseData = new models.CourseData({
                        "_id": courseDataID,
                        "threads": {
                          "postedBy": "Rayos",
                          "title": "Welcome to Rayos!",
                          "time": new Date(),
                          "threadRef": threadID
                        },
                        "channelRefs": {
                          "name": "main",
                          "ref": channelID
                        }
                      });

                      drive.createCourseFolder(courseObj.summary, function(folderRef) {
                        drive.insertPermission(folderRef, user.info.email, function() {
                          drive.createFile(courseObj.summary, "doc", folderRef, function(res) {
                            newCourseData.driveFileRefs.push({
                              "name" : res.title,
                              "fileType" : "word",
                              "ref" : res.id
                            })
                            newCourseData.save();
                          });
                        });
                      });

                      newCourse.save();

                      courseIDList.push(newCourse._id);
                      userCalendar.push(newCourse);

                      if (++counter == courseCount) { // if the number of objects compared matches the parameter length
                        outputResult(userCalendar); // returns it back to the user
                        saveUserClasses(courseIDList);
                      }
                    }
                    return;
                  });
                }

                async.forEach(courseObjList, checkDBForClass);
              }

              var outputResult = function(userCalendar) {
                var output = {
                  uploader: data.uploader,
                  calendar: userCalendar
                }
                socket.emit("update:calendar", output);
              }

              var saveUserClasses = function(courseIDList) {
                user.courseRefs = courseIDList;
                user.save();
              }

              setupMeetingTimes();

            }
          });
          cleanTempFiles();
        }

        digest(function() {
          fs.unlinkSync(fileNameICS);
          fs.unlinkSync(fileNameJSON);
        });
      });
    });

    socket.on('get:courses', function(userID) {
      models.User.findOne({
        "_id": userID
      }, function(err, userResult) {
        if (err) {
          console.error("error: " + err);
        }
        if (userResult) {
          var userCourseList = userResult.courseRefs;
          var courseCount = userCourseList.length;
          var counter = 0;
          var outputCourseList = [];

          var getUserCourses = function(courseID) {
            models.Course.findById(courseID, function(err1, courseResult) {
              if (err1) {
                console.error("error: " + err1);
              }
              if (courseResult) {
                outputCourseList.push(courseResult);
                counter++;
                if (counter == courseCount) {
                  socket.emit("update:calendar", {
                    calendar: outputCourseList
                  });
                }
              }
            });
          }

          async.forEach(userCourseList, getUserCourses);
        }
      })
    });

    socket.on('get:course_data', function(courseID) {
      socket.room = courseID;
      socket.join(courseID);

      var courseDataID = strIDHash("data_" + courseID);
      models.CourseData.findById(courseDataID, function(err, courseDataResult) {
        if (err) {
          console.error("error: " + err);
        }
        if (courseDataResult) {
          socket.emit("receive:course_data", courseDataResult);
        }
      })
    });

    socket.on("make:new_channel", function(newChannelData) {
      var channelID = strIDHash((newChannelData.name + "_" + newChannelData.course));

      models.Channel.findById(channelID, function(err, channelResult) {
        if (err) {
          console.error("error: " + err);
        }
        if (!channelResult) {
          var newChannel = new models.Channel({
            "_id" : channelID,
            "name" : newChannelData.name,
            "desc" : newChannelData.desc,
            "messages" : newChannelData.messages
          })
          newChannel.save();

          var courseDataID = strIDHash("data_" + newChannelData.course);
          models.CourseData.findById(courseDataID, function(err1, courseDataResult) {
            if (err1) {
              console.error("error: " + err1);
            }
            if (courseDataResult) {
              courseDataResult.channelRefs.push({
                name: newChannelData.name,
                ref: channelID
              });

              courseDataResult.save();
              socket.to(socket.room).emit('receive:new_channel', newChannelData);
            }
          })
        }
      });
    });
  });
}