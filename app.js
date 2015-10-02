var express = require('express')
var path = require('path')
var app = express()
var http = require('http')
var server = http.createServer(app)
var config = require('./config')
var io = require('socket.io')(server);

var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

require('babel/register');

var mongoose = require('mongoose');
mongoose.connect(config.mongoose.url);
// mongoose.connect(config.mongoose.local, function(){
// 		mongoose.connection.db.dropDatabase();
// 	});

server.listen(config.port)
app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'jade')
app.use(express.static(path.join(__dirname, 'app')))

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'cookiezcookiezcookiez',
    name: 'this_cookie',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./scripts/calendar/calendar')(io);
require('./scripts/auth/authenticate')(config, passport);
require('./scripts/routes')(app, passport);

// catch 404 and forward to error handler
console.log("*****************************")
console.log("* App running at port: " + config.port + " *")
console.log("*****************************")