var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
  name:  {
      first: String,
      last: String
    },
  email: String
});

module.exports = mongoose.model('User', eventSchema);