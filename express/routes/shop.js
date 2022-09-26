const express = require("express");
const productControllers = require("../controller/product");
const router = express.Router();

// __dirname is the directory name of calling module
// sendFile is use to send files
router.get("/", productControllers.getProducts);

module.exports = router;
