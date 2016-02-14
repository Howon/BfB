var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	ObjectId = Schema.ObjectId;

var threadSchema = new Schema({
	_id : String,
  courseRef : String,
  content : String,
	comments : [{
		postedBy : String,
		content : String,
		time : Date
	}]
});

module.exports = mongoose.model('Thread', threadSchema);