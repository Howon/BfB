"use strict";

var config = require('./config/config');
var express = require('express')
var path = require('path');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? config.appPort.dev : config.appPort.deploy;

var webpack = require('webpack');
var webpackConfig = require('./webpack.config')
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({ ws: true });

if (isDeveloping) {
  var bundle = require('./server/bundle.js');
  bundle();

  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
  });

  app.get('/socket.io/*', function(req, res) {
    console.log("proxying GET request", req.url);
    proxy.web(req, res, { target: 'http://localhost:8080'});
  });

  app.post('/socket.io/*', function(req, res) {
    console.log("proxying POST request", req.url);
    proxy.web(req, res, { target: 'http://localhost:8080'});
  });

  app.on('upgrade', function (req, socket, head) {
    proxy.ws(req, socket, head);
  });
}

var mongooseURL = isDeveloping ? config.mongoose.dev : config.mongoose.prod

var mongoose = require('mongoose');
mongoose.connect(mongooseURL);

var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

require('babel-core/register');
app.set('views', path.join(__dirname, 'src/static/views'))
app.set('view engine', 'jade')
app.use(express.static(path.join(__dirname, 'src/static')))

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(session({
    secret: 'cookiezcookiezcookiez',
    name: 'this_cookie',
    proxy: true,
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./src/scripts/course/course')(io);
require('./src/scripts/chat/chat')(io);
require('./src/scripts/thread/thread')(io);
require('./src/scripts/auth/authenticate')(config.googleAuth, passport);
require('./src/scripts/drive/drive').setClient(config.drive);
require('./src/scripts/routes')(app, passport);

proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

server.listen(port, function () {
	console.log("*****************************");
	console.log("* Rayos running at port: " + port + " *");
	console.log("*****************************");
});
