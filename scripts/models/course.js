var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	timeSchema = require('./time');

var courseSchema = new Schema({
	classID		 : String,
	meetingTimes : {},
	summary      : String,
	location	 : String
});

module.exports = mongoose.model('Course', courseSchema);