"use strict"

var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var SCOPES = ['https://www.googleapis.com/auth/drive'];

var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';

var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';

var driveClient;

module.exports = {
  setClient : function(config){
    authorize(config, function(oauth2Client){
      driveClient = google.drive({ version: 'v2', auth: oauth2Client });
    });

    function authorize(config, callback) {
      var clientID = config.clientID;
      var clientSecret = config.clientSecret;
      var redirectURL = config.redirectURL;
      var auth = new googleAuth();

      var oauth2Client = new auth.OAuth2(clientID, clientSecret, redirectURL);

      fs.readFile(TOKEN_PATH, function(err, token) {
        if (err) {
          getNewToken(oauth2Client, callback);
        }
         else {
          oauth2Client.credentials = JSON.parse(token);
          callback(oauth2Client);
        }
      });
    }

    function getNewToken(oauth2Client, callback) {
      var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
      });
      console.log('Authorize this app by visiting this url: ', authUrl);
      var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question('Enter the code from that page here: ', function(code) {
        rl.close();
        oauth2Client.getToken(code, function(err, token) {
          if (err) {
            console.log('Error while trying to retrieve access token', err);
            return;
          }
          oauth2Client.credentials = token;
          storeToken(token);
          callback(oauth2Client);
        });
      });
    }

    function storeToken(token) {
      try {
        fs.mkdirSync(TOKEN_DIR);
      } catch (err) {
        if (err.code != 'EEXIST') {
          throw err;
        }
      }
      fs.writeFile(TOKEN_PATH, JSON.stringify(token));
      console.log('Token stored to ' + TOKEN_PATH);
    }
  },
  createCourseFolder : function(name, callback){
    driveClient.files.insert({
      resource: {
        title: name,
        mimeType: "application/vnd.google-apps.folder"
      }
    }, function(err, res){
      callback(res.id);
    });
  }
}