const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: false,
        isLogin: req.session.isLoggedIn,
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
        userId: req.user,
    });
    product
        .save()
        .then(() => {
            console.log("Product Created!");
            return res.redirect("/admin/products");
        })
        .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect("/");
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then((product) => {
            return res.render("admin/edit-product", {
                pageTitle: "Edit Product",
                path: "/admin/edit-product",
                editing: editMode,
                product: product,
                isLogin: req.session.isLoggedIn,
            });
        })
        .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    Product.findByIdAndUpdate(prodId, {
        title: updatedTitle,
        imageUrl: updatedImageUrl,
        description: updatedDesc,
        price: updatedPrice,
    })
        .then(() => res.redirect("/admin/products"))
        .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
    Product.find()
        .then((products) => {
            return res.render("admin/products", {
                prods: products,
                pageTitle: "All Products",
                path: "/admin/products",
                isLogin: req.session.isLoggedIn,
            });
        })
        .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndDelete(prodId)
        .then(() => res.redirect("/admin/products"))
        .catch((err) => console.log(err));
};
