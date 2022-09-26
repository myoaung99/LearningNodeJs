const express = require("express");
const path = require("path");
const rootDir = require("./utils/path.js");

const ejs = require("ejs");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();
//  return middleware function and call next()
app.use(bodyParser.urlencoded({ extended: false }));

// set templating engine on express
// app.set("view engine", "pug");
// app.set("views", "views");

app.set("view engine", "ejs");
app.set("views", "views");

// serve static file
// give file system access for the public folder
app.use(express.static(path.join(__dirname, "public")));

app.use(shopRoutes);
app.use("/admin", adminRoutes); // filter

// handle 404 page at last middleware
app.use("*", (req, res) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  res.render("404", { docName: "Page Not Found" });
});

app.listen(3000);
