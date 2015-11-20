var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var userSchema = new Schema({
	 _id: Number,
	token: String,	
	info: {
		name: String,
		email: String
	},
	courseRefs: [String],
	notifications  : String
});

module.exports = mongoose.model('User', userSchema);