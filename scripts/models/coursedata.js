var mongoose = require('mongoose'),	
	Schema = mongoose.Schema;
	
var coursedataSchema = new Schema({
	_id: String,
	messages: [{
		sender  : String,
		message : String
	}]
});

module.exports = mongoose.model('CourseData', coursedataSchema);