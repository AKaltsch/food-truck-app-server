const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = express.Router();

const authController = require("../controllers/auth");
const User = require("../models/user");

////jwt verification middleware/////

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  // console.log(req.headers.auth);

  if (!token) {
    res.send("NO TOKEN!!!");
  } else {
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Authentication Failed!!" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

////////////////////////////////////

router.get("/isUserAuth", verifyJWT, authController.getAuth);

router.get("/login", verifyJWT, authController.getLogin);

router.post("/login", authController.postLogin);

router.post("/logout", authController.postLogout);

router.post("/signup", authController.postSignup);

module.exports = router;
