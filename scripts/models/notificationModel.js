var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var notificationSchema = new Schema({
	_id: String,
  notifications: [{
    course  : String,
    content : String
  }]
});

module.exports = mongoose.model('Notification', notificationSchema);