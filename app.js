
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var template = require('./routes/template');
var utils = require('./utils');
var http = require('http');
var reader = require('recursive-readdir');
fs = require('fs');
path = require('path');
hogan = require('hjs');
s = (process.platform === 'win32') ? '\\' : '/';
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
  console.log('Express listening on port ' + app.get('port'));
});





var searchDir = path.join(__dirname, 'public', 'images');

reader(searchDir, function(err, files) {
  directoryTree = utils.makeImagesJSON(files, searchDir);

  _.each(directoryTree, function(set, i) {
    if (set.images.length > 0) {
      _.each(set, function(imageArray, j) {
        if (j === 'thumbs') {
          directoryTree[i][j] = utils.processImages(imageArray, i, j);
        } else {
          directoryTree[i][j] = utils.processImages(imageArray, i);
        }
      });        
    }
  });

});


serve = function(req,res) {

  function queryParams(query) {
    return {
      pictureSet: query.pictureSet,
      thumbs: query.thumbs,
      id: query.id
    }
  }

  var query = queryParams(req.query),
      Images = directoryTree[query.pictureSet];
  if (Images) {
    if (query.thumbs &&
        Images.thumbs.length > 0) { 
      utils.sendJSON(res, JSON.stringify(Images.thumbs) );
    } else if (query.id && Images.images.length > 0) { 
      var imageToSend;
      _.each(Images.images, function(img, i) {
        if (img.id === query.id) { return imageToSend = img }
      })
      utils.sendJSON(res, JSON.stringify(
        imageToSend
      ));
    } else utils.sendJSON(res, 'No images found');

  } else {
    utils.sendJSON(res, 'No images found for that directory');
  }

}






app.get('/', routes.index);
app.get('/templates.js', template.serve);
app.get('/photos/*', routes.index);

app.get('/getImages', serve);
