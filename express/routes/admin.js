const express = require("express");

const router = express.Router();

router.get("/add-product", (req, res) => {
  res.send(
    '<form action="/admin/add-product" method="POST"><input type="text" name="name"/><button>Add Product</button></form>'
  );
});

router.post("/add-product", (req, res) => {
  console.log(req.body.name);
  res.redirect("/");
});

module.exports = router;
