var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var courseSchema = new Schema({
	classID		 : String,
	meetingTimes : {},
	summary      : String,
	location	 : String,
	color 		 : String
});

module.exports = mongoose.model('Course', courseSchema);