module.exports = {
    port: process.env.PORT || 3000
    ,
    mongoose:{
    	url: 'mongodb://testuser:test@ds051833.mongolab.com:51833/raymond',
        local: 'mongodb://localhost:27017/data/'
    }
    ,
    googleAuth: {
        clientID      : '710775881141-7ak38p0o3apboethicglem0doh13elrl.apps.googleusercontent.com',
        clientSecret  : 'hrNgv5v3KTubNaaHbjoUGCIn',
        callbackURL   : 'http://localhost:3000/auth/google/callback'
    }
};
