var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var notificationSchema = new Schema({
	_id: String,
    notifications: [{
      courseID : String,
      content : String,
      time : Date,
      checked : Boolean
    }]
});

module.exports = mongoose.model('Notification', notificationSchema);
