module.exports = {
    port: process.env.PORT || 3000
    ,
    mongoose:{
    	dev    : 'mongodb://devroot:raymonddev@ds049754.mongolab.com:49754/raymond_development',        
        prod : ' mongodb://root:raymondroot@ds049854.mongolab.com:49854/raymond_production'
    }
    ,
    psql: {
        url: 'postgres://mkilixihinfbtl:5aQauvAsY84kwVuwf9sJ5eaoOn@ec2-107-21-221-59.compute-1.amazonaws.com:5432/d87d27gvusjl7c',
        local: 'pg://postgres:postgres@localhost:5432/raymond'
    }
    ,
    googleAuth: {
        clientID         : '710775881141-7ak38p0o3apboethicglem0doh13elrl.apps.googleusercontent.com',
        clientSecret     : 'hrNgv5v3KTubNaaHbjoUGCIn',
        callbackURLDev   : 'http://localhost:3000/auth/google/callback',
        callbackURLProd  : 'https://raymond.herokuapp.com/auth/google/callback'
    }
};
