var React = require('react/addons'),
	HomePage = React.createFactory(require('./render/pages/js/HomePage'));


module.exports = function (app){
	app.get('/', function (req, res) {

		var reactBody = React.renderToString(HomePage());
		res.render('index', {
			title     : 'Raymond',
			body 	  : reactBody,
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