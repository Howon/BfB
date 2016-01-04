"use strict";

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  models = require('../models/index'),
  mongoose = require('mongoose'),
  drive = require('../drive/drive');

function validateEmail(email) {
  var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
  if (re.test(email)) {
    if ((email.indexOf('@columbia.edu', email.length - '@columbia.edu'.length) !== -1) || (email.indexOf('@barnard.edu', email.length - '@barnard.edu'.length) !== -1)) {
      return true;
    }
  } else {
    return false;
  }
}

module.exports = function(config, passport) {
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    models.User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  const isDeveloping = process.env.NODE_ENV !== 'production';
  const callbackURL = isDeveloping ? config.callbackURLDev : config.callbackURLProd;

  passport.use(new GoogleStrategy({
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      callbackURL: callbackURL
    },

    function(token, refreshToken, profile, done) {
      process.nextTick(function() {
        // try to find the user based on their google id
        models.User.findById(profile.id, function(err, user) {
          if (err) {
            return done(err);
          }
          if (user) {
            // if a user is found, log them in
            user.token = token;
            user.save();
            return done(null, user);
          } else {
            if (validateEmail(profile.emails[0].value)) {
              var newUser = new models.User();
              // set all of the relevant information
              newUser._id = profile.id;
              newUser.token = token;
              newUser.info.name.firstName = profile.name.givenName;
              newUser.info.name.lastName = profile.name.familyName;
              newUser.info.email = profile.emails[0].value; // pull the first email
              // save the user
              var newNotification = new models.Notification();
              newNotification._id = new mongoose.Types.ObjectId;

              newUser.notificationsRef = newNotification._id;

              newNotification.save(function(err) {
                if (err){
                  throw err;
                } else {
                  newUser.save(function(err1) {
                    if (err1){
                      throw err;
                    }
                    return done(null, newUser);
                  });
                }
              });
            } else {
              return done(err);
            }
          }
        });
      });
    }
  ));
}