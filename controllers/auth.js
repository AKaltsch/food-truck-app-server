const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getAuth = (req, res, next) => {
  res.send("You are authenticated!!!");
};

exports.getLogin = (req, res, next) => {
  const user = req.session.user;
  let message;

  if (!user) {
    message = "no user signed in!";
    console.log(message);
    return message;
  }
  message = "successfully retrieved user!!";
  console.log(message);
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
      res.redirect("http://localhost:3000/login");
    })
    .catch((err) => console.log(err));
};
