const PORT = 4000;

const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();

app.get("/", (req, res, next) => {
  res.json("hi");
});

app.get("/", (req, res, next) => {});

app.listen(4000, () => {
  console.log(`Server is running on port ${PORT}`);
});
