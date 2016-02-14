"use strict";

var models = require('./models/index');

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/home');
    } else {
      res.render('login', {
        title: 'rayos'
      });
    }
  });

  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback', passport.authenticate('google', {
      successRedirect: '/home',
      failureRedirect: '/'
    }),
    function(req, res) {
      res.redirect('/home');
    }
  );

  app.get('/home', function(req, res) {
    if (req.isAuthenticated()) {
      var props = {
        user: {
          id: req.user._id,
          name: req.user.info.name,
          email: req.user.info.email
        }
      };

      res.render('home', {
        title: 'rayos',
        APP_PROPS: props
      });
    } else {
      res.redirect('/');
    }
  });

  app.get('/course/:id', function(req, res) {
    if (req.isAuthenticated()) {
      var courseID = req.params.id;
      models.Course.findById(courseID, function(err, courseData){
        if(err){
          console.error(err);
        } else if (courseData){
          var props = {
            user: {
              id: req.user._id,
              name: req.user.info.name,
              email: req.user.info.email
            },
            course: {
              title : courseData.summary,
              id: courseID
            }
          };

          res.render('course', {
            title: 'rayos',
            APP_PROPS: props
          });
        }
      })
    } else {
      res.redirect('/');
    }
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};