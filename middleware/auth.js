const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
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
