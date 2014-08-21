
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var template = require('./routes/template');
var files = require('./routes/files')
var http = require('http');
fs = require('fs');
// db = require('./routes/db');
dirWalker = require('./node/walker');
path = require('path');
hogan = require('hjs');
Emitter = require('events').EventEmitter;
emitter = new Emitter();

var app = express();

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
// app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/templates.js', template.serve);
app.get('/photos/*', routes.index);

app.get('/getImages', files.serve);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

sendJSON = function(res, data) {
  res.statusCode = 200;
  res.setHeader('content-type', 'application/json');
  res.end(data);
}