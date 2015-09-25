var React = require('react/addons'),
	HomePage = React.createFactory(require('./render/pages/js/HomePage'));

module.exports = function (app){
	app.get('/', function (req, res) {

		var reactBody = React.renderToString(HomePage());
		res.render('index', {
			title     : 'Raymond',
			body 	  : reactBody,
		});
	})
}