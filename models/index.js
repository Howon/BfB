var mongoose = require('mongoose');
mongoose.connect('mongodb://testuser:test@ds051833.mongolab.com:51833/raymond');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var Course, User;
var Schema = mongoose.Schema;

var timeSchema = new Schema({
  starttime: String,
  endtime: String
})


var courseSchema = new Schema({
  id: String,
  meetingTimes:[TimeSchema],
  summary: String,
  location: String
});

var userSchema = new Schema({
  name:  {
      first: String,
      last: String
    },
  email: String
});

Times = mongoose.model('Times', timeSchema);
Course = mongoose.model('Course', courseSchema);
User = mongoose.model('User', userSchema);

module.exports = {"Course": Course, "User": User , "Times": Times};
