const express = require("express");
const path = require("path");
const rootDir = require("./utils/path.js");

const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

//  return middleware function and call next()
app.use(bodyParser.urlencoded({ extended: false }));

// serve static file
// give file system access for the public folder
app.use(express.static(path.join(__dirname, "public")));

app.use(shopRoutes.router);
app.use("/admin", adminRoutes);

// handle 404 page at last middleware
app.use("*", (req, res) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(3000);
