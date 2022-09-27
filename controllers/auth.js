const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getAuth = (req, res, next) => {
  res.send("You are authenticated!!!");
};

exports.getLogin = (req, res, next) => {
  const user = req.session.user;

  if (!user) {
    return res.send("cannot find user");
  }
  return res.send("found user");
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      console.log("no user");
      res.json({ auth: false, message: "No user exists!!" });
      return;
    }
    bcrypt
      .compare(password, user.password)
      .then((match) => {
        if (match) {
          const id = user._id;
          const token = jwt.sign({ id }, process.env.TOKEN_KEY, {
            expiresIn: "10m",
          });

          req.session.isLoggedIn = true;
          req.session.user = user;
          console.log("Second");
          // console.log(req.session);
          res.json({ auth: true, token: token, user: user });
          return req.session.save((err) => console.log(err));
        } else {
          console.log("passwords do not match");
          res.json({ auth: false, message: "wrong username/password!!" });
          return;
        }
      })
      .catch((err) => console.log(err));
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
  });
  console.log("Logged Out!!");
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        password: hashedPassword,
      });
      return user.save();
    })
    .then((user) => {
      // console.log(user);
      console.log("user created!!!");
    })
    .catch((err) => console.log(err));
};
