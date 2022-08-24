const express = require("express");
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });
const router = express.Router();

const authController = require("../controllers/auth");
const User = require("../models/user");

////////////////////////////////////

router.get("/login", csrfProtection, authController.getLogin);

router.post("/login", csrfProtection, authController.postLogin);

router.post("/signup", csrfProtection, authController.postSignup);

module.exports = router;
