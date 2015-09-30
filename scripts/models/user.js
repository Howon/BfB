var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({	
	info:{		
		userID : String,
		token: String,
	  name:  {
	    first: String,
	    last: String
	  },
	  email: String
	}
});

module.exports = mongoose.model('User', userSchema);