const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const csrf = require("csurf");

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_KEY;

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.get("/", (req, res, next) => {
  res.json("hi");
});

app.get("/", (req, res, next) => {});

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(4000, () => {
      console.log(`Server is running on port 4000`);
    });
  })
  .catch((err) => console.log(err));
