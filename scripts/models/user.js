var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var userSchema = new Schema({
	 _id: Number,
	token: String,	
	info: {
		name: String,
		email: String
	},
	classes: [

	]
});

module.exports = mongoose.model('User', userSchema);