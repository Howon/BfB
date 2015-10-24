var fs = require('fs'),
	exec = require('child_process').exec,
	models = require('../models/index');

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

					var digest = function(cleanTempFiles) {
						fs.readFile(fileNameJSON, 'utf8', function(err, calFile) {
							if (err) {
								return console.log(err);
							}
							var classtimes = JSON.parse(calFile)['VCALENDAR'][0]['VEVENT'];
							var id_meetings = {};

							var setupMeetingTimes = function(){
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

								setupCourse();
							}
							
							var setupCourse = function(){
								var userCalendar = [];			
								var counter = 0;
								
								var num_classes = Object.keys(id_meetings).length;
								
								for (var courseID in id_meetings){												
									models.Course.findOne({ "classID" : courseID }, function(err, result){
										if(err){
											console.error("error: " + err);
										}
										if(result){												
											userCalendar.push(result);
										}
										else {
											var newCourse = new models.Course({
												"classID": courseID,
												"meetingTimes": id_meetings[course]['meetings'],
												"summary": id_meetings[course]['summary'],
												"location": id_meetings[course]['location']
											})							
											newCourse.save();
											userCalendar.push(newCourse);
										}
										counter++;
										if(counter == num_classes){
											outputResult(userCalendar);
										}	
									});																									
								}
							}

							var outputResult = function(userCalendar){
								var output = {
									uploader : data.uploader,
									calendar : userCalendar						
								}
								socket.emit("receive:calendar", output);
							}

							setupMeetingTimes();		
						});					
						cleanTempFiles();		
					}

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