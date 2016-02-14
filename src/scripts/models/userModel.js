var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	 _id : Number,
	token : String,
	info : {
		name: {
      firstName : String,
      lastName : String
    },
		email: String
	},
	courseRefs : [String],
  userOnboard : Boolean,
	notificationsRef : String
});

module.exports = mongoose.model('User', userSchema);