const fs = require("fs");
const path = require("path");
const { mainModule } = require("process");

// Global path constant
const p = path.join(path.dirname(mainModule.filename), "data", "products.json");

const getProductsFromFile = (cb) => {
  // this is async func
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]); // empty array OR
    }

    cb(JSON.parse(fileContent)); // array with products
  });
};
module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
