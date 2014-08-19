  mongo = require('mongodb').MongoClient;
  mongo.connect('mongodb://10.0.0.24:24242/phlog_easy', function (err, db) {
      if (err) {
          throw err;
      } else {
        console.log('listening for db things');

      }
  });
exports.work = function(req,res) {
  console.log(req);


var tmp = {
  a: 1,
  b: 2
}


  function retrieve(db, options, callback) {
    this.collection = options.collection;
    console.log(db[this.collection].find());
  }
  

}