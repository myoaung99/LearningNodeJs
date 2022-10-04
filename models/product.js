// const Cart = require("./cart");
// const db = require("../util/database");
// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     return db.execute(
//       "INSERT INTO products(title, imageUrl, price, description) VALUES (?, ?, ?, ?)",
//       [this.title, this.imageUrl, this.price, this.description]
//     );
//   }

//   static deleteById(id) {
//     return db.execute("DELETE FROM products WHERE products.id = ?", [id]);
//   }

//   static fetchAll() {
//     return db.execute("SELECT * FROM products");
//   }

//   static findById(id) {
//     return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
//   }
// };

const Sequelize = require("sequelize");

const sequelize = require("./../util/database");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Product;
