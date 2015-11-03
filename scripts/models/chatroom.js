var mongoose = require('mongoose'),	
	Schema = mongoose.Schema;
	
var chatroomSchema = new Schema({
	messages: [{
		sender  : String,
		message : String
	}]
});

module.exports = mongoose.model('ChatRoom', chatroomSchema);