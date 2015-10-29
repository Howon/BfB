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
	courses: [Course]
});

module.exports = mongoose.model('User', userSchema);