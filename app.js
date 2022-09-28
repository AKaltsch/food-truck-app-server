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

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   next();
// });

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use((req, res, next) => {
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
