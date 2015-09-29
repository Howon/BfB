module.exports = function(io){
	io.on('connection', function(socket){
        socket.on('upload:calendar', function(calendar){
        });      
    });
}