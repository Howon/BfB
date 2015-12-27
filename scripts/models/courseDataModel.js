var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var coursedataSchema = new Schema({
	_id: String,
	threads: [{
		postedBy  : String,
		content : String,
		time    : Date
	}],
	channelRefs: [{
		name : String,
		ref : String
	}],
	driveFolderRef: String
});

module.exports = mongoose.model('CourseData', coursedataSchema);