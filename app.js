
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var template = require('./routes/template');
var http = require('http');
fs = require('fs');
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


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

sendJSON = function(res, data) {
  res.statusCode = 200;
  res.setHeader('content-type', 'application/json');
  res.end(data);
}


var searchDir = path.join(__dirname, 'public', 'images');
directoryTree = {};

dirWalker.findAll(searchDir, {toJSON: true}, function(err, fileList) {
  directoryTree = fileList;
});


serve = function(req,res) {


  function queryParams(query) {
    return {
      pictureSet: query.pictureSet,
      thumbs: query.thumbs
    }
  }

  function makeObj(file,pictureSet) {
    return {
      src: '../' + file.split(/(public)[\\\/]/)[2].replace(/[\\\/]/g, '/'),
      description: 'A picture from the ' + pictureSet      
    }
  }

  function processImageArray(imageArray) {
    return {
      files: [],
      pushFiles: function() {
        imageArray.forEach(function(file,i) {
          this.files.push( makeObj(file, requested.pictureSet) );
        }.bind(this));

        return this;     
      }
    }.pushFiles();
  }

  var requested = queryParams(req.query),
      imageObject = directoryTree[requested.pictureSet];

  if (imageObject) {
    if (requested.thumbs &&
        Object.keys(imageObject.thumbs).length > 0) { 
      sendJSON(res, JSON.stringify({
        'images': processImageArray(imageObject.thumbs).files
      }) );
    } else if (Object.keys(imageObject.images).length > 0) { 
      sendJSON(res, JSON.stringify({
        'images': processImageArray(imageObject.images).files
      }) );
    } else sendJSON(res, 'No images found');
  

  // sendJSON(res, JSON.stringify({'images': files}));
  } else {
    sendJSON(res, 'No images found for that directory');
  }

}






app.get('/', routes.index);
app.get('/templates.js', template.serve);
app.get('/photos/*', routes.index);

app.get('/getImages', serve);