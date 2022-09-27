const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

require("dotenv").config();

const User = require("./models/user");

const MONGODB_URI = process.env.MONGODB_KEY;

const app = express();

const authRoutes = require("./routes/authRoutes");
const placeRoutes = require("./routes/placeRoutes");
const user = require("./models/user");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  console.log("First");
  if (!req.session.user) {
    // console.log("REQSESSION: " + JSON.stringify(req.session));
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      console.log(user);
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

app.use(authRoutes);
app.use(placeRoutes);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(4000, () => {
      console.log(`Server is running on port 4000`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
