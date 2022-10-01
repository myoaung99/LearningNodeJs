const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  // Here we don't need to create a constructor like we did in product model.
  // Because we don't need 'a instant of cart' everytime we add or remove a product from a cart.
  // There will always be a cart anyway, we just need a way to manipulate the cart.

  static addProduct(id, price) {
    // fetch all products in cart
    // analyze the product list
    // add product/ increase quantity of product in cart
    // calculate the total price of products in cart
    // save the cart data

    fs.readFile(p, (err, fileContent) => {
      let cart = {
        products: [],
        totalPrice: 0,
      };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const updatingProductIndex = cart.products.findIndex((p) => p.id === id);
      const updatingProduct = cart.products[updatingProductIndex];
      let updatingCart;

      if (updatingProduct) {
        updatingCart = [...cart.products];
        updatingCart[updatingProductIndex] = {
          ...updatingProduct,
          qty: updatingProduct.qty + 1,
        };
      } else {
        updatingCart = [...cart.products, { id: id, qty: 1 }];
      }

      // console.log("Updating cart :", updatingCart);

      cart.totalPrice = (+cart.totalPrice + +price).toFixed(2);
      cart.products = updatingCart;

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static removeProduct(id, price) {
    fs.readFile(p, (err, fileContent) => {
      // if there is an error, it means we don't have any product to delete in cart
      if (err) {
        return;
      }

      const cart = JSON.parse(fileContent);
      console.log("Cart :", cart);

      const product = cart.products.find((p) => p.id === id);
      const updatingCart = { ...cart };

      updatingCart.products = updatingCart.products.filter((p) => p.id !== id);
      const productQty = product?.qty;
      updatingCart.totalPrice = updatingCart.totalPrice - productQty * price;

      console.log("Updating cart :", JSON.stringify(updatingCart));
      fs.writeFile(p, JSON.stringify(updatingCart), (err) => {
        console.log(err);
      });
    });
  }

  static getCartProducts(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb();
      }
      cb(cart);
    });
  }
};
