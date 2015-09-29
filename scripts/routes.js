module.exports = function (app){
	app.get('/', function (req, res) {	
		res.render('index', {
			title     : 'Raymond'			
		});
	}),
	app.get('/test', function(req, res) {
		var models = require('../models/');
		var meeting = new models.Times({ "starttime": "test", "endtime": "test2" });
		var meetings = [meeting];
		var course = new models.Course({ "id": "test", "meetingTimes": meetings, "summary": "test", "location": "test" });
		course.save();
		res.render('index', {
			title: 'Raymond'
		});
	})	
}