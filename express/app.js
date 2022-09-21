const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//  return middleware function and call next()
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/add-product", (req, res) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="name"/><button>Add Product</button></form>'
  );
});

app.post("/product", (req, res) => {
  console.log(req.body.name);
  res.redirect("/");
});

app.use("/", (req, res) => {
  res.send("<h1>Hello from  Express.js</h1>");
});

app.listen(3000);
