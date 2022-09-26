exports.get404 = (req, res) => {
  res.render("404", { docName: "Page Not Found", path: null });
};
