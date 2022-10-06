const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

// for db instance collection
let _db;

const mongoConnect = async () => {
    return MongoClient.connect(
        "mongodb+srv://myomyintaung:OVa2HIyWVYnVN4xN@cluster0.torxfu9.mongodb.net/?retryWrites=true&w=majority"
    )
        .then((client) => {
            _db = client.db("shop");
            console.log("Connected to shop db Successfully!");
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
