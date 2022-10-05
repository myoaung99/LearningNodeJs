const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://myomyintaung:OVa2HIyWVYnVN4xN@cluster0.torxfu9.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((result) => {
      callback(result);
      console.log("Connected Successfully!");
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
