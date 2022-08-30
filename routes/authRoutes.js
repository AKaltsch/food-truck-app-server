const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const csrf = require("csurf");
// const csrfProtection = csrf({ cookie: true });
// const parseForm = csrf({ cookie: false });
const router = express.Router();

const authController = require("../controllers/auth");
const User = require("../models/user");

////jwt verification middleware/////

const verifyJWT = (req, res, next) => {
  console.log(req.headers);
  const token = req.headers["x-access-token"];

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

// router.get("/login", csrfProtection, authController.getLogin);

// router.post("/login", parseForm, csrfProtection, authController.postLogin);

// router.post("/signup", csrfProtection, authController.postSignup);

router.get("/isUserAuth", verifyJWT, authController.getAuth);

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.post("/signup", authController.postSignup);

module.exports = router;
