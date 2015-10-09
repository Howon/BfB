var fs = require('fs'),	
	exec = require('child_process').exec,
	models = require('../models/index');

module.exports = function(io) {
	io.on('connection', function(socket) {
		socket.on('upload:calendar', function(msg) {			
			fs.writeFile('test.ics', msg.imageData, function (err) {
			  if (err) return console.log(err);			  
			});

			var execCommand = 'ical2json test.ics'

			exec(execCommand, function callback(error, stdout, stderr){

			    if(error) console.err(error);			

				console.log(stdout);
			    (function digest(filename){
			    	fs.readFile(filename, 'utf8', function(err, data){
			    		if (err){
			    			return console.log(err);
			    		}
			    		var classtimes = JSON.parse(data)['VCALENDAR'][0]['VEVENT'];
			    		var id_meetings = {};
			    		for (var i = 0; i < classtimes.length; i++){
			    			var meeting = new models.Time({
			    				"starttime": classtimes[i]['DTSTART'],
			    				'endtime': classtimes[i]['DTEND']
			    			})

			    			meeting.save();

			    			var id = classtimes[i]['UID'];
			    			if (id_meetings[id]){
			    				id_meetings[id]['meetings'].push(meeting);
			    			}
			    			else {
			    				id_meetings[id] = {};
			    				id_meetings[id].summary = classtimes[i]['SUMMARY'];
			    				id_meetings[id].locations = classtimes[i]['LOCATION'];
			    				id_meetings[id]['meetings'] = [];
			    				id_meetings[id]['meetings'].push(meeting);
			    			}
			    		}
			    		for (var i in id_meetings){
			    			var meetings = [];
			    			for (var j = 0; j < id_meetings[i]['meetings'].length; j++){
			    				meetings.push(id_meetings[i]['meetings'][j]);
			    			}
			    			var course = new models.Course({
			    				"id": i,
			    				"meetingTimes": meetings,
			    				"summary": id_meetings[i]['summary'],
			    				"location": id_meetings[i]['location']
			    			})
			    			course.save();
			    		}
			    	});
			    })('test.json');
			});			
		});
	});
}