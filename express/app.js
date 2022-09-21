const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

//  return middleware function and call next()
app.use(bodyParser.urlencoded({ extended: false }));

app.use(shopRoutes.router);
app.use(adminRoutes);

// handle 404 page at last middleware
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
