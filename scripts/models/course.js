var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	timeSchema = require('./time');

var courseSchema = new Schema({
	_id: String,
	meetingTimes: [{
		type: Schema.Types.ObjectId,
		ref: 'Time'
	}],
	summary: String,
	location: String
});

module.exports = mongoose.model('Course', courseSchema);