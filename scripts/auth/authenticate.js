var User = require('../models/user');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
 

module.exports = function(config, passport) {
   passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new GoogleStrategy({
      clientID        : config.googleAuth.clientID,
      clientSecret    : config.googleAuth.clientSecret,
      callbackURL     : config.googleAuth.callbackURL,
    },

    function(token, refreshToken, profile, done) {
      process.nextTick(function() {
          // try to find the user based on their google id
        User.findOne({ 'google.id' : profile.id }, function(err, user) {
          if (err){
              return done(err);
          }
          if (user) {
              // if a user is found, log them in
              return done(null, user);
          } else {
              // if the user isnt in our database, create a new user
              var newUser = new User();
              
              // console.log(profile)
              // set all of the relevant information
              newUser.info.id    = profile.id;
              newUser.info.token = token;
              newUser.info.name  = profile.displayName;
              newUser.info.email = profile.emails[0].value; // pull the first email
              // save the user
              newUser.info.save(function(err) {
                  if (err)
                      throw err;
                  return done(null, newUser);
              });
            }
        });
      });
    }
  ));
}
