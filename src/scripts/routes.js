"use strict";

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('main', {
      title: 'rayos'
    });
  });

  app.get('/home', function(req, res) {
    res.render('home', {
      title: 'Banh mi for Bambi'
    });
  });
};