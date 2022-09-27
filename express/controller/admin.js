const Product = require("../models/product");

exports.getAdminProducts = (req, res) => {
  res.render("admin/product-list", {
    docName: "All Product",
    path: "/admin/product-list",
  });
};

exports.getAddProduct = (req, res) => {
  res.render("admin/add-product", {
    docName: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect("/admin/product-list");
};

exports.getEditProduct = (req, res) => {
  res.render("admin/edit-product", {
    docName: "Edit Product",
    path: "/admin/edit-product",
  });
};

exports.postEditProduct = (req, res) => {
  // add product editing logic
  res.redirect("/admin/product-list");
};
