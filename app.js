const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const csrf = require("csurf");

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

require("dotenv").config();

const User = require("./models/user");

const MONGODB_URI = process.env.MONGODB_KEY;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const authRoutes = require("./routes/authRoutes");

app.get("/", (req, res, next) => {
  res.json("hi");
});

app.use(authRoutes);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(4000, () => {
      console.log(`Server is running on port 4000`);
    });
  })
  .catch((err) => console.log(err));
