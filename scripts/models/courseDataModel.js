var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	ObjectId = Schema.ObjectId;

var coursedataSchema = new Schema({
	_id: String,
	threads: [{
		postedBy  : String,
		title : String,
		time  : Date,
		threadRef: String
	}],
	channelRefs: [{
		name : String,
		ref : String
	}],
	driveFileRefs:[{
		name : String,
		fileType : String,
		ref : String
	}]
});

module.exports = mongoose.model('CourseData', coursedataSchema);