const fs = require("fs");
const path = require("path");
const Cart = require("./cart");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  // newly created product instance don't have id props yet
  // only editing ones have the ids when they are instantiated

  //so
  // if there is id => do updating process
  // if there is null id => do new product creating process
  save() {
    if (this.id) {
      getProductsFromFile((prods) => {
        const updatingProductIndex = prods.findIndex((p) => p.id === this.id);
        console.log("updating prod index :", updatingProductIndex);
        const updatingProducts = [...prods];
        updatingProducts[updatingProductIndex] = this;

        fs.writeFile(p, JSON.stringify(updatingProducts), (err) =>
          console.log(err)
        );
      });
    } else {
      this.id = Math.random().toString();
      getProductsFromFile((products) => {
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          if (err) {
            console.log(err);
          }
        });
      });
    }
  }

  static delete(id) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      const updatedProducts = products.filter((p) => p.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          // also delete product from cart system
          Cart.removeProduct(id, product.price);
        }
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
