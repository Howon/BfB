'use strict'

var express = require('express')
var path = require('path')
var app = express()
var http = require('http')
var server = http.createServer(app)
var io = require('socket.io')(server)

app.set('views', path.join(__dirname, 'src/static/views'))
app.set('view engine', 'jade')
app.use(express.static(path.join(__dirname, 'src/')))

require('./src/scripts/notification')(io)
require('./src/scripts/chat')(io)
require('./src/scripts/routes')(app)

var port = 3000;

server.listen(port, function() {
  console.log('*****************************')
  console.log('* BfB running at port: ' + port + ' *')
  console.log('*****************************')
})