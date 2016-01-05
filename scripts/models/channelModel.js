var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var channelSchema = new Schema({
	_id : String,
  name : String,
	desc : String,
	messages : [{
		sender  : String,
		content : String
	}]
});

module.exports = mongoose.model('Channel', channelSchema);
