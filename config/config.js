module.exports = {
    appPort: {
        dev: 3000,
        deploy: 80.1
    }
    ,
    mongoose:{
    	dev    : 'mongodb://devroot:raymonddev@ds049754.mongolab.com:49754/raymond_development',
        prod : 'mongodb://root:raymondroot@ds049854.mongolab.com:49854/raymond_production'
    }
    ,
    googleAuth: {
        clientID         : '1018715897513-ck86o6scl49uh9em3074s204tehsc0eb.apps.googleusercontent.com',
        clientSecret     : '4i0XgOkymtdZokZAfmYZUM3b',
        callbackURLDev   : 'http://localhost:3000/auth/google/callback',
        callbackURLProd  : 'http://rayos.xyz/auth/google/callback'
    },
    drive : {
        clientID: "1018715897513-t8hnik2a4p7ick0ockilk55rapb6gi5q.apps.googleusercontent.com",
        clientSecret: "WmSAKJdPNBGLm2CMo53HCiZF",
        redirectURL: "urn:ietf:wg:oauth:2.0:oob"
    }
};
