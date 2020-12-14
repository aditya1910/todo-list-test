const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://dev:dev@cluster0.2ag6u.mongodb.net?retryWrites=true&w=majority";

var _db;

module.exports = {

  connectToServer: function (callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
      _db = client.db('todos');
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  }
};