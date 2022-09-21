const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

//  return middleware function and call next()
app.use(bodyParser.urlencoded({ extended: false }));

app.use(shopRoutes.router);
app.use("/admin", adminRoutes);

// handle 404 page at last middleware
app.use("*", (req, res) => {
  res.status(404).send("<h1>Page not found!</h1>");
});

app.listen(3000);
