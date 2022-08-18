const User = require("../models/user");

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = new User({
    email: email,
    password: password,
  });

  user
    .save()
    .then((result) => {
      console.log("user created");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
