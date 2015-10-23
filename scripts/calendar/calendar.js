var fs = require('fs'),
	exec = require('child_process').exec,
	models = require('../models/index'),
	async = require('async');

module.exports = {
	parseCal: function(io) {
		io.on('connection', function(socket) {
			socket.on('upload:calendar', function(data) {
				var fileNameICS = data.uploader + '_calendar.ics';
				var fileNameJSON = data.uploader + '_calendar.json';

				fs.writeFile(fileNameICS, data.calendarData, function(err) {
					if (err) return console.log(err);
				});

				var execCommand = 'ical2json ' + fileNameICS;

				exec(execCommand, function (error, stdout, stderr) {
					if (error) {console.err(error)};

					var digest = function(callback) {
						fs.readFile(fileNameJSON, 'utf8', function(err, calFile) {
							if (err) {
								return console.log(err);
							}
							var classtimes = JSON.parse(calFile)['VCALENDAR'][0]['VEVENT'];

							var id_meetings = {};
							var userCalendar = [];
							var setupMeetingTimes = function(setupCourse, outputRes){
								for (var i = 0; i < classtimes.length; i++) {
									var meeting = {
										"startTime": classtimes[i]['DTSTART'],
										'endTime': classtimes[i]['DTEND']
									}

									var id = classtimes[i]['UID'];

									if (id_meetings[id]) {
										id_meetings[id]['meetings'].push(meeting);
									} else {
										id_meetings[id] = {};
										id_meetings[id].summary = classtimes[i]['SUMMARY'];
										id_meetings[id].location = classtimes[i]['LOCATION'];
										id_meetings[id].meetings = [];
										id_meetings[id].meetings.push(meeting);
									}

								}
								setupCourse(outputRes);
							}
							
							var setupCourse = function(output){
								for (var course in id_meetings){
									var checkCourse = function(course){
										models.Course.findOne({ "classID": course }, function(err, res){
											if(err){
												console.error("error: " + err);
											}
											if( res != null ){
												userCalendar.push(course);
											}
											else {
												var newCourse = new models.Course({
													"classID": course,
													"meetingTimes": id_meetings[course]['meetings'],
													"summary": id_meetings[course]['summary'],
													"location": id_meetings[course]['location']
												})							
												newCourse.save();
												userCalendar.push(course);
											}
										});
									}
									checkCourse(course);
								}

								output();
							}
	// fix this method.
							var outputRes = function(){
								var output = {
									uploader : data.uploader,
									calendar : userCalendar						
								}
								console.log(userCalendar);
								console.log(data.uploader);
								socket.emit("receive:calendar", output);
							}
							setupMeetingTimes(setupCourse,outputRes);
							
						});
					};

					digest(function(){	
						fs.unlinkSync(fileNameICS);
						fs.unlinkSync(fileNameJSON);
					});
				});
			});
		});
	},
	retrieveUserCal: function(userID){
		// models.Course.findById();
	}
}