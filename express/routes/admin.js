const express = require("express");
const path = require("path");
const rootDir = require("./../utils/path");

const router = express.Router();
const products = [];

router.get("/add-product", (req, res) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("add-product", { docName: "Add Product" });
});

router.post("/add-product", (req, res) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.router = router;
exports.products = products;
