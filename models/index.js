var mongoose = require('mongoose');
mongoose.connect('mongodb://testuser:test@ds051833.mongolab.com:51833/raymond');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var Course, User;
var Schema = mongoose.Schema;

var courseSchema = new Schema({
  title: String,
  url_name: String,
  owner_id:   String,
  body:   String,
  date: { type: Date, default: Date.now },
  status: Number
});

var userSchema = new Schema({
  name:  {
      first: String,
      last: String
    },
  email: String
});

Course = mongoose.model('Course', courseSchema);
User = mongoose.model('User', userSchema);

module.exports = {"Course": Course, "User": User };
