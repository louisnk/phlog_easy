  mongo = require('mongodb').MongoClient;
exports.work = function(req,res) {
  this.walker = require('../node/walker');
  mongo.connect('mongodb://10.0.0.24:24242/phlog_easy', function (err, db) {
      if (err) {
          throw err;
      } else {
        console.log('listening for db things');
        console.log("query: --------------------");
        console.log(req.query);
// collection = db.collection(req.query.collection),


        var test = {
              src: 'http://goodmoneying.com/wp-content/uploads/2013/08/freedom.jpg',
              alt: 'Freedom?'
            },
            getImages = function() {
              console.log('getting some images from the DB :)');
              res.statusCode = 200;
              res.setHeader('content-type', 'application/json');
              res.end(JSON.stringify(test));
              // collection.find().toArray(function(err, imgs) {
              // });
            }.bind(this),

            storeImages = function() {
              // this.
              console.log('store something');
            }.bind(this);


        this.endpoints = {
          'getImages': getImages
        }

        this.endpoints[req.params[0]]();

        // function retrieve(db, options, callback) {
        //   this.collection = options.collection;
        //   console.log(db[this.collection].find());
        // }


        
      }
  }.bind(this));

}