const express = require("express");
require("dotenv").config();
const router = express.Router();

const authController = require("../controllers/auth");
const User = require("../models/user");

////jwt verification middleware/////

const verifyJWT = require("../middleware/auth");

////////////////////////////////////

router.get("/isUserAuth", verifyJWT, authController.getAuth);

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.post("/logout", authController.postLogout);

router.post("/signup", authController.postSignup);

module.exports = router;
