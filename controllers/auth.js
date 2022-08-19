const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  const message = "you are getting this message";
  return message;
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      console.log("no user");
      return;
    }
    bcrypt
      .compare(password, user.password)
      .then((match) => {
        if (match) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          console.log(req.session);
          return req.session.save((err) => console.log(err));
        } else {
          console.log("passwords do not match");
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
      console.log(user);
      console.log("user created!!!");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
