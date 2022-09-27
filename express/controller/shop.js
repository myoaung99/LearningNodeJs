const Product = require("../models/product");

// public shop
exports.getIndex = (req, res) => {
  res.render("shop/index", {
    docName: "Shop",
    path: "/",
  });
};

exports.getAllProducts = (req, res) => {
  Product.fetchAll((products) => {
    return res.render("shop/product-list", {
      prods: products,
      docName: "All Products",
      path: "/product-list",
    });
  });
};

exports.getProductDetail = (req, res) => {
  res.render("shop/product-detail", {
    docName: "Product Detail",
    path: "/product-detail",
  });
};

exports.getCart = (req, res) => {
  res.render("shop/cart", {
    docName: "Cart",
    path: "/cart",
  });
};

exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    docName: "Checkout",
    path: "/checkout",
  });
};
