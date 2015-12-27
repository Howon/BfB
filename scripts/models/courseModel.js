var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var courseSchema = new Schema({
	_id	     	   : String,
	meetingTimes   : {},
	summary        : String,
	location	   : String,
	subscriberRefs : [String],
	courseDataRef  : String
});

module.exports = mongoose.model('Course', courseSchema);