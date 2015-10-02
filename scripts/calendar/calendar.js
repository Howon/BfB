var fs = require('fs'),	
	exec = require('child_process').exec;

module.exports = function(io) {
	io.on('connection', function(socket) {
		socket.on('upload:calendar', function(msg) {			
			fs.writeFile('test.ics', msg.imageData, function (err) {
			  if (err) return console.log(err);			  
			});

			var execCommand = 'ical2json test.ics'

			exec(execCommand, function callback(error, stdout, stderr){
			    console.log(stdout)
			});			
		});
	});
}