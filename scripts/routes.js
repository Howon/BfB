module.exports = function(app, passport) {
	app.get('/', function(req, res) {
		if (req.isAuthenticated()) {
			res.redirect('/home');
		} else {
			res.render('login', {
				title: 'Raymond'
			});
		}
	});

	app.get('/auth/google', passport.authenticate('google', {
		scope: ['profile', 'email']
	}));

	app.get('/auth/google/callback', passport.authenticate('google', {
			failureRedirect: '/home'
		}),
		function(req, res) {
			res.redirect('/home');
		}
	);
	app.get('/chattest', function(req, res) {
		res.render('chatest',{
			title: 'Test'
		});
	})
	app.get('/home', function(req, res) {
		if (req.isAuthenticated()) {
			var props = {
				user: {					
					id : req.user._id,
					name: req.user.info.name,
					email: req.user.info.email,
				}
			};
			
			res.render('home', {
				title: 'Raymond',
				user: req.user.info,
				APP_PROPS: props
			});
		} else {
			res.redirect('/');
		}
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


	app.get('/test', function(req, res) {
		var models = require('./models/index');
		var meetings = [meeting];
		var course = new models.Course({
			"id": "test",
			"meetingTimes": meetings,
			"summary": "test",
			"location": "test"
		});
		course.save();
		res.render('home', {
			title: 'Raymond'
		});
	})
}