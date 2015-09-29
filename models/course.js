var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var courseSchema = new Schema({
  id: String,
  meetingTimes:[timeSchema],
  summary: String,
  location: String
});

module.exports = mongoose.model('Course', eventSchema);