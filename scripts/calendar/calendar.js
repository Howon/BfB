var fs = require('fs'),
	exec = require('child_process').exec,
	models = require('../models/index'),
	async = require('async'),
	crypto = require('crypto');	

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

module.exports = function(io){
	io.on('connection', function(socket) {
		socket.on('upload:calendar', function(data) {				
			var fileNameICS = data.uploader + '_calendar.ics';
			var fileNameJSON = data.uploader + '_calendar.json';
			var user; 

			models.User.findOne({"_id" : data.uploader}, function(err, result){
				if(err){
					console.err("error: " + err);
				}									
				user = result;
			})

			fs.writeFile(fileNameICS, data.calendarData, function(err) {
				if (err) return console.log(err);
			});

			var execCommand = 'ical2json ' + fileNameICS;

			exec(execCommand, function (error, stdout, stderr) {
				if (error) {console.err(error)};

				var digest = function(cleanTempFiles) {
					fs.readFile(fileNameJSON, 'utf8', function(err, calFile) {
						if (err) {
							return console.log(err);
						}

						var classtimes = JSON.parse(calFile)['VCALENDAR'][0]['VEVENT'];							
						
						if(classtimes){						
							var setupMeetingTimes = function(){
								var courseObjList = {};								
								for (var i = 0; i < classtimes.length; i++) {
									var meeting = {
										"startTime": classtimes[i]['DTSTART'],
										'endTime': classtimes[i]['DTEND']
									}
									var id = classtimes[i]['UID'];
									if(validateCourse(id)){										
										if (courseObjList[id]) {
											courseObjList[id]['meetings'].push(meeting);
										} else {
											courseObjList[id] = {};
											courseObjList[id].summary = classtimes[i]['SUMMARY'];
											courseObjList[id].location = classtimes[i]['LOCATION'];
											courseObjList[id].meetings = [];
											courseObjList[id].meetings.push(meeting);
										}
									}
								}

								setupCourse(courseObjList);
							}

							var setupCourse = function(courseObjList){
								var userCalendar = [];	
								var courseIDList = [];		
								var counter = 0;								

								var courseCount = Object.keys(courseObjList).length;																							

								var checkDBForClass = function(courseObj){									
									var classID = crypto.createHash('md5').update(courseObj.summary).digest("hex");	// creates a hash based on the class name

									models.Course.findOne({ "classID" : classID }, function(err, result){										
										if(err){
											console.error("error: " + err);
										}
										if(result){						
											result.subscribers.push(user._id);											
											result.save();
											courseIDList.push(result._id);
											userCalendar.push(result);
										}
										else {											
											var newCourse = new models.Course({
												"classID"			: classID,
												"meetingTimes": courseObj.meetings,
												"summary"			: courseObj.summary,
												"location"		: courseObj.location,
												"subscribers" : user._id,
											})							
											var newChatRoom = new models.ChatRoom();
											newCourse.chatRoom = newChatRoom.id;
											newCourse.save();
											courseIDList.push(newCourse._id);
											userCalendar.push(newCourse);
										}

										counter++;	// counts upto the number of classes passed into the method
										if(counter == courseCount){ // if the number of objects compared matches the parameter length
											outputResult(userCalendar); // returns it back to the user
											saveUserClasses(courseIDList);
										}

										return;
									});																																
								}								

								async.forEach(courseObjList, checkDBForClass);
							}

							var outputResult = function(userCalendar){
								var output = {
									uploader : data.uploader,
									calendar : userCalendar						
								}							
								socket.emit("receive:calendar", output);
							}

							var saveUserClasses = function(courseIDList){								
								user.courses = courseIDList;
								user.save();
							}

							setupMeetingTimes();

						}		
					});					
					cleanTempFiles();		
				}

				digest(function(){	
					fs.unlinkSync(fileNameICS);
					fs.unlinkSync(fileNameJSON);
				});
			});
		});

		socket.on('get:user_courses', function(userID){
			models.User.findOne({"_id" : userID}, function(err, result){
				if(err){
					console.err("error: " + err);
				}				
				var userCourseList = result.courses;
				var courseCount = userCourseList.length;
				var counter = 0;
				var outputCourseList = [];

				var getUserCourses = function(classID) {
					models.Course.findById(classID, function(err1, result){										
						if(err){
							console.error("error: " + err1);
						}
						outputCourseList.push(result);

						counter++;	// counts upto the number of classes passed into the method
						if(counter == courseCount){ // if the number of objects compared matches the parameter length
							socket.emit("receive:user_courses", {calendar : outputCourseList});
						}	
					});																																
				}								

				async.forEach(userCourseList, getUserCourses);				
			})
		});
	});
}