var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var timeSchema = new Schema({
  starttime: String,
  endtime: String
});

module.exports = mongoose.model('Time', timeSchema);