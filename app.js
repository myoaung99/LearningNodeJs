const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const MONGODB_URI =
    "mongodb+srv://myomyintaung:4EvwakdYAaFx9s7s@cluster0.torxfu9.mongodb.net/shop";

const User = require("./models/user");
const errorController = require("./controllers/error");

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: "mySessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: "my secret key",
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

// dummy middleware that checks who is requesting for every requests
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then((user) => {
            req.user = user;
            return next();
        })
        .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
    .connect(MONGODB_URI)
    .then((result) => {
        User.findOne().then((user) => {
            if (!user) {
                const user = new User({
                    name: "Myo",
                    email: "myo@email.com",
                    cart: {items: []},
                });
                user.save();
            }
        });

        return app.listen(3000);
    })
    .catch((err) => console.log(err));
