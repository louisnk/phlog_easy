  mongo = require('mongodb').MongoClient;
  mongo.connect('mongodb://127.0.0.1:24242/phlog_easy', function (err, db) {
    if (err) {
        throw err;
    } else {
      console.log("<--------------- MONGODB Listening --------------- >")
      this.db = db;
    }
  }.bind(this));

exports.work = function(req,res) {

    
    var pictureSet = req.query.collection,
        getImages = function() {

          this.collection.find().toArray(function(err, images) {
            if (!err) {
              res.statusCode = 200;
              res.setHeader('content-type', 'application/json');

              if (images.length > 0) {
                res.end(JSON.stringify({'images': images}));                
              } else {
                this.readAndStore(pictureSet);
                emitter.addListener('imagesStored', function(datas) {
                  if (datas) {
                    getImages();
                  } else 
                  res.end('No images found in the DB or in public/images/' + pictureSet);
                });
              }
                // res.end('No images found in that collection');
            } else {
              res.statusCode = 500;
              res.setHeader('content-type', 'text');
              res.end(err);
            }
          }.bind(this));
        }.bind(this),

        storeImages = function() {
          // TODO
          console.log('store something');
        }.bind(this);

    this.endpoints = {
      'getImages': getImages
    }

    this.collection = this.db.collection(pictureSet);
    this.endpoints[req.params[0]]();


}.bind(this);

exports.readAndStore = function(pictureSet) {
  this.walker = require('../node/walker');
    var dir = path.join(__dirname, '..', 'public', 'images', pictureSet),
        imgObjects = [];

    this.walker.findAll(dir, function(err, list) {
      if (list.length > 0) {
        list.forEach(function(file, i) {
          imgObjects.push({
            'src': file.split('public')[1], 
            'description': 'A picture from the ' + pictureSet 
          });
        });

        this.collection.insert(imgObjects, function(err, datas) {
          if (!err) {
            emitter.emit('imagesStored', datas);
          }
        })
      } else emitter.emit('imagesStored', false);


    }.bind(this))
}.bind(this);

