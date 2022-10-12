const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);

// const { ObjectId } = require("mongodb");
// const { getDb } = require("./../util/database");
//
// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price, userId) {
//     this._id = id && new ObjectId(id);
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//     this.userId = userId;
//   }
//
//   // return all product with array structure
//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((result) => {
//         return result;
//       })
//       .catch((err) => console.log(err));
//   }
//
//   // get one product that match with the given id
//   static fetchById(id) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .findOne({ _id: new ObjectId(id) })
//       .then((result) => {
//         return result;
//       })
//       .catch((err) => console.log(err));
//   }
//
//   // delet product that match with id
//   static deleteById(id) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new ObjectId(id) })
//       .then((result) => console.log("Deleted count :", result.deletedCount))
//       .catch((err) => console.log(err));
//   }
//
//   // combine save and update methods
//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       // do update process
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: new ObjectId(this._id) }, { $set: this });
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }
//
//     return dbOp
//       .then((result) =>
//         console.log("New product's id: ", result.insertedId.toString())
//       )
//       .catch((err) => console.log(err));
//   }
// };
