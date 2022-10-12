const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

module.exports = new mongoose.model("User", userSchema);

// const { getDb } = require("../util/database");
// const { ObjectId } = require("mongodb");
// const Product = require("./product");
//
// class User {
//   constructor(name, email, cart, id) {
//     this.name = name;
//     this.email = email;
//     this.cart = cart; // {items: []}
//     this._id = id;
//   }
//
//   static findById(userId) {
//     // find single user
//     const db = getDb();
//     return db
//       .collection("users")
//       .findOne({ _id: new ObjectId(userId) })
//       .then((result) => {
//         return result;
//       })
//       .catch((err) => console.log(err));
//   }
//
//   addOrder() {
//     const db = getDb();
//     return this.fetchCartProducts()
//       .then((products) => {
//         const orders = {
//           items: products,
//           user: {
//             _id: this._id,
//             name: this.name,
//             email: this.email,
//           },
//         };
//         return db.collection("orders").insertOne(orders);
//       })
//       .then(() => {
//         return db
//           .collection("users")
//           .updateOne({ _id: this._id }, { $set: { cart: { items: [] } } });
//       })
//       .catch((err) => console.log(err));
//   }
//
//   getOrders() {
//     const db = getDb();
//     return db
//       .collection("orders")
//       .find({ "user._id": this._id })
//       .toArray()
//       .then((orders) => orders)
//       .catch((err) => console.log(err));
//   }
//
//   addToCart(product) {
//     let updatedCartItems = [];
//
//     const cartProductIndex = this.cart.items.findIndex(
//       (cp) => cp._id.toString() === product._id.toString()
//     );
//
//     let newQuantity = 1;
//     updatedCartItems = [...this.cart.items];
//
//     // add to cart က ရှိပြီးသား product ဆိုရင် quantity ကို တိုးပေးရမယ်
//     // မရှိသေးတဲ့ product အသစ်ဆိုရင် push လုပ်ပေးရမယ်
//
//     if (cartProductIndex >= 0) {
//       newQuantity = updatedCartItems[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({ _id: product._id, quantity: 1 });
//     }
//
//     const db = getDb();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: this._id },
//         { $set: { cart: { items: updatedCartItems } } }
//       );
//   }
//
//   fetchCartProducts() {
//     const db = getDb();
//     const productIds = this.cart?.items.map((p) => p._id);
//     return db
//       .collection("products")
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then((products) => {
//         return products.map((p) => {
//           return {
//             ...p,
//             quantity: this.cart.items.find(
//               (i) => i._id.toString() === p._id.toString()
//             ).quantity,
//           };
//         });
//       })
//       .catch((err) => console.log(err));
//   }
//
//   save() {
//     // save user
//     const db = getDb();
//     return db
//       .collection("users")
//       .insertOne(this)
//       .then((result) => console.log("Created user successfully!"))
//       .catch((err) => console.log(err));
//   }
// }
//
// module.exports = User;
