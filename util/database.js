const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://myomyintaung:OVa2HIyWVYnVN4xN@cluster0.torxfu9.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      callback();
      _db = client.db();
      console.log("Connected Successfully!");
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Connection Failed");
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
