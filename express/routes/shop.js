const express = require("express");
const path = require("path");
const rootDir = require("./../utils/path");
const adminData = require("./admin");
const router = express.Router();

// __dirname is the directory name of calling module
// sendFile is use to send files
router.get("/", (req, res) => {
  const products = adminData.products;
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  res.render("shop", { prods: products, docName: "Shop", path: "/" });
});

module.exports = {
  router: router,
};
