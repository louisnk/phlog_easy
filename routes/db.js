  mongo = require('mongodb').MongoClient;
  mongo.connect('mongodb://10.0.0.24:24242/phlog_easy', function (err, db) {
    if (err) {
        throw err;
    } else {
      console.log("<--------------- MONGODB Listening --------------- >")
      this.db = db;
    }
  }.bind(this));

exports.work = function(req,res) {

    var pictureSet = req.query.collection,
        collection = this.db.collection(pictureSet),
        getImages = function() {
          
          collection.find().toArray(function(err, images) {
            if (!err) {
                res.statusCode = 200;
                res.setHeader('content-type', 'application/json');
              if (images.length > 0) {
                res.end(JSON.stringify({'images': images}));                
              } else res.end('No images found in that collection');
            } else {
              res.statusCode = 500;
              res.setHeader('content-type', 'text');
              res.end(err);
            }
          });
        }.bind(this),

        storeImages = function() {
          // TODO
          console.log('store something');
        }.bind(this);


    this.endpoints = {
      'getImages': getImages
    }

    this.endpoints[req.params[0]]();


}.bind(this);

