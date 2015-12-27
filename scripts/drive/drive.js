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

var mimeSelector = {
  doc : 'text/plain',
  sheet : 'application/vnd.google-apps.spreadsheet'
}

module.exports = {
  setClient: function(config) {
    authorize(config, function(oauth2Client) {
      driveClient = google.drive({
        version: 'v2',
        auth: oauth2Client
      });
    });

    function authorize(config, setClient) {
      var clientID = config.clientID;
      var clientSecret = config.clientSecret;
      var redirectURL = config.redirectURL;
      var auth = new googleAuth();

      var oauth2Client = new auth.OAuth2(clientID, clientSecret, redirectURL);

      fs.readFile(TOKEN_PATH, function(err, token) {
        if (err) {
          getNewToken(oauth2Client, setClient);
        } else {
          oauth2Client.credentials = JSON.parse(token);
          setClient(oauth2Client);
        }
      });
    }

    function getNewToken(oauth2Client, setClient) {
      var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
      });

      console.log("------------------------------------------");
      console.log(' Authorize this app by visiting this url: ');
      console.log(authUrl);
      console.log("------------------------------------------");

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
          setClient(oauth2Client);
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
  createCourseFolder: function(id, getFolderRef) {
    driveClient.files.insert({
      resource: {
        title: id,
        mimeType: "application/vnd.google-apps.folder"
      }
    }, function(err, res) {
      getFolderRef(res.id);
    });
  },
  createFile: function(docName, fileType, folderID, callBack) {
    driveClient.files.insert({
      resource: {
        title: docName,
        mimeType: mimeSelector[fileType]
      },
      parents: [{
        kind: 'drive#fileLink',
        id: folderID
      }]
    }, function(err, res) {
      callBack(res.id);
    });
  },
  updatePermission: function(fileID){
    driveClient.permissions.insert({
      resource: {
        value: 'rayosapp@gmail.com',
        type: 'anyone',
        role: 'owner'
      },
      fileId: fileID,
      kind: "drive#permission"
    }, function(err, res) {
      console.log(err + " " + res);
    });
  },
  listDrive: function() {
    driveClient.files.list(function(err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      var files = response.items;
      if (files.length == 0) {
        console.log('No files found.');
      } else {
        console.log('Files:');
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          console.log('%s (%s)', file.title, file.id);
        }
      }
    })
  }
}