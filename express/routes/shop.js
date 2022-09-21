const express = require("express");
const path = require("path");
const rootDir = require("./../utils/path");

const router = express.Router();

// __dirname is the directory name of calling module
// sendFile is use to send files
router.get("/", (req, res) => {
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = {
  router: router,
};
