
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
_ = require('lodash');
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
directoryTree = {},
hits = 0;

dirWalker.findAll(searchDir, {toJSON: true}, function(err, fileList) {
  hits++;

  function processImageArray(imageArray, pictureSet) {
    return {
      files: [],
      pushFiles: function() {
        imageArray.forEach(function(file,i) {
          this.files.push( makeObj(file, pictureSet) );
        }.bind(this));

        return this;     
      }
    }.pushFiles().files;
  }

  function makeObj(file,pictureSet) {
    return {
      src: '../' + file.split(/(public)[\\\/]/)[2].replace(/[\\\/]/g, '/'),
      description: 'A picture from the ' + pictureSet,
      id: generateHash() + pictureSet
    }
  }

  function generateHash() {
    return parseInt(Math.random() * 10e8);
  }

  if (hits > 2) {
    directoryTree = fileList;
    _.each(directoryTree, function(set, i) {
      if (set.images.length > 0) {
        console.log(i);
        _.each(set, function(size, j) {
          // if (i == 'night' && j === 'images') console.log(size);
          directoryTree[i][j] = processImageArray(size, i);
          // if (i == 'night' && j === 'images') console.log(size);
        });        
      }
    });
    console.log(directoryTree.day.images);
  } else directoryTree = fileList;



});


serve = function(req,res) {

  function queryParams(query) {
    return {
      pictureSet: query.pictureSet,
      thumbs: query.thumbs
    }
  }


  

  var requested = queryParams(req.query),
      imageObject = directoryTree[requested.pictureSet];

  if (imageObject) {
    if (requested.thumbs &&
        Object.keys(imageObject.thumbs).length > 0) { 
      sendJSON(res, JSON.stringify(imageObject.thumbs) );
    } else if (Object.keys(imageObject.images).length > 0) { 
      sendJSON(res, JSON.stringify(imageObject.images) );
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
