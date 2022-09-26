const express = require("express");
const router = express.Router();
const productControllers = require("../controller/product");

router.get("/add-product", productControllers.getAddProduct);

router.post("/add-product", productControllers.postAddProduct);

module.exports = router;
