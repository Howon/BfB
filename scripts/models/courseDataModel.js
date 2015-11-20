var mongoose = require('mongoose'),	
	Schema = mongoose.Schema;
	
var coursedataSchema = new Schema({
	_id: String,
	announcements: [{
		poster  : String,
		content : String,
		time    : Date
	}],
	messages: [{
		sender  : String,
		content : String
	}]
});

module.exports = mongoose.model('CourseData', coursedataSchema);