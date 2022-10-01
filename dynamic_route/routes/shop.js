const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

// first shop page
router.get("/", shopController.getIndex);

// all products
router.get("/products", shopController.getProducts);

// product detail
router.get("/products/:productId", shopController.getProduct);

// get products in cart
router.get("/cart", shopController.getCart);

// add to cart
router.post("/cart", shopController.postCart);

// get product to order
router.get("/orders", shopController.getOrders);

// get checkout page
router.get("/checkout", shopController.getCheckout);

module.exports = router;
