var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  models = require('../models/index'), mongoose = require('mongoose');

function validateEmail(email) {
  var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
  if (re.test(email)) {
    if ((email.indexOf('@columbia.edu', email.length - '@columbia.edu'.length) !== -1) || email.indexOf('@barnard.edu', email.length - '@barnard.edu'.length) !== -1) {
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
  // used to deserialize the user
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
            return done(null, user);
          } else {
            if (validateEmail(profile.emails[0].value)) {
              var newUser = new models.User();
              // set all of the relevant information
              newUser._id = profile.id;
              newUser.token = token;
              newUser.info.name = profile.displayName;
              newUser.info.email = profile.emails[0].value; // pull the first email
              // create new notification list for the users.
              var newNotification = new models.Notification();
              newNotification.notifications = [];
              newNotification._id = new mongoose.Types.ObjectId;
              newUser.notifications = newNotification._id;
              newNotification.save(function(err) {
                if (err)
                  throw err;
                // save the user
                newUser.info.save(function(err) {
                  if (err)
                    throw err;
                  return done(null, newUser);
                });    
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