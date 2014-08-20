  mongo = require('mongodb').MongoClient;
  mongo.connect('mongodb://127.0.0.1:24242/phlog_easy', function (err, db) {
      if (err) {
          throw err;
      } else {
        console.log('listening for db things');

      }
  });
exports.work = function(req,res) {
  console.log(req.params);
  console.log("query: --------------------");
  console.log(req.query);

  var getImages = function() {
    console.log('getting some images from the DB :)');
  }


  this.endpoints = {
    'getImages': getImages
  }

  this.endpoints[req.params[0]]();

  // function retrieve(db, options, callback) {
  //   this.collection = options.collection;
  //   console.log(db[this.collection].find());
  // }

  

}