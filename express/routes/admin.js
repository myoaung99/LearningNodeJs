const express = require("express");

const router = express.Router();

router.get("/add-product", (req, res) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="name"/><button>Add Product</button></form>'
  );
});

router.post("/product", (req, res) => {
  console.log(req.body.name);
  res.redirect("/");
});

module.exports = router;
