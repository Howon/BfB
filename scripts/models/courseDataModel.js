var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	ObjectId = Schema.ObjectId;

var coursedataSchema = new Schema({
	_id: String,
	threads: [{
		postedBy  : String,
		content : String,
		time    : Date,
		_id : String
	}],
	channelRefs: [{
		name : String,
		ref : String
	}],
	driveFileRefs:[{
		name : String,
		ref : String
	}]
});

module.exports = mongoose.model('CourseData', coursedataSchema);