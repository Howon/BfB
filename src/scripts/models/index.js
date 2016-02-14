var Course = require('./courseModel'),
	User = require('./userModel'),
	CourseData = require('./courseDataModel'),
	Channel = require('./channelModel'),
	Notification = require('./notificationModel'),
	Thread = require('./threadModel');

module.exports = {
	"Course": Course,
	"User": User,
	"CourseData": CourseData,
	"Channel" : Channel,
	"Notification": Notification,
	"Thread": Thread
};