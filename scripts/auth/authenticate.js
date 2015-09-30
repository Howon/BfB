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
        User.findOne({ 'userID' : profile.id }, function(err, user) {
          if (err){
            return done(err);
          }
          if (user) {             
            return done(null, user);
          } else {          
            var newUser = new User();
           
            newUser.info.userID    = profile.id;
            newUser.info.token = token;
            newUser.info.name.first  = profile.name.familyName;
            newUser.info.name.last  = profile.name.givenName;
            newUser.info.email = profile.emails[0].value; // pull the first email
            // save the user          

            newUser.save(function(err) {
              if (err)
                throw err;
              return done(null, user);
            });
          }
        });
      });
    }
  ));
}
