module.exports = {
    port: process.env.PORT || 3000
    ,
    mongoose:{
    	dev    : 'mongodb://devroot:raymonddev@ds049754.mongolab.com:49754/raymond_development',        
        prod : 'mongodb://root:raymondroot@ds049854.mongolab.com:49854/raymond_production'
    }
    ,
    googleAuth: {
        clientID         : '710775881141-7ak38p0o3apboethicglem0doh13elrl.apps.googleusercontent.com',
        clientSecret     : 'hrNgv5v3KTubNaaHbjoUGCIn',
        callbackURLDev   : 'http://localhost:3000/auth/google/callback',
        callbackURLProd  : 'http://rayos.xyz/auth/google/callback'
    }
};
