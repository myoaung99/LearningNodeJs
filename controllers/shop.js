const Order = require("../models/order");
const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      return res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      return res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      return res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user.populate("cart.items.productId").then((user) => {
    console.log(user.cart.items);
    return res.render("shop/cart", {
      products: user.cart.items,
      total: user.cart.total,
      pageTitle: "Your cart",
      path: "/cart",
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      console.log(product);
      req.user.addToCart(product);
      return res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteFromCart(prodId)
    .then(() => res.redirect("/cart"))
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user.populate("cart.items.productId").then((user) => {
    // console.log(user.cart.items);
    const products = user.cart.items.map((i) => {
      return {
        quantity: i.quantity,
        product: { ...i.productId._doc },
      };
    });

    const order = new Order({
      user: { name: user.name, userId: user },
      items: products,
      total: req.user.cart.total,
    });

    order
      .save()
      .then(() => {
        req.user.clearCart();
        return res.redirect("/orders");
      })
      .catch((err) => console.log(err));
  });
};

exports.getOrders = (req, res, next) => {
  const userId = req.user._id;
  Order.find({ "user.userId": userId })
    .then((orders) => {
      return res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};
