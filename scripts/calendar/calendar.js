var fs = require('fs'),
	exec = require('child_process').exec,
	models = require('../models/index');

module.exports = function(io) {
	io.on('connection', function(socket) {
		socket.on('upload:calendar', function(data) {
			var fileNameICS = data.uploader + '_calendar.ics';
			var fileNameJSON = data.uploader + '_calendar.json';

			fs.writeFile(fileNameICS, data.calendarData, function(err) {
				if (err) return console.log(err);
			});

			var execCommand = 'ical2json ' + fileNameICS;

			exec(execCommand, function callback(error, stdout, stderr) {

				if (error) console.err(error);

				var digest = function() {
					fs.readFile(fileNameJSON, 'utf8', function(err, calFile) {
						if (err) {
							return console.log(err);
						}
						var classtimes = JSON.parse(calFile)['VCALENDAR'][0]['VEVENT'];
						var id_meetings = {};
						for (var i = 0; i < classtimes.length; i++) {
							var meeting = new models.Time({
								"starttime": classtimes[i]['DTSTART'],
								'endtime': classtimes[i]['DTEND']
							})

							meeting.save();

							var id = classtimes[i]['UID'];
							if (id_meetings[id]) {
								id_meetings[id]['meetings'].push(meeting);
							} else {
								id_meetings[id] = {};
								id_meetings[id].summary = classtimes[i]['SUMMARY'];
								id_meetings[id].location = classtimes[i]['LOCATION'];
								id_meetings[id]['meetings'] = [];
								id_meetings[id]['meetings'].push(meeting);
							}
						}
						var userCalendar = [];
						for (var i in id_meetings) {
							// models.Course.findById(i, function(err, course){
								// if(err){
								// 	// console.log("error");
								// 	console.error(err);
								// }
								// if(course){
								// 	userCalendar.push(course);
								// 	console.log(course);
								// } else{
									var meetings = [];
									for (var j = 0; j < id_meetings[i]['meetings'].length; j++) {
										meetings.push(id_meetings[i]['meetings'][j]);
									}
									var newCourse = new models.Course({
										"_id": i,
										"meetingTimes": meetings,
										"summary": id_meetings[i]['summary'],
										"location": id_meetings[i]['location']
									})							
									newCourse.save();
									userCalendar.push(newCourse);
								// }
							// })
						}						
						var output = {
							uploader : data.uploader,
							calendar : userCalendar						
						}
						console.log(output);
						socket.emit("receive:calendar", output);						
					});
					fs.unlinkSync(fileNameICS);
					fs.unlinkSync(fileNameJSON);
				};

				digest();
			});
		});
	});
}