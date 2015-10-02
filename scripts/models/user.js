var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	id: String,
	token: String,	
	info: {
		name: String,
		email: String
	}
});

module.exports = mongoose.model('User', userSchema);