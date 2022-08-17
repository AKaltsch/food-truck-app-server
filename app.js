const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");

require("dotenv").config();

const app = express();

app.get("/", (req, res, next) => {
  res.json("hi");
});

app.get("/", (req, res, next) => {});

app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});
