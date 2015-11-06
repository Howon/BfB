var models = require('../models/index'),
    crypto = require('crypto');

function strIDHash(str) {
    return crypto.createHash('md5').update(str).digest("hex");
}

module.exports = {
    chatHandler: function(io) {
        io.on('connection', function(socket) {
            socket.on('send:chat_message', function(message) {
                models.CourseData.findOne({
                    "_id": socket.room + ""
                }, function(err, courseDataResult) {
                    if (err) {
                        console.err("error: " + err);
                    }
                    if (courseDataResult) {
                        courseDataResult.messages.push(message);
                        courseDataResult.save();
                    }
                })

                socket.broadcast.to(socket.room).emit('receive:chat_message', message);
            });
        });
    }
}