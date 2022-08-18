const express = require("express");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.post("/signup", authController.postSignup);

module.exports = router;
