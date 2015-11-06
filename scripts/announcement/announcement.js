var models = require('../models/index'),
    crypto = require('crypto');

function strIDHash(str) {
    return crypto.createHash('md5').update(str).digest("hex");
}

module.exports = function(io) {
    io.on('connection', function(socket) {
        socket.on('post:announcement', function(announcement) {
            models.CourseData.findOne({
                "_id": socket.room + ""
            }, function(err, courseDataResult) {
                if (err) {
                    console.err("error: " + err);
                }
                if (courseDataResult) {
                    courseDataResult.announcements.push(announcement);
                    courseDataResult.save();
                }
            })            
            socket.broadcast.to(socket.room).emit('receive:announcement', announcement);
        });
    });
}