var ical2json = require("ical2json");

module.exports = function(io){
	io.on('connection', function(socket){
        socket.on('upload:calendar', function(calendar){
        	var output = ical2json.convert(calendar);
            console.log(output);
        });      
    });
}