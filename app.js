const path = require("path");

const express = require("express");

require("dotenv").config();

const app = express();

app.get("/", (req, res, next) => {
  res.json("hi");
});

app.get("/", (req, res, next) => {});

app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});
