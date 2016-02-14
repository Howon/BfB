var models = require('../models/index')

module.exports = function(io) {

    var testNotification = {
        courseID: "test",
        content: "test",
        time: "1995-12-17T03:24:00"
    };

    var listNotifications = new models.Notification({
        notifications: [{
            courseID: String,
            content: String,
            time: Date
        }]
    });
    models.Course.findById(data.courseID, function(err, courseResult) {
        if (err) {
            console.err("error: " + err);
        }
        if (courseDataResult) {
            console.log(courseResult);
        }
    })

} 