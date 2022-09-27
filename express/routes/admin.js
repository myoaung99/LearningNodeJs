const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");

router.get("/product-list", adminController.getAdminProducts);

router.get("/add-product", adminController.getAddProduct);

router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product", adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProduct);

module.exports = router;
