var mongoose = require('mongoose'),
	Course = require('./course'),
	Schema = mongoose.Schema;
	
var userSchema = new Schema({
	 _id: Number,
	token: String,	
	info: {
		name: String,
		email: String
	},
	courseRefs: [String]
});

module.exports = mongoose.model('User', userSchema);