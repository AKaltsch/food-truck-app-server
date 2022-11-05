const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   console.log(req.session.isLogedIn);
// };
module.exports = (req, res, next) => {
  console.log("headers" + req.headers);
  const token = req.headers["Authorization"];
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
