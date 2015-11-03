var mongoose = require('mongoose'),
	User = require('./user'),
	Schema = mongoose.Schema;

var courseSchema = new Schema({
	classID		 : String,
	meetingTimes : {},
	summary      : String,
	location	 : String,
	color 		 : String,
	subscribers  : [{
		type : Number,
		ref  : 'User'
	}],
	chatRoom: String
});
	
module.exports = mongoose.model('Course', courseSchema);