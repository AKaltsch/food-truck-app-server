const User = require("../models/user");

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log(email, password);
};
