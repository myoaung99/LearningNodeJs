const express = require("express");
const shopController = require("../controller/shop");
const router = express.Router();

// __dirname is the directory name of calling module
// sendFile is use to send files
router.get("/", shopController.getIndex);

router.get("/product-list", shopController.getAllProducts);

router.get("/product-detail", shopController.getProductDetail);

router.get("/cart", shopController.getCart);

router.get("/checkout", shopController.getCheckout);

module.exports = router;
