const express = require("express");
const path = require("path");
const rootDir = require("./utils/path.js");

const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { get404 } = require("./controller/404.js");

const app = express();
//  return middleware function and call next()
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "views");

// serve static file
// give file system access for the public folder
app.use(express.static(path.join(__dirname, "public")));

app.use(shopRoutes);
app.use("/admin", adminRoutes); // filter

// handle 404 page at last middleware
app.use("*", get404);

app.listen(5000);
